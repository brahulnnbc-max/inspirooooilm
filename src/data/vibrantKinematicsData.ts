import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { KINEMATICS_PART_1_QUESTIONS } from './vibrantKinematicsPart1';
import { KINEMATICS_PART_2_QUESTIONS } from './vibrantKinematicsPart2';

export const ALL_88_KINEMATICS_QUESTIONS: Question[] = [
  ...KINEMATICS_PART_1_QUESTIONS,
  ...KINEMATICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
];

export const VIBRANT_KINEMATICS_PAPER_1: ExamPaper = {
  id: 'vibrant-kinematics-part-1',
  title: 'Allen Kota Physics - Kinematics 1D & 2D CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (KINEMATICS 1D & 2D)', questions: KINEMATICS_PART_1_QUESTIONS }],
};

export const VIBRANT_KINEMATICS_PAPER_2: ExamPaper = {
  id: 'vibrant-kinematics-part-2',
  title: 'Allen Kota Physics - Kinematics Projectile & Relative CBT Mock Test 02 (Part 2 - 38Q)',
  pattern: 'JEE_MAIN',
  durationMinutes: 152,
  totalMarks: 152,
  sections: [{ id: 'physics', name: 'PHYSICS (PROJECTILE & RELATIVE MOTION)', questions: KINEMATICS_PART_2_QUESTIONS }],
};

export const ALL_VIBRANT_KINEMATICS_PAPERS: ExamPaper[] = [
  VIBRANT_KINEMATICS_PAPER_1,
  VIBRANT_KINEMATICS_PAPER_2,
];

export function getVibrantKinematicsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_KINEMATICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 2 + idx * 2);
    return {
      id: `locked-kinematics-${idx + 1}`,
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
      syllabus: [{ id: `syl-kin-${idx}`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
