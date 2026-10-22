import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { MATRICES_PART_1_QUESTIONS } from './vibrantMatricesPart1.ts';
import { MATRICES_PART_2_QUESTIONS } from './vibrantMatricesPart2.ts';
import { MATRICES_PART_3_QUESTIONS } from './vibrantMatricesPart3.ts';

export const ALL_MATRICES_QUESTIONS: Question[] = [
  ...MATRICES_PART_1_QUESTIONS,
  ...MATRICES_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `mat-master-${50 + idx + 1}` })),
  ...MATRICES_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `mat-master-${100 + idx + 1}` })),
];

export const VIBRANT_MATRICES_PAPER_1: ExamPaper = {
  id: 'vibrant-matrices-part-1',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (MATRICES PART 1 - OPERATIONS, TYPES & TRANSPOSE)',
      questions: MATRICES_PART_1_QUESTIONS,
    },
  ],
};

export const VIBRANT_MATRICES_PAPER_2: ExamPaper = {
  id: 'vibrant-matrices-part-2',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (MATRICES PART 2 - ADJOINT, INVERSE & SYSTEM OF EQUATIONS)',
      questions: MATRICES_PART_2_QUESTIONS,
    },
  ],
};

export const VIBRANT_MATRICES_PAPER_3: ExamPaper = {
  id: 'vibrant-matrices-part-3',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 03 (Part 3 - 50Q Advanced Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (MATRICES PART 3 - CAYLEY-HAMILTON & JEE ADVANCED ARCHIVE)',
      questions: MATRICES_PART_3_QUESTIONS,
    },
  ],
};

export const VIBRANT_MATRICES_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-matrices-complete-150',
  title: 'Vibrant Kota Mathematics - Matrices Complete Series (Full Chapter Grand Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 600,
  totalMarks: 600,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VIBRANT MATRICES MEGA XII)',
      questions: ALL_MATRICES_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_MATRICES_PAPERS: ExamPaper[] = [
  VIBRANT_MATRICES_PAPER_1,
  VIBRANT_MATRICES_PAPER_2,
  VIBRANT_MATRICES_PAPER_3,
  VIBRANT_MATRICES_COMPLETE_PAPER,
];

export function getVibrantMatricesLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 28,
      paper: VIBRANT_MATRICES_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mat-1-1', subject: 'mathematics' as const, name: 'Types of Matrices (Symmetric, Skew-Symmetric, Orthogonal & Idempotent)', completed: false },
        { id: 'syl-mat-1-2', subject: 'mathematics' as const, name: 'Matrix Multiplication, Associativity & Non-Commutative Properties', completed: false },
      ],
    },
    {
      dayNum: 30,
      paper: VIBRANT_MATRICES_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mat-2-1', subject: 'mathematics' as const, name: 'Adjoint of a Matrix, Invertibility Criteria & Reversal Laws', completed: false },
        { id: 'syl-mat-2-2', subject: 'mathematics' as const, name: 'Matrix Equations & System of Linear Equations Consistency', completed: false },
      ],
    },
    {
      dayNum: 32,
      paper: VIBRANT_MATRICES_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mat-3-1', subject: 'mathematics' as const, name: 'Characteristic Equations, Nilpotent Matrices & Trace Theorems', completed: false },
        { id: 'syl-mat-3-2', subject: 'mathematics' as const, name: 'JEE Advanced Master Problems: Higher Power Polynomials & Eigen-values', completed: false },
      ],
    },
    {
      dayNum: 34,
      paper: VIBRANT_MATRICES_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '19:00',
      durationMinutes: 600,
      totalMarks: 600,
      syllabus: [
        { id: 'syl-mat-4-1', subject: 'mathematics' as const, name: 'Complete Vibrant Kota Matrices Mega XII Series (All Questions)', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    return {
      id: `locked-vibrant-matrices-day-${cfg.dayNum}`,
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
