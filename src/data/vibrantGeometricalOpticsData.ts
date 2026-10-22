import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { GEOMETRICAL_OPTICS_PART_1_QUESTIONS } from './vibrantGeometricalOpticsPart1';
import { GEOMETRICAL_OPTICS_PART_2_QUESTIONS } from './vibrantGeometricalOpticsPart2';
import { GEOMETRICAL_OPTICS_PART_3_QUESTIONS } from './vibrantGeometricalOpticsPart3';
import { GEOMETRICAL_OPTICS_PART_4_QUESTIONS } from './vibrantGeometricalOpticsPart4';
import { GEOMETRICAL_OPTICS_PART_5_QUESTIONS } from './vibrantGeometricalOpticsPart5';

// Master collection of all 229 Geometrical Optics Questions
const ALL_229_OPTICS_QUESTIONS: Question[] = [
  ...GEOMETRICAL_OPTICS_PART_1_QUESTIONS,
  ...GEOMETRICAL_OPTICS_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `opt-master-${50 + idx + 1}`,
  })),
  ...GEOMETRICAL_OPTICS_PART_3_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 100 + idx + 1,
    id: `opt-master-${100 + idx + 1}`,
  })),
  ...GEOMETRICAL_OPTICS_PART_4_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 150 + idx + 1,
    id: `opt-master-${150 + idx + 1}`,
  })),
  ...GEOMETRICAL_OPTICS_PART_5_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 200 + idx + 1,
    id: `opt-master-${200 + idx + 1}`,
  })),
];

// =========================================================================
// TEST 1: VIBRANT KOTA GEOMETRICAL OPTICS PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// Covering Exercise-I: Plane Mirrors, Spherical Mirrors, Refraction at Plane Surfaces
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_1: ExamPaper = {
  id: 'vibrant-optics-part-1',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS PART 1 - EXERCISE I)',
      questions: GEOMETRICAL_OPTICS_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2: VIBRANT KOTA GEOMETRICAL OPTICS PART 2 (Q51 to Q100 - 180 Mins, 200 Marks)
// Covering Exercise-I: Refraction at Curved Surfaces, Lenses, Prisms & Dispersion
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_2: ExamPaper = {
  id: 'vibrant-optics-part-2',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 02 (Part 2 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS PART 2 - LENSES & PRISMS)',
      questions: GEOMETRICAL_OPTICS_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 3: VIBRANT KOTA GEOMETRICAL OPTICS PART 3 (Q101 to Q150 - 180 Mins, 200 Marks)
// Covering Exercise-II: Advanced Analytical Problems & Classic IIT Questions
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_3: ExamPaper = {
  id: 'vibrant-optics-part-3',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 03 (Part 3 - 50Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS PART 3 - EXERCISE II ADVANCED)',
      questions: GEOMETRICAL_OPTICS_PART_3_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 4: VIBRANT KOTA GEOMETRICAL OPTICS PART 4 (Q151 to Q200 - 180 Mins, 200 Marks)
// Covering Exercise-III: JEE Main & Advanced Master Collection (2020-2023)
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_4: ExamPaper = {
  id: 'vibrant-optics-part-4',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 04 (Part 4 - 50Q PYQs)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS PART 4 - JEE MAIN & ADVANCED PYQs)',
      questions: GEOMETRICAL_OPTICS_PART_4_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 5: VIBRANT KOTA GEOMETRICAL OPTICS PART 5 (Q201 to Q229 - 116 Mins, 116 Marks)
// Covering Exercise-III: JEE Main 2024–2025 Recent Master Archive & Silvered Lenses
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_5: ExamPaper = {
  id: 'vibrant-optics-part-5',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 05 (Part 5 - Remainder 29 Qs)',
  pattern: 'JEE_MAIN',
  durationMinutes: 116, // 29 questions * 4 mins
  totalMarks: 116,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS PART 5 - 2024-2025 RECENT ARCHIVE)',
      questions: GEOMETRICAL_OPTICS_PART_5_QUESTIONS,
    },
  ],
};

// =========================================================================
// MASTER PAPER: COMPLETE GEOMETRICAL OPTICS 229-QUESTION ARCHIVE
// =========================================================================
export const VIBRANT_GEOMETRICAL_OPTICS_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-optics-complete-229',
  title: 'Vibrant Kota Physics - Geometrical Optics Complete Series (229 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 836,
  totalMarks: 916,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (COMPLETE GEOMETRICAL OPTICS EXERCISE I, II & III)',
      questions: ALL_229_OPTICS_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS: ExamPaper[] = [
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_1,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_2,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_3,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_4,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_5,
  VIBRANT_GEOMETRICAL_OPTICS_COMPLETE_PAPER,
];

/**
 * Returns strictly locked tests for Vibrant Geometrical Optics scheduled
 * seamlessly AFTER Kinematics finishes on Day 15, in the alternate-day sequence (Days 17, 19, 21, 23, 25).
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantGeometricalOpticsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date();
  if (!baseDateStr) {
    // Tomorrow as Day 1
    d.setDate(d.getDate() + 1);
  } else {
    const parsed = new Date(baseDateStr);
    if (!isNaN(parsed.getTime())) {
      d.setTime(parsed.getTime());
    }
  }

  const formatIso = (dateObj: Date): string => {
    return dateObj.toISOString().split('T')[0];
  };

  const testsConfig = [
    {
      dayNum: 17,
      paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-opt-1-1', subject: 'physics' as const, name: 'Reflection at Plane Mirrors, Field of View & Virtual Objects', completed: false },
        { id: 'syl-opt-1-2', subject: 'physics' as const, name: 'Spherical Mirrors (Concave & Convex), Mirror Formula & Magnification', completed: false },
        { id: 'syl-opt-1-3', subject: 'physics' as const, name: 'Refraction at Plane Surfaces, Apparent Depth & Shift with Slabs', completed: false },
        { id: 'syl-opt-1-4', subject: 'physics' as const, name: 'Total Internal Reflection (TIR), Critical Angle & Optical Fibres', completed: false },
      ],
    },
    {
      dayNum: 19,
      paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-opt-2-1', subject: 'physics' as const, name: 'Refraction at Spherical Surfaces, Lens Maker Formula & Thin Lenses', completed: false },
        { id: 'syl-opt-2-2', subject: 'physics' as const, name: 'Combination of Lenses, Cutting of Lenses & Silvered Lens Systems', completed: false },
        { id: 'syl-opt-2-3', subject: 'physics' as const, name: 'Prisms: Angle of Minimum Deviation, Grazing Incidence & TIR in Prisms', completed: false },
        { id: 'syl-opt-2-4', subject: 'physics' as const, name: 'Dispersion without Deviation, Deviation without Dispersion & Chromatic Aberration', completed: false },
      ],
    },
    {
      dayNum: 21,
      paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-opt-3-1', subject: 'physics' as const, name: 'Advanced Variable Refractive Index Media (Curved Ray Tracing)', completed: false },
        { id: 'syl-opt-3-2', subject: 'physics' as const, name: 'Optical Instruments: Astronomical Telescope & Compound Microscope', completed: false },
        { id: 'syl-opt-3-3', subject: 'physics' as const, name: 'Velocity of Image in Moving Mirrors & Lenses', completed: false },
        { id: 'syl-opt-3-4', subject: 'physics' as const, name: 'IIT Advanced Subjective Classics & Multimodal Lens Arrays', completed: false },
      ],
    },
    {
      dayNum: 23,
      paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-opt-4-1', subject: 'physics' as const, name: 'JEE Main 2020–2023 Geometrical Optics Comprehensive Archive', completed: false },
        { id: 'syl-opt-4-2', subject: 'physics' as const, name: 'Liquid Lens Formation, Equiconvex Immersion & Power Shifts', completed: false },
        { id: 'syl-opt-4-3', subject: 'physics' as const, name: 'Thin Prisms in Combination & Dispersive Power', completed: false },
      ],
    },
    {
      dayNum: 25,
      paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_5,
      startTime: '09:00',
      endTime: '10:56',
      durationMinutes: 116, // 29 questions * 4 mins
      totalMarks: 116,
      syllabus: [
        { id: 'syl-opt-5-1', subject: 'physics' as const, name: 'JEE Main 2024 & 2025 Recent Archive (Plano-convex silvering, liquid immersion)', completed: false },
        { id: 'syl-opt-5-2', subject: 'physics' as const, name: 'IIT Advanced 2024-2025 Complex Ray Matrix & Spherical Shell Optics', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-optics-day-${cfg.dayNum}`,
      title: cfg.paper.title,
      pattern: 'JEE_MAIN' as const,
      scheduledDate: dateStr,
      startTime: cfg.startTime,
      endTime: cfg.endTime,
      durationMinutes: cfg.durationMinutes,
      totalMarks: cfg.totalMarks,
      status: 'UPCOMING_LOCKED' as const,
      isLocked: true,
      paperId: cfg.paper.id,
      paper: cfg.paper,
      syllabus: cfg.syllabus,
      scheduledAt: Date.now() + idx,
    };
  });
}
