import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { INTEGRATION_PART_1_QUESTIONS } from './vibrantIntegrationPart1';
import { INTEGRATION_PART_2_QUESTIONS } from './vibrantIntegrationPart2';
import { INTEGRATION_PART_3_QUESTIONS } from './vibrantIntegrationPart3';
import { INTEGRATION_PART_4_QUESTIONS } from './vibrantIntegrationPart4';

// Master collection of all 185 Indefinite & Definite Integration Questions from Kota Sheet
export const ALL_185_INTEGRATION_QUESTIONS: Question[] = [
  ...INTEGRATION_PART_1_QUESTIONS,
  ...INTEGRATION_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `int-master-${50 + idx + 1}`,
  })),
  ...INTEGRATION_PART_3_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 100 + idx + 1,
    id: `int-master-${100 + idx + 1}`,
  })),
  ...INTEGRATION_PART_4_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 150 + idx + 1,
    id: `int-master-${150 + idx + 1}`,
  })),
];

// =========================================================================
// TEST 1 (DAY 14): VIBRANT KOTA INTEGRATION PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// Covering Exercise-I (Indefinite Integration core & algebraic substitutions)
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_1: ExamPaper = {
  id: 'vibrant-integration-part-1',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (EXERCISE-I INDEFINITE INTEGRATION - 50 QUESTIONS)',
      questions: INTEGRATION_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2 (DAY 16): VIBRANT KOTA INTEGRATION PART 2 (Q51 to Q100 - 180 Mins, 200 Marks)
// Covering Exercise-II (Definite Integration properties, King\'s rule, Walli\'s, Gamma)
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_2: ExamPaper = {
  id: 'vibrant-integration-part-2',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 02 (Part 2 - 50Q Core Definite)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (EXERCISE-II DEFINITE INTEGRALS - 50 QUESTIONS)',
      questions: INTEGRATION_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 3 (DAY 18): VIBRANT KOTA INTEGRATION PART 3 (Q101 to Q150 - 180 Mins, 200 Marks)
// Covering Exercise-III Advanced Leibniz, Functional Equations & Exercise-IV AIEEE Archive
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_3: ExamPaper = {
  id: 'vibrant-integration-part-3',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 03 (Part 3 - 50Q Advanced & Main Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (EXERCISE-III & IV LEIBNIZ & JEE MAIN ARCHIVE - 50 QUESTIONS)',
      questions: INTEGRATION_PART_3_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 4 (DAY 20): VIBRANT KOTA INTEGRATION PART 4 (Q151 to Q185 - 140 Mins, 140 Marks)
// Covering Exercise-IV Q22 & Exercise-V Complete JEE Advanced Archive (35 Qs * 4 mins)
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_4: ExamPaper = {
  id: 'vibrant-integration-part-4',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 04 (Part 4 - Remainder 35 Qs JEE Advanced Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 140, // 35 questions * 4 mins
  totalMarks: 140,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (EXERCISE-V COMPLETE JEE ADVANCED ARCHIVE - 35 QUESTIONS)',
      questions: INTEGRATION_PART_4_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 5 (DAY 22): VIBRANT KOTA INTEGRATION PART 5 (50Q High-Yield Rank Sprint)
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_5: ExamPaper = {
  id: 'vibrant-integration-part-5',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 05 (50Q High-Yield Rank Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (INTEGRATION RANK SPRINT - 50 QUESTIONS)',
      questions: [
        ...INTEGRATION_PART_2_QUESTIONS.slice(0, 25).map((q, idx) => ({ ...q, questionNumber: idx + 1, id: `int-p5-q${idx + 1}` })),
        ...INTEGRATION_PART_3_QUESTIONS.slice(25, 50).map((q, idx) => ({ ...q, questionNumber: 25 + idx + 1, id: `int-p5-q${25 + idx + 1}` })),
      ],
    },
  ],
};

// =========================================================================
// TEST 6 (DAY 24): VIBRANT KOTA INTEGRATION PART 6 (50Q IIT Advanced Booster)
// =========================================================================
export const VIBRANT_INTEGRATION_PAPER_6: ExamPaper = {
  id: 'vibrant-integration-part-6',
  title: 'Vibrant Kota Mathematics - Integration CBT Mock Test 06 (50Q IIT Advanced Booster)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (INTEGRATION BOOSTER - 50 QUESTIONS)',
      questions: [
        ...INTEGRATION_PART_1_QUESTIONS.slice(0, 25).map((q, idx) => ({ ...q, questionNumber: idx + 1, id: `int-p6-q${idx + 1}` })),
        ...INTEGRATION_PART_4_QUESTIONS.slice(0, 25).map((q, idx) => ({ ...q, questionNumber: 25 + idx + 1, id: `int-p6-q${25 + idx + 1}` })),
      ],
    },
  ],
};

// =========================================================================
// TEST 7 (DAY 26): COMPLETE INDEFINITE & DEFINITE INTEGRATION 185-QUESTION MASTER ARCHIVE
// =========================================================================
export const VIBRANT_INTEGRATION_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-integration-complete-185',
  title: 'Vibrant Kota Mathematics - Indefinite & Definite Integration Complete Series (185 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 740, // 185 questions * 4 mins
  totalMarks: 740,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE INTEGRATION EXERCISE I, II, III, IV & V)',
      questions: ALL_185_INTEGRATION_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_INTEGRATION_PAPERS: ExamPaper[] = [
  VIBRANT_INTEGRATION_PAPER_1,
  VIBRANT_INTEGRATION_PAPER_2,
  VIBRANT_INTEGRATION_PAPER_3,
  VIBRANT_INTEGRATION_PAPER_4,
  VIBRANT_INTEGRATION_PAPER_5,
  VIBRANT_INTEGRATION_PAPER_6,
  VIBRANT_INTEGRATION_COMPLETE_PAPER,
];

/**
 * Returns strictly locked alternate-day tests for Vibrant Indefinite & Definite Integration (Mathematics)
 * scheduled seamlessly AFTER Vectors & 3-D finishes on Day 12.
 * Math is on EVEN days (Days 14, 16, 18, 20, 22, 24, 26).
 * Final Day 26 test includes ALL 185 questions in a single master archive test!
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantIntegrationLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 14,
      paper: VIBRANT_INTEGRATION_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-int-1-1', subject: 'mathematics' as const, name: 'Standard Indefinite Integrals & ILATE Integration by Parts', completed: false },
        { id: 'syl-int-1-2', subject: 'mathematics' as const, name: 'Euler Substitutions & Algebraic Twin Integrals', completed: false },
        { id: 'syl-int-1-3', subject: 'mathematics' as const, name: 'Partial Fractions of Quadratic & Higher Polynomials', completed: false },
        { id: 'syl-int-1-4', subject: 'mathematics' as const, name: 'Trigonometric Integrals with Secant and Tangent Powers', completed: false },
      ],
    },
    {
      dayNum: 16,
      paper: VIBRANT_INTEGRATION_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-int-2-1', subject: 'mathematics' as const, name: 'Fundamental Theorem of Calculus & King\'s Property P-5', completed: false },
        { id: 'syl-int-2-2', subject: 'mathematics' as const, name: 'Periodic Function Properties P-7, P-8, P-9 & Symmetry', completed: false },
        { id: 'syl-int-2-3', subject: 'mathematics' as const, name: 'Walli\'s Formula & Reduction Relations for Powers of Sin & Cos', completed: false },
        { id: 'syl-int-2-4', subject: 'mathematics' as const, name: 'Definite Integral as Limit of a Riemann Sum', completed: false },
      ],
    },
    {
      dayNum: 18,
      paper: VIBRANT_INTEGRATION_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-int-3-1', subject: 'mathematics' as const, name: 'Differentiation Under the Integral Sign & Leibniz Rule', completed: false },
        { id: 'syl-int-3-2', subject: 'mathematics' as const, name: 'Functional Equations Involving Definite Integrals', completed: false },
        { id: 'syl-int-3-3', subject: 'mathematics' as const, name: 'Estimation of Integrals & Cauchy-Schwarz Inequalities', completed: false },
        { id: 'syl-int-3-4', subject: 'mathematics' as const, name: 'AIEEE & JEE Main Historic Archive (2007–2018)', completed: false },
      ],
    },
    {
      dayNum: 20,
      paper: VIBRANT_INTEGRATION_PAPER_4,
      startTime: '09:00',
      endTime: '11:20',
      durationMinutes: 140, // 35 questions * 4 mins
      totalMarks: 140,
      syllabus: [
        { id: 'syl-int-4-1', subject: 'mathematics' as const, name: 'JEE Advanced Master Archive (2015–2025 Multi-Concept Problems)', completed: false },
        { id: 'syl-int-4-2', subject: 'mathematics' as const, name: 'Integral Equations with Inverse Functions & Squeeze Limits', completed: false },
        { id: 'syl-int-4-3', subject: 'mathematics' as const, name: 'Greatest Integer Function [.] Integrals with Semicircular Regions', completed: false },
      ],
    },
    {
      dayNum: 22,
      paper: VIBRANT_INTEGRATION_PAPER_5,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-int-5-1', subject: 'mathematics' as const, name: 'Integration High-Yield Rank Sprint: Definite Integral Shortcuts', completed: false },
        { id: 'syl-int-5-2', subject: 'mathematics' as const, name: 'Boundary Conditions, Rolle\'s Theorem in Integral Functions', completed: false },
      ],
    },
    {
      dayNum: 24,
      paper: VIBRANT_INTEGRATION_PAPER_6,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-int-6-1', subject: 'mathematics' as const, name: 'IIT Advanced Rank Booster: Multi-Integral Transformations', completed: false },
        { id: 'syl-int-6-2', subject: 'mathematics' as const, name: 'Integral Asymptotic Limits & Taylor Expansions', completed: false },
      ],
    },
    {
      dayNum: 26,
      paper: VIBRANT_INTEGRATION_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '21:20',
      durationMinutes: 740, // 185 questions * 4 mins
      totalMarks: 740,
      syllabus: [
        { id: 'syl-int-7-1', subject: 'mathematics' as const, name: 'Complete Indefinite & Definite Integration Exercise I, II, III, IV & V Grand Revision', completed: false },
        { id: 'syl-int-7-2', subject: 'mathematics' as const, name: 'Comprehensive 185-Question Single Master Archive Speed Test', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-integration-day-${cfg.dayNum}`,
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
