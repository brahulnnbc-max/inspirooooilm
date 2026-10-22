import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { CURRENT_ELECTRICITY_PART_1_QUESTIONS } from './vibrantCurrentElectricityPart1';
import { CURRENT_ELECTRICITY_PART_2_QUESTIONS } from './vibrantCurrentElectricityPart2';
import { CURRENT_ELECTRICITY_PART_3_QUESTIONS } from './vibrantCurrentElectricityPart3';
import { CURRENT_ELECTRICITY_PART_4_QUESTIONS } from './vibrantCurrentElectricityPart4';
import { CURRENT_ELECTRICITY_PART_5_QUESTIONS } from './vibrantCurrentElectricityPart5';

export const ALL_224_CURRENT_ELECTRICITY_QUESTIONS: Question[] = [
  ...CURRENT_ELECTRICITY_PART_1_QUESTIONS,
  ...CURRENT_ELECTRICITY_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_CURRENT_ELECTRICITY_PAPER_1: ExamPaper = {
  id: 'vibrant-current-part-1',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 01 (Part 1 - 50Q Ohm & Circuits)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (OHMS LAW & CIRCUIT THEOREMS)', questions: CURRENT_ELECTRICITY_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_CURRENT_ELECTRICITY_PAPERS: ExamPaper[] = [
  VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
  {
    id: 'vibrant-current-part-2',
    title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 02 (Part 2 - 50Q KCL, KVL & Symmetries)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (KIRCHHOFF LAWS & BRIDGE NETWORKS)', questions: CURRENT_ELECTRICITY_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-current-part-3',
    title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 03 (Part 3 - 50Q Instruments & Potentiometer)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (MEASURING INSTRUMENTS)', questions: CURRENT_ELECTRICITY_PART_3_QUESTIONS }],
  },
];

export function getVibrantCurrentElectricityLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_CURRENT_ELECTRICITY_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 18 + idx * 2);
    return {
      id: `locked-current-${idx + 1}`,
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
      syllabus: [{ id: `syl-curr-${idx}`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
