import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { DETERMINANT_PART_1_QUESTIONS } from './vibrantDeterminantPart1';
import { DETERMINANT_PART_2_QUESTIONS } from './vibrantDeterminantPart2';
import { DETERMINANT_PART_3_QUESTIONS } from './vibrantDeterminantPart3';

export const ALL_DETERMINANT_QUESTIONS: Question[] = [
  ...DETERMINANT_PART_1_QUESTIONS,
  ...DETERMINANT_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `det-master-${50 + idx + 1}` })),
  ...DETERMINANT_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `det-master-${100 + idx + 1}` })),
];

export const VIBRANT_DETERMINANT_PAPER_1: ExamPaper = {
  id: 'vibrant-determinant-part-1',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 1)', questions: DETERMINANT_PART_1_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_PAPER_2: ExamPaper = {
  id: 'vibrant-determinant-part-2',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 2)', questions: DETERMINANT_PART_2_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_PAPER_3: ExamPaper = {
  id: 'vibrant-determinant-part-3',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 03 (Part 3 - 32Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 128,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 3)', questions: DETERMINANT_PART_3_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-determinant-complete-132',
  title: 'Vibrant Kota Mathematics - Determinant Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 528,
  totalMarks: 528,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT COMPLETE)', questions: ALL_DETERMINANT_QUESTIONS }],
};

export const ALL_VIBRANT_DETERMINANT_PAPERS: ExamPaper[] = [
  VIBRANT_DETERMINANT_PAPER_1,
  VIBRANT_DETERMINANT_PAPER_2,
  VIBRANT_DETERMINANT_PAPER_3,
  VIBRANT_DETERMINANT_COMPLETE_PAPER,
];

export function getVibrantDeterminantLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_DETERMINANT_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 36 + idx * 2);
    return {
      id: `locked-determinant-${idx + 1}`,
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
      syllabus: [{ id: `syl-det-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
