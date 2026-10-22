import { ScheduledTest, DailyRoutineItem, TaggedQuestionEntry, ExamPaper, SyllabusTopic } from '../types/exam';
import { SAMPLE_JEE_MAIN_MOCK } from './samplePapers';

// Physics Papers
import {
  VIBRANT_KINEMATICS_PAPER_1,
  VIBRANT_KINEMATICS_PAPER_2,
  VIBRANT_KINEMATICS_COMPLETE_PAPER,
} from './vibrantKinematicsData';
import {
  VIBRANT_ELECTROSTATICS_PAPER_1,
  VIBRANT_ELECTROSTATICS_PAPER_2,
  VIBRANT_ELECTROSTATICS_PAPER_3,
  VIBRANT_ELECTROSTATICS_PAPER_4,
  VIBRANT_ELECTROSTATICS_PAPER_5,
  VIBRANT_ELECTROSTATICS_PAPER_6,
} from './vibrantElectrostaticsData';
import {
  VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_2,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_3,
  VIBRANT_CURRENT_ELECTRICITY_COMPLETE_PAPER,
} from './vibrantCurrentElectricityData';
import {
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_1,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_2,
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_3,
  VIBRANT_GEOMETRICAL_OPTICS_COMPLETE_PAPER,
} from './vibrantGeometricalOpticsData';
import {
  VIBRANT_MODERN_PHYSICS_PAPER_1,
  VIBRANT_MODERN_PHYSICS_PAPER_2,
  VIBRANT_MODERN_PHYSICS_PAPER_3,
  VIBRANT_MODERN_PHYSICS_COMPLETE_PAPER,
} from './vibrantModernPhysicsData';

// Mathematics Papers
import {
  VIBRANT_MATRICES_PAPER_1,
  VIBRANT_MATRICES_PAPER_2,
  VIBRANT_MATRICES_PAPER_3,
  VIBRANT_MATRICES_COMPLETE_PAPER,
} from './vibrantMatricesData';
import {
  VIBRANT_DETERMINANT_PAPER_1,
  VIBRANT_DETERMINANT_PAPER_2,
  VIBRANT_DETERMINANT_PAPER_3,
  VIBRANT_DETERMINANT_COMPLETE_PAPER,
} from './vibrantDeterminantData';
import {
  VIBRANT_BINOMIAL_PAPER_1,
  VIBRANT_BINOMIAL_PAPER_2,
  VIBRANT_BINOMIAL_PAPER_3,
  VIBRANT_BINOMIAL_COMPLETE_PAPER,
} from './vibrantBinomialData';
import {
  VIBRANT_VECTORS_3D_PAPER_1,
  VIBRANT_VECTORS_3D_PAPER_2,
  VIBRANT_VECTORS_3D_PAPER_3,
  VIBRANT_VECTORS_3D_COMPLETE_PAPER,
} from './vibrantVectors3DData';
import {
  VIBRANT_INTEGRATION_PAPER_1,
  VIBRANT_INTEGRATION_PAPER_2,
  VIBRANT_INTEGRATION_PAPER_3,
  VIBRANT_INTEGRATION_PAPER_4,
  VIBRANT_INTEGRATION_COMPLETE_PAPER,
} from './vibrantIntegrationData';
import {
  VIBRANT_DIFF_EQ_AUC_PAPER_1,
  VIBRANT_DIFF_EQ_AUC_PAPER_2,
  VIBRANT_DIFF_EQ_AUC_PAPER_3,
  VIBRANT_DIFF_EQ_AUC_PAPER_4,
  VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER,
} from './vibrantDiffEqAucData';
import {
  VIBRANT_LIMIT_CONT_DIFF_PAPER_1,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_2,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_3,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_4,
  VIBRANT_LIMIT_CONT_DIFF_PAPER_5,
  VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER,
} from './vibrantLimitContDiffData';

// Marathon Papers
import {
  VIBRANT_KINEMATICS_MARATHON_PAPER,
  VIBRANT_ELECTROSTATICS_MARATHON_PAPER,
  VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER,
  VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER,
  VIBRANT_MODERN_PHYSICS_MARATHON_PAPER,
  VIBRANT_MATRICES_MARATHON_PAPER,
  VIBRANT_DETERMINANT_MARATHON_PAPER,
  VIBRANT_BINOMIAL_MARATHON_PAPER,
  VIBRANT_VECTORS_3D_MARATHON_PAPER,
  VIBRANT_INTEGRATION_MARATHON_PAPER,
  VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER,
  VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER,
} from './moduleMarathonPapers';

export const SCHEDULE_BASE_DATE = '2026-10-22';

export function getDateForDay(baseDateStr: string, dayIndex: number): string {
  const [year, month, day] = baseDateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + dayIndex);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dt = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dt}`;
}

export function buildMasterAlternateSchedule(baseDateStr: string = SCHEDULE_BASE_DATE): ScheduledTest[] {
  // Ordered Physics Papers
  const physicsPapers: { paper: ExamPaper; title: string; syllabus: string }[] = [
    { paper: VIBRANT_KINEMATICS_PAPER_1, title: 'Day 1 • Physics: Kinematics CBT Mock Test 01 (50Q Sprint)', syllabus: 'Kinematics 1D, Graphs & Rectilinear Motion' },
    { paper: VIBRANT_KINEMATICS_PAPER_2, title: 'Day 3 • Physics: Kinematics CBT Mock Test 02 (38Q Projectile & Relative)', syllabus: '2D Projectile Motion & Relative Velocity' },
    { paper: VIBRANT_ELECTROSTATICS_PAPER_1, title: 'Day 5 • Physics: Electrostatics CBT Mock Test 01 (50Q Coulomb & Field)', syllabus: 'Coulomb Law, Electric Field & Continuous Charge' },
    { paper: VIBRANT_ELECTROSTATICS_PAPER_2, title: 'Day 7 • Physics: Electrostatics CBT Mock Test 02 (50Q Gauss Law & Flux)', syllabus: 'Gauss Law, Flux & Conductor Electrostatics' },
    { paper: VIBRANT_ELECTROSTATICS_PAPER_3, title: 'Day 9 • Physics: Electrostatics CBT Mock Test 03 (50Q Potential & Dipoles)', syllabus: 'Electric Potential, Energy & Dipole Systems' },
    { paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_1, title: 'Day 11 • Physics: Current Electricity CBT Mock Test 01 (50Q Ohm & Circuits)', syllabus: 'Ohm Law, Drift Velocity, Resistance & DC Circuits' },
    { paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_2, title: 'Day 13 • Physics: Current Electricity CBT Mock Test 02 (50Q Kirchhoff & Symmetry)', syllabus: 'Kirchhoff Laws, Cube/Bridge Symmetries & Cells' },
    { paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_3, title: 'Day 15 • Physics: Current Electricity CBT Mock Test 03 (50Q Instruments & RC)', syllabus: 'Potentiometer, Meter Bridge, Galvanometer & RC' },
    { paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_1, title: 'Day 17 • Physics: Geometrical Optics CBT Mock Test 01 (50Q Mirrors)', syllabus: 'Reflection, Plane & Spherical Mirrors' },
    { paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_2, title: 'Day 19 • Physics: Geometrical Optics CBT Mock Test 02 (50Q Refraction & Lenses)', syllabus: 'Snell Law, Total Internal Reflection & Thin Lenses' },
    { paper: VIBRANT_GEOMETRICAL_OPTICS_PAPER_3, title: 'Day 21 • Physics: Geometrical Optics CBT Mock Test 03 (50Q Prisms & Instruments)', syllabus: 'Prisms, Dispersion & Optical Instruments' },
    { paper: VIBRANT_MODERN_PHYSICS_PAPER_1, title: 'Day 23 • Physics: Modern Physics CBT Mock Test 01 (50Q Quantum & Photoelectric)', syllabus: 'Photoelectric Effect & de Broglie Wavelength' },
    { paper: VIBRANT_MODERN_PHYSICS_PAPER_2, title: 'Day 25 • Physics: Modern Physics CBT Mock Test 02 (50Q Bohr Model & X-Rays)', syllabus: 'Bohr Hydrogen Atom & Characteristic X-Rays' },
    { paper: VIBRANT_MODERN_PHYSICS_PAPER_3, title: 'Day 27 • Physics: Modern Physics CBT Mock Test 03 (50Q Nuclear & Radioactivity)', syllabus: 'Mass Defect, Binding Energy & Radioactive Decay' },
    { paper: VIBRANT_KINEMATICS_MARATHON_PAPER, title: 'Day 29 • Physics: Kinematics Complete Module Marathon (88Q)', syllabus: 'All Kinematics Exercise I, II & III Modules' },
    { paper: VIBRANT_ELECTROSTATICS_MARATHON_PAPER, title: 'Day 31 • Physics: Electrostatics Complete Chapter Marathon (265Q)', syllabus: 'Complete Vibrant Kota Electrostatics Module Archive' },
    { paper: VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER, title: 'Day 33 • Physics: Current Electricity Complete Chapter Marathon (224Q)', syllabus: 'Complete Vibrant Kota Current Electricity Module' },
    { paper: VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER, title: 'Day 35 • Physics: Geometrical Optics Complete Chapter Marathon (229Q)', syllabus: 'Complete Vibrant Kota Geometrical Optics Module' },
    { paper: VIBRANT_MODERN_PHYSICS_MARATHON_PAPER, title: 'Day 37 • Physics: Modern Physics Complete Chapter Marathon (243Q)', syllabus: 'Complete Vibrant Kota Modern Physics Module' },
    { paper: VIBRANT_KINEMATICS_COMPLETE_PAPER, title: 'Day 39 • Physics: Kinematics Master Grand Revision (88Q)', syllabus: 'Full Kinematics Master Revision' },
    { paper: VIBRANT_ELECTROSTATICS_PAPER_4, title: 'Day 41 • Physics: Electrostatics CBT Mock Test 04 (50Q Capacitance)', syllabus: 'Capacitance, RC Circuits & Dielectrics' },
    { paper: VIBRANT_CURRENT_ELECTRICITY_COMPLETE_PAPER, title: 'Day 43 • Physics: Current Electricity Master Grand Revision', syllabus: 'Full Current Electricity Master Revision' },
    { paper: VIBRANT_GEOMETRICAL_OPTICS_COMPLETE_PAPER, title: 'Day 45 • Physics: Geometrical Optics Master Grand Revision', syllabus: 'Full Geometrical Optics Master Revision' },
    { paper: VIBRANT_MODERN_PHYSICS_COMPLETE_PAPER, title: 'Day 47 • Physics: Modern Physics Master Grand Revision', syllabus: 'Full Modern Physics Master Revision' },
  ];

  // Ordered Mathematics Papers
  const mathPapers: { paper: ExamPaper; title: string; syllabus: string }[] = [
    { paper: VIBRANT_MATRICES_PAPER_1, title: 'Day 2 • Math: Matrices CBT Mock Test 01 (50Q Types & Operations)', syllabus: 'Matrix Algebra, Symmetric, Skew-Symmetric & Orthogonal' },
    { paper: VIBRANT_MATRICES_PAPER_2, title: 'Day 4 • Math: Matrices CBT Mock Test 02 (50Q Adjoint & Inverse)', syllabus: 'Adjoint Matrix, Inverse & System of Equations' },
    { paper: VIBRANT_MATRICES_PAPER_3, title: 'Day 6 • Math: Matrices CBT Mock Test 03 (50Q Advanced Archive)', syllabus: 'Cayley-Hamilton, Higher Powers & Advanced Archive' },
    { paper: VIBRANT_DETERMINANT_PAPER_1, title: 'Day 8 • Math: Determinant CBT Mock Test 01 (50Q Sprint)', syllabus: 'Determinant Expansions & Elementary Row Operations' },
    { paper: VIBRANT_DETERMINANT_PAPER_2, title: 'Day 10 • Math: Determinant CBT Mock Test 02 (50Q Properties)', syllabus: 'Multiplication of Determinants & Factor Theorem' },
    { paper: VIBRANT_DETERMINANT_PAPER_3, title: 'Day 12 • Math: Determinant CBT Mock Test 03 (50Q Cramer Rule & Advanced)', syllabus: 'Cramer Rule, Inconsistency & JEE Advanced Archive' },
    { paper: VIBRANT_BINOMIAL_PAPER_1, title: 'Day 14 • Math: Binomial Theorem CBT Mock Test 01 (50Q General Term)', syllabus: 'General Term, Middle Term & Specific Coefficients' },
    { paper: VIBRANT_BINOMIAL_PAPER_2, title: 'Day 16 • Math: Binomial Theorem CBT Mock Test 02 (50Q Series & Summation)', syllabus: 'Binomial Coefficients Summation, Differentiation & Integration' },
    { paper: VIBRANT_BINOMIAL_PAPER_3, title: 'Day 18 • Math: Binomial Theorem CBT Mock Test 03 (50Q Divisibility & Archive)', syllabus: 'Divisibility, Remainder & Advanced Archive' },
    { paper: VIBRANT_VECTORS_3D_PAPER_1, title: 'Day 20 • Math: Vectors & 3-D CBT Mock Test 01 (50Q Vector Algebra)', syllabus: 'Dot & Cross Products, Scalar Triple Product' },
    { paper: VIBRANT_VECTORS_3D_PAPER_2, title: 'Day 22 • Math: Vectors & 3-D CBT Mock Test 02 (50Q 3D Lines & Planes)', syllabus: 'Direction Cosines, Lines in Space, Planes & Distances' },
    { paper: VIBRANT_VECTORS_3D_PAPER_3, title: 'Day 24 • Math: Vectors & 3-D CBT Mock Test 03 (Remainder & Advanced)', syllabus: 'Coplanarity, Shortest Distance & Advanced Archive' },
    { paper: VIBRANT_INTEGRATION_PAPER_1, title: 'Day 26 • Math: Integration CBT Mock Test 01 (50Q Indefinite Standard)', syllabus: 'Standard Forms, Substitution & By Parts' },
    { paper: VIBRANT_INTEGRATION_PAPER_2, title: 'Day 28 • Math: Integration CBT Mock Test 02 (50Q Core Definite & Kings Property)', syllabus: 'Definite Integrals, Kings Rule & Periodicity' },
    { paper: VIBRANT_INTEGRATION_PAPER_3, title: 'Day 30 • Math: Integration CBT Mock Test 03 (50Q Leibniz Rule & Limit as Sum)', syllabus: 'Leibniz Differentiation under Integral & Limit as Sum' },
    { paper: VIBRANT_INTEGRATION_PAPER_4, title: 'Day 32 • Math: Integration CBT Mock Test 04 (35Q Advanced Archive)', syllabus: 'IIT Advanced Definite Integration Archive' },
    { paper: VIBRANT_DIFF_EQ_AUC_PAPER_1, title: 'Day 34 • Math: Diff Eq & Area CBT Mock Test 01 (50Q Formation & First Order)', syllabus: 'Order, Degree, Variable Separable & Homogeneous' },
    { paper: VIBRANT_DIFF_EQ_AUC_PAPER_2, title: 'Day 36 • Math: Diff Eq & Area CBT Mock Test 02 (50Q Linear Differential Eq)', syllabus: 'Linear Differential Equations & Integrating Factor' },
    { paper: VIBRANT_DIFF_EQ_AUC_PAPER_3, title: 'Day 38 • Math: Diff Eq & Area CBT Mock Test 03 (50Q Area Under Curve)', syllabus: 'Area Under Curves, Intersecting Curves & Bounded Regions' },
    { paper: VIBRANT_DIFF_EQ_AUC_PAPER_4, title: 'Day 40 • Math: Diff Eq & Area CBT Mock Test 04 (50Q JEE Advanced Archive)', syllabus: 'Differential Equations & Area Advanced Archive' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_1, title: 'Day 42 • Math: LCD CBT Mock Test 01 (50Q Limits Sprint)', syllabus: 'Standard Limits, Algebraic & Trigonometric Forms' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_2, title: 'Day 44 • Math: LCD CBT Mock Test 02 (50Q Advanced Limits & L-Hopital)', syllabus: 'Exp/Log Limits, 1^Infinity & Series Expansion' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_3, title: 'Day 46 • Math: LCD CBT Mock Test 03 (50Q Continuity Mastery)', syllabus: 'Continuity, Types of Discontinuity & Intermediate Value' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_4, title: 'Day 48 • Math: LCD CBT Mock Test 04 (50Q Differentiability Sprint)', syllabus: 'Differentiability, Sharp Corners & Functional Equations' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_PAPER_5, title: 'Day 50 • Math: LCD CBT Mock Test 05 (50Q JEE Advanced Archive)', syllabus: 'Limits, Continuity & Differentiability IIT Archive' },
    { paper: VIBRANT_MATRICES_MARATHON_PAPER, title: 'Day 52 • Math: Matrices Complete Chapter Marathon (146Q)', syllabus: 'Complete Vibrant Kota Matrices Mega XII Module' },
    { paper: VIBRANT_DETERMINANT_MARATHON_PAPER, title: 'Day 54 • Math: Determinant Complete Chapter Marathon (132Q)', syllabus: 'Complete Vibrant Kota Determinant Mega XII Module' },
    { paper: VIBRANT_BINOMIAL_MARATHON_PAPER, title: 'Day 56 • Math: Binomial Theorem Complete Chapter Marathon (108Q)', syllabus: 'Complete Vibrant Kota Binomial Micro XI Module' },
    { paper: VIBRANT_VECTORS_3D_MARATHON_PAPER, title: 'Day 58 • Math: Vectors & 3-D Complete Chapter Marathon (113Q)', syllabus: 'Complete Vibrant Kota Vectors & 3D Module' },
    { paper: VIBRANT_INTEGRATION_MARATHON_PAPER, title: 'Day 60 • Math: Integration Complete Chapter Marathon (185Q)', syllabus: 'Complete Vibrant Kota Indefinite & Definite Module' },
    { paper: VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER, title: 'Day 62 • Math: Diff Eq & AUC Complete Chapter Marathon (200Q)', syllabus: 'Complete Vibrant Kota Diff Eq & AUC Mega XII Module' },
    { paper: VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER, title: 'Day 64 • Math: LCD Complete Chapter Marathon (237Q)', syllabus: 'Complete Vibrant Kota LCD Mega XII Module' },
  ];

  const scheduledTests: ScheduledTest[] = [];
  const totalDays = Math.max(physicsPapers.length * 2, mathPapers.length * 2);

  let pIdx = 0;
  let mIdx = 0;

  for (let day = 1; day <= totalDays; day++) {
    const isPhysicsDay = day % 2 === 1; // Odd days: Day 1, Day 3, Day 5...
    const dateStr = getDateForDay(baseDateStr, day - 1);

    if (isPhysicsDay && pIdx < physicsPapers.length) {
      const item = physicsPapers[pIdx];
      const syllabusTopic: SyllabusTopic = {
        id: `syl-day-${day}`,
        subject: 'physics',
        name: item.syllabus,
        completed: false,
      };
      scheduledTests.push({
        id: `sched-day-${day}-physics`,
        title: item.title,
        pattern: 'JEE_MAIN',
        scheduledDate: dateStr,
        startTime: '09:00',
        endTime: '12:00',
        durationMinutes: item.paper.durationMinutes || 180,
        totalMarks: item.paper.totalMarks || 200,
        paperId: item.paper.id,
        paper: item.paper,
        status: 'UPCOMING_LOCKED',
        isLocked: true,
        scheduledAt: Date.now() + day,
        syllabus: [syllabusTopic],
      });
      pIdx++;
    } else if (!isPhysicsDay && mIdx < mathPapers.length) {
      const item = mathPapers[mIdx];
      const syllabusTopic: SyllabusTopic = {
        id: `syl-day-${day}`,
        subject: 'mathematics',
        name: item.syllabus,
        completed: false,
      };
      scheduledTests.push({
        id: `sched-day-${day}-math`,
        title: item.title,
        pattern: 'JEE_MAIN',
        scheduledDate: dateStr,
        startTime: '09:00',
        endTime: '12:00',
        durationMinutes: item.paper.durationMinutes || 180,
        totalMarks: item.paper.totalMarks || 200,
        paperId: item.paper.id,
        paper: item.paper,
        status: 'UPCOMING_LOCKED',
        isLocked: true,
        scheduledAt: Date.now() + day,
        syllabus: [syllabusTopic],
      });
      mIdx++;
    }
  }

  return scheduledTests;
}

export const SAMPLE_SCHEDULED_TESTS: ScheduledTest[] = buildMasterAlternateSchedule(SCHEDULE_BASE_DATE);

export const SAMPLE_DAILY_ROUTINE: DailyRoutineItem[] = [
  // Day 1 (Today: 2026-10-22) - Physics
  {
    id: 'rout-day-1-phy',
    type: 'MODULE_PRACTICE',
    title: 'Kinematics 1D & Graphs Module Exercise 1 Sprint',
    chapterOrTopic: 'Kinematics 1D, Rectilinear Motion & v-t Graphs',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 0), // Today
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 1 (Today)',
    paper: VIBRANT_KINEMATICS_PAPER_1,
  },
  // Day 2 (Tomorrow: 2026-10-23) - Mathematics
  {
    id: 'rout-day-2-mat',
    type: 'MODULE_PRACTICE',
    title: 'Matrices Types & Transpose Module Exercise 1 Sprint',
    chapterOrTopic: 'Matrices Algebra, Symmetric & Skew-Symmetric',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 1), // Tomorrow
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 2 (Tomorrow)',
    paper: VIBRANT_MATRICES_PAPER_1,
  },
  // Day 3 (2026-10-24) - Physics
  {
    id: 'rout-day-3-phy',
    type: 'MODULE_PRACTICE',
    title: 'Kinematics 2D & Relative Motion Sprint',
    chapterOrTopic: 'Projectile Motion, River-Boat & Relative Acceleration',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 2),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 20,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 3',
    paper: VIBRANT_KINEMATICS_PAPER_2,
  },
  // Day 4 (2026-10-25) - Mathematics
  {
    id: 'rout-day-4-mat',
    type: 'MODULE_PRACTICE',
    title: 'Matrices Inversion & Linear Equations Drill',
    chapterOrTopic: 'Adjoint Matrix, System of Linear Equations & Consistency',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 3),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 4',
    paper: VIBRANT_MATRICES_PAPER_2,
  },
  // Day 5 (2026-10-26) - Physics
  {
    id: 'rout-day-5-phy',
    type: 'MODULE_PRACTICE',
    title: 'Electrostatics Coulomb & Electric Field Sprint',
    chapterOrTopic: 'Coulomb Force, Ring/Disk Field & Continuous Charge',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 4),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 5',
    paper: VIBRANT_ELECTROSTATICS_PAPER_1,
  },
  // Day 6 (2026-10-27) - Mathematics
  {
    id: 'rout-day-6-mat',
    type: 'MODULE_PRACTICE',
    title: 'Matrices Cayley-Hamilton & Advanced Archive',
    chapterOrTopic: 'Characteristic Equations & Higher Power Matrices',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 5),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 6',
    paper: VIBRANT_MATRICES_PAPER_3,
  },
  // Day 7 (2026-10-28) - Physics
  {
    id: 'rout-day-7-phy',
    type: 'MODULE_PRACTICE',
    title: 'Electrostatics Gauss Law & Flux Analysis',
    chapterOrTopic: 'Spherical Shells, Gauss Surfaces & Conductor Cavities',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 6),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 1,
    dayName: 'Day 7',
    paper: VIBRANT_ELECTROSTATICS_PAPER_2,
  },
  // Day 8 (2026-10-29) - Mathematics
  {
    id: 'rout-day-8-mat',
    type: 'MODULE_PRACTICE',
    title: 'Determinant Properties & Factor Theorem Sprint',
    chapterOrTopic: 'Determinant Operations, Factoring & Cyclical Forms',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 7),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 2,
    dayName: 'Day 8',
    paper: VIBRANT_DETERMINANT_PAPER_1,
  },
  // Day 9 (2026-10-30) - Physics
  {
    id: 'rout-day-9-phy',
    type: 'MODULE_PRACTICE',
    title: 'Electrostatics Potential Energy & Dipole Drill',
    chapterOrTopic: 'Electrostatic Potential, Dipole Torque & Potential Energy',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 8),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 2,
    dayName: 'Day 9',
    paper: VIBRANT_ELECTROSTATICS_PAPER_3,
  },
  // Day 10 (2026-10-31) - Mathematics
  {
    id: 'rout-day-10-mat',
    type: 'MODULE_PRACTICE',
    title: 'Determinant Cramer Rule & Inconsistency Drill',
    chapterOrTopic: 'Non-Trivial Solutions, Cramer Determinants & Systems',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 9),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 2,
    dayName: 'Day 10',
    paper: VIBRANT_DETERMINANT_PAPER_2,
  },
  // Day 11 (2026-11-01) - Physics
  {
    id: 'rout-day-11-phy',
    type: 'MODULE_PRACTICE',
    title: 'Current Electricity Circuits & Resistance Sprint',
    chapterOrTopic: 'Drift Velocity, Colour Codes, Series/Parallel Resistors',
    subject: 'physics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 10),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 2,
    dayName: 'Day 11',
    paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
  },
  // Day 12 (2026-11-02) - Mathematics
  {
    id: 'rout-day-12-mat',
    type: 'MODULE_PRACTICE',
    title: 'Binomial Theorem General & Middle Term Sprint',
    chapterOrTopic: 'Expansion of Binomial, Middle Terms, Greatest Term',
    subject: 'mathematics',
    scheduledDate: getDateForDay(SCHEDULE_BASE_DATE, 11),
    scheduledSlot: '19:00 - 20:00',
    durationMinutes: 50,
    questionCount: 25,
    isCompleted: false,
    weekNumber: 2,
    dayName: 'Day 12',
    paper: VIBRANT_BINOMIAL_PAPER_1,
  },
];

export const SAMPLE_TAGGED_RACE_QUESTIONS: TaggedQuestionEntry[] = [
  {
    id: 'race-tag-1',
    question: VIBRANT_KINEMATICS_PAPER_1.sections[0].questions[0],
    examId: VIBRANT_KINEMATICS_PAPER_1.id,
    examTitle: 'Kinematics 1D & 2D CBT Mock Test 01',
    subject: 'physics',
    tags: ['HARD', 'RACE_STAR'],
    correctAnswer: 'A',
    addedAt: Date.now() - 86400000,
    practiceCount: 2,
    notes: 'Acceleration and deceleration alpha-beta relation: v_max = (alpha * beta) / (alpha + beta) * T',
  },
  {
    id: 'race-tag-2',
    question: VIBRANT_MATRICES_PAPER_1.sections[0].questions[0],
    examId: VIBRANT_MATRICES_PAPER_1.id,
    examTitle: 'Matrices CBT Mock Test 01',
    subject: 'mathematics',
    tags: ['TRICKY', 'DOUBT'],
    correctAnswer: 'D',
    addedAt: Date.now() - 43200000,
    practiceCount: 1,
    notes: 'Upper triangular matrix identification: a_ij = 0 for all i > j',
  },
  {
    id: 'race-tag-3',
    question: VIBRANT_ELECTROSTATICS_PAPER_1.sections[0].questions[0],
    examId: VIBRANT_ELECTROSTATICS_PAPER_1.id,
    examTitle: 'Electrostatics CBT Mock Test 01',
    subject: 'physics',
    tags: ['TRICKY', 'HARD'],
    correctAnswer: 'A',
    addedAt: Date.now() - 172800000,
    practiceCount: 3,
    notes: 'Electric flux through cubical surfaces and Gauss Law application',
  },
  {
    id: 'race-tag-4',
    question: VIBRANT_DETERMINANT_PAPER_1.sections[0].questions[0],
    examId: VIBRANT_DETERMINANT_PAPER_1.id,
    examTitle: 'Determinant CBT Mock Test 01',
    subject: 'mathematics',
    tags: ['DOUBT', 'RACE_STAR'],
    correctAnswer: 'A',
    addedAt: Date.now() - 3600000,
    practiceCount: 1,
    notes: 'Vandermonde determinant expansion: (a-b)(b-c)(c-a)',
  },
];
