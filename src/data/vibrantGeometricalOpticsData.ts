import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { GEOMETRICAL_OPTICS_PART_1_QUESTIONS } from './vibrantGeometricalOpticsPart1';
import { GEOMETRICAL_OPTICS_PART_2_QUESTIONS } from './vibrantGeometricalOpticsPart2';
import { GEOMETRICAL_OPTICS_PART_3_QUESTIONS } from './vibrantGeometricalOpticsPart3';
import { GEOMETRICAL_OPTICS_PART_4_QUESTIONS } from './vibrantGeometricalOpticsPart4';
import { GEOMETRICAL_OPTICS_PART_5_QUESTIONS } from './vibrantGeometricalOpticsPart5';

export const ALL_229_OPTICS_QUESTIONS: Question[] = [
  ...GEOMETRICAL_OPTICS_PART_1_QUESTIONS,
  ...GEOMETRICAL_OPTICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_1: ExamPaper = {
  id: 'vibrant-optics-part-1',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 01 (Part 1 - 50Q Plane & Spherical Mirrors)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (OPTICS PART 1)', questions: GEOMETRICAL_OPTICS_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS: ExamPaper[] = [
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_1,
  {
    id: 'vibrant-optics-part-2',
    title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 02 (Part 2 - 50Q Refraction & Lenses)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 2)', questions: GEOMETRICAL_OPTICS_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-optics-part-3',
    title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 03 (Part 3 - 50Q Prism & Optical Instruments)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 3)', questions: GEOMETRICAL_OPTICS_PART_3_QUESTIONS }],
  },
];

export function getVibrantGeometricalOpticsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 6 + idx * 2);
    return {
      id: `locked-optics-${idx + 1}`,
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
      syllabus: [{ id: `syl-opt-${idx}`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
