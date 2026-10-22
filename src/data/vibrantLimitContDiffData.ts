import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { LIMIT_CONT_DIFF_PART_1_QUESTIONS } from './vibrantLimitContDiffPart1.ts';
import { LIMIT_CONT_DIFF_PART_2_QUESTIONS } from './vibrantLimitContDiffPart2.ts';
import { LIMIT_CONT_DIFF_PART_3_QUESTIONS } from './vibrantLimitContDiffPart3.ts';
import { LIMIT_CONT_DIFF_PART_4_QUESTIONS } from './vibrantLimitContDiffPart4.ts';
import { LIMIT_CONT_DIFF_PART_5_QUESTIONS } from './vibrantLimitContDiffPart5.ts';

export const ALL_LIMIT_CONT_DIFF_QUESTIONS: Question[] = [
  ...LIMIT_CONT_DIFF_PART_1_QUESTIONS,
  ...LIMIT_CONT_DIFF_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `lcd-master-${50 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `lcd-master-${100 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: `lcd-master-${150 + idx + 1}` })),
  ...LIMIT_CONT_DIFF_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1, id: `lcd-master-${200 + idx + 1}` })),
];

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_1: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-1',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 01 (Part 1 - 50Q Limits Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (LIMITS PART 1 - ALGEBRAIC, TRIGONOMETRIC & EXPANSIONS)',
      questions: LIMIT_CONT_DIFF_PART_1_QUESTIONS,
    },
  ],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_2: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-2',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 02 (Part 2 - 50Q Limits Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (LIMITS PART 2 - 1^INFINITY FORMS & SANDWICH THEOREM)',
      questions: LIMIT_CONT_DIFF_PART_2_QUESTIONS,
    },
  ],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_3: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-3',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 03 (Part 3 - 50Q Continuity Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (CONTINUITY - TYPES OF DISCONTINUITY & INTERMEDIATE VALUE THEOREM)',
      questions: LIMIT_CONT_DIFF_PART_3_QUESTIONS,
    },
  ],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_4: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-4',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 04 (Part 4 - 50Q Differentiability Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DIFFERENTIABILITY - RHD, LHD & FUNCTIONAL DERIVABILITY)',
      questions: LIMIT_CONT_DIFF_PART_4_QUESTIONS,
    },
  ],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_5: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-5',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 05 (Part 5 - 50Q JEE Advanced Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (JEE ADVANCED RECENT ARCHIVE - LIMIT, CONTINUITY & DIFFERENTIABILITY)',
      questions: LIMIT_CONT_DIFF_PART_5_QUESTIONS,
    },
  ],
};

export const VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-limit-cont-diff-complete-250',
  title: 'Vibrant Kota Mathematics - LCD Complete Series (Full Chapter Grand Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 1000,
  totalMarks: 1000,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VIBRANT LIMIT, CONTINUITY & DIFFERENTIABILITY MEGA XII)',
      questions: ALL_LIMIT_CONT_DIFF_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_LIMIT_CONT_DIFF_PAPERS: ExamPaper[] = [
  VIBRANT_LIMIT_CONT_DIFF_PAPER_1,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_2,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_3,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_4,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_5,
  VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER,
];

export function getVibrantLimitContDiffLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date();
  if (!baseDateStr) {
    d.setDate(d.getDate() + 1);
  } else {
    const parsed = new Date(baseDateStr);
    if (!isNaN(parsed.getTime())) {
      d.setTime(parsed.getTime());
    }
  }
  const formatIso = (date: Date) => date.toISOString().split('T')[0];

  const testsConfig = [
    {
      dayNum: 54,
      paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-lcd-1-1', subject: 'mathematics' as const, name: 'Indeterminate Forms 0/0 and inf/inf & Standard Limits', completed: false },
        { id: 'syl-lcd-1-2', subject: 'mathematics' as const, name: 'Maclaurin & Taylor Series Expansions for Fast Limits', completed: false },
      ],
    },
    {
      dayNum: 56,
      paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-lcd-2-1', subject: 'mathematics' as const, name: '1^Infinity Form Exponential Transformations & Squeeze Play Theorem', completed: false },
        { id: 'syl-lcd-2-2', subject: 'mathematics' as const, name: 'Telescoping Product Limits & Infinite Series Summation via Limits', completed: false },
      ],
    },
    {
      dayNum: 58,
      paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-lcd-3-1', subject: 'mathematics' as const, name: 'Types of Discontinuities (Removable, Jump, Infinite & Oscillatory)', completed: false },
        { id: 'syl-lcd-3-2', subject: 'mathematics' as const, name: 'Continuity in Intervals & Intermediate Value Theorem Root Finding', completed: false },
      ],
    },
    {
      dayNum: 60,
      paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-lcd-4-1', subject: 'mathematics' as const, name: 'Right & Left Hand Derivatives & Geometrical Tangent Interpretation', completed: false },
        { id: 'syl-lcd-4-2', subject: 'mathematics' as const, name: 'Derivability of Piecewise & Composite Functions [f(x)], {f(x)}, |f(x)|', completed: false },
      ],
    },
    {
      dayNum: 62,
      paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_5,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-lcd-5-1', subject: 'mathematics' as const, name: 'JEE Advanced Master Questions: Functional Equations & Non-Differentiability Sets', completed: false },
      ],
    },
    {
      dayNum: 64,
      paper: VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '23:59',
      durationMinutes: 1000,
      totalMarks: 1000,
      syllabus: [
        { id: 'syl-lcd-6-1', subject: 'mathematics' as const, name: 'Complete Vibrant Limit, Continuity & Differentiability Mega XII (All Questions)', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    return {
      id: `locked-vibrant-lcd-day-${cfg.dayNum}`,
      title: cfg.paper.title,
      pattern: 'JEE_MAIN' as const,
      scheduledDate: formatIso(testDate),
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
