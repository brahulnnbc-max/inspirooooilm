import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { LIMIT_CONT_DIFF_PART_1_QUESTIONS } from './vibrantLimitContDiffPart1';
import { LIMIT_CONT_DIFF_PART_2_QUESTIONS } from './vibrantLimitContDiffPart2';
import { LIMIT_CONT_DIFF_PART_3_QUESTIONS } from './vibrantLimitContDiffPart3';
import { LIMIT_CONT_DIFF_PART_4_QUESTIONS } from './vibrantLimitContDiffPart4';
import { LIMIT_CONT_DIFF_PART_5_QUESTIONS } from './vibrantLimitContDiffPart5';

export const ALL_LIMIT_CONT_DIFF_QUESTIONS: Question[] = [
  ...LIMIT_CONT_DIFF_PART_1_QUESTIONS,
  ...LIMIT_CONT_DIFF_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `lcd-master-${50 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `lcd-master-${100 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: `lcd-master-${150 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1, id: `lcd-master-${200 + idx + 1}` })),
];

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_1: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-1',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 01 (Part 1 - 50Q Limits Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (LIMITS PART 1)', questions: LIMIT_CONT_DIFF_PART_1_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_2: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-2',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 02 (Part 2 - 50Q Limits Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (LIMITS PART 2)', questions: LIMIT_CONT_DIFF_PART_2_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_3: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-3',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 03 (Part 3 - 50Q Continuity)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (CONTINUITY)', questions: LIMIT_CONT_DIFF_PART_3_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_4: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-4',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 04 (Part 4 - 50Q Differentiability)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFFERENTIABILITY)', questions: LIMIT_CONT_DIFF_PART_4_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_5: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-5',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 05 (Part 5 - 37Q Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 148,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (JEE ARCHIVE)', questions: LIMIT_CONT_DIFF_PART_5_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-limit-cont-diff-complete-237',
  title: 'Vibrant Kota Mathematics - LCD Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 948,
  totalMarks: 948,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (COMPLETE LCD)', questions: ALL_LIMIT_CONT_DIFF_QUESTIONS }],
};

export const ALL_VIBRANT_LIMIT_CONT_DIFF_PAPERS: ExamPaper[] = [
  VIBRANT_LIMIT_CONT_DIFF_PAPER_1,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_2,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_3,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_4,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_5,
  VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER,
];

export function getVibrantLimitContDiffLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_LIMIT_CONT_DIFF_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 54 + idx * 2);
    return {
      id: `locked-lcd-${idx + 1}`,
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
      syllabus: [{ id: `syl-lcd-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
