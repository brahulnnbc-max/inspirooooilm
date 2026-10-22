import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { INTEGRATION_PART_1_QUESTIONS } from './vibrantIntegrationPart1';
import { INTEGRATION_PART_2_QUESTIONS } from './vibrantIntegrationPart2';
import { INTEGRATION_PART_3_QUESTIONS } from './vibrantIntegrationPart3';
import { INTEGRATION_PART_4_QUESTIONS } from './vibrantIntegrationPart4';

export const ALL_185_INTEGRATION_QUESTIONS: Question[] = [
  ...INTEGRATION_PART_1_QUESTIONS,
  ...INTEGRATION_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...INTEGRATION_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...INTEGRATION_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
];

export const VIBRANT_INTEGRATION_PAPER_1: ExamPaper = {
  id: 'vibrant-integration-part-1',
  title: 'Vibrant Kota Mathematics - Indefinite Integration CBT Mock Test 01 (Part 1 - 50Q Substitution & Parts)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (INDEFINITE INTEGRATION)', questions: INTEGRATION_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_INTEGRATION_PAPERS: ExamPaper[] = [
  VIBRANT_INTEGRATION_PAPER_1,
  {
    id: 'vibrant-integration-part-2',
    title: 'Vibrant Kota Mathematics - Definite Integration CBT Mock Test 02 (Part 2 - 50Q Kings Rule & Properties)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (DEFINITE INTEGRALS)', questions: INTEGRATION_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-integration-part-3',
    title: 'Vibrant Kota Mathematics - Definite Integration CBT Mock Test 03 (Part 3 - 50Q Leibniz Rule & Limit as Sum)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (LEIBNIZ DIFFERENTIATION & RIEMANN SUM)', questions: INTEGRATION_PART_3_QUESTIONS }],
  },
];

export function getVibrantIntegrationLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_INTEGRATION_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 24 + idx * 2);
    return {
      id: `locked-integration-${idx + 1}`,
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
      syllabus: [{ id: `syl-int-${idx}`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
