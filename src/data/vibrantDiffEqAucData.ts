import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { DIFF_EQ_AUC_PART_1_QUESTIONS } from './vibrantDiffEqAucPart1.ts';
import { DIFF_EQ_AUC_PART_2_QUESTIONS } from './vibrantDiffEqAucPart2.ts';
import { DIFF_EQ_AUC_PART_3_QUESTIONS } from './vibrantDiffEqAucPart3.ts';
import { DIFF_EQ_AUC_PART_4_QUESTIONS } from './vibrantDiffEqAucPart4.ts';

export const ALL_DIFF_EQ_AUC_QUESTIONS: Question[] = [
  ...DIFF_EQ_AUC_PART_1_QUESTIONS,
  ...DIFF_EQ_AUC_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `deauc-master-${50 + idx + 1}` })),
  ...DIFF_EQ_AUC_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `deauc-master-${100 + idx + 1}` })),
  ...DIFF_EQ_AUC_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: `deauc-master-${150 + idx + 1}` })),
];

export const VIBRANT_DIFF_EQ_AUC_PAPER_1: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-1',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DIFF EQUATION - FORMATION & VARIABLE SEPARABLE)',
      questions: DIFF_EQ_AUC_PART_1_QUESTIONS,
    },
  ],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_2: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-2',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DIFF EQUATION - HOMOGENEOUS & LINEAR DIFFERENTIAL EQUATIONS)',
      questions: DIFF_EQ_AUC_PART_2_QUESTIONS,
    },
  ],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_3: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-3',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 03 (Part 3 - 50Q Advanced AUC)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (AREA UNDER THE CURVE - PARABOLAS, ELLIPSES & SPRINT CURVES)',
      questions: DIFF_EQ_AUC_PART_3_QUESTIONS,
    },
  ],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_4: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-4',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 04 (Part 4 - 50Q JEE Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (JEE ADVANCED RECENT ARCHIVE - DIFFERENTIAL EQUATIONS & AUC)',
      questions: DIFF_EQ_AUC_PART_4_QUESTIONS,
    },
  ],
};

export const VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-diff-eq-auc-complete-200',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area Complete Series (Full Chapter Grand Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 800,
  totalMarks: 800,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VIBRANT DIFF EQ & AREA UNDER CURVE MEGA XII)',
      questions: ALL_DIFF_EQ_AUC_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_DIFF_EQ_AUC_PAPERS: ExamPaper[] = [
  VIBRANT_DIFF_EQ_AUC_PAPER_1,
  VIBRANT_DIFF_EQ_AUC_PAPER_2,
  VIBRANT_DIFF_EQ_AUC_PAPER_3,
  VIBRANT_DIFF_EQ_AUC_PAPER_4,
  VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER,
];

export function getVibrantDiffEqAucLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 44,
      paper: VIBRANT_DIFF_EQ_AUC_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-de-1-1', subject: 'mathematics' as const, name: 'Formation of Differential Equations, Order & Degree Analysis', completed: false },
        { id: 'syl-de-1-2', subject: 'mathematics' as const, name: 'Variables Separable Method & Polar Coordinate Substitutions', completed: false },
      ],
    },
    {
      dayNum: 46,
      paper: VIBRANT_DIFF_EQ_AUC_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-de-2-1', subject: 'mathematics' as const, name: 'Homogeneous Equations & Reducible Transformations', completed: false },
        { id: 'syl-de-2-2', subject: 'mathematics' as const, name: 'First Order Linear Differential Equations (Integrating Factor & Bernoulli)', completed: false },
      ],
    },
    {
      dayNum: 48,
      paper: VIBRANT_DIFF_EQ_AUC_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-de-3-1', subject: 'mathematics' as const, name: 'Area Bounded by Single Curve & Between Two Curves', completed: false },
        { id: 'syl-de-3-2', subject: 'mathematics' as const, name: 'Standard Symmetrical Geometries: Parabola-Line & Parabola-Parabola Enclosures', completed: false },
      ],
    },
    {
      dayNum: 50,
      paper: VIBRANT_DIFF_EQ_AUC_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-de-4-1', subject: 'mathematics' as const, name: 'JEE Advanced Master Problems: Orthogonal Trajectories & Leibniz Integral Integrations', completed: false },
        { id: 'syl-de-4-2', subject: 'mathematics' as const, name: 'Area Optimization & Curve Tracing with Inequalities', completed: false },
      ],
    },
    {
      dayNum: 52,
      paper: VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '22:20',
      durationMinutes: 800,
      totalMarks: 800,
      syllabus: [
        { id: 'syl-de-5-1', subject: 'mathematics' as const, name: 'Complete Vibrant Differential Equations & Area Under Curve Mega XII', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    return {
      id: `locked-vibrant-diffeq-auc-day-${cfg.dayNum}`,
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
