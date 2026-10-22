const fs = require('fs');
const path = require('path');
const { escapeTs } = require('./generateAllAuthenticMathKaTeX.cjs');
const { MATRICES_ANSWERS, DETERMINANT_ANSWERS, BINOMIAL_ANSWERS } = require('./chapterAnswerKeys.cjs');

// Helper to write formatted TS question file
function writePartFile(filePath, varName, questions) {
  const content = `import { Question } from '../types/exam.ts';

export const ${varName}: Question[] = [
${questions.map((q) => {
  const isNumerical = q.type === 'NUMERICAL';
  return `  {
    id: '${q.id}',
    questionNumber: ${q.questionNumber},
    sectionId: 'mathematics',
    type: '${q.type}',
    promptLatex: '${escapeTs(q.promptLatex)}',
    ${isNumerical ? '' : `options: [
      { id: 'A', labelLatex: '${escapeTs(q.options[0]?.labelLatex || '(A)')}' },
      { id: 'B', labelLatex: '${escapeTs(q.options[1]?.labelLatex || '(B)')}' },
      { id: 'C', labelLatex: '${escapeTs(q.options[2]?.labelLatex || '(C)')}' },
      { id: 'D', labelLatex: '${escapeTs(q.options[3]?.labelLatex || '(D)')}' }
    ],`}
    correctAnswer: '${escapeTs(q.correctAnswer)}',
    explanationLatex: '${escapeTs(q.explanationLatex)}',
    positiveMarks: 4,
    negativeMarks: ${isNumerical ? 0 : 1},
  },`;
}).join('\n')}
];
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved ${questions.length} authentic KaTeX questions to ${filePath}`);
}

module.exports = { writePartFile };
