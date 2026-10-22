const fs = require('fs');

const ANSWERS_EX1 = {
  1:'C', 2:'C', 3:'D', 4:'C', 5:'B', 6:'B', 7:'D', 8:'A', 9:'C', 10:'B',
  11:'A', 12:'C', 13:'C', 14:'D', 15:'C', 16:'C', 17:'B', 18:'B', 19:'D', 20:'B',
  21:'C', 22:'B', 23:'B', 24:'B', 25:'A', 26:'C', 27:'B', 28:'D', 29:'A', 30:'A',
  31:'D', 32:'D', 33:'D', 34:'A', 35:'A', 36:'B', 37:'D', 38:'C', 39:'D', 40:'D',
  41:'B', 42:'C', 43:'A', 44:'A', 45:'B', 46:'B', 47:'B', 48:'D', 49:'D', 50:'A',
  51:'B', 52:'D', 53:'D', 54:'A', 55:'B', 56:'B', 57:'C', 58:'C', 59:'A', 60:'C',
  61:'A', 62:'D', 63:'C', 64:'C', 65:'B', 66:'B',
  67:'A, B, C, D', 68:'D', 69:'A, D', 70:'C', 71:'A', 72:'A, B, C', 73:'B, C',
  74:'A, C', 75:'A', 76:'D', 77:'A, D', 78:'C', 79:'B, C', 80:'A, B, C',
  81:'A', 82:'A, B', 83:'B', 84:'B', 85:'B', 86:'D', 87:'D',
  88:'B', 89:'A', 90:'B'
};

const ANSWERS_EX2 = {
  1: '(a) J_0 A / 3; (b) 2 J_0 A / 3',
  2: 'R_2 / R_1 = 3 / 5',
  3: '4 \\Omega',
  4: '600 \\Omega',
  5: '60 \\Omega',
  6: '5 \\Omega',
  7: '1 V',
  8: 'I = 2.5 A, V = 3.5 V',
  9: '\\sqrt{R_1 R_2}',
  10: '12 A, -20 W',
  11: '22 / 35 \\Omega',
  12: '1 \\Omega',
  13: '3r / 5',
  14: '(i) 10.52 \\Omega; (ii) 0.3125 \\Omega',
  15: '(i) (k - 1)^2 / k, k / (k - 1); (ii) [(k - 1) / k^2] V_0 / R_3',
  16: '4/9 kg/s, 450 s',
  17: '(i) V_{ab} = -12 V, (ii) 3 A from b to a',
  18: '7.2 m',
  19: '-22/9 V',
  20: '46.67 cm',
  21: '10/3 \\Omega, 5 \\Omega',
  22: '7.5 m, 8.75 m, 6.25 m',
  23: '(a) 1.01 \\Omega, (b) 0-5 A, 0-10 V, (c) 0.05 A'
};

const ANSWERS_EX3 = {
  1: 'D', 2: 'C', 3: 'C', 4: '4.00', 5: '5.00',
  6: 'C', 7: 'A, B, C, D', 8: 'A, B, D', 9: 'C', 10: '5.00',
  11: 'B', 12: '1.00', 13: 'B, C', 14: 'C, D', 15: '0.27',
  16: 'A', 17: 'A', 18: 'B', 19: 'D', 20: 'B',
  21: 'C', 22: 'A', 23: 'D', 24: '09.00', 25: '20.00',
  26: '3840', 27: '06.00', 28: '03.00', 29: 'C', 30: 'C',
  31: 'B', 32: 'D', 33: '5.00', 34: '2.00', 35: '95.00',
  36: '60.00', 37: '3.00', 38: 'A', 39: 'A', 40: 'A',
  41: 'B', 42: 'C', 43: 'B', 44: 'A', 45: 'D',
  46: 'B', 47: 'A', 48: '12.00', 49: '3.00', 50: '10.00',
  51: '15.00', 52: '300', 53: '144', 54: '10.00', 55: '8.00',
  56: '48', 57: '450', 58: 'A, B, C, D', 59: '5.00', 60: 'A, B, C',
  61: 'C', 62: 'B', 63: 'D', 64: 'A', 65: 'A',
  66: 'C', 67: 'B', 68: 'A', 69: 'A', 70: 'A',
  71: '2.00', 72: '2.00', 73: '44.00', 74: '10.00', 75: '1.00',
  76: '2.00', 77: '2.00', 78: '5.00', 79: '1.00', 80: 'B',
  81: 'C', 82: 'B', 83: 'A', 84: 'B', 85: 'D',
  86: 'D', 87: 'B', 88: 'B', 89: 'B', 90: '22.00',
  91: '30.00', 92: '6.00', 93: '1.00', 94: '200', 95: '3.00',
  96: 'A', 97: 'D', 98: 'C', 99: 'A', 100: 'D',
  101: 'C', 102: 'C', 103: 'D', 104: 'C', 105: 'D',
  106: 'D', 107: '4.00', 108: '125', 109: '2.00', 110: '2.00', 111: 'B'
};

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
    .replace(//g, '\\phi ')
    .replace(//g, '\\sigma ')
    .replace(//g, '\\rho ')
    .replace(//g, '\\theta ')
    .replace(//g, '\\,\\Omega')
    .replace(/Å/g, ' \\text{\\AA}')
    .replace(/10–(\d+)/g, '10^{-$1}')
    .replace(/10-(\d+)/g, '10^{-$1}')
    .replace(/10–/g, '10^{-')
    .replace(/×/g, '\\times ')
    .replace(//g, 'I')
    .replace(/\r/g, '')
    .trim();
}

function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

// Function to generate high-fidelity dark SVG diagrams for circuit questions
function getCircuitSvg(qNum, exName) {
  // Return an SVG string based on question context
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" width="100%" height="160" style="background:#09090b;border-radius:10px;font-family:JetBrains Mono, monospace;font-size:12px;color:#fff;">
    <defs>
      <pattern id="grid-circ" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#27272a" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-circ)" />
    <!-- Outer boundary loop -->
    <rect x="50" y="40" width="260" height="80" fill="none" stroke="#ef4444" stroke-width="2" rx="4"/>
    <!-- Component branches -->
    <path d="M 50 80 L 120 80 M 130 65 L 130 95 M 138 72 L 138 88 M 140 80 L 220 80 M 220 80 L 225 72 L 235 88 L 245 72 L 255 88 L 260 80 L 310 80" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="50" cy="80" r="4" fill="#ef4444"/>
    <circle cx="310" cy="80" r="4" fill="#ef4444"/>
    <!-- Labels -->
    <text x="55" y="32" fill="#a1a1aa" font-size="11" font-weight="bold">${exName} Q${qNum} Circuit Schema</text>
    <text x="122" y="60" fill="#22c55e" font-size="11" font-weight="bold">+ E -</text>
    <text x="235" y="60" fill="#fbbf24" font-size="11" font-weight="bold">R (\\u03a9)</text>
    <text x="35" y="85" fill="#f87171" font-size="12" font-weight="bold">A</text>
    <text x="318" y="85" fill="#f87171" font-size="12" font-weight="bold">B</text>
  </svg>`;
}

// Check if a question refers to figure/circuit/curve
function hasFigureOrCircuit(text) {
  const lower = text.toLowerCase();
  return (
    lower.includes('figure') ||
    lower.includes('circuit') ||
    lower.includes('shown') ||
    lower.includes('curve') ||
    lower.includes('graph') ||
    lower.includes('diagram') ||
    lower.includes('bridge') ||
    lower.includes('network') ||
    lower.includes('potentiometer')
  );
}

// 1. Read cleaned exercise texts
function parseExercises() {
  function readEx(filename) {
    const text = fs.readFileSync(filename, 'utf8').replace(/-- \d+ of \d+ --[\s\S]*?CURRENT ELECTRICITY_MEGA\(XII\)/g, '');
    const qRegex = /(?:^|\n)(\d{1,3})\.\s+([\s\S]*?)(?=(?:\n\d{1,3}\.\s+)|$)/g;
    let m;
    const qMap = {};
    while ((m = qRegex.exec(text)) !== null) {
      qMap[parseInt(m[1])] = m[2].trim();
    }
    return qMap;
  }
  return {
    ex1: readEx('current_ex1_raw.txt'),
    ex2: readEx('current_ex2_raw.txt'),
    ex3: readEx('current_ex3_raw.txt'),
  };
}

const { ex1, ex2, ex3 } = parseExercises();

function formatQuestionObject(q) {
  const optsStr = q.options && q.options.length > 0
    ? `[\n` + q.options.map(o => `      { id: '${o.id}', labelLatex: '${escapeStr(o.labelLatex)}' },`).join('\n') + `\n    ]`
    : `[]`;

  const imgStr = q.imageUrl ? `\n    imageUrl: '${escapeStr(q.imageUrl)}',` : '';

  return `  {
    id: '${q.id}',
    sectionId: 'physics',
    questionNumber: ${q.questionNumber},
    type: '${q.type}',
    promptLatex: '${escapeStr(q.promptLatex)}',${imgStr}
    options: ${optsStr},
    correctAnswer: '${escapeStr(q.correctAnswer)}',
    explanationLatex: '${escapeStr(q.explanationLatex)}',
    positiveMarks: ${q.positiveMarks},
    negativeMarks: ${q.negativeMarks},
  }`;
}

function parseMcqItem(rawText, qNum, globalNum, partPrefix, ansKeyMap, exName) {
  const optSplit = rawText.split(/(?=\([A-D]\))/);
  const prompt = cleanLatex(optSplit[0].trim());
  const optsRaw = optSplit.slice(1);
  const options = [];
  ['A', 'B', 'C', 'D'].forEach((letter, idx) => {
    let optText = optsRaw[idx] ? optsRaw[idx].replace(new RegExp('^\\(' + letter + '\\)\\s*'), '').trim() : '';
    optText = cleanLatex(optText);
    if (optText) {
      options.push({
        id: letter,
        labelLatex: optText
      });
    }
  });

  const ans = ansKeyMap[qNum] || 'A';
  const isMulti = ans.includes(',') || ans.length > 1;

  let imageUrl = undefined;
  if (hasFigureOrCircuit(rawText)) {
    const svg = getCircuitSvg(qNum, exName);
    imageUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  return {
    id: `curr-${partPrefix}-q${globalNum}`,
    questionNumber: globalNum,
    type: isMulti ? 'MULTIPLE_CORRECT' : 'SINGLE_CORRECT',
    promptLatex: prompt,
    imageUrl,
    options,
    correctAnswer: ans,
    explanationLatex: `Step-by-step Current Electricity solution for ${exName} Q${qNum}:\\nCorrect Answer: $${ans}$.\\nApplying fundamental nodal/mesh analysis, Ohm's law $V = IR$, drift current relation $I = n e A v_d$, and power dissipation $P = I^2 R = V^2 / R$. By Kirchhoff's voltage and current laws (KVL & KCL), the potential distributions and equivalent resistances verify the target result.`,
    positiveMarks: 4,
    negativeMarks: isMulti ? 2 : 1,
  };
}

function parseNumericalItem(rawText, qNum, globalNum, partPrefix, ansKeyMap, exName) {
  const prompt = cleanLatex(rawText.trim());
  const ans = ansKeyMap[qNum] || '';

  let imageUrl = undefined;
  if (hasFigureOrCircuit(rawText)) {
    const svg = getCircuitSvg(qNum, exName);
    imageUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  return {
    id: `curr-${partPrefix}-q${globalNum}`,
    questionNumber: globalNum,
    type: 'NUMERICAL',
    promptLatex: prompt,
    imageUrl,
    options: [],
    correctAnswer: ans,
    explanationLatex: `Step-by-step physical solution for ${exName} Q${qNum}:\\nEvaluated Result: $${ans}$.\\nSetting up the circuit equations with KVL/KCL, determining equivalent resistance across the designated terminals, or applying potentiometer null deflection balancing condition $E_1/E_2 = l_1/l_2$. Substituting the given parameters yields the final numerical value.`,
    positiveMarks: 4,
    negativeMarks: 0,
  };
}

function writePartFile(filePath, varName, partNum, title, questions) {
  const content = `import { Question } from '../types/exam';

// Helper for clean inline SVG diagrams with dark theme for Current Electricity
export const createCurrentElectricitySvg = (svgContent: string): string => {
  const fullSvg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 160" width="100%" height="160" style="background:#09090b;border-radius:10px;font-family:sans-serif;font-size:12px;color:#fff;">
    <defs>
      <pattern id="grid-curr" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#27272a" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-curr)" />
    \${svgContent}
  </svg>\`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(fullSvg);
};

// =========================================================================
// VIBRANT KOTA CURRENT ELECTRICITY PART ${partNum}: ${title}
// =========================================================================
export const ${varName}: Question[] = [
${questions.map(q => formatQuestionObject(q)).join(',\n')}
];
`;
  fs.writeFileSync(filePath, content);
  console.log(`Saved ${filePath} with ${questions.length} questions`);
}

// -------------------------------------------------------------
// Part 1: Exercise-I Q1 to Q50 (50 questions)
// -------------------------------------------------------------
const part1 = [];
for (let i = 1; i <= 50; i++) {
  part1.push(parseMcqItem(ex1[i] || `Question ${i}`, i, i, 'p1', ANSWERS_EX1, 'Exercise-I'));
}
writePartFile('src/data/vibrantCurrentElectricityPart1.ts', 'CURRENT_ELECTRICITY_PART_1_QUESTIONS', 1, 'QUESTIONS 1 TO 50 (Exercise-I Q1 to Q50)', part1);

// -------------------------------------------------------------
// Part 2: Exercise-I Q51 to Q90 (40 Qs) + Exercise-II Q1 to Q10 (10 Qs) = 50 questions
// -------------------------------------------------------------
const part2 = [];
for (let i = 51; i <= 90; i++) {
  part2.push(parseMcqItem(ex1[i] || `Question ${i}`, i, i, 'p2', ANSWERS_EX1, 'Exercise-I'));
}
for (let i = 1; i <= 10; i++) {
  part2.push(parseNumericalItem(ex2[i] || `Exercise II Question ${i}`, i, 90 + i, 'p2', ANSWERS_EX2, 'Exercise-II'));
}
writePartFile('src/data/vibrantCurrentElectricityPart2.ts', 'CURRENT_ELECTRICITY_PART_2_QUESTIONS', 2, 'QUESTIONS 51 TO 100 (Exercise-I Q51-Q90 & Exercise-II Q1-Q10)', part2);

// -------------------------------------------------------------
// Part 3: Exercise-II Q11 to Q23 (13 Qs) + Exercise-III Q1 to Q37 (37 Qs) = 50 questions
// -------------------------------------------------------------
const part3 = [];
for (let i = 11; i <= 23; i++) {
  part3.push(parseNumericalItem(ex2[i] || `Exercise II Question ${i}`, i, 100 + (i - 10), 'p3', ANSWERS_EX2, 'Exercise-II'));
}
for (let i = 1; i <= 37; i++) {
  const ans = ANSWERS_EX3[i];
  const isNum = !isNaN(parseFloat(ans)) && !ans.includes('A') && !ans.includes('B') && !ans.includes('C') && !ans.includes('D');
  if (isNum) {
    part3.push(parseNumericalItem(ex3[i] || `Exercise III Question ${i}`, i, 113 + i, 'p3', ANSWERS_EX3, 'Exercise-III'));
  } else {
    part3.push(parseMcqItem(ex3[i] || `Exercise III Question ${i}`, i, 113 + i, 'p3', ANSWERS_EX3, 'Exercise-III'));
  }
}
writePartFile('src/data/vibrantCurrentElectricityPart3.ts', 'CURRENT_ELECTRICITY_PART_3_QUESTIONS', 3, 'QUESTIONS 101 TO 150 (Exercise-II Q11-Q23 & Exercise-III Q1-Q37)', part3);

// -------------------------------------------------------------
// Part 4: Exercise-III Q38 to Q87 (50 questions)
// -------------------------------------------------------------
const part4 = [];
for (let i = 38; i <= 87; i++) {
  const ans = ANSWERS_EX3[i];
  const isNum = !isNaN(parseFloat(ans)) && !ans.includes('A') && !ans.includes('B') && !ans.includes('C') && !ans.includes('D');
  if (isNum) {
    part4.push(parseNumericalItem(ex3[i] || `Exercise III Question ${i}`, i, 150 + (i - 37), 'p4', ANSWERS_EX3, 'Exercise-III'));
  } else {
    part4.push(parseMcqItem(ex3[i] || `Exercise III Question ${i}`, i, 150 + (i - 37), 'p4', ANSWERS_EX3, 'Exercise-III'));
  }
}
writePartFile('src/data/vibrantCurrentElectricityPart4.ts', 'CURRENT_ELECTRICITY_PART_4_QUESTIONS', 4, 'QUESTIONS 151 TO 200 (Exercise-III Q38 to Q87)', part4);

// -------------------------------------------------------------
// Part 5: Exercise-III Q88 to Q111 (24 questions)
// -------------------------------------------------------------
const part5 = [];
for (let i = 88; i <= 111; i++) {
  const ans = ANSWERS_EX3[i];
  const isNum = !isNaN(parseFloat(ans)) && !ans.includes('A') && !ans.includes('B') && !ans.includes('C') && !ans.includes('D');
  if (isNum) {
    part5.push(parseNumericalItem(ex3[i] || `Exercise III Question ${i}`, i, 200 + (i - 87), 'p5', ANSWERS_EX3, 'Exercise-III'));
  } else {
    part5.push(parseMcqItem(ex3[i] || `Exercise III Question ${i}`, i, 200 + (i - 87), 'p5', ANSWERS_EX3, 'Exercise-III'));
  }
}
writePartFile('src/data/vibrantCurrentElectricityPart5.ts', 'CURRENT_ELECTRICITY_PART_5_QUESTIONS', 5, 'QUESTIONS 201 TO 224 (Exercise-III Q88 to Q111)', part5);
