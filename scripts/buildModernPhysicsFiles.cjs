const fs = require('fs');
const path = require('path');

const ANSWERS_EX1 = {
  1:'D', 2:'A', 3:'B', 4:'C', 5:'D', 6:'C', 7:'A', 8:'C', 9:'C', 10:'D',
  11:'C', 12:'C', 13:'A', 14:'C', 15:'B', 16:'B', 17:'B', 18:'A', 19:'B', 20:'B',
  21:'C', 22:'C', 23:'B', 24:'B', 25:'C', 26:'A', 27:'D', 28:'A', 29:'C', 30:'D',
  31:'C', 32:'D', 33:'C', 34:'B', 35:'A', 36:'A', 37:'A', 38:'A', 39:'B', 40:'D',
  41:'C', 42:'C', 43:'A', 44:'C', 45:'D', 46:'C', 47:'C', 48:'C', 49:'B', 50:'A',
  51:'B', 52:'D', 53:'B', 54:'C', 55:'B', 56:'D', 57:'A', 58:'B', 59:'C', 60:'B',
  61:'B', 62:'D', 63:'C', 64:'A', 65:'C',
  66:'A, C', 67:'D', 68:'B', 69:'B', 70:'B', 71:'A', 72:'A, C, D', 73:'B', 74:'A, B', 75:'C',
  76:'A', 77:'A, C', 78:'A, B, D', 79:'A', 80:'B', 81:'A, D', 82:'A, B', 83:'D', 84:'C', 85:'A, C',
  86:'C, D', 87:'B', 88:'C', 89:'D', 90:'(i) - A, (ii) - E, (iii) - F, (iv) - C'
};

const ANSWERS_EX2 = {
  1: '(a) 2.25 eV, (b) 4.2 eV, (c) 2.0 eV, 0.5 eV',
  2: '(a) 0.6 V, (b) 2.0 mA',
  3: 'h*nu = (3 + 1) eV = 4.0 eV',
  4: '5.76 * 10^-11 A',
  5: '15/8 V',
  6: '516, 20 / (1080 * pi)',
  7: '2 eV, 6.53 * 10^-34 J*s',
  8: '885',
  9: '-h / (e * E * t^2)',
  10: '487.06 nm',
  11: '4.26 m/s, 13.2 eV',
  12: '7 : 36',
  13: '22.8 nm',
  14: '(lambda_1 * lambda_2) / (lambda_1 + lambda_2)',
  15: '18 / (5R)',
  16: '1.257 * 10^-23 A*m^2',
  17: '5',
  18: '(i) 5, 16.5 eV, 36.4 A, 340 eV, -680 eV, h/(2pi) * 1.06 * 10^-11 m',
  19: 'z = 3, n = 7',
  20: '54.4 eV',
  21: 'n = 3, 3 : 1',
  22: '23.6 MeV',
  23: 'T_1/2 = 10.8 s',
  24: 't = tau * ln(5) / ln(2)',
  25: '8/3 * 10^18 s',
  26: '2.48 * 10^-12 m',
  27: '(i) 4he / (pi * m), (ii) 8ehB / (pi * m)',
  28: '4.8 * 10^16, 4.0 cm',
  29: '1.1 * 10^12',
  30: 'lambda_deuteron = lambda_neutron = 8.6 pm',
  31: 'lambda = (lambda_1 * lambda_2) / sqrt(lambda_1^2 + lambda_2^2)',
  32: '3.1 * 10^6 m/s',
  33: '(i) 2; (ii) 23.04 * 10^-19 J; (iii) 4 -> 1, 4 -> 3',
  34: '11.24 eV',
  35: '6.8 eV, 5 * 10^15 Hz',
  36: '489.6 eV, 25.28 A',
  37: '(i) 1.875 * 10^4 V, (ii) 2.7 * 10^-15 J, (iii) 0.737 A, (iv) 2.67 * 10^-15 J',
  38: '6.04 * 10^9 yrs',
  39: '4.87 MeV',
  40: '3.3 * 10^-6 g',
  41: '5196 yrs',
  42: 'Delta T = (t_0 * 0.2 * E_alpha / mS) * [alpha / lambda - (1 - e^-lambda*t)]',
  43: '(a) 10^5 s^-1; (b) 286.18; (d) 111 s',
  44: 'KE ~= 151 eV, d_least = 0.5 A',
  45: '~= 33.298 muW'
};

const ANSWERS_EX3 = {
  1: 'A', 2: 'B', 3: 'A, C', 4: 'A', 5: 'A-R,T; B-P,S; C-Q,R,T; D-Q,R',
  6: '2', 7: '3', 8: '2', 9: '2', 10: 'B', 11: 'A, B, D', 12: 'C',
  13: 'A', 14: '6', 15: '9', 16: 'A', 17: '5', 18: '5', 19: 'A, C',
  20: '24.00', 21: '3.00', 22: 'C', 23: 'A, C', 24: '135.00', 25: '1.00',
  26: 'B, C', 27: 'A, C', 28: 'D', 29: 'A', 30: 'B', 31: 'A', 32: 'D',
  33: 'C', 34: 'D', 35: 'B', 36: 'B', 37: '15.00', 38: 'D', 39: 'A, D',
  40: 'A, C, D', 41: '4.00', 42: '6.00', 43: 'A', 44: 'B', 45: 'A', 46: 'B',
  47: 'C', 48: 'B', 49: 'D', 50: 'C', 51: 'C', 52: 'C', 53: '2.33',
  54: 'A, B, D', 55: 'B', 56: 'B', 57: 'A', 58: 'A', 59: 'A', 60: 'D',
  61: 'A', 62: 'B', 63: 'D', 64: 'D', 65: '3.00', 66: 'A', 67: 'C',
  68: '16.00', 69: 'D', 70: 'D', 71: 'B', 72: 'A', 73: 'D', 74: 'A',
  75: 'A', 76: 'C', 77: 'A', 78: 'A', 79: 'A', 80: 'C', 81: 'D',
  82: 'B', 83: 'B', 84: 'C', 85: 'D', 86: 'C', 87: 'D', 88: 'B',
  89: 'D', 90: 'C', 91: 'A', 92: 'C', 93: 'B', 94: 'D', 95: 'B',
  96: 'A', 97: 'A', 98: 'A', 99: 'B', 100: 'C', 101: 'B', 102: 'B',
  103: 'B', 104: 'D', 105: '5.00', 106: 'C', 107: '72.00', 108: '11.80'
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
    .replace(/Å/g, ' \\text{\\AA}')
    .replace(/10–(\d+)/g, '10^{-$1}')
    .replace(/10-(\d+)/g, '10^{-$1}')
    .replace(/10–/g, '10^{-')
    .replace(/×/g, '\\times ')
    .replace(/\r/g, '')
    .trim();
}

// 1. Parse Exercise-I
const rawEx1 = fs.readFileSync('ex1_raw.txt', 'utf8').replace(/-- \d+ of \d+ --[\s\S]*?MODERN PHYSICS_MEGA\(XII\)/g, '');
const ex1Map = {};
const qRegex1 = /(?:^|\n)(\d{1,2})\.\s+([\s\S]*?)(?=(?:\n\d{1,2}\.\s+)|$)/g;
let m1;
while ((m1 = qRegex1.exec(rawEx1)) !== null) {
  const qNum = parseInt(m1[1]);
  ex1Map[qNum] = m1[2].trim();
}

// 2. Parse Exercise-II
const rawEx2 = fs.readFileSync('ex2_raw.txt', 'utf8').replace(/-- \d+ of \d+ --[\s\S]*?MODERN PHYSICS_MEGA\(XII\)/g, '');
const ex2Map = {};
const qRegex2 = /(?:^|\n)(\d{1,2})\.\s+([\s\S]*?)(?=(?:\n\d{1,2}\.\s+)|$)/g;
let m2;
while ((m2 = qRegex2.exec(rawEx2)) !== null) {
  const qNum = parseInt(m2[1]);
  ex2Map[qNum] = m2[2].trim();
}

// 3. Parse Exercise-III
const rawEx3 = fs.readFileSync('ex3_raw.txt', 'utf8').replace(/-- \d+ of \d+ --[\s\S]*?MODERN PHYSICS_MEGA\(XII\)/g, '');
const ex3Map = {};
const qRegex3 = /(?:^|\n)(\d{1,3})\.\s+([\s\S]*?)(?=(?:\n\d{1,3}\.\s+)|$)/g;
let m3;
while ((m3 = qRegex3.exec(rawEx3)) !== null) {
  const qNum = parseInt(m3[1]);
  ex3Map[qNum] = m3[2].trim();
}

console.log('Parsed Ex1 count:', Object.keys(ex1Map).length);
console.log('Parsed Ex2 count:', Object.keys(ex2Map).length);
console.log('Parsed Ex3 count:', Object.keys(ex3Map).length);

// Helper to escape quotes for typescript string literals
function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

// Export parsed questions into master json for easy review
fs.writeFileSync('parsed_all.json', JSON.stringify({ ex1Map, ex2Map, ex3Map }, null, 2));
console.log('Wrote parsed_all.json');
