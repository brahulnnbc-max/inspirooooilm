import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { VECTORS_3D_PART_1_QUESTIONS } from './vibrantVectors3DPart1';
import { VECTORS_3D_PART_2_QUESTIONS } from './vibrantVectors3DPart2';
import { VECTORS_3D_PART_3_QUESTIONS } from './vibrantVectors3DPart3';

// Master collection of all 113 Vectors & 3-D Questions
export const ALL_113_VECTORS_3D_QUESTIONS: Question[] = [
  ...VECTORS_3D_PART_1_QUESTIONS,
  ...VECTORS_3D_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `vec-master-${50 + idx + 1}`,
  })),
  ...VECTORS_3D_PART_3_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 100 + idx + 1,
    id: `vec-master-${100 + idx + 1}`,
  })),
];

// =========================================================================
// TEST 1 (DAY 2): VIBRANT KOTA VECTORS & 3-D PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// Covering Exercise-I, Exercise-II & Exercise-III (Vector Algebra, Dot, Cross, STP)
// =========================================================================
export const VIBRANT_VECTORS_3D_PAPER_1: ExamPaper = {
  id: 'vibrant-vectors3d-part-1',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D PART 1 - 50 QUESTIONS SPRINT)',
      questions: VECTORS_3D_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2 (DAY 4): VIBRANT KOTA VECTORS & 3-D PART 2 (Q51 to Q100 - 180 Mins, 200 Marks)
// Covering Exercise-III Planes, Lines & IIT Advanced Master PYQs
// =========================================================================
export const VIBRANT_VECTORS_3D_PAPER_2: ExamPaper = {
  id: 'vibrant-vectors3d-part-2',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D CBT Mock Test 02 (Part 2 - 50Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D PART 2 - JEE ADVANCED PYQs)',
      questions: VECTORS_3D_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 3 (DAY 6): VIBRANT KOTA VECTORS & 3-D PART 3 (Q101 to Q113 - 52 Mins, 52 Marks)
// Covering Exercise-IV Final IIT Advanced Master Archive (13 Qs * 4 mins)
// =========================================================================
export const VIBRANT_VECTORS_3D_PAPER_3: ExamPaper = {
  id: 'vibrant-vectors3d-part-3',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D CBT Mock Test 03 (Part 3 - Remainder 13 Qs)',
  pattern: 'JEE_MAIN',
  durationMinutes: 52, // 13 questions * 4 mins
  totalMarks: 52,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D PART 3 - RECENT ADVANCED ARCHIVE)',
      questions: VECTORS_3D_PART_3_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 4 (DAY 8): VIBRANT KOTA VECTORS & 3-D PART 4 (50Q High-Yield Challenge)
// =========================================================================
export const VIBRANT_VECTORS_3D_PAPER_4: ExamPaper = {
  id: 'vibrant-vectors3d-part-4',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D CBT Mock Test 04 (50Q Rank Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D RANK SPRINT - 50 QUESTIONS)',
      questions: [
        ...VECTORS_3D_PART_2_QUESTIONS.slice(0, 25).map((q, idx) => ({ ...q, questionNumber: idx + 1, id: `vec-p4-q${idx + 1}` })),
        ...VECTORS_3D_PART_1_QUESTIONS.slice(25, 50).map((q, idx) => ({ ...q, questionNumber: 25 + idx + 1, id: `vec-p4-q${25 + idx + 1}` })),
      ],
    },
  ],
};

// =========================================================================
// TEST 5 (DAY 10): VIBRANT KOTA VECTORS & 3-D PART 5 (50Q IIT Advanced Booster)
// =========================================================================
export const VIBRANT_VECTORS_3D_PAPER_5: ExamPaper = {
  id: 'vibrant-vectors3d-part-5',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D CBT Mock Test 05 (50Q IIT Advanced Booster)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D BOOSTER - 50 QUESTIONS)',
      questions: [
        ...VECTORS_3D_PART_1_QUESTIONS.slice(0, 25).map((q, idx) => ({ ...q, questionNumber: idx + 1, id: `vec-p5-q${idx + 1}` })),
        ...VECTORS_3D_PART_2_QUESTIONS.slice(25, 50).map((q, idx) => ({ ...q, questionNumber: 25 + idx + 1, id: `vec-p5-q${25 + idx + 1}` })),
      ],
    },
  ],
};

// =========================================================================
// TEST 6 (DAY 12): COMPLETE VECTORS & 3-D 113-QUESTION MASTER ARCHIVE
// =========================================================================
export const VIBRANT_VECTORS_3D_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-vectors3d-complete-113',
  title: 'Vibrant Kota Mathematics - Vectors & 3-D Complete Series (113 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 412,
  totalMarks: 452,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VECTORS & 3-D EXERCISE I, II, III & IV)',
      questions: ALL_113_VECTORS_3D_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_VECTORS_3D_PAPERS: ExamPaper[] = [
  VIBRANT_VECTORS_3D_PAPER_1,
  VIBRANT_VECTORS_3D_PAPER_2,
  VIBRANT_VECTORS_3D_PAPER_3,
  VIBRANT_VECTORS_3D_PAPER_4,
  VIBRANT_VECTORS_3D_PAPER_5,
  VIBRANT_VECTORS_3D_COMPLETE_PAPER,
];

/**
 * Returns strictly locked alternate-day tests for Vibrant Vectors & 3-D (Mathematics)
 * scheduled to fill the GAP DAYS (Days 2, 4, 6, 8, 10, 12) between Electrostatics tests (Days 1, 3, 5, 7, 9, 11).
 * Day 1 = Physics, Day 2 = Math, Day 3 = Physics, Day 4 = Math, etc.
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantVectors3DLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 2,
      paper: VIBRANT_VECTORS_3D_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-vec-1-1', subject: 'mathematics' as const, name: 'Collinearity, Section Formula & Vector Addition in Space', completed: false },
        { id: 'syl-vec-1-2', subject: 'mathematics' as const, name: 'Dot Product, Projections, Angles & Orthogonality Conditions', completed: false },
        { id: 'syl-vec-1-3', subject: 'mathematics' as const, name: 'Cross Product, Area of Triangle & Parallelogram in 3D', completed: false },
        { id: 'syl-vec-1-4', subject: 'mathematics' as const, name: 'Linear Dependence & Independence of Vectors', completed: false },
      ],
    },
    {
      dayNum: 4,
      paper: VIBRANT_VECTORS_3D_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-vec-2-1', subject: 'mathematics' as const, name: 'Scalar Triple Product (Box Product) & Volume of Tetrahedron', completed: false },
        { id: 'syl-vec-2-2', subject: 'mathematics' as const, name: 'Vector Triple Product Expansion & Reciprocal System of Vectors', completed: false },
        { id: 'syl-vec-2-3', subject: 'mathematics' as const, name: '3D Lines: Shortest Distance Between Skew Lines & Intersection', completed: false },
        { id: 'syl-vec-2-4', subject: 'mathematics' as const, name: 'Planes in 3D: Intercept Form, Angle Between Planes & Distance', completed: false },
      ],
    },
    {
      dayNum: 6,
      paper: VIBRANT_VECTORS_3D_PAPER_3,
      startTime: '09:00',
      endTime: '09:52',
      durationMinutes: 52,
      totalMarks: 52,
      syllabus: [
        { id: 'syl-vec-3-1', subject: 'mathematics' as const, name: 'IIT Advanced 2024–2025 Recent Multi-Concept Vectors Archive', completed: false },
        { id: 'syl-vec-3-2', subject: 'mathematics' as const, name: 'Line-Plane Intersection, Foot of Perpendicular & Image Problems', completed: false },
      ],
    },
    {
      dayNum: 8,
      paper: VIBRANT_VECTORS_3D_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-vec-4-1', subject: 'mathematics' as const, name: 'Vectors & 3D High-Yield Problem Solving: Coplanarity & Skew Distances', completed: false },
        { id: 'syl-vec-4-2', subject: 'mathematics' as const, name: 'Direction Cosines, Direction Ratios & Symmetrical Form of Straight Lines', completed: false },
      ],
    },
    {
      dayNum: 10,
      paper: VIBRANT_VECTORS_3D_PAPER_5,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-vec-5-1', subject: 'mathematics' as const, name: 'IIT Advanced Rank Booster: Perpendicular Distance & Foot of Normal from Point', completed: false },
        { id: 'syl-vec-5-2', subject: 'mathematics' as const, name: 'Family of Planes Passing Through Line of Intersection', completed: false },
      ],
    },
    {
      dayNum: 12,
      paper: VIBRANT_VECTORS_3D_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '15:52',
      durationMinutes: 412,
      totalMarks: 452,
      syllabus: [
        { id: 'syl-vec-6-1', subject: 'mathematics' as const, name: 'Complete Vectors & 3-D Geometry Exercise I, II, III, IV Grand Revision', completed: false },
        { id: 'syl-vec-6-2', subject: 'mathematics' as const, name: 'Comprehensive Speed Test Before Next Physics Subject (Kinematics)', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-vectors3d-day-${cfg.dayNum}`,
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
