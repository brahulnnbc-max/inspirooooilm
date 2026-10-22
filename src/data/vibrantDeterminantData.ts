import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { DETERMINANT_PART_1_QUESTIONS } from './vibrantDeterminantPart1.ts';
import { DETERMINANT_PART_2_QUESTIONS } from './vibrantDeterminantPart2.ts';
import { DETERMINANT_PART_3_QUESTIONS } from './vibrantDeterminantPart3.ts';

export const ALL_DETERMINANT_QUESTIONS: Question[] = [
  ...DETERMINANT_PART_1_QUESTIONS,
  ...DETERMINANT_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `det-master-${50 + idx + 1}` })),
  ...DETERMINANT_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `det-master-${100 + idx + 1}` })),
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

export function getVibrantDeterminantLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      id: `locked-vibrant-determinant-day-${cfg.dayNum}`,
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
