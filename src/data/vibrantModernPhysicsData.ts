import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { MODERN_PHYSICS_PART_1_QUESTIONS } from './vibrantModernPhysicsPart1';
import { MODERN_PHYSICS_PART_2_QUESTIONS } from './vibrantModernPhysicsPart2';
import { MODERN_PHYSICS_PART_3_QUESTIONS } from './vibrantModernPhysicsPart3';
import { MODERN_PHYSICS_PART_4_QUESTIONS } from './vibrantModernPhysicsPart4';
import { MODERN_PHYSICS_PART_5_QUESTIONS } from './vibrantModernPhysicsPart5';

export const ALL_243_MODERN_PHYSICS_QUESTIONS: Question[] = [
  ...MODERN_PHYSICS_PART_1_QUESTIONS,
  ...MODERN_PHYSICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...MODERN_PHYSICS_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...MODERN_PHYSICS_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...MODERN_PHYSICS_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_MODERN_PHYSICS_PAPER_1: ExamPaper = {
  id: 'vibrant-modern-part-1',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 01 (Part 1 - 50Q Photoelectric Effect & de Broglie)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (PHOTOELECTRIC & MATTER WAVES)', questions: MODERN_PHYSICS_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_MODERN_PHYSICS_PAPERS: ExamPaper[] = [
  VIBRANT_MODERN_PHYSICS_PAPER_1,
  {
    id: 'vibrant-modern-part-2',
    title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 02 (Part 2 - 50Q Bohr Model & X-Rays)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (ATOMIC PHYSICS & X-RAYS)', questions: MODERN_PHYSICS_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-modern-part-3',
    title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 03 (Part 3 - 50Q Nuclear Physics & Radioactivity)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (NUCLEAR PHYSICS)', questions: MODERN_PHYSICS_PART_3_QUESTIONS }],
  },
];

export function getVibrantModernPhysicsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_MODERN_PHYSICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 12 + idx * 2);
    return {
      id: `locked-modern-${idx + 1}`,
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
      syllabus: [{ id: `syl-mod-${idx}`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
