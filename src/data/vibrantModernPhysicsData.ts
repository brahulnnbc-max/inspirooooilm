import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { MODERN_PHYSICS_PART_1_QUESTIONS } from './vibrantModernPhysicsPart1';
import { MODERN_PHYSICS_PART_2_QUESTIONS } from './vibrantModernPhysicsPart2';
import { MODERN_PHYSICS_PART_3_QUESTIONS } from './vibrantModernPhysicsPart3';
import { MODERN_PHYSICS_PART_4_QUESTIONS } from './vibrantModernPhysicsPart4';
import { MODERN_PHYSICS_PART_5_QUESTIONS } from './vibrantModernPhysicsPart5';

// Master collection of all 243 Modern Physics Questions
export const ALL_243_MODERN_PHYSICS_QUESTIONS: Question[] = [
  ...MODERN_PHYSICS_PART_1_QUESTIONS,
  ...MODERN_PHYSICS_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `mod-master-${50 + idx + 1}`,
  })),
  ...MODERN_PHYSICS_PART_3_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 100 + idx + 1,
    id: `mod-master-${100 + idx + 1}`,
  })),
  ...MODERN_PHYSICS_PART_4_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 150 + idx + 1,
    id: `mod-master-${150 + idx + 1}`,
  })),
  ...MODERN_PHYSICS_PART_5_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 200 + idx + 1,
    id: `mod-master-${200 + idx + 1}`,
  })),
];

// =========================================================================
// TEST 1 (DAY 27): VIBRANT KOTA MODERN PHYSICS PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// Covering Exercise-I: Photoelectric effect, stopping potential, photon momentum & De Broglie wavelength
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_PAPER_1: ExamPaper = {
  id: 'vibrant-modern-physics-part-1',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS PART 1 - PHOTOELECTRIC EFFECT & DUAL NATURE)',
      questions: MODERN_PHYSICS_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2 (DAY 29): VIBRANT KOTA MODERN PHYSICS PART 2 (Q51 to Q100 - 180 Mins, 200 Marks)
// Covering Exercise-I Q51-Q90 (Bohr model, X-Rays, Radioactivity) + Exercise-II Q1-Q10
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_PAPER_2: ExamPaper = {
  id: 'vibrant-modern-physics-part-2',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS PART 2 - BOHR ATOM, X-RAYS & NUCLEAR STRUCTURE)',
      questions: MODERN_PHYSICS_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 3 (DAY 31): VIBRANT KOTA MODERN PHYSICS PART 3 (Q101 to Q150 - 180 Mins, 200 Marks)
// Covering Exercise-II Q11-Q45 (Advanced Subjective & Numerical) + Exercise-III Q1-Q15
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_PAPER_3: ExamPaper = {
  id: 'vibrant-modern-physics-part-3',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 03 (Part 3 - 50Q Advanced Numerical)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS PART 3 - ADVANCED SUBJECTIVE & NUMERICAL PROBLEMS)',
      questions: MODERN_PHYSICS_PART_3_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 4 (DAY 33): VIBRANT KOTA MODERN PHYSICS PART 4 (Q151 to Q200 - 180 Mins, 200 Marks)
// Covering Exercise-III Q16 to Q65: IIT Advanced Archive Part 1
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_PAPER_4: ExamPaper = {
  id: 'vibrant-modern-physics-part-4',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 04 (Part 4 - 50Q IIT Advanced Archive 1)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS PART 4 - IIT ADVANCED ARCHIVE PART 1)',
      questions: MODERN_PHYSICS_PART_4_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 5 (DAY 35): VIBRANT KOTA MODERN PHYSICS PART 5 (Q201 to Q243 - 172 Mins, 172 Marks)
// Covering Exercise-III Q66 to Q108: IIT Advanced Archive Part 2 (43 questions * 4 mins)
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_PAPER_5: ExamPaper = {
  id: 'vibrant-modern-physics-part-5',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 05 (Part 5 - 43Q IIT Advanced Archive 2)',
  pattern: 'JEE_MAIN',
  durationMinutes: 172,
  totalMarks: 172,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (MODERN PHYSICS PART 5 - IIT ADVANCED RECENT ARCHIVE)',
      questions: MODERN_PHYSICS_PART_5_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 6 (DAY 37): COMPLETE MODERN PHYSICS 243-QUESTION MASTER ARCHIVE
// As requested: all questions in a single master test at the end of the chapter!
// =========================================================================
export const VIBRANT_MODERN_PHYSICS_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-modern-physics-complete-243',
  title: 'Vibrant Kota Physics - Modern Physics Complete Series (243 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 972, // 243 questions * 4 mins
  totalMarks: 972,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (COMPLETE MODERN PHYSICS EXERCISE I, II & III MASTER ARCHIVE)',
      questions: ALL_243_MODERN_PHYSICS_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_MODERN_PHYSICS_PAPERS: ExamPaper[] = [
  VIBRANT_MODERN_PHYSICS_PAPER_1,
  VIBRANT_MODERN_PHYSICS_PAPER_2,
  VIBRANT_MODERN_PHYSICS_PAPER_3,
  VIBRANT_MODERN_PHYSICS_PAPER_4,
  VIBRANT_MODERN_PHYSICS_PAPER_5,
  VIBRANT_MODERN_PHYSICS_COMPLETE_PAPER,
];

/**
 * Returns strictly locked alternate-day tests for Vibrant Modern Physics (Physics)
 * scheduled to continue seamlessly AFTER Geometrical Optics finishes on Day 25.
 * Physics is scheduled on ODD days (Days 27, 29, 31, 33, 35, 37).
 * Final Day 37 test includes ALL 243 questions in a single master archive test!
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantModernPhysicsLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 27,
      paper: VIBRANT_MODERN_PHYSICS_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mod-1-1', subject: 'physics' as const, name: 'Photon Theory, Planck Quantum Relation & Radiation Force', completed: false },
        { id: 'syl-mod-1-2', subject: 'physics' as const, name: 'Photoelectric Effect: Work Function, Cutoff Potential & Stopping Voltage', completed: false },
        { id: 'syl-mod-1-3', subject: 'physics' as const, name: 'Einstein Equation, Frequency vs Kinetic Energy Characteristics', completed: false },
        { id: 'syl-mod-1-4', subject: 'physics' as const, name: 'De Broglie Hypothesis, Matter Waves & Electron Wavelength', completed: false },
      ],
    },
    {
      dayNum: 29,
      paper: VIBRANT_MODERN_PHYSICS_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mod-2-1', subject: 'physics' as const, name: 'Bohr Model of Hydrogen & Hydrogen-like Atoms (Radii, Velocity, Energy)', completed: false },
        { id: 'syl-mod-2-2', subject: 'physics' as const, name: 'Spectral Series: Lyman, Balmer, Paschen, Brackett, Pfund & Rydberg Formula', completed: false },
        { id: 'syl-mod-2-3', subject: 'physics' as const, name: 'X-Rays: Continuous vs Characteristic Spectra, Duane-Hunt Law & Moseley\'s Law', completed: false },
        { id: 'syl-mod-2-4', subject: 'physics' as const, name: 'Nuclear Composition, Size, Density & Nuclear Force Characteristics', completed: false },
      ],
    },
    {
      dayNum: 31,
      paper: VIBRANT_MODERN_PHYSICS_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mod-3-1', subject: 'physics' as const, name: 'Mass Defect, Binding Energy per Nucleon & Nuclear Stability Curve', completed: false },
        { id: 'syl-mod-3-2', subject: 'physics' as const, name: 'Q-Value of Nuclear Reactions, Fission & Fusion Energy Release', completed: false },
        { id: 'syl-mod-3-3', subject: 'physics' as const, name: 'Law of Radioactive Decay: Half-Life, Mean Life & Activity', completed: false },
        { id: 'syl-mod-3-4', subject: 'physics' as const, name: 'Parallel Decays, Sequential Decays & Secular Equilibrium Problems', completed: false },
      ],
    },
    {
      dayNum: 33,
      paper: VIBRANT_MODERN_PHYSICS_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-mod-4-1', subject: 'physics' as const, name: 'IIT Advanced Master Archive: Multi-concept Photoelectric Collisions', completed: false },
        { id: 'syl-mod-4-2', subject: 'physics' as const, name: 'Hydrogen Recoil Velocity, Inelastic Particle-Atom Collisions & Excitation', completed: false },
        { id: 'syl-mod-4-3', subject: 'physics' as const, name: 'Bragg\'s Diffraction of Matter Waves & Davisson-Germer Experiment', completed: false },
        { id: 'syl-mod-4-4', subject: 'physics' as const, name: 'Nuclear Radius Scaling & Alpha-Particle Scattering Cross-Section', completed: false },
      ],
    },
    {
      dayNum: 35,
      paper: VIBRANT_MODERN_PHYSICS_PAPER_5,
      startTime: '09:00',
      endTime: '11:52',
      durationMinutes: 172, // 43 questions * 4 mins
      totalMarks: 172,
      syllabus: [
        { id: 'syl-mod-5-1', subject: 'physics' as const, name: 'JEE Advanced Recent Archive: Matching Lists & Matrix Evaluators', completed: false },
        { id: 'syl-mod-5-2', subject: 'physics' as const, name: 'Relativistic Corrections, Doppler Shift of Photons & Compton Scattering', completed: false },
        { id: 'syl-mod-5-3', subject: 'physics' as const, name: 'Calorimetric Heating by Nuclear Decay & Precision Thermoelectric Detectors', completed: false },
      ],
    },
    {
      dayNum: 37,
      paper: VIBRANT_MODERN_PHYSICS_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '01:12', // 972 minutes (or full day exam marathon)
      durationMinutes: 972, // 243 questions * 4 mins
      totalMarks: 972,
      syllabus: [
        { id: 'syl-mod-6-1', subject: 'physics' as const, name: 'Complete Vibrant Kota Modern Physics Mega XII Series (All 243 Questions)', completed: false },
        { id: 'syl-mod-6-2', subject: 'physics' as const, name: 'Comprehensive Assessment: Photoelectric, Dual Nature, Atomic, X-Ray & Nuclear', completed: false },
        { id: 'syl-mod-6-3', subject: 'physics' as const, name: 'Full Chapter Grand Marathon Mock: Exercise I, Exercise II & Exercise III', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-modern-physics-day-${cfg.dayNum}`,
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
