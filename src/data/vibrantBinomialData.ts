import { ExamPaper, ScheduledTest, Question } from '../types/exam.ts';
import { BINOMIAL_PART_1_QUESTIONS } from './vibrantBinomialPart1.ts';
import { BINOMIAL_PART_2_QUESTIONS } from './vibrantBinomialPart2.ts';
import { BINOMIAL_PART_3_QUESTIONS } from './vibrantBinomialPart3.ts';

export const ALL_BINOMIAL_QUESTIONS: Question[] = [
  ...BINOMIAL_PART_1_QUESTIONS,
  ...BINOMIAL_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: `bin-master-${50 + idx + 1}` })),
  ...BINOMIAL_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: `bin-master-${100 + idx + 1}` })),
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

export function getVibrantBinomialLockedTests(baseDateStr?: string): ScheduledTest[] {
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
      id: `locked-vibrant-binomial-day-${cfg.dayNum}`,
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
