import { ExamPaper, ExamPattern, Question, ScheduledTest, QuestionOption } from '../types/exam';
import { getIsoDate, getTomorrowIso } from './scheduleCalculator';

/**
 * Randomizes MCQ options unpredictably so students cannot guess by pattern (e.g. all A or all C).
 * Correct answer mapping is preserved with 100% accuracy.
 */
export function randomizeQuestionMcq(question: Question): Question {
  if (!question.options || question.options.length <= 1 || question.type === 'NUMERICAL') {
    return { ...question };
  }

  const originalOptions = [...question.options];
  const originalAnswer = (question.correctAnswer || 'A').trim().toUpperCase();

  // Find the label/text of the correct option(s)
  const isMultiple = question.type === 'MULTIPLE_CORRECT' || originalAnswer.includes(',');
  const correctOptionIds = isMultiple
    ? originalAnswer.split(',').map((s) => s.trim().toUpperCase())
    : [originalAnswer];

  const correctLabels = originalOptions
    .filter((opt) => correctOptionIds.includes(opt.id.toUpperCase()))
    .map((opt) => opt.labelLatex);

  // Fisher-Yates shuffle the options
  const shuffled = [...originalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Re-assign standard keys A, B, C, D
  const standardKeys = ['A', 'B', 'C', 'D', 'E'];
  const newOptions: QuestionOption[] = shuffled.map((opt, idx) => ({
    id: standardKeys[idx] || String.fromCharCode(65 + idx),
    labelLatex: opt.labelLatex,
  }));

  // Re-compute correct answer based on matching labels
  const newCorrectIds = newOptions
    .filter((opt) => correctLabels.includes(opt.labelLatex))
    .map((opt) => opt.id);

  const updatedAnswer = isMultiple
    ? newCorrectIds.sort().join(',')
    : (newCorrectIds[0] || 'A');

  return {
    ...question,
    options: newOptions,
    correctAnswer: updatedAnswer,
  };
}

/**
 * Splits a list of questions into 50-question test chunks.
 * - 50 questions: exactly 180 minutes duration.
 * - Remaining questions (< 50): duration = remaining.length * 4 minutes.
 */
export function splitQuestionsIntoFiftyChunks(
  questions: Question[],
  baseTitle: string = 'JEE CBT Test Series',
  pattern: ExamPattern = 'JEE_MAIN',
  randomizeMcq: boolean = true
): ExamPaper[] {
  if (!questions || questions.length === 0) return [];

  // Optionally randomize MCQ options
  const processedQuestions = randomizeMcq
    ? questions.map(randomizeQuestionMcq)
    : [...questions];

  const papers: ExamPaper[] = [];
  const chunkSize = 50;
  const totalChunks = Math.ceil(processedQuestions.length / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const chunkQuestions = processedQuestions.slice(i * chunkSize, (i + 1) * chunkSize);
    const count = chunkQuestions.length;
    const isFifty = count === 50;

    // 180 minutes for 50 questions; remaining questions = count * 4 minutes
    const durationMinutes = isFifty ? 180 : Math.max(15, count * 4);

    // Re-index question numbers 1..count for CBT room
    const reindexedQuestions = chunkQuestions.map((q, idx) => ({
      ...q,
      questionNumber: idx + 1,
      id: `split-q-${i + 1}-${idx + 1}`,
    }));

    // Partition into Physics, Chemistry, Mathematics sections if applicable
    const third = Math.ceil(count / 3);
    const pQ = reindexedQuestions.slice(0, third).map((q) => ({ ...q, sectionId: 'physics' as const }));
    const cQ = reindexedQuestions.slice(third, third * 2).map((q) => ({ ...q, sectionId: 'chemistry' as const }));
    const mQ = reindexedQuestions.slice(third * 2).map((q) => ({ ...q, sectionId: 'mathematics' as const }));

    const sections = count >= 15
      ? [
          { id: 'physics' as const, name: 'PHYSICS', questions: pQ },
          { id: 'chemistry' as const, name: 'CHEMISTRY', questions: cQ },
          { id: 'mathematics' as const, name: 'MATHEMATICS', questions: mQ },
        ]
      : [
          { id: 'physics' as const, name: 'ALL SUBJECTS', questions: reindexedQuestions },
        ];

    const totalMarks = reindexedQuestions.reduce((sum, q) => sum + (q.positiveMarks || 4), 0);

    const titleSuffix = isFifty
      ? `Part ${i + 1} (50 Questions • 180 Mins)`
      : `Remaining Part ${i + 1} (${count} Questions • ${durationMinutes} Mins)`;

    papers.push({
      id: `split-paper-${Date.now()}-${i + 1}`,
      title: `${baseTitle} - ${titleSuffix}`,
      pattern,
      durationMinutes,
      totalMarks: totalMarks > 0 ? totalMarks : count * 4,
      sections,
      createdAt: new Date().toISOString(),
    });
  }

  return papers;
}

/**
 * Schedules split papers on alternate days starting at 09:00 AM.
 * Each test is locked (UPCOMING_LOCKED, isLocked: true).
 */
export function schedulePapersOnAlternateDays(
  papers: ExamPaper[],
  options: {
    startDate?: string;
    startTime?: string;
    endTime?: string;
  } = {}
): ScheduledTest[] {
  const {
    startDate = getTomorrowIso(),
    startTime = '09:00',
    endTime = '12:00',
  } = options;

  const baseDate = new Date(startDate);
  const now = Date.now();
  const scheduledTests: ScheduledTest[] = [];

  papers.forEach((paper, index) => {
    // Alternate days: 0, 2, 4, 6...
    const dayOffset = index * 2;
    const testDate = new Date(baseDate);
    testDate.setDate(baseDate.getDate() + dayOffset);
    const dateStr = getIsoDate(testDate);

    // Compute end time based on duration if duration differs from 180
    let calculatedEndTime = endTime;
    if (paper.durationMinutes && paper.durationMinutes !== 180) {
      const [startH, startM] = startTime.split(':').map(Number);
      const startMinutesTotal = (startH || 9) * 60 + (startM || 0);
      const endMinutesTotal = startMinutesTotal + paper.durationMinutes;
      const endH = Math.floor(endMinutesTotal / 60) % 24;
      const endM = endMinutesTotal % 60;
      calculatedEndTime = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    }

    const syllabus = paper.sections.map((sec, sIdx) => ({
      id: `syl-${paper.id}-${sIdx}`,
      subject: sec.id,
      name: `${sec.name} (${sec.questions.length} Questions)`,
      completed: false,
    }));

    scheduledTests.push({
      id: `locked-test-${now}-${index + 1}`,
      title: paper.title,
      pattern: paper.pattern,
      scheduledDate: dateStr,
      startTime,
      endTime: calculatedEndTime,
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      syllabus,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: now,
    });
  });

  return scheduledTests;
}
