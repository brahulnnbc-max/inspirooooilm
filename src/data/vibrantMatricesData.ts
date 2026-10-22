import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { MATRICES_PART_1_QUESTIONS } from './vibrantMatricesPart1';
import { MATRICES_PART_2_QUESTIONS } from './vibrantMatricesPart2';
import { MATRICES_PART_3_QUESTIONS } from './vibrantMatricesPart3';

export const ALL_MATRICES_QUESTIONS: Question[] = [
  ...MATRICES_PART_1_QUESTIONS,
  ...MATRICES_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `mat-master-${50 + idx + 1}` })),
  ...MATRICES_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `mat-master-${100 + idx + 1}` })),
];

export const VIBRANT_MATRICES_PAPER_1: ExamPaper = {
  id: 'vibrant-matrices-part-1',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 1)', questions: MATRICES_PART_1_QUESTIONS }],
};

export const VIBRANT_MATRICES_PAPER_2: ExamPaper = {
  id: 'vibrant-matrices-part-2',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 2)', questions: MATRICES_PART_2_QUESTIONS }],
};

export const VIBRANT_MATRICES_PAPER_3: ExamPaper = {
  id: 'vibrant-matrices-part-3',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 03 (Part 3 - 46Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 184,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 3)', questions: MATRICES_PART_3_QUESTIONS }],
};

export const VIBRANT_MATRICES_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-matrices-complete-146',
  title: 'Vibrant Kota Mathematics - Matrices Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 584,
  totalMarks: 584,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES COMPLETE)', questions: ALL_MATRICES_QUESTIONS }],
};

export const ALL_VIBRANT_MATRICES_PAPERS: ExamPaper[] = [
  VIBRANT_MATRICES_PAPER_1,
  VIBRANT_MATRICES_PAPER_2,
  VIBRANT_MATRICES_PAPER_3,
  VIBRANT_MATRICES_COMPLETE_PAPER,
];

export function getVibrantMatricesLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_MATRICES_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 28 + idx * 2);
    return {
      id: `locked-matrices-${idx + 1}`,
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
      syllabus: [{ id: `syl-mat-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
