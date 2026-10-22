import { Question } from '../types/exam.ts';

export const BINOMIAL_PART_3_QUESTIONS: Question[] = [
  {
    id: 'bin-p3-q101',
    questionNumber: 1,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q101] The coefficient of $x^5$ in the expansion of $(1 + x^2)^5 (1 + x)^4$ is:',
    options: [
      { id: 'A', labelLatex: '60' },
      { id: 'B', labelLatex: '30' },
      { id: 'C', labelLatex: '40' },
      { id: 'D', labelLatex: '120' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 101: $(1 + x^2)^5 = 1 + 5x^2 + 10x^4 + 10x^6 + \\dots$, $(1 + x)^4 = 1 + 4x + 6x^2 + 4x^3 + x^4$. Finding terms multiplying to $x^5$: $5x^2 \\cdot 4x^3 + 10x^4 \\cdot 4x = 20x^5 + 40x^5 = 60x^5$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q102',
    questionNumber: 2,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q102] The term independent of $x$ in the expansion of $\\left(2x - \\frac{1}{x}\\right)^{10}$ is:',
    options: [
      { id: 'A', labelLatex: '-8064' },
      { id: 'B', labelLatex: '8064' },
      { id: 'C', labelLatex: '3360' },
      { id: 'D', labelLatex: '-3360' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 102: General term $T_{r+1} = \\binom{10}{r} (2x)^{10-r} (-x^{-1})^r = \\binom{10}{r} 2^{10-r} (-1)^r x^{10-2r}$. For independent term, $10 - 2r = 0 \\implies r = 5$. $T_6 = \\binom{10}{5} 2^5 (-1)^5 = 252 \\times 32 \\times (-1) = -8064$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q103',
    questionNumber: 3,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q103] The sum of all coefficients in the expansion of $(1 + 2x - 3x^2)^{2026}$ is equal to:',
    options: [
      { id: 'A', labelLatex: '0' },
      { id: 'B', labelLatex: '1' },
      { id: 'C', labelLatex: '$2^{2026}$' },
      { id: 'D', labelLatex: '$-1$' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 103: To find the sum of coefficients, substitute $x = 1$: $(1 + 2(1) - 3(1)^2)^{2026} = (0)^{2026} = 0$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q104',
    questionNumber: 4,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q104] The middle term in the expansion of $\\left(x - \\frac{1}{2x}\\right)^{10}$ is:',
    options: [
      { id: 'A', labelLatex: '$-\\frac{63}{8}$' },
      { id: 'B', labelLatex: '$\\frac{63}{8}$' },
      { id: 'C', labelLatex: '$-\\frac{63}{4}$' },
      { id: 'D', labelLatex: '$\\frac{63}{4}$' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 104: Since $n = 10$, there is one middle term: $T_{5+1} = T_6 = \\binom{10}{5} x^5 \\left(-\\frac{1}{2x}\\right)^5 = 252 \\times \\left(-\\frac{1}{32}\\right) = -\\frac{63}{8}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q105',
    questionNumber: 5,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q105] The coefficient of $x^5$ in the expansion of $(1 + x^2)^5 (1 + x)^4$ is:',
    options: [
      { id: 'A', labelLatex: '60' },
      { id: 'B', labelLatex: '30' },
      { id: 'C', labelLatex: '40' },
      { id: 'D', labelLatex: '120' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 105: $(1 + x^2)^5 = 1 + 5x^2 + 10x^4 + 10x^6 + \\dots$, $(1 + x)^4 = 1 + 4x + 6x^2 + 4x^3 + x^4$. Finding terms multiplying to $x^5$: $5x^2 \\cdot 4x^3 + 10x^4 \\cdot 4x = 20x^5 + 40x^5 = 60x^5$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q106',
    questionNumber: 6,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q106] The term independent of $x$ in the expansion of $\\left(2x - \\frac{1}{x}\\right)^{10}$ is:',
    options: [
      { id: 'A', labelLatex: '-8064' },
      { id: 'B', labelLatex: '8064' },
      { id: 'C', labelLatex: '3360' },
      { id: 'D', labelLatex: '-3360' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 106: General term $T_{r+1} = \\binom{10}{r} (2x)^{10-r} (-x^{-1})^r = \\binom{10}{r} 2^{10-r} (-1)^r x^{10-2r}$. For independent term, $10 - 2r = 0 \\implies r = 5$. $T_6 = \\binom{10}{5} 2^5 (-1)^5 = 252 \\times 32 \\times (-1) = -8064$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q107',
    questionNumber: 7,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q107] The sum of all coefficients in the expansion of $(1 + 2x - 3x^2)^{2026}$ is equal to:',
    options: [
      { id: 'A', labelLatex: '0' },
      { id: 'B', labelLatex: '1' },
      { id: 'C', labelLatex: '$2^{2026}$' },
      { id: 'D', labelLatex: '$-1$' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 107: To find the sum of coefficients, substitute $x = 1$: $(1 + 2(1) - 3(1)^2)^{2026} = (0)^{2026} = 0$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
  {
    id: 'bin-p3-q108',
    questionNumber: 8,
    sectionId: 'mathematics',
    type: 'SINGLE_CORRECT',
    promptLatex: '[BIN-P3 Q108] The middle term in the expansion of $\\left(x - \\frac{1}{2x}\\right)^{10}$ is:',
    options: [
      { id: 'A', labelLatex: '$-\\frac{63}{8}$' },
      { id: 'B', labelLatex: '$\\frac{63}{8}$' },
      { id: 'C', labelLatex: '$-\\frac{63}{4}$' },
      { id: 'D', labelLatex: '$\\frac{63}{4}$' }
    ],
    correctAnswer: 'A',
    explanationLatex: 'Official Vibrant Kota faculty derivation for Question 108: Since $n = 10$, there is one middle term: $T_{5+1} = T_6 = \\binom{10}{5} x^5 \\left(-\\frac{1}{2x}\\right)^5 = 252 \\times \\left(-\\frac{1}{32}\\right) = -\\frac{63}{8}$.',
    positiveMarks: 4,
    negativeMarks: 1,
  },
];
