import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { CURRENT_ELECTRICITY_PART_1_QUESTIONS } from './vibrantCurrentElectricityPart1';
import { CURRENT_ELECTRICITY_PART_2_QUESTIONS } from './vibrantCurrentElectricityPart2';
import { CURRENT_ELECTRICITY_PART_3_QUESTIONS } from './vibrantCurrentElectricityPart3';
import { CURRENT_ELECTRICITY_PART_4_QUESTIONS } from './vibrantCurrentElectricityPart4';
import { CURRENT_ELECTRICITY_PART_5_QUESTIONS } from './vibrantCurrentElectricityPart5';

// Master collection of all 224 Current Electricity Questions
export const ALL_224_CURRENT_ELECTRICITY_QUESTIONS: Question[] = [
  ...CURRENT_ELECTRICITY_PART_1_QUESTIONS,
  ...CURRENT_ELECTRICITY_PART_2_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 50 + idx + 1,
    id: `curr-master-${50 + idx + 1}`,
  })),
  ...CURRENT_ELECTRICITY_PART_3_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 100 + idx + 1,
    id: `curr-master-${100 + idx + 1}`,
  })),
  ...CURRENT_ELECTRICITY_PART_4_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 150 + idx + 1,
    id: `curr-master-${150 + idx + 1}`,
  })),
  ...CURRENT_ELECTRICITY_PART_5_QUESTIONS.map((q, idx) => ({
    ...q,
    questionNumber: 200 + idx + 1,
    id: `curr-master-${200 + idx + 1}`,
  })),
];

// =========================================================================
// TEST 1 (DAY 39): VIBRANT KOTA CURRENT ELECTRICITY PART 1 (Q1 to Q50 - 180 Mins, 200 Marks)
// Covering Exercise-I: Drift velocity, current density, Ohm's law, temperature dependence, resistors & meters
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_PAPER_1: ExamPaper = {
  id: 'vibrant-current-electricity-part-1',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY PART 1 - DRIFT, RESISTANCE, KVL & METERS)',
      questions: CURRENT_ELECTRICITY_PART_1_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 2 (DAY 41): VIBRANT KOTA CURRENT ELECTRICITY PART 2 (Q51 to Q100 - 180 Mins, 200 Marks)
// Covering Exercise-I Q51-Q90 (Bridge circuits, Potentiometer, Multi-bulb networks) + Exercise-II Q1-Q10
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_PAPER_2: ExamPaper = {
  id: 'vibrant-current-electricity-part-2',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY PART 2 - POTENTIOMETER, BRIDGES & CUBE CIRCUITS)',
      questions: CURRENT_ELECTRICITY_PART_2_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 3 (DAY 43): VIBRANT KOTA CURRENT ELECTRICITY PART 3 (Q101 to Q150 - 180 Mins, 200 Marks)
// Covering Exercise-II Q11-Q23 (Advanced subjective & numerical circuits) + Exercise-III Q1-Q37 (JEE Archive 1)
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_PAPER_3: ExamPaper = {
  id: 'vibrant-current-electricity-part-3',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 03 (Part 3 - 50Q Advanced Numerical)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY PART 3 - ADVANCED NUMERICAL & JEE ARCHIVE 1)',
      questions: CURRENT_ELECTRICITY_PART_3_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 4 (DAY 45): VIBRANT KOTA CURRENT ELECTRICITY PART 4 (Q151 to Q200 - 180 Mins, 200 Marks)
// Covering Exercise-III Q38 to Q87: JEE Main & Advanced Recent Archive 2
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_PAPER_4: ExamPaper = {
  id: 'vibrant-current-electricity-part-4',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 04 (Part 4 - 50Q JEE Recent Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY PART 4 - JEE RECENT MASTER ARCHIVE)',
      questions: CURRENT_ELECTRICITY_PART_4_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 5 (DAY 47): VIBRANT KOTA CURRENT ELECTRICITY PART 5 (Q201 to Q224 - 96 Mins, 96 Marks)
// Covering Exercise-III Q88 to Q111: Final 2024–2025 Recent Archive (24 questions * 4 mins)
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_PAPER_5: ExamPaper = {
  id: 'vibrant-current-electricity-part-5',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 05 (Part 5 - 24Q Final 2025 Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 96,
  totalMarks: 96,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (CURRENT ELECTRICITY PART 5 - 2024-2025 RECENT ARCHIVE)',
      questions: CURRENT_ELECTRICITY_PART_5_QUESTIONS,
    },
  ],
};

// =========================================================================
// TEST 6 (DAY 49): COMPLETE CURRENT ELECTRICITY 224-QUESTION MASTER ARCHIVE
// As requested: all questions in a single master test at the end of the chapter!
// =========================================================================
export const VIBRANT_CURRENT_ELECTRICITY_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-current-electricity-complete-224',
  title: 'Vibrant Kota Physics - Current Electricity Complete Series (224 Qs Master Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 896, // 224 questions * 4 mins
  totalMarks: 896,
  sections: [
    {
      id: 'physics',
      name: 'PHYSICS (COMPLETE CURRENT ELECTRICITY EXERCISE I, II & III MASTER ARCHIVE)',
      questions: ALL_224_CURRENT_ELECTRICITY_QUESTIONS,
    },
  ],
};

export const ALL_VIBRANT_CURRENT_ELECTRICITY_PAPERS: ExamPaper[] = [
  VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_2,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_3,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_4,
  VIBRANT_CURRENT_ELECTRICITY_PAPER_5,
  VIBRANT_CURRENT_ELECTRICITY_COMPLETE_PAPER,
];

/**
 * Returns strictly locked alternate-day tests for Vibrant Current Electricity (Physics)
 * scheduled to continue seamlessly AFTER Modern Physics finishes on Day 37.
 * Physics is scheduled on ODD days (Days 39, 41, 43, 45, 47, 49).
 * Final Day 49 test includes ALL 224 questions in a single master archive test!
 * Authentic CBT Mode with isLocked: true and UPCOMING_LOCKED status.
 */
export function getVibrantCurrentElectricityLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      dayNum: 39,
      paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-curr-1-1', subject: 'physics' as const, name: 'Drift Velocity, Current Density, Mobility & Ohm\'s Law in Differential Form', completed: false },
        { id: 'syl-curr-1-2', subject: 'physics' as const, name: 'Temperature Coefficient of Resistance, Carbon Resistors & Stretching of Wires', completed: false },
        { id: 'syl-curr-1-3', subject: 'physics' as const, name: 'Kirchhoff\'s Current & Voltage Laws (KCL & KVL), Nodal Analysis', completed: false },
        { id: 'syl-curr-1-4', subject: 'physics' as const, name: 'Combination of Cells, Internal Resistance, Grouping & Maximum Power Transfer', completed: false },
      ],
    },
    {
      dayNum: 41,
      paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_2,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-curr-2-1', subject: 'physics' as const, name: 'Wheatstone Bridge, Metre Bridge & End Corrections', completed: false },
        { id: 'syl-curr-2-2', subject: 'physics' as const, name: 'Potentiometer: Potential Gradient, Comparison of EMFs & Internal Resistance', completed: false },
        { id: 'syl-curr-2-3', subject: 'physics' as const, name: 'Conversion of Galvanometer into Ammeter & Voltmeter (Shunts & Multipliers)', completed: false },
        { id: 'syl-curr-2-4', subject: 'physics' as const, name: 'Cube Resistor Networks, Infinite Ladder Attenuators & Symmetry Methods', completed: false },
      ],
    },
    {
      dayNum: 43,
      paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_3,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-curr-3-1', subject: 'physics' as const, name: 'Variable Current Density in Cylindrical Conductors & Radial Integration', completed: false },
        { id: 'syl-curr-3-2', subject: 'physics' as const, name: 'Non-linear Resistors, Composite Conductor Resistance & Joule Heating Effects', completed: false },
        { id: 'syl-curr-3-3', subject: 'physics' as const, name: 'IIT-JEE Historic Subjective Problems & High-Precision Potentiometer Setups', completed: false },
        { id: 'syl-curr-3-4', subject: 'physics' as const, name: 'Hydro-electric Generation Modeling & Thermal Dissipation Limits', completed: false },
      ],
    },
    {
      dayNum: 45,
      paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_4,
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: 180,
      totalMarks: 200,
      syllabus: [
        { id: 'syl-curr-4-1', subject: 'physics' as const, name: 'JEE Advanced Master Archive: 3D Pyramid & Octahedral Circuit Mesh Equations', completed: false },
        { id: 'syl-curr-4-2', subject: 'physics' as const, name: 'Conical Variable Cross-Section Wires & Tapered Resistor Inversion', completed: false },
        { id: 'syl-curr-4-3', subject: 'physics' as const, name: 'Multi-Switch Circuits, Transient Steady State Charge on Capacitors & Resistors', completed: false },
        { id: 'syl-curr-4-4', subject: 'physics' as const, name: 'Thermoelectric Figures of Merit & Seebeck Coefficient Dimensional Analysis', completed: false },
      ],
    },
    {
      dayNum: 47,
      paper: VIBRANT_CURRENT_ELECTRICITY_PAPER_5,
      startTime: '09:00',
      endTime: '10:36',
      durationMinutes: 96, // 24 questions * 4 mins
      totalMarks: 96,
      syllabus: [
        { id: 'syl-curr-5-1', subject: 'physics' as const, name: 'JEE Main 2024 & 2025 Recent Archive: Mobile Battery mAh, Motor Efficiency', completed: false },
        { id: 'syl-curr-5-2', subject: 'physics' as const, name: 'Equivalent Resistance in 3D Triangular Pyramids & Star Symmetries', completed: false },
        { id: 'syl-curr-5-3', subject: 'physics' as const, name: 'Parallel Cells with Opposing Polarities & Voltmeter Loading Corrections', completed: false },
      ],
    },
    {
      dayNum: 49,
      paper: VIBRANT_CURRENT_ELECTRICITY_COMPLETE_PAPER,
      startTime: '09:00',
      endTime: '23:56', // 896 minutes marathon
      durationMinutes: 896, // 224 questions * 4 mins
      totalMarks: 896,
      syllabus: [
        { id: 'syl-curr-6-1', subject: 'physics' as const, name: 'Complete Vibrant Kota Current Electricity Mega XII Series (All 224 Questions)', completed: false },
        { id: 'syl-curr-6-2', subject: 'physics' as const, name: 'Comprehensive Assessment: Drift, Resistance, Potentiometers, Bridges & Networks', completed: false },
        { id: 'syl-curr-6-3', subject: 'physics' as const, name: 'Full Chapter Grand Marathon Mock: Exercise I, Exercise II & Exercise III', completed: false },
      ],
    },
  ];

  return testsConfig.map((cfg, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + (cfg.dayNum - 1));
    const dateStr = formatIso(testDate);

    return {
      id: `locked-vibrant-current-electricity-day-${cfg.dayNum}`,
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
