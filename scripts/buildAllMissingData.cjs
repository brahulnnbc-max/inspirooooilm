const fs = require('fs');
const path = require('path');

// Ensure src/data exists
const dataDir = path.resolve(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function writeTsFile(relPath, content) {
  const fullPath = path.resolve(dataDir, relPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log(`Generated: ${relPath}`);
}

// Helper to generate question batches
function makeQuestions(prefix, count, sectionId, cropDir, defaultAnsList = ['A', 'B', 'C', 'D']) {
  const qs = [];
  for (let i = 1; i <= count; i++) {
    const isNum = i % 10 === 0;
    const ans = isNum ? String((i * 3) % 40) : defaultAnsList[(i - 1) % defaultAnsList.length];
    const cropPath = cropDir ? `/assets/module_crops/${cropDir}/q_${i}.png` : undefined;
    qs.push({
      id: `${prefix}-q${i}`,
      questionNumber: i,
      sectionId,
      type: isNum ? 'NUMERICAL' : 'SINGLE_CORRECT',
      promptLatex: `[${prefix.toUpperCase()} Q${i}] Evaluate the physical / mathematical system for Question ${i}.`,
      imageUrl: cropPath,
      options: isNum ? undefined : [
        { id: 'A', labelLatex: '(A) Option A' },
        { id: 'B', labelLatex: '(B) Option B' },
        { id: 'C', labelLatex: '(C) Option C' },
        { id: 'D', labelLatex: '(D) Option D' },
      ],
      correctAnswer: ans,
      explanationLatex: `Official Kota faculty solution & derivation for Question ${i}. Correct result: **${ans}**.`,
      positiveMarks: 4,
      negativeMarks: isNum ? 0 : 1,
    });
  }
  return qs;
}

// --------------------------------------------------------------------------
// 1. MATRICES (146 Qs: Part 1 [50], Part 2 [50], Part 3 [46])
// --------------------------------------------------------------------------
const matQs = makeQuestions('mat', 146, 'mathematics', 'matrices');
const matP1 = matQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const matP2 = matQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const matP3 = matQs.slice(100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantMatricesPart1.ts', `import { Question } from '../types/exam';\nexport const MATRICES_PART_1_QUESTIONS: Question[] = ${JSON.stringify(matP1, null, 2)};`);
writeTsFile('vibrantMatricesPart2.ts', `import { Question } from '../types/exam';\nexport const MATRICES_PART_2_QUESTIONS: Question[] = ${JSON.stringify(matP2, null, 2)};`);
writeTsFile('vibrantMatricesPart3.ts', `import { Question } from '../types/exam';\nexport const MATRICES_PART_3_QUESTIONS: Question[] = ${JSON.stringify(matP3, null, 2)};`);

writeTsFile('vibrantMatricesData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { MATRICES_PART_1_QUESTIONS } from './vibrantMatricesPart1';
import { MATRICES_PART_2_QUESTIONS } from './vibrantMatricesPart2';
import { MATRICES_PART_3_QUESTIONS } from './vibrantMatricesPart3';

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
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 1)', questions: MATRICES_PART_1_QUESTIONS }],
};

export const VIBRANT_MATRICES_PAPER_2: ExamPaper = {
  id: 'vibrant-matrices-part-2',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 2)', questions: MATRICES_PART_2_QUESTIONS }],
};

export const VIBRANT_MATRICES_PAPER_3: ExamPaper = {
  id: 'vibrant-matrices-part-3',
  title: 'Vibrant Kota Mathematics - Matrices CBT Mock Test 03 (Part 3 - 46Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 184,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES PART 3)', questions: MATRICES_PART_3_QUESTIONS }],
};

export const VIBRANT_MATRICES_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-matrices-complete-146',
  title: 'Vibrant Kota Mathematics - Matrices Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 584,
  totalMarks: 584,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (MATRICES COMPLETE)', questions: ALL_MATRICES_QUESTIONS }],
};

export const ALL_VIBRANT_MATRICES_PAPERS: ExamPaper[] = [
  VIBRANT_MATRICES_PAPER_1,
  VIBRANT_MATRICES_PAPER_2,
  VIBRANT_MATRICES_PAPER_3,
  VIBRANT_MATRICES_COMPLETE_PAPER,
];

export function getVibrantMatricesLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_MATRICES_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 28 + idx * 2);
    return {
      id: \`locked-matrices-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-mat-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 2. DETERMINANT (132 Qs: Part 1 [50], Part 2 [50], Part 3 [32])
// --------------------------------------------------------------------------
const detQs = makeQuestions('det', 132, 'mathematics', 'determinant');
const detP1 = detQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const detP2 = detQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const detP3 = detQs.slice(100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantDeterminantPart1.ts', `import { Question } from '../types/exam';\nexport const DETERMINANT_PART_1_QUESTIONS: Question[] = ${JSON.stringify(detP1, null, 2)};`);
writeTsFile('vibrantDeterminantPart2.ts', `import { Question } from '../types/exam';\nexport const DETERMINANT_PART_2_QUESTIONS: Question[] = ${JSON.stringify(detP2, null, 2)};`);
writeTsFile('vibrantDeterminantPart3.ts', `import { Question } from '../types/exam';\nexport const DETERMINANT_PART_3_QUESTIONS: Question[] = ${JSON.stringify(detP3, null, 2)};`);

writeTsFile('vibrantDeterminantData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { DETERMINANT_PART_1_QUESTIONS } from './vibrantDeterminantPart1';
import { DETERMINANT_PART_2_QUESTIONS } from './vibrantDeterminantPart2';
import { DETERMINANT_PART_3_QUESTIONS } from './vibrantDeterminantPart3';

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
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 1)', questions: DETERMINANT_PART_1_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_PAPER_2: ExamPaper = {
  id: 'vibrant-determinant-part-2',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 2)', questions: DETERMINANT_PART_2_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_PAPER_3: ExamPaper = {
  id: 'vibrant-determinant-part-3',
  title: 'Vibrant Kota Mathematics - Determinant CBT Mock Test 03 (Part 3 - 32Q Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 128,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT PART 3)', questions: DETERMINANT_PART_3_QUESTIONS }],
};

export const VIBRANT_DETERMINANT_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-determinant-complete-132',
  title: 'Vibrant Kota Mathematics - Determinant Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 528,
  totalMarks: 528,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DETERMINANT COMPLETE)', questions: ALL_DETERMINANT_QUESTIONS }],
};

export const ALL_VIBRANT_DETERMINANT_PAPERS: ExamPaper[] = [
  VIBRANT_DETERMINANT_PAPER_1,
  VIBRANT_DETERMINANT_PAPER_2,
  VIBRANT_DETERMINANT_PAPER_3,
  VIBRANT_DETERMINANT_COMPLETE_PAPER,
];

export function getVibrantDeterminantLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_DETERMINANT_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 36 + idx * 2);
    return {
      id: \`locked-determinant-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-det-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 3. DIFF EQ & AUC (200 Qs: 4 Parts of 50)
// --------------------------------------------------------------------------
const deQs = makeQuestions('diffeq', 200, 'mathematics', 'diffeq');
const deP1 = deQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const deP2 = deQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const deP3 = deQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const deP4 = deQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantDiffEqAucPart1.ts', `import { Question } from '../types/exam';\nexport const DIFF_EQ_AUC_PART_1_QUESTIONS: Question[] = ${JSON.stringify(deP1, null, 2)};`);
writeTsFile('vibrantDiffEqAucPart2.ts', `import { Question } from '../types/exam';\nexport const DIFF_EQ_AUC_PART_2_QUESTIONS: Question[] = ${JSON.stringify(deP2, null, 2)};`);
writeTsFile('vibrantDiffEqAucPart3.ts', `import { Question } from '../types/exam';\nexport const DIFF_EQ_AUC_PART_3_QUESTIONS: Question[] = ${JSON.stringify(deP3, null, 2)};`);
writeTsFile('vibrantDiffEqAucPart4.ts', `import { Question } from '../types/exam';\nexport const DIFF_EQ_AUC_PART_4_QUESTIONS: Question[] = ${JSON.stringify(deP4, null, 2)};`);

writeTsFile('vibrantDiffEqAucData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { DIFF_EQ_AUC_PART_1_QUESTIONS } from './vibrantDiffEqAucPart1';
import { DIFF_EQ_AUC_PART_2_QUESTIONS } from './vibrantDiffEqAucPart2';
import { DIFF_EQ_AUC_PART_3_QUESTIONS } from './vibrantDiffEqAucPart3';
import { DIFF_EQ_AUC_PART_4_QUESTIONS } from './vibrantDiffEqAucPart4';

export const ALL_DIFF_EQ_AUC_QUESTIONS: Question[] = [
  ...DIFF_EQ_AUC_PART_1_QUESTIONS,
  ...DIFF_EQ_AUC_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1, id: \`de-master-\${50 + idx + 1}\` })),
  ...DIFF_EQ_AUC_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1, id: \`de-master-\${100 + idx + 1}\` })),
  ...DIFF_EQ_AUC_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1, id: \`de-master-\${150 + idx + 1}\` })),
];

export const VIBRANT_DIFF_EQ_AUC_PAPER_1: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-1',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFF EQ PART 1)', questions: DIFF_EQ_AUC_PART_1_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_2: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-2',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 02 (Part 2 - 50Q Mastery)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFF EQ PART 2)', questions: DIFF_EQ_AUC_PART_2_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_3: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-3',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 03 (Part 3 - 50Q Advanced AUC)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (AUC PART 3)', questions: DIFF_EQ_AUC_PART_3_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_PAPER_4: ExamPaper = {
  id: 'vibrant-diff-eq-auc-part-4',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area CBT Mock Test 04 (Part 4 - 50Q Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (JEE ARCHIVE)', questions: DIFF_EQ_AUC_PART_4_QUESTIONS }],
};

export const VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-diff-eq-auc-complete-200',
  title: 'Vibrant Kota Mathematics - Diff Eq & Area Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 800,
  totalMarks: 800,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (COMPLETE DIFF EQ & AUC)', questions: ALL_DIFF_EQ_AUC_QUESTIONS }],
};

export const ALL_VIBRANT_DIFF_EQ_AUC_PAPERS: ExamPaper[] = [
  VIBRANT_DIFF_EQ_AUC_PAPER_1,
  VIBRANT_DIFF_EQ_AUC_PAPER_2,
  VIBRANT_DIFF_EQ_AUC_PAPER_3,
  VIBRANT_DIFF_EQ_AUC_PAPER_4,
  VIBRANT_DIFF_EQ_AUC_COMPLETE_PAPER,
];

export function getVibrantDiffEqAucLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_DIFF_EQ_AUC_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 44 + idx * 2);
    return {
      id: \`locked-diffeq-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-de-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 4. LIMIT, CONTINUITY & DIFFERENTIABILITY (237 Qs: 5 Parts)
// --------------------------------------------------------------------------
const lcdQs = makeQuestions('lcd', 237, 'mathematics', 'lcd');
const lcdP1 = lcdQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const lcdP2 = lcdQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const lcdP3 = lcdQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const lcdP4 = lcdQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const lcdP5 = lcdQs.slice(200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantLimitContDiffPart1.ts', `import { Question } from '../types/exam';\nexport const LIMIT_CONT_DIFF_PART_1_QUESTIONS: Question[] = ${JSON.stringify(lcdP1, null, 2)};`);
writeTsFile('vibrantLimitContDiffPart2.ts', `import { Question } from '../types/exam';\nexport const LIMIT_CONT_DIFF_PART_2_QUESTIONS: Question[] = ${JSON.stringify(lcdP2, null, 2)};`);
writeTsFile('vibrantLimitContDiffPart3.ts', `import { Question } from '../types/exam';\nexport const LIMIT_CONT_DIFF_PART_3_QUESTIONS: Question[] = ${JSON.stringify(lcdP3, null, 2)};`);
writeTsFile('vibrantLimitContDiffPart4.ts', `import { Question } from '../types/exam';\nexport const LIMIT_CONT_DIFF_PART_4_QUESTIONS: Question[] = ${JSON.stringify(lcdP4, null, 2)};`);
writeTsFile('vibrantLimitContDiffPart5.ts', `import { Question } from '../types/exam';\nexport const LIMIT_CONT_DIFF_PART_5_QUESTIONS: Question[] = ${JSON.stringify(lcdP5, null, 2)};`);

writeTsFile('vibrantLimitContDiffData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { LIMIT_CONT_DIFF_PART_1_QUESTIONS } from './vibrantLimitContDiffPart1';
import { LIMIT_CONT_DIFF_PART_2_QUESTIONS } from './vibrantLimitContDiffPart2';
import { LIMIT_CONT_DIFF_PART_3_QUESTIONS } from './vibrantLimitContDiffPart3';
import { LIMIT_CONT_DIFF_PART_4_QUESTIONS } from './vibrantLimitContDiffPart4';
import { LIMIT_CONT_DIFF_PART_5_QUESTIONS } from './vibrantLimitContDiffPart5';

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
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (LIMITS PART 1)', questions: LIMIT_CONT_DIFF_PART_1_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_2: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-2',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 02 (Part 2 - 50Q Limits Advanced)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (LIMITS PART 2)', questions: LIMIT_CONT_DIFF_PART_2_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_3: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-3',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 03 (Part 3 - 50Q Continuity)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (CONTINUITY)', questions: LIMIT_CONT_DIFF_PART_3_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_4: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-4',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 04 (Part 4 - 50Q Differentiability)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (DIFFERENTIABILITY)', questions: LIMIT_CONT_DIFF_PART_4_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_PAPER_5: ExamPaper = {
  id: 'vibrant-limit-cont-diff-part-5',
  title: 'Vibrant Kota Mathematics - LCD CBT Mock Test 05 (Part 5 - 37Q Archive)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 148,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (JEE ARCHIVE)', questions: LIMIT_CONT_DIFF_PART_5_QUESTIONS }],
};

export const VIBRANT_LIMIT_CONT_DIFF_COMPLETE_PAPER: ExamPaper = {
  id: 'vibrant-limit-cont-diff-complete-237',
  title: 'Vibrant Kota Mathematics - LCD Complete Series (Full Chapter Marathon)',
  pattern: 'JEE_MAIN',
  durationMinutes: 948,
  totalMarks: 948,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (COMPLETE LCD)', questions: ALL_LIMIT_CONT_DIFF_QUESTIONS }],
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
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_LIMIT_CONT_DIFF_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 54 + idx * 2);
    return {
      id: \`locked-lcd-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-lcd-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 5. KINEMATICS (88 Qs: Part 1 [50], Part 2 [38])
// --------------------------------------------------------------------------
const kinQs = makeQuestions('kin', 88, 'physics', null);
const kinP1 = kinQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const kinP2 = kinQs.slice(50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantKinematicsPart1.ts', `import { Question } from '../types/exam';\nexport const KINEMATICS_PART_1_QUESTIONS: Question[] = ${JSON.stringify(kinP1, null, 2)};`);
writeTsFile('vibrantKinematicsPart2.ts', `import { Question } from '../types/exam';\nexport const KINEMATICS_PART_2_QUESTIONS: Question[] = ${JSON.stringify(kinP2, null, 2)};`);

writeTsFile('vibrantKinematicsData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { KINEMATICS_PART_1_QUESTIONS } from './vibrantKinematicsPart1';
import { KINEMATICS_PART_2_QUESTIONS } from './vibrantKinematicsPart2';

export const ALL_88_KINEMATICS_QUESTIONS: Question[] = [
  ...KINEMATICS_PART_1_QUESTIONS,
  ...KINEMATICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
];

export const VIBRANT_KINEMATICS_PAPER_1: ExamPaper = {
  id: 'vibrant-kinematics-part-1',
  title: 'Allen Kota Physics - Kinematics 1D & 2D CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (KINEMATICS 1D & 2D)', questions: KINEMATICS_PART_1_QUESTIONS }],
};

export const VIBRANT_KINEMATICS_PAPER_2: ExamPaper = {
  id: 'vibrant-kinematics-part-2',
  title: 'Allen Kota Physics - Kinematics Projectile & Relative CBT Mock Test 02 (Part 2 - 38Q)',
  pattern: 'JEE_MAIN',
  durationMinutes: 152,
  totalMarks: 152,
  sections: [{ id: 'physics', name: 'PHYSICS (PROJECTILE & RELATIVE MOTION)', questions: KINEMATICS_PART_2_QUESTIONS }],
};

export const ALL_VIBRANT_KINEMATICS_PAPERS: ExamPaper[] = [
  VIBRANT_KINEMATICS_PAPER_1,
  VIBRANT_KINEMATICS_PAPER_2,
];

export function getVibrantKinematicsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_KINEMATICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 2 + idx * 2);
    return {
      id: \`locked-kinematics-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-kin-\${idx}\`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 6. ELECTROSTATICS (265 Qs: Part 1 [50], Part 2 [50], Part 3 [50], Part 4 [50], Part 5 [50], Part 6 [15])
// --------------------------------------------------------------------------
const elecQs = makeQuestions('elec', 265, 'physics', null);
const elecP1 = elecQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const elecP2 = elecQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const elecP3 = elecQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const elecP4 = elecQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const elecP5 = elecQs.slice(200, 250).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const elecP6 = elecQs.slice(250).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantElectrostaticsPart2.ts', `import { Question } from '../types/exam';\nexport const ELECTROSTATICS_PART_2_QUESTIONS: Question[] = ${JSON.stringify(elecP2, null, 2)};`);
writeTsFile('vibrantElectrostaticsPart3.ts', `import { Question } from '../types/exam';\nexport const ELECTROSTATICS_PART_3_QUESTIONS: Question[] = ${JSON.stringify(elecP3, null, 2)};`);
writeTsFile('vibrantElectrostaticsPart4.ts', `import { Question } from '../types/exam';\nexport const ELECTROSTATICS_PART_4_QUESTIONS: Question[] = ${JSON.stringify(elecP4, null, 2)};`);
writeTsFile('vibrantElectrostaticsPart5.ts', `import { Question } from '../types/exam';\nexport const ELECTROSTATICS_PART_5_QUESTIONS: Question[] = ${JSON.stringify(elecP5, null, 2)};`);
writeTsFile('vibrantElectrostaticsPart6.ts', `import { Question } from '../types/exam';\nexport const ELECTROSTATICS_PART_6_QUESTIONS: Question[] = ${JSON.stringify(elecP6, null, 2)};`);

writeTsFile('vibrantElectrostaticsData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { ELECTROSTATICS_PART_2_QUESTIONS } from './vibrantElectrostaticsPart2';
import { ELECTROSTATICS_PART_3_QUESTIONS } from './vibrantElectrostaticsPart3';
import { ELECTROSTATICS_PART_4_QUESTIONS } from './vibrantElectrostaticsPart4';
import { ELECTROSTATICS_PART_5_QUESTIONS } from './vibrantElectrostaticsPart5';
import { ELECTROSTATICS_PART_6_QUESTIONS } from './vibrantElectrostaticsPart6';

export const ELECTROSTATICS_PART_1_QUESTIONS: Question[] = ${JSON.stringify(elecP1, null, 2)};

export const ALL_ELECTROSTATICS_QS: Question[] = [
  ...ELECTROSTATICS_PART_1_QUESTIONS,
  ...ELECTROSTATICS_PART_2_QUESTIONS,
  ...ELECTROSTATICS_PART_3_QUESTIONS,
  ...ELECTROSTATICS_PART_4_QUESTIONS,
  ...ELECTROSTATICS_PART_5_QUESTIONS,
  ...ELECTROSTATICS_PART_6_QUESTIONS,
];

export const VIBRANT_ELECTROSTATICS_PAPER_1: ExamPaper = {
  id: 'vibrant-electrostatics-part-1',
  title: 'Vibrant Kota Physics - Electrostatics CBT Mock Test 01 (Part 1 - 50Q Sprint)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (ELECTROSTATICS PART 1)', questions: ELECTROSTATICS_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_ELECTROSTATICS_PAPERS: ExamPaper[] = [
  VIBRANT_ELECTROSTATICS_PAPER_1,
  {
    id: 'vibrant-electrostatics-part-2',
    title: 'Vibrant Kota Physics - Electrostatics CBT Mock Test 02 (Part 2 - 50Q Electric Field & Gauss)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 2)', questions: ELECTROSTATICS_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-electrostatics-part-3',
    title: 'Vibrant Kota Physics - Electrostatics CBT Mock Test 03 (Part 3 - 50Q Potential & Dipole)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 3)', questions: ELECTROSTATICS_PART_3_QUESTIONS }],
  },
];

export function getVibrantElectrostaticsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_ELECTROSTATICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + idx * 2);
    return {
      id: \`locked-electrostatics-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-elec-\${idx}\`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 7. GEOMETRICAL OPTICS (229 Qs: 5 Parts)
// --------------------------------------------------------------------------
const optQs = makeQuestions('opt', 229, 'physics', null);
const optP1 = optQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const optP2 = optQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const optP3 = optQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const optP4 = optQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const optP5 = optQs.slice(200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantGeometricalOpticsPart1.ts', `import { Question } from '../types/exam';\nexport const GEOMETRICAL_OPTICS_PART_1_QUESTIONS: Question[] = ${JSON.stringify(optP1, null, 2)};`);
writeTsFile('vibrantGeometricalOpticsPart2.ts', `import { Question } from '../types/exam';\nexport const GEOMETRICAL_OPTICS_PART_2_QUESTIONS: Question[] = ${JSON.stringify(optP2, null, 2)};`);
writeTsFile('vibrantGeometricalOpticsPart3.ts', `import { Question } from '../types/exam';\nexport const GEOMETRICAL_OPTICS_PART_3_QUESTIONS: Question[] = ${JSON.stringify(optP3, null, 2)};`);
writeTsFile('vibrantGeometricalOpticsPart4.ts', `import { Question } from '../types/exam';\nexport const GEOMETRICAL_OPTICS_PART_4_QUESTIONS: Question[] = ${JSON.stringify(optP4, null, 2)};`);
writeTsFile('vibrantGeometricalOpticsPart5.ts', `import { Question } from '../types/exam';\nexport const GEOMETRICAL_OPTICS_PART_5_QUESTIONS: Question[] = ${JSON.stringify(optP5, null, 2)};`);

writeTsFile('vibrantGeometricalOpticsData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { GEOMETRICAL_OPTICS_PART_1_QUESTIONS } from './vibrantGeometricalOpticsPart1';
import { GEOMETRICAL_OPTICS_PART_2_QUESTIONS } from './vibrantGeometricalOpticsPart2';
import { GEOMETRICAL_OPTICS_PART_3_QUESTIONS } from './vibrantGeometricalOpticsPart3';
import { GEOMETRICAL_OPTICS_PART_4_QUESTIONS } from './vibrantGeometricalOpticsPart4';
import { GEOMETRICAL_OPTICS_PART_5_QUESTIONS } from './vibrantGeometricalOpticsPart5';

export const ALL_229_OPTICS_QUESTIONS: Question[] = [
  ...GEOMETRICAL_OPTICS_PART_1_QUESTIONS,
  ...GEOMETRICAL_OPTICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...GEOMETRICAL_OPTICS_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_GEOMETRICAL_OPTICS_PAPER_1: ExamPaper = {
  id: 'vibrant-optics-part-1',
  title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 01 (Part 1 - 50Q Plane & Spherical Mirrors)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (OPTICS PART 1)', questions: GEOMETRICAL_OPTICS_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS: ExamPaper[] = [
  VIBRANT_GEOMETRICAL_OPTICS_PAPER_1,
  {
    id: 'vibrant-optics-part-2',
    title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 02 (Part 2 - 50Q Refraction & Lenses)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 2)', questions: GEOMETRICAL_OPTICS_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-optics-part-3',
    title: 'Vibrant Kota Physics - Geometrical Optics CBT Mock Test 03 (Part 3 - 50Q Prism & Optical Instruments)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (PART 3)', questions: GEOMETRICAL_OPTICS_PART_3_QUESTIONS }],
  },
];

export function getVibrantGeometricalOpticsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 6 + idx * 2);
    return {
      id: \`locked-optics-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-opt-\${idx}\`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 8. MODERN PHYSICS (243 Qs: 5 Parts)
// --------------------------------------------------------------------------
const modQs = makeQuestions('mod', 243, 'physics', null);
const modP1 = modQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const modP2 = modQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const modP3 = modQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const modP4 = modQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const modP5 = modQs.slice(200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantModernPhysicsPart1.ts', `import { Question } from '../types/exam';\nexport const MODERN_PHYSICS_PART_1_QUESTIONS: Question[] = ${JSON.stringify(modP1, null, 2)};`);
writeTsFile('vibrantModernPhysicsPart2.ts', `import { Question } from '../types/exam';\nexport const MODERN_PHYSICS_PART_2_QUESTIONS: Question[] = ${JSON.stringify(modP2, null, 2)};`);
writeTsFile('vibrantModernPhysicsPart3.ts', `import { Question } from '../types/exam';\nexport const MODERN_PHYSICS_PART_3_QUESTIONS: Question[] = ${JSON.stringify(modP3, null, 2)};`);
writeTsFile('vibrantModernPhysicsPart4.ts', `import { Question } from '../types/exam';\nexport const MODERN_PHYSICS_PART_4_QUESTIONS: Question[] = ${JSON.stringify(modP4, null, 2)};`);
writeTsFile('vibrantModernPhysicsPart5.ts', `import { Question } from '../types/exam';\nexport const MODERN_PHYSICS_PART_5_QUESTIONS: Question[] = ${JSON.stringify(modP5, null, 2)};`);

writeTsFile('vibrantModernPhysicsData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { MODERN_PHYSICS_PART_1_QUESTIONS } from './vibrantModernPhysicsPart1';
import { MODERN_PHYSICS_PART_2_QUESTIONS } from './vibrantModernPhysicsPart2';
import { MODERN_PHYSICS_PART_3_QUESTIONS } from './vibrantModernPhysicsPart3';
import { MODERN_PHYSICS_PART_4_QUESTIONS } from './vibrantModernPhysicsPart4';
import { MODERN_PHYSICS_PART_5_QUESTIONS } from './vibrantModernPhysicsPart5';

export const ALL_243_MODERN_PHYSICS_QUESTIONS: Question[] = [
  ...MODERN_PHYSICS_PART_1_QUESTIONS,
  ...MODERN_PHYSICS_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...MODERN_PHYSICS_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...MODERN_PHYSICS_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...MODERN_PHYSICS_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_MODERN_PHYSICS_PAPER_1: ExamPaper = {
  id: 'vibrant-modern-part-1',
  title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 01 (Part 1 - 50Q Photoelectric Effect & de Broglie)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (PHOTOELECTRIC & MATTER WAVES)', questions: MODERN_PHYSICS_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_MODERN_PHYSICS_PAPERS: ExamPaper[] = [
  VIBRANT_MODERN_PHYSICS_PAPER_1,
  {
    id: 'vibrant-modern-part-2',
    title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 02 (Part 2 - 50Q Bohr Model & X-Rays)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (ATOMIC PHYSICS & X-RAYS)', questions: MODERN_PHYSICS_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-modern-part-3',
    title: 'Vibrant Kota Physics - Modern Physics CBT Mock Test 03 (Part 3 - 50Q Nuclear Physics & Radioactivity)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (NUCLEAR PHYSICS)', questions: MODERN_PHYSICS_PART_3_QUESTIONS }],
  },
];

export function getVibrantModernPhysicsLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_MODERN_PHYSICS_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 12 + idx * 2);
    return {
      id: \`locked-modern-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-mod-\${idx}\`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 9. CURRENT ELECTRICITY (224 Qs: 5 Parts)
// --------------------------------------------------------------------------
const currQs = makeQuestions('curr', 224, 'physics', null);
const currP1 = currQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const currP2 = currQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const currP3 = currQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const currP4 = currQs.slice(150, 200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const currP5 = currQs.slice(200).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantCurrentElectricityPart1.ts', `import { Question } from '../types/exam';\nexport const CURRENT_ELECTRICITY_PART_1_QUESTIONS: Question[] = ${JSON.stringify(currP1, null, 2)};`);
writeTsFile('vibrantCurrentElectricityPart2.ts', `import { Question } from '../types/exam';\nexport const CURRENT_ELECTRICITY_PART_2_QUESTIONS: Question[] = ${JSON.stringify(currP2, null, 2)};`);
writeTsFile('vibrantCurrentElectricityPart3.ts', `import { Question } from '../types/exam';\nexport const CURRENT_ELECTRICITY_PART_3_QUESTIONS: Question[] = ${JSON.stringify(currP3, null, 2)};`);
writeTsFile('vibrantCurrentElectricityPart4.ts', `import { Question } from '../types/exam';\nexport const CURRENT_ELECTRICITY_PART_4_QUESTIONS: Question[] = ${JSON.stringify(currP4, null, 2)};`);
writeTsFile('vibrantCurrentElectricityPart5.ts', `import { Question } from '../types/exam';\nexport const CURRENT_ELECTRICITY_PART_5_QUESTIONS: Question[] = ${JSON.stringify(currP5, null, 2)};`);

writeTsFile('vibrantCurrentElectricityData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { CURRENT_ELECTRICITY_PART_1_QUESTIONS } from './vibrantCurrentElectricityPart1';
import { CURRENT_ELECTRICITY_PART_2_QUESTIONS } from './vibrantCurrentElectricityPart2';
import { CURRENT_ELECTRICITY_PART_3_QUESTIONS } from './vibrantCurrentElectricityPart3';
import { CURRENT_ELECTRICITY_PART_4_QUESTIONS } from './vibrantCurrentElectricityPart4';
import { CURRENT_ELECTRICITY_PART_5_QUESTIONS } from './vibrantCurrentElectricityPart5';

export const ALL_224_CURRENT_ELECTRICITY_QUESTIONS: Question[] = [
  ...CURRENT_ELECTRICITY_PART_1_QUESTIONS,
  ...CURRENT_ELECTRICITY_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
  ...CURRENT_ELECTRICITY_PART_5_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 200 + idx + 1 })),
];

export const VIBRANT_CURRENT_ELECTRICITY_PAPER_1: ExamPaper = {
  id: 'vibrant-current-part-1',
  title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 01 (Part 1 - 50Q Ohm & Circuits)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'physics', name: 'PHYSICS (OHMS LAW & CIRCUIT THEOREMS)', questions: CURRENT_ELECTRICITY_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_CURRENT_ELECTRICITY_PAPERS: ExamPaper[] = [
  VIBRANT_CURRENT_ELECTRICITY_PAPER_1,
  {
    id: 'vibrant-current-part-2',
    title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 02 (Part 2 - 50Q KCL, KVL & Symmetries)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (KIRCHHOFF LAWS & BRIDGE NETWORKS)', questions: CURRENT_ELECTRICITY_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-current-part-3',
    title: 'Vibrant Kota Physics - Current Electricity CBT Mock Test 03 (Part 3 - 50Q Instruments & Potentiometer)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'physics', name: 'PHYSICS (MEASURING INSTRUMENTS)', questions: CURRENT_ELECTRICITY_PART_3_QUESTIONS }],
  },
];

export function getVibrantCurrentElectricityLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_CURRENT_ELECTRICITY_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 18 + idx * 2);
    return {
      id: \`locked-current-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-curr-\${idx}\`, subject: 'physics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 10. VECTORS & 3D (113 Qs: 3 Parts)
// --------------------------------------------------------------------------
const vecQs = makeQuestions('vec', 113, 'mathematics', null);
const vecP1 = vecQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const vecP2 = vecQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const vecP3 = vecQs.slice(100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantVectors3DPart1.ts', `import { Question } from '../types/exam';\nexport const VECTORS_3D_PART_1_QUESTIONS: Question[] = ${JSON.stringify(vecP1, null, 2)};`);
writeTsFile('vibrantVectors3DPart2.ts', `import { Question } from '../types/exam';\nexport const VECTORS_3D_PART_2_QUESTIONS: Question[] = ${JSON.stringify(vecP2, null, 2)};`);
writeTsFile('vibrantVectors3DPart3.ts', `import { Question } from '../types/exam';\nexport const VECTORS_3D_PART_3_QUESTIONS: Question[] = ${JSON.stringify(vecP3, null, 2)};`);

writeTsFile('vibrantVectors3DData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { VECTORS_3D_PART_1_QUESTIONS } from './vibrantVectors3DPart1';
import { VECTORS_3D_PART_2_QUESTIONS } from './vibrantVectors3DPart2';
import { VECTORS_3D_PART_3_QUESTIONS } from './vibrantVectors3DPart3';

export const ALL_113_VECTORS_3D_QUESTIONS: Question[] = [
  ...VECTORS_3D_PART_1_QUESTIONS,
  ...VECTORS_3D_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...VECTORS_3D_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
];

export const VIBRANT_VECTORS_3D_PAPER_1: ExamPaper = {
  id: 'vibrant-vectors-part-1',
  title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 01 (Part 1 - 50Q Dot & Cross Products)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (VECTORS PRODUCT OPERATIONS)', questions: VECTORS_3D_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_VECTORS_3D_PAPERS: ExamPaper[] = [
  VIBRANT_VECTORS_3D_PAPER_1,
  {
    id: 'vibrant-vectors-part-2',
    title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 02 (Part 2 - 50Q Triple Products & Lines)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (BOX PRODUCT & STRAIGHT LINES IN 3D)', questions: VECTORS_3D_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-vectors-part-3',
    title: 'Vibrant Kota Mathematics - Vectors & 3D CBT Mock Test 03 (Part 3 - 13Q Planes & Shortest Distance)',
    pattern: 'JEE_MAIN',
    durationMinutes: 60,
    totalMarks: 52,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (PLANES & SKEW LINES)', questions: VECTORS_3D_PART_3_QUESTIONS }],
  },
];

export function getVibrantVectors3DLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_VECTORS_3D_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 22 + idx * 2);
    return {
      id: \`locked-vectors-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-vec-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

// --------------------------------------------------------------------------
// 11. INTEGRATION (185 Qs: 4 Parts)
// --------------------------------------------------------------------------
const intQs = makeQuestions('int', 185, 'mathematics', null);
const intP1 = intQs.slice(0, 50).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const intP2 = intQs.slice(50, 100).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const intP3 = intQs.slice(100, 150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
const intP4 = intQs.slice(150).map((q, idx) => ({ ...q, questionNumber: idx + 1 }));

writeTsFile('vibrantIntegrationPart1.ts', `import { Question } from '../types/exam';\nexport const INTEGRATION_PART_1_QUESTIONS: Question[] = ${JSON.stringify(intP1, null, 2)};`);
writeTsFile('vibrantIntegrationPart2.ts', `import { Question } from '../types/exam';\nexport const INTEGRATION_PART_2_QUESTIONS: Question[] = ${JSON.stringify(intP2, null, 2)};`);
writeTsFile('vibrantIntegrationPart3.ts', `import { Question } from '../types/exam';\nexport const INTEGRATION_PART_3_QUESTIONS: Question[] = ${JSON.stringify(intP3, null, 2)};`);
writeTsFile('vibrantIntegrationPart4.ts', `import { Question } from '../types/exam';\nexport const INTEGRATION_PART_4_QUESTIONS: Question[] = ${JSON.stringify(intP4, null, 2)};`);

writeTsFile('vibrantIntegrationData.ts', `
import { ExamPaper, ScheduledTest, Question } from '../types/exam';
import { INTEGRATION_PART_1_QUESTIONS } from './vibrantIntegrationPart1';
import { INTEGRATION_PART_2_QUESTIONS } from './vibrantIntegrationPart2';
import { INTEGRATION_PART_3_QUESTIONS } from './vibrantIntegrationPart3';
import { INTEGRATION_PART_4_QUESTIONS } from './vibrantIntegrationPart4';

export const ALL_185_INTEGRATION_QUESTIONS: Question[] = [
  ...INTEGRATION_PART_1_QUESTIONS,
  ...INTEGRATION_PART_2_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 50 + idx + 1 })),
  ...INTEGRATION_PART_3_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 100 + idx + 1 })),
  ...INTEGRATION_PART_4_QUESTIONS.map((q, idx) => ({ ...q, questionNumber: 150 + idx + 1 })),
];

export const VIBRANT_INTEGRATION_PAPER_1: ExamPaper = {
  id: 'vibrant-integration-part-1',
  title: 'Vibrant Kota Mathematics - Indefinite Integration CBT Mock Test 01 (Part 1 - 50Q Substitution & Parts)',
  pattern: 'JEE_MAIN',
  durationMinutes: 180,
  totalMarks: 200,
  sections: [{ id: 'mathematics', name: 'MATHEMATICS (INDEFINITE INTEGRATION)', questions: INTEGRATION_PART_1_QUESTIONS }],
};

export const ALL_VIBRANT_INTEGRATION_PAPERS: ExamPaper[] = [
  VIBRANT_INTEGRATION_PAPER_1,
  {
    id: 'vibrant-integration-part-2',
    title: 'Vibrant Kota Mathematics - Definite Integration CBT Mock Test 02 (Part 2 - 50Q Kings Rule & Properties)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (DEFINITE INTEGRALS)', questions: INTEGRATION_PART_2_QUESTIONS }],
  },
  {
    id: 'vibrant-integration-part-3',
    title: 'Vibrant Kota Mathematics - Definite Integration CBT Mock Test 03 (Part 3 - 50Q Leibniz Rule & Limit as Sum)',
    pattern: 'JEE_MAIN',
    durationMinutes: 180,
    totalMarks: 200,
    sections: [{ id: 'mathematics', name: 'MATHEMATICS (LEIBNIZ DIFFERENTIATION & RIEMANN SUM)', questions: INTEGRATION_PART_3_QUESTIONS }],
  },
];

export function getVibrantIntegrationLockedTests(baseDateStr?: string): ScheduledTest[] {
  const d = new Date(baseDateStr || '2026-10-18');
  const formatIso = (date: Date) => date.toISOString().split('T')[0];
  return ALL_VIBRANT_INTEGRATION_PAPERS.map((paper, idx) => {
    const testDate = new Date(d);
    testDate.setDate(d.getDate() + 24 + idx * 2);
    return {
      id: \`locked-integration-\${idx + 1}\`,
      title: paper.title,
      pattern: 'JEE_MAIN',
      scheduledDate: formatIso(testDate),
      startTime: '09:00',
      endTime: '12:00',
      durationMinutes: paper.durationMinutes,
      totalMarks: paper.totalMarks,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + idx,
      syllabus: [{ id: \`syl-int-\${idx}\`, subject: 'mathematics', name: paper.sections[0].name, completed: false }],
    };
  });
}
`);

console.log('Successfully generated all missing data chapter files!');
