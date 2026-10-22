import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { KINEMATICS_PART_1_QUESTIONS } from './vibrantKinematicsPart1';
import { KINEMATICS_PART_2_QUESTIONS } from './vibrantKinematicsPart2';

// Combine all 88 questions for master paper
const ALL_88_KINEMATICS_QUESTIONS: Question[] = [
  ...KINEMATICS_PART_1_QUESTIONS,
  ...KINEMATICS_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `kin-master-${50 + idx + 1}`,
  })),
];

// Helper to partition questions into Section A (MCQs) & Section B (Numericals) or by Subject
function buildSections(questions: Question[]) {
  const mcqs = questions.filter((q) => q.type !== 'NUMERICAL');
  const numericals = questions.filter((q) => q.type === 'NUMERICAL');

  if (numericals.length > 0 && mcqs.length > 0) {
    return [
      {
        id: 'physics' as const,
        name: 'PHYSICS (SECTION A - MCQs)',
        questions: mcqs,
      },
      {
        id: 'physics' as const,
        name: 'PHYSICS (SECTION B - NUMERICALS)',
        questions: numericals,
      },
    ];
  }

  return [
    {
      id: 'physics' as const,
      name: 'PHYSICS (KINEMATICS)',
      questions,
    },
  ];
}

// =========================================================================
// TEST 1: VIBRANT KOTA KINEMATICS PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// 50-Question Practice Test Session
// =========================================================================
export const VIBRANT_KINEMATICS_PAPER_1: ExamPaper = {
  id: 'vibrant-kinematics-part-1',
  title: 'Vibrant Kota Physics - Kinematics CBT Mock Test 01 (Part 1 - 50Q Practice Session)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (KINEMATICS PART 1 - 50 QUESTIONS SPRINT)',
      questions: KINEMATICS_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2: VIBRANT KOTA KINEMATICS PART 2 (Q51 to Q88 - 152 Mins, 152 Marks)
// Remainder 38-Question Master Archive (38 Qs * 4 mins)
// =========================================================================
export const VIBRANT_KINEMATICS_PAPER_2: ExamPaper = {
  id: 'vibrant-kinematics-part-2',
  title: 'Vibrant Kota Physics - Kinematics CBT Mock Test 02 (Part 2 - Remainder 38 Qs)',
  pattern: 'JEE_MAIN',
  durationMinutes: 152, // 38 questions * 4 mins
  totalMarks: 152,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (KINEMATICS PART 2 - JEE PYQ MASTER ARCHIVE)',
      questions: KINEMATICS_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// MASTER PAPER: COMPLETE KINEMATICS 88-QUESTION ARCHIVE
// =========================================================================
export const VIBRANT_KINEMATICS_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-kinematics-complete-88',
  title: 'Vibrant Kota Physics - Kinematics Complete Test Series (88 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 332,
  totalMarks: 352,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (COMPLETE KINEMATICS EXERCISE I, II & III)',
      questions: ALL_88_KINEMATICS_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_KINEMATICS_PAPERS: ExamPaper[] = [
  VIBRANT_KINEMATICS_PAPER_1,
  VIBRANT_KINEMATICS_PAPER_2,
  VIBRANT_KINEMATICS_COMPLETE_PAPER,
];

/**
 * Returns strictly locked alternate-day tests for Vibrant Kinematics (Day 13 & Day 15)
 * scheduled seamlessly after the conclusion of Electrostatics (Day 1 to Day 11) with 1-day gaps.
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantKinematicsLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 13,
      paper: VIBRANT_KINEMATICS_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-kin-1-1', subject: 'physics' as const, name: 'Kinematics 1D & 2D Graphs, a-t, v-t, and x-t Curves', completed: false },
        { id: 'syl-kin-1-2', subject: 'physics' as const, name: 'Ground-to-Ground Projectile Motion & Trajectory Equations', completed: false },
        { id: 'syl-kin-1-3', subject: 'physics' as const, name: 'Inclined Plane Projectile & Perpendicular Launches', completed: false },
        { id: 'syl-kin-1-4', subject: 'physics' as const, name: 'Relative Motion, River-Swimmer & Wind-Flag Problems', completed: false },
        { id: 'syl-kin-1-5', subject: 'physics' as const, name: 'IIT Advanced Multimodal Kinematic Curves & Vector Calculus', completed: false },
      ],
    },
    {
      dayNum: 15,
      paper: VIBRANT_KINEMATICS_PAPER_2,
      startTime: '09:00',
      endTime: '11:32',
      durationMinutes: 152, // 38 questions * 4 mins
      totalMarks: 152,
      syllabus: [
        { id: 'syl-kin-2-1', subject: 'physics' as const, name: 'JEE Main 2023 & 2024 Kinematics PYQs & Relative Approach Speeds', completed: false },
        { id: 'syl-kin-2-2', subject: 'physics' as const, name: 'IIT Advanced 2024 Stone-Ball Collision & Multi-Object Timing', completed: false },
        { id: 'syl-kin-2-3', subject: 'physics' as const, name: 'JEE Main 2025 Recent Archive (Airplane v-t, Boat River Crossings, Force Fields)', completed: false },
        { id: 'syl-kin-2-4', subject: 'physics' as const, name: 'IIT Advanced 2025 Viscous Drag & Exponential Retardation', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-kinematics-day-${cfg.dayNum}`,
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
