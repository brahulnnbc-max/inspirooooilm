import { ExamPaper } from '../types/exam.ts';
import {
  ELECTROSTATICS_PART_1_QUESTIONS,
} from './vibrantElectrostaticsData.ts';
import { ELECTROSTATICS_PART_2_QUESTIONS } from './vibrantElectrostaticsPart2.ts';
import { ELECTROSTATICS_PART_3_QUESTIONS } from './vibrantElectrostaticsPart3.ts';
import { ELECTROSTATICS_PART_4_QUESTIONS } from './vibrantElectrostaticsPart4.ts';
import { ELECTROSTATICS_PART_5_QUESTIONS } from './vibrantElectrostaticsPart5.ts';
import { ELECTROSTATICS_PART_6_QUESTIONS } from './vibrantElectrostaticsPart6.ts';

import { ALL_88_KINEMATICS_QUESTIONS } from './vibrantKinematicsData.ts';
import { ALL_229_OPTICS_QUESTIONS } from './vibrantGeometricalOpticsData.ts';
import { ALL_243_MODERN_PHYSICS_QUESTIONS } from './vibrantModernPhysicsData.ts';
import { ALL_224_CURRENT_ELECTRICITY_QUESTIONS } from './vibrantCurrentElectricityData.ts';
import { ALL_113_VECTORS_3D_QUESTIONS } from './vibrantVectors3DData.ts';
import { ALL_185_INTEGRATION_QUESTIONS } from './vibrantIntegrationData.ts';

import { ALL_MATRICES_QUESTIONS } from './vibrantMatricesData.ts';
import { ALL_DETERMINANT_QUESTIONS } from './vibrantDeterminantData.ts';
import { ALL_DIFF_EQ_AUC_QUESTIONS } from './vibrantDiffEqAucData.ts';
import { ALL_LIMIT_CONT_DIFF_QUESTIONS } from './vibrantLimitContDiffData.ts';
import { ALL_BINOMIAL_QUESTIONS } from './vibrantBinomialData.ts';

// 1. ELECTROSTATICS MARATHON (265 Qs)
const ALL_ELECTROSTATICS_QS = [
  ...ELECTROSTATICS_PART_1_QUESTIONS,
  ...ELECTROSTATICS_PART_2_QUESTIONS,
  ...ELECTROSTATICS_PART_3_QUESTIONS,
  ...ELECTROSTATICS_PART_4_QUESTIONS,
  ...ELECTROSTATICS_PART_5_QUESTIONS,
  ...ELECTROSTATICS_PART_6_QUESTIONS,
];

export const VIBRANT_ELECTROSTATICS_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-electrostatics',
  title: 'Vibrant Kota Physics • Electrostatics Complete Chapter Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_ELECTROSTATICS_QS.length * 4, // 4 mins per question = 1060 mins
  totalMarks: ALL_ELECTROSTATICS_QS.length * 4,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (COMPLETE ELECTROSTATICS MODULE ARCHIVE)',
      questions: ALL_ELECTROSTATICS_QS,
    },
  ],
};

// 2. KINEMATICS MARATHON (75 Qs)
export const VIBRANT_KINEMATICS_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-kinematics',
  title: 'Allen Kota Physics • Kinematics 1D & 2D Complete Module Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_88_KINEMATICS_QUESTIONS.length * 4,
  totalMarks: ALL_88_KINEMATICS_QUESTIONS.length * 4,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (KINEMATICS EXERCISE 1 & 2 COMPLETE)',
      questions: ALL_88_KINEMATICS_QUESTIONS,
    },
  ],
};

// 3. GEOMETRICAL OPTICS MARATHON (229 Qs)
export const VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-geometrical-optics',
  title: 'Vibrant Kota Physics • Geometrical Optics Complete Chapter Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_229_OPTICS_QUESTIONS.length * 4,
  totalMarks: ALL_229_OPTICS_QUESTIONS.length * 4,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (GEOMETRICAL OPTICS COMPLETE ARCHIVE)',
      questions: ALL_229_OPTICS_QUESTIONS,
    },
  ],
};

// 4. MODERN PHYSICS MARATHON (243 Qs)
export const VIBRANT_MODERN_PHYSICS_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-modern-physics',
  title: 'Vibrant Kota Physics • Modern Physics Complete Chapter Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_243_MODERN_PHYSICS_QUESTIONS.length * 4,
  totalMarks: ALL_243_MODERN_PHYSICS_QUESTIONS.length * 4,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS COMPLETE 243Q ARCHIVE)',
      questions: ALL_243_MODERN_PHYSICS_QUESTIONS,
    },
  ],
};

// 5. CURRENT ELECTRICITY MARATHON (224 Qs)
export const VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-current-electricity',
  title: 'Vibrant Kota Physics • Current Electricity Complete Chapter Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_224_CURRENT_ELECTRICITY_QUESTIONS.length * 4,
  totalMarks: ALL_224_CURRENT_ELECTRICITY_QUESTIONS.length * 4,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY COMPLETE 224Q ARCHIVE)',
      questions: ALL_224_CURRENT_ELECTRICITY_QUESTIONS,
    },
  ],
};

// 6. VECTORS & 3-D MARATHON (113 Qs)
export const VIBRANT_VECTORS_3D_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-vectors-3d',
  title: 'Vibrant Kota Mathematics • Vectors & 3-D Complete Chapter Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_113_VECTORS_3D_QUESTIONS.length * 4,
  totalMarks: ALL_113_VECTORS_3D_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (VECTORS & 3-D GEOMETRY COMPLETE)',
      questions: ALL_113_VECTORS_3D_QUESTIONS,
    },
  ],
};

// 7. INTEGRATION MARATHON (185 Qs)
export const VIBRANT_INTEGRATION_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-integration',
  title: 'Vibrant Kota Mathematics • Indefinite & Definite Integration Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_185_INTEGRATION_QUESTIONS.length * 4,
  totalMarks: ALL_185_INTEGRATION_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (INTEGRATION COMPLETE ARCHIVE)',
      questions: ALL_185_INTEGRATION_QUESTIONS,
    },
  ],
};

// 8. MATRICES MARATHON (146 Qs)
export const VIBRANT_MATRICES_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-matrices',
  title: 'Vibrant Kota Mathematics • Matrices Mega XII Complete Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_MATRICES_QUESTIONS.length * 4, // 584 mins
  totalMarks: ALL_MATRICES_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (MATRICES COMPLETE 146Q MODULE ARCHIVE)',
      questions: ALL_MATRICES_QUESTIONS,
    },
  ],
};

// 9. DETERMINANT MARATHON (132 Qs)
export const VIBRANT_DETERMINANT_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-determinant',
  title: 'Vibrant Kota Mathematics • Determinant Mega XII Complete Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_DETERMINANT_QUESTIONS.length * 4, // 528 mins
  totalMarks: ALL_DETERMINANT_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DETERMINANTS COMPLETE 132Q MODULE ARCHIVE)',
      questions: ALL_DETERMINANT_QUESTIONS,
    },
  ],
};

// 10. DIFF EQ & AUC MARATHON (200 Qs)
export const VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-diffeq-auc',
  title: 'Vibrant Kota Mathematics • Differential Equation & AUC Complete Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_DIFF_EQ_AUC_QUESTIONS.length * 4, // 800 mins
  totalMarks: ALL_DIFF_EQ_AUC_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (DIFF EQ & AREA UNDER CURVE COMPLETE 200Q ARCHIVE)',
      questions: ALL_DIFF_EQ_AUC_QUESTIONS,
    },
  ],
};

// 11. LIMIT, CONTINUITY & DIFFERENTIABILITY MARATHON (237 Qs)
export const VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-lcd',
  title: 'Vibrant Kota Mathematics • Limit, Continuity & Diff Complete Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_LIMIT_CONT_DIFF_QUESTIONS.length * 4, // 948 mins
  totalMarks: ALL_LIMIT_CONT_DIFF_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (LIMITS, CONTINUITY & DIFFERENTIABILITY COMPLETE ARCHIVE)',
      questions: ALL_LIMIT_CONT_DIFF_QUESTIONS,
    },
  ],
};

// 12. BINOMIAL THEOREM MARATHON (108 Qs)
export const VIBRANT_BINOMIAL_MARATHON_PAPER: ExamPaper = {
  id: 'module-marathon-binomial',
  title: 'Vibrant Kota Mathematics • Binomial Theorem Micro XI Complete Marathon',
  pattern: 'JEE_MAIN',
  durationMinutes: ALL_BINOMIAL_QUESTIONS.length * 4, // 432 mins
  totalMarks: ALL_BINOMIAL_QUESTIONS.length * 4,
  sections: [
    {
      id: 'mathematics',
      name: 'MATHEMATICS (BINOMIAL THEOREM COMPLETE 108Q ARCHIVE)',
      questions: ALL_BINOMIAL_QUESTIONS,
    },
  ],
};

export const ALL_MODULE_MARATHON_PAPERS: ExamPaper[] = [
  VIBRANT_ELECTROSTATICS_MARATHON_PAPER,
  VIBRANT_KINEMATICS_MARATHON_PAPER,
  VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER,
  VIBRANT_MODERN_PHYSICS_MARATHON_PAPER,
  VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER,
  VIBRANT_VECTORS_3D_MARATHON_PAPER,
  VIBRANT_INTEGRATION_MARATHON_PAPER,
  VIBRANT_MATRICES_MARATHON_PAPER,
  VIBRANT_DETERMINANT_MARATHON_PAPER,
  VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER,
  VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER,
  VIBRANT_BINOMIAL_MARATHON_PAPER,
];
