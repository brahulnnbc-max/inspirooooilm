import { ExamPaper, Question, ScheduledTest, SyllabusTopic } from '../types/exam';
import { getIsoDate, getTomorrowIso } from './scheduleCalculator';

export function randomizeQuestionMcq(question: Question): Question {
  if (question.type !== 'SINGLE_CORRECT' || !question.options || question.options.length <= 1) {
    return question;
  }

  const originalOptions = [...question.options];
  const originalCorrectAnswer = String(question.correctAnswer || 'A').toUpperCase().trim();
  const correctOptionObj = originalOptions.find((opt) => opt.id === originalCorrectAnswer) || originalOptions[0];

  // Fisher-Yates shuffle
  const shuffled = [...originalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const labels = ['A', 'B', 'C', 'D'];
  const newOptions = shuffled.map((opt, idx) => ({
    id: labels[idx] || String.fromCharCode(65 + idx),
    labelLatex: opt.labelLatex,
  }));

  const newCorrectAnswerIndex = shuffled.findIndex((opt) => opt.labelLatex === correctOptionObj.labelLatex);
  const newCorrectAnswer = labels[newCorrectAnswerIndex >= 0 ? newCorrectAnswerIndex : 0];

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

export function splitQuestionsIntoFiftyChunks(
  questions: Question[],
  baseTitle: string,
  pattern: string = 'JEE_MAIN',
  randomizeMcq: boolean = true
): ExamPaper[] {
  if (!questions || questions.length === 0) return [];

  const processedQuestions = randomizeMcq ? questions.map(randomizeQuestionMcq) : [...questions];
  const papers: ExamPaper[] = [];
  const chunkSize = 50;

  for (let i = 0; i < processedQuestions.length; i += chunkSize) {
    const chunk = processedQuestions.slice(i, i + chunkSize);
    const partNumber = Math.floor(i / chunkSize) + 1;
    const isFirst50 = partNumber === 1 && chunk.length === 50;
    const durationMinutes = isFirst50 ? 180 : Math.max(30, chunk.length * 4);
    const totalMarks = chunk.length * 4;

    // Group into sections by subject
    const sectionMap = new Map<string, Question[]>();
    chunk.forEach((q, idx) => {
      const secId = String(q.sectionId || 'physics').toLowerCase();
      if (!sectionMap.has(secId)) sectionMap.set(secId, []);
      sectionMap.get(secId)!.push({
        ...q,
        questionNumber: idx + 1,
      });
    });

    const sections = Array.from(sectionMap.entries()).map(([secId, qList]) => ({
      id: secId as any,
      name: secId.toUpperCase(),
      questions: qList,
    }));

    papers.push({
      id: `split-paper-${Date.now()}-${partNumber}`,
      title: `${baseTitle} (Part ${partNumber} - ${chunk.length} Qs)`,
      pattern,
      durationMinutes,
      totalMarks,
      sections,
    });
  }

  return papers;
}

export function schedulePapersOnAlternateDays(
  papers: ExamPaper[],
  options?: { startDate?: string; startTime?: string; endTime?: string }
): ScheduledTest[] {
  const startDateStr = options?.startDate || getTomorrowIso();
  const startTime = options?.startTime || '09:00';
  const endTime = options?.endTime || '12:00';

  const baseDate = new Date(`${startDateStr}T00:00:00`);

  return papers.map((paper, idx) => {
    const testDate = new Date(baseDate);
    testDate.setDate(baseDate.getDate() + idx * 2); // alternate days
    const dateStr = getIsoDate(testDate);

    const syllabus: SyllabusTopic[] = paper.sections.map((sec) => ({
      id: `syl-${paper.id}-${sec.id}`,
      subject: (sec.id === 'chemistry' || sec.id === 'mathematics' ? sec.id : 'physics') as any,
      name: `${sec.name} (${sec.questions.length} Qs)`,
      completed: false,
    }));

    return {
      id: `locked-sched-${paper.id}`,
      title: paper.title,
      pattern: paper.pattern,
      scheduledDate: dateStr,
      startTime,
      endTime,
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus,
    };
  });
}
