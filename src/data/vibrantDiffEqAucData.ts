import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { DIFF_EQ_AUC_PART_1_QUESTIONS } from './vibrantDiffEqAucPart1';
import { DIFF_EQ_AUC_PART_2_QUESTIONS } from './vibrantDiffEqAucPart2';
import { DIFF_EQ_AUC_PART_3_QUESTIONS } from './vibrantDiffEqAucPart3';
import { DIFF_EQ_AUC_PART_4_QUESTIONS } from './vibrantDiffEqAucPart4';

export const ALL_DIFF_EQ_AUC_QUESTIONS: Question[] = [
  ...DIFF_EQ_AUC_PART_1_QUESTIONS,
  ...DIFF_EQ_AUC_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `de-master-${50 + idx + 1}` })),
  ...DIFF_EQ_AUC_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `de-master-${100 + idx + 1}` })),
  ...DIFF_EQ_AUC_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: `de-master-${150 + idx + 1}` })),
];

export const VIBRANT_DIFF_EQ_AUC_PAPER_1: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-1',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFF EQ PART 1)', questions: DIFF_EQ_AUC_PART_1_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_2: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-2',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFF EQ PART 2)', questions: DIFF_EQ_AUC_PART_2_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_3: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-3',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 03 (Part 3 - 50Q Advanced AUC)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (AUC PART 3)', questions: DIFF_EQ_AUC_PART_3_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_4: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-4',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 04 (Part 4 - 50Q Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (JEE ARCHIVE)', questions: DIFF_EQ_AUC_PART_4_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-diff-eq-auc-complete-200',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 800,
  totalMarks: 800,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (COMPLETE DIFF EQ & AUC)', questions: ALL_DIFF_EQ_AUC_QUESTIONS }],
};

export const ALL_VIBRANT_DIFF_EQ_AUC_PAPERS: ExamPaper[] = [
  VIBRANT_DIFF_EQ_AUC_PAPER_1,
  VIBRANT_DIFF_EQ_AUC_PAPER_2,
  VIBRANT_DIFF_EQ_AUC_PAPER_3,
  VIBRANT_DIFF_EQ_AUC_PAPER_4,
  VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER,
];

export function getVibrantDiffEqAucLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_DIFF_EQ_AUC_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 44 + idx * 2);
    return {
      id: `locked-diffeq-${idx + 1}`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: `syl-de-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
