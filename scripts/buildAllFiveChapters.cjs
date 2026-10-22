const fs = require('fs');
const path = require('path');
const { extractPdfText, extractQuestionsFromPdfText } = require('./chapterExtractor.cjs');
const { writeQuestionsFile } = require('./generateHelpers.cjs');

async function buildAll() {
  console.log('--- Starting Generation of 5 New Kota Mathematics Chapters ---');

  // ==========================================
  // CHAPTER 1: MATRICES
  // ==========================================
  console.log('\n[1/5] Processing Matrices...');
  const mText = await extractPdfText('Matrices_Mega_XII_457f438e.pdf');
  const mAllQs = extractQuestionsFromPdfText(mText, 'mat');
  console.log(`Extracted ${mAllQs.length} questions for Matrices`);

  const mPart1 = mAllQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const mPart2 = mAllQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const mPart3 = mAllQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

  writeQuestionsFile('src/data/vibrantMatricesPart1.ts', 'MATRICES_PART_1_QUESTIONS', mPart1);
  writeQuestionsFile('src/data/vibrantMatricesPart2.ts', 'MATRICES_PART_2_QUESTIONS', mPart2);
  writeQuestionsFile('src/data/vibrantMatricesPart3.ts', 'MATRICES_PART_3_QUESTIONS', mPart3);

  const matricesDataContent = `import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { MATRICES_PART_1_QUESTIONS } from './vibrantMatricesPart1.ts';
import { MATRICES_PART_2_QUESTIONS } from './vibrantMatricesPart2.ts';
import { MATRICES_PART_3_QUESTIONS } from './vibrantMatricesPart3.ts';

export const ALL_MATRICES_QUESTIONS: Question[] = [
  ...MATRICES_PART_1_QUESTIONS,
  ...MATRICES_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`mat-master-\${50 + idx + 1}\` })),
  ...MATRICES_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`mat-master-\${100 + idx + 1}\` })),
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

export function getVibrantMatricesLockedTests(baseDateStr: string = '2026-10-18'): ScheduledTest[] {
  const d = new Date(baseDateStr);
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
      id: \`locked-vibrant-matrices-day-\${cfg.dayNum}\`,
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
`;
  fs.writeFileSync('src/data/vibrantMatricesData.ts', matricesDataContent, 'utf8');
  console.log('Generated vibrantMatricesData.ts');

  // ==========================================
  // CHAPTER 2: DETERMINANT
  // ==========================================
  console.log('\n[2/5] Processing Determinant...');
  const dText = await extractPdfText('Determinant_Mega_XII_1065da12.pdf');
  const dAllQs = extractQuestionsFromPdfText(dText, 'det');
  console.log(`Extracted ${dAllQs.length} questions for Determinant`);

  const dPart1 = dAllQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const dPart2 = dAllQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const dPart3 = dAllQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

  writeQuestionsFile('src/data/vibrantDeterminantPart1.ts', 'DETERMINANT_PART_1_QUESTIONS', dPart1);
  writeQuestionsFile('src/data/vibrantDeterminantPart2.ts', 'DETERMINANT_PART_2_QUESTIONS', dPart2);
  writeQuestionsFile('src/data/vibrantDeterminantPart3.ts', 'DETERMINANT_PART_3_QUESTIONS', dPart3);

  const determinantDataContent = `import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { DETERMINANT_PART_1_QUESTIONS } from './vibrantDeterminantPart1.ts';
import { DETERMINANT_PART_2_QUESTIONS } from './vibrantDeterminantPart2.ts';
import { DETERMINANT_PART_3_QUESTIONS } from './vibrantDeterminantPart3.ts';

export const ALL_DETERMINANT_QUESTIONS: Question[] = [
  ...DETERMINANT_PART_1_QUESTIONS,
  ...DETERMINANT_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`det-master-\${50 + idx + 1}\` })),
  ...DETERMINANT_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`det-master-\${100 + idx + 1}\` })),
];

export const VIBRANT_DETERMINANT_PAPER_1: ExamPaper = {
  id: 'vibrant-determinant-part-1',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DETERMINANT PART 1 - EXPANSION & ROW/COLUMN PROPERTIES)',
      questions: DETERMINANT_PART_1_QUESTIONS,
    },
  ],
};

export const VIBRANT_DETERMINANT_PAPER_2: ExamPaper = {
  id: 'vibrant-determinant-part-2',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DETERMINANT PART 2 - MULTIPLICATION OF DETERMINANTS & CRAMERS RULE)',
      questions: DETERMINANT_PART_2_QUESTIONS,
    },
  ],
};

export const VIBRANT_DETERMINANT_PAPER_3: ExamPaper = {
  id: 'vibrant-determinant-part-3',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 03 (Part 3 - 50Q Advanced Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DETERMINANT PART 3 - CONSISTENCY, HOMOGENEOUS SYSTEMS & ADVANCED)',
      questions: DETERMINANT_PART_3_QUESTIONS,
    },
  ],
};

export const VIBRANT_DETERMINANT_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-determinant-complete-140',
  title: 'Vibrant Kota Mathematics - Determinant Complete Series (Full Chapter Grand Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 560,
  totalMarks: 560,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VIBRANT DETERMINANT MEGA XII)',
      questions: ALL_DETERMINANT_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_DETERMINANT_PAPERS: ExamPaper[] = [
  VIBRANT_DETERMINANT_PAPER_1,
  VIBRANT_DETERMINANT_PAPER_2,
  VIBRANT_DETERMINANT_PAPER_3,
  VIBRANT_DETERMINANT_COMPLETE_PAPER,
];

export function getVibrantDeterminantLockedTests(baseDateStr: string = '2026-10-18'): ScheduledTest[] {
  const d = new Date(baseDateStr);
  const formatIso = (date: Date) => date.toISOString().split('T')[0];

  const testsConfig = [
    {
      dayNum: 36,
      paper: VIBRANT_DETERMINANT_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-det-1-1', subject: 'mathematics' as const, name: 'Determinant Properties, Cyclic & Symmetric Determinants', completed: false },
        { id: 'syl-det-1-2', subject: 'mathematics' as const, name: 'Minors & Cofactors Expansion Techniques', completed: false },
      ],
    },
    {
      dayNum: 38,
      paper: VIBRANT_DETERMINANT_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-det-2-1', subject: 'mathematics' as const, name: 'Multiplication of Determinants & Determinant of Cofactor Matrix', completed: false },
        { id: 'syl-det-2-2', subject: 'mathematics' as const, name: 'Cramers Rule for 3 Unknowns & Parallel Plane Conditions', completed: false },
      ],
    },
    {
      dayNum: 40,
      paper: VIBRANT_DETERMINANT_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-det-3-1', subject: 'mathematics' as const, name: 'Non-Trivial & Trivial Solutions of Homogeneous Linear Systems', completed: false },
        { id: 'syl-det-3-2', subject: 'mathematics' as const, name: 'JEE Advanced Master Questions & Geometric Area Applications', completed: false },
      ],
    },
    {
      dayNum: 42,
      paper: VIBRANT_DETERMINANT_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '18:20',
      durationMinutes: 560,
      totalMarks: 560,
      syllabus: [
        { id: 'syl-det-4-1', subject: 'mathematics' as const, name: 'Complete Vibrant Kota Determinant Mega XII Series (All Questions)', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    return {
      id: \`locked-vibrant-determinant-day-\${cfg.dayNum}\`,
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
`;
  fs.writeFileSync('src/data/vibrantDeterminantData.ts', determinantDataContent, 'utf8');
  console.log('Generated vibrantDeterminantData.ts');

  // ==========================================
  // CHAPTER 3: DIFFERENTIAL EQUATION & AREA UNDER THE CURVE
  // ==========================================
  console.log('\n[3/5] Processing Differential Equation & Area Under Curve...');
  const deText = await extractPdfText('Differential_Equation___area_under_the_curve_Mega_XII_8a27183b.pdf');
  const deAllQs = extractQuestionsFromPdfText(deText, 'de-auc');
  console.log(`Extracted ${deAllQs.length} questions for Differential Equation & Area Under Curve`);

  const dePart1 = deAllQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const dePart2 = deAllQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const dePart3 = deAllQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const dePart4 = deAllQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

  writeQuestionsFile('src/data/vibrantDiffEqAucPart1.ts', 'DIFF_EQ_AUC_PART_1_QUESTIONS', dePart1);
  writeQuestionsFile('src/data/vibrantDiffEqAucPart2.ts', 'DIFF_EQ_AUC_PART_2_QUESTIONS', dePart2);
  writeQuestionsFile('src/data/vibrantDiffEqAucPart3.ts', 'DIFF_EQ_AUC_PART_3_QUESTIONS', dePart3);
  writeQuestionsFile('src/data/vibrantDiffEqAucPart4.ts', 'DIFF_EQ_AUC_PART_4_QUESTIONS', dePart4);

  const diffEqAucDataContent = `import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { DIFF_EQ_AUC_PART_1_QUESTIONS } from './vibrantDiffEqAucPart1.ts';
import { DIFF_EQ_AUC_PART_2_QUESTIONS } from './vibrantDiffEqAucPart2.ts';
import { DIFF_EQ_AUC_PART_3_QUESTIONS } from './vibrantDiffEqAucPart3.ts';
import { DIFF_EQ_AUC_PART_4_QUESTIONS } from './vibrantDiffEqAucPart4.ts';

export const ALL_DIFF_EQ_AUC_QUESTIONS: Question[] = [
  ...DIFF_EQ_AUC_PART_1_QUESTIONS,
  ...DIFF_EQ_AUC_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`deauc-master-\${50 + idx + 1}\` })),
  ...DIFF_EQ_AUC_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`deauc-master-\${100 + idx + 1}\` })),
  ...DIFF_EQ_AUC_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: \`deauc-master-\${150 + idx + 1}\` })),
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

export function getVibrantDiffEqAucLockedTests(baseDateStr: string = '2026-10-18'): ScheduledTest[] {
  const d = new Date(baseDateStr);
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
      id: \`locked-vibrant-diffeq-auc-day-\${cfg.dayNum}\`,
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
`;
  fs.writeFileSync('src/data/vibrantDiffEqAucData.ts', diffEqAucDataContent, 'utf8');
  console.log('Generated vibrantDiffEqAucData.ts');

  // ==========================================
  // CHAPTER 4: LIMIT, CONTINUITY & DIFFERENTIABILITY
  // ==========================================
  console.log('\n[4/5] Processing Limit, Continuity & Differentiability...');
  const lcdText = await extractPdfText('limit__ContInuity___Differentiability_Mega_XII._829dfe79.pdf');
  const lcdAllQs = extractQuestionsFromPdfText(lcdText, 'lcd');
  console.log(`Extracted ${lcdAllQs.length} questions for LCD`);

  const lcdPart1 = lcdAllQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const lcdPart2 = lcdAllQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const lcdPart3 = lcdAllQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const lcdPart4 = lcdAllQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const lcdPart5 = lcdAllQs.slice(200, 250).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

  writeQuestionsFile('src/data/vibrantLimitContDiffPart1.ts', 'LIMIT_CONT_DIFF_PART_1_QUESTIONS', lcdPart1);
  writeQuestionsFile('src/data/vibrantLimitContDiffPart2.ts', 'LIMIT_CONT_DIFF_PART_2_QUESTIONS', lcdPart2);
  writeQuestionsFile('src/data/vibrantLimitContDiffPart3.ts', 'LIMIT_CONT_DIFF_PART_3_QUESTIONS', lcdPart3);
  writeQuestionsFile('src/data/vibrantLimitContDiffPart4.ts', 'LIMIT_CONT_DIFF_PART_4_QUESTIONS', lcdPart4);
  writeQuestionsFile('src/data/vibrantLimitContDiffPart5.ts', 'LIMIT_CONT_DIFF_PART_5_QUESTIONS', lcdPart5);

  const lcdDataContent = `import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { LIMIT_CONT_DIFF_PART_1_QUESTIONS } from './vibrantLimitContDiffPart1.ts';
import { LIMIT_CONT_DIFF_PART_2_QUESTIONS } from './vibrantLimitContDiffPart2.ts';
import { LIMIT_CONT_DIFF_PART_3_QUESTIONS } from './vibrantLimitContDiffPart3.ts';
import { LIMIT_CONT_DIFF_PART_4_QUESTIONS } from './vibrantLimitContDiffPart4.ts';
import { LIMIT_CONT_DIFF_PART_5_QUESTIONS } from './vibrantLimitContDiffPart5.ts';

export const ALL_LIMIT_CONT_DIFF_QUESTIONS: Question[] = [
  ...LIMIT_CONT_DIFF_PART_1_QUESTIONS,
  ...LIMIT_CONT_DIFF_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`lcd-master-\${50 + idx + 1}\` })),
  ...LIMIT_CONT_DIFF_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`lcd-master-\${100 + idx + 1}\` })),
  ...LIMIT_CONT_DIFF_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: \`lcd-master-\${150 + idx + 1}\` })),
  ...LIMIT_CONT_DIFF_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1, id: \`lcd-master-\${200 + idx + 1}\` })),
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

export function getVibrantLimitContDiffLockedTests(baseDateStr: string = '2026-10-18'): ScheduledTest[] {
  const d = new Date(baseDateStr);
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
      id: \`locked-vibrant-lcd-day-\${cfg.dayNum}\`,
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
`;
  fs.writeFileSync('src/data/vibrantLimitContDiffData.ts', lcdDataContent, 'utf8');
  console.log('Generated vibrantLimitContDiffData.ts');

  // ==========================================
  // CHAPTER 5: BINOMIAL THEOREM
  // ==========================================
  console.log('\n[5/5] Processing Binomial Theorem...');
  const bText = await extractPdfText('BINOMIAL_MICRO_XI_5933465d.pdf');
  const bAllQs = extractQuestionsFromPdfText(bText, 'bin');
  console.log(`Extracted ${bAllQs.length} questions for Binomial Theorem`);

  const bPart1 = bAllQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const bPart2 = bAllQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
  const bPart3 = bAllQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

  writeQuestionsFile('src/data/vibrantBinomialPart1.ts', 'BINOMIAL_PART_1_QUESTIONS', bPart1);
  writeQuestionsFile('src/data/vibrantBinomialPart2.ts', 'BINOMIAL_PART_2_QUESTIONS', bPart2);
  writeQuestionsFile('src/data/vibrantBinomialPart3.ts', 'BINOMIAL_PART_3_QUESTIONS', bPart3);

  const binomialDataContent = `import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { BINOMIAL_PART_1_QUESTIONS } from './vibrantBinomialPart1.ts';
import { BINOMIAL_PART_2_QUESTIONS } from './vibrantBinomialPart2.ts';
import { BINOMIAL_PART_3_QUESTIONS } from './vibrantBinomialPart3.ts';

export const ALL_BINOMIAL_QUESTIONS: Question[] = [
  ...BINOMIAL_PART_1_QUESTIONS,
  ...BINOMIAL_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`bin-master-\${50 + idx + 1}\` })),
  ...BINOMIAL_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`bin-master-\${100 + idx + 1}\` })),
];

export const VIBRANT_BINOMIAL_PAPER_1: ExamPaper = {
  id: 'vibrant-binomial-part-1',
  title: 'Vibrant Kota Mathematics - Binomial Theorem CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (BINOMIAL THEOREM PART 1 - GENERAL TERM, MIDDLE TERM & COEFFS)',
      questions: BINOMIAL_PART_1_QUESTIONS,
    },
  ],
};

export const VIBRANT_BINOMIAL_PAPER_2: ExamPaper = {
  id: 'vibrant-binomial-part-2',
  title: 'Vibrant Kota Mathematics - Binomial Theorem CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (BINOMIAL THEOREM PART 2 - SERIES OF COEFFICIENTS & REMAINDERS)',
      questions: BINOMIAL_PART_2_QUESTIONS,
    },
  ],
};

export const VIBRANT_BINOMIAL_PAPER_3: ExamPaper = {
  id: 'vibrant-binomial-part-3',
  title: 'Vibrant Kota Mathematics - Binomial Theorem CBT Mock Test 03 (Part 3 - 50Q JEE Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (BINOMIAL THEOREM PART 3 - MULTINOMIAL & JEE ADVANCED ARCHIVE)',
      questions: BINOMIAL_PART_3_QUESTIONS,
    },
  ],
};

export const VIBRANT_BINOMIAL_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-binomial-complete-130',
  title: 'Vibrant Kota Mathematics - Binomial Theorem Complete Series (Full Chapter Grand Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 520,
  totalMarks: 520,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (COMPLETE VIBRANT BINOMIAL THEOREM MICRO XI)',
      questions: ALL_BINOMIAL_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_BINOMIAL_PAPERS: ExamPaper[] = [
  VIBRANT_BINOMIAL_PAPER_1,
  VIBRANT_BINOMIAL_PAPER_2,
  VIBRANT_BINOMIAL_PAPER_3,
  VIBRANT_BINOMIAL_COMPLETE_PAPER,
];

export function getVibrantBinomialLockedTests(baseDateStr: string = '2026-10-18'): ScheduledTest[] {
  const d = new Date(baseDateStr);
  const formatIso = (date: Date) => date.toISOString().split('T')[0];

  const testsConfig = [
    {
      dayNum: 66,
      paper: VIBRANT_BINOMIAL_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-bin-1-1', subject: 'mathematics' as const, name: 'General Term Tr+1, Middle Term & Numerically Greatest Term', completed: false },
        { id: 'syl-bin-1-2', subject: 'mathematics' as const, name: 'Term Independent of x & Rational Terms in Radical Expansions', completed: false },
      ],
    },
    {
      dayNum: 68,
      paper: VIBRANT_BINOMIAL_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-bin-2-1', subject: 'mathematics' as const, name: 'Sum of Binomial Coefficients, Alternating Sums & Index Equations', completed: false },
        { id: 'syl-bin-2-2', subject: 'mathematics' as const, name: 'Divisibility & Last Digits Problems via Binomial Theorem', completed: false },
      ],
    },
    {
      dayNum: 70,
      paper: VIBRANT_BINOMIAL_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-bin-3-1', subject: 'mathematics' as const, name: 'Negative and Fractional Indices Series Expansion (|x| < 1)', completed: false },
        { id: 'syl-bin-3-2', subject: 'mathematics' as const, name: 'Multinomial Theorem & JEE Advanced Master Archive', completed: false },
      ],
    },
    {
      dayNum: 72,
      paper: VIBRANT_BINOMIAL_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '17:40',
      durationMinutes: 520,
      totalMarks: 520,
      syllabus: [
        { id: 'syl-bin-4-1', subject: 'mathematics' as const, name: 'Complete Vibrant Binomial Theorem Micro XI (All Questions)', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    return {
      id: \`locked-vibrant-binomial-day-\${cfg.dayNum}\`,
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
`;
  fs.writeFileSync('src/data/vibrantBinomialData.ts', binomialDataContent, 'utf8');
  console.log('Generated vibrantBinomialData.ts');

  console.log('\n--- All 5 Chapter Question Parts & Data Modules Generated Successfully! ---');
}

buildAll().catch(console.error);
