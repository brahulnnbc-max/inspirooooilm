const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

// Helper to escape strings for TS code literals
function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function cleanLatex(s) {
  if (!s) return '';
  return s
    .replace(//g, '\\lambda ')
    .replace(//g, '\\mu ')
    .replace(//g, '\\nu ')
    .replace(//g, '\\pi ')
    .replace(//g, '\\alpha ')
    .replace(//g, '\\beta ')
    .replace(//g, '\\gamma ')
    .replace(//g, '\\delta ')
    .replace(//g, '\\theta ')
    .replace(//g, '\\phi ')
    .replace(//g, '\\sigma ')
    .replace(//g, '\\rho ')
    .replace(//g, '\\,\\Omega')
    .replace(//g, '\\Delta ')
    .replace(//g, '\\sum ')
    .replace(//g, '\\prod ')
    .replace(//g, 'I')
    .replace(/Å/g, ' \\text{\\AA}')
    .replace(/–/g, '-')
    .replace(/—/g, '-')
    .replace(/×/g, '\\times ')
    .replace(/≤/g, '\\le ')
    .replace(/≥/g, '\\ge ')
    .replace(/≠/g, '\\ne ')
    .replace(/∈/g, '\\in ')
    .replace(/∉/g, '\\notin ')
    .replace(/∞/g, '\\infty ')
    .replace(/√/g, '\\sqrt ')
    .replace(/\r/g, '')
    .trim();
}

// Generate TS file for questions array
function writeQuestionsFile(filePath, varName, questions) {
  const content = `import { Question } from '../types/exam.ts';

export const ${varName}: Question[] = [
${questions
  .map(
    (q) => `  {
    id: '${escapeStr(q.id)}',
    questionNumber: ${q.questionNumber},
    sectionId: 'mathematics',
    type: '${q.type}',
    promptLatex: '${escapeStr(q.promptLatex)}',
    ${
      q.options && q.options.length
        ? `options: [
${q.options
  .map(
    (opt) => `      { id: '${opt.id}', labelLatex: '${escapeStr(opt.labelLatex)}' },`
  )
  .join('\n')}
    ],`
        : ''
    }
    correctAnswer: '${escapeStr(q.correctAnswer)}',
    explanationLatex: '${escapeStr(q.explanationLatex)}',
    positiveMarks: ${q.positiveMarks},
    negativeMarks: ${q.negativeMarks},
  },`
  )
  .join('\n')}
];
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote ${questions.length} questions to ${filePath}`);
}

module.exports = {
  escapeStr,
  cleanLatex,
  writeQuestionsFile,
};
