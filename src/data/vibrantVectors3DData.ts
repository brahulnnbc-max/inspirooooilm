import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { VECTORS_3D_PART_1_QUESTIONS } from './vibrantVectors3DPart1';
import { VECTORS_3D_PART_2_QUESTIONS } from './vibrantVectors3DPart2';
import { VECTORS_3D_PART_3_QUESTIONS } from './vibrantVectors3DPart3';

export const ALL_113_VECTORS_3D_QUESTIONS: Question[] = [
  ...VECTORS_3D_PART_1_QUESTIONS,
  ...VECTORS_3D_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...VECTORS_3D_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
];

export const VIBRANT_VECTORS_3D_PAPER_1: ExamPaper = {
  id: 'vibrant-vectors-part-1',
  title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 01 (Part 1 - 50Q Dot & Cross Products)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (VECTORS PRODUCT OPERATIONS)', questions: VECTORS_3D_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_VECTORS_3D_PAPERS: ExamPaper[] = [
  VIBRANT_VECTORS_3D_PAPER_1,
  {
    id: 'vibrant-vectors-part-2',
    title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 02 (Part 2 - 50Q Triple Products & Lines)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (BOX PRODUCT & STRAIGHT LINES IN 3D)', questions: VECTORS_3D_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-vectors-part-3',
    title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 03 (Part 3 - 13Q Planes & Shortest Distance)',
    pattern: 'JEE_MAIN',
    durationMinutes: 60,
    totalMarks: 52,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (PLANES & SKEW LINES)', questions: VECTORS_3D_PART_3_QUESTIONS }],
  },
];

export function getVibrantVectors3DLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_VECTORS_3D_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 22 + idx * 2);
    return {
      id: `locked-vectors-${idx + 1}`,
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
      syllabus: [{ id: `syl-vec-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
