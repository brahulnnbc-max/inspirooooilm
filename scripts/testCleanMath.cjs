const fs = require('fs');
const { PDFParse } = require('pdf-parse');

function cleanMath(text) {
  let s = text;
  s = s.replace(//g, '\\lambda ');
  s = s.replace(//g, '\\alpha ');
  s = s.replace(//g, '\\beta ');
  s = s.replace(//g, '\\gamma ');
  s = s.replace(//g, '\\omega ');
  s = s.replace(//g, '\\theta ');
  s = s.replace(//g, '\\pi ');
  s = s.replace(//g, '\\Delta ');
  s = s.replace(//g, '\\sum ');
  s = s.replace(//g, '\\neq ');
  s = s.replace(//g, '\\le ');
  s = s.replace(//g, '\\ge ');
  s = s.replace(//g, '\\in ');
  s = s.replace(//g, '\\notin ');
  s = s.replace(//g, '\\to ');
  s = s.replace(//g, '\\infty ');
  s = s.replace(/–|/g, '-');
  s = s.replace(//g, '\\times ');
  s = s.replace(/|•/g, '\\cdot ');
  s = s.replace(/A–1|A-1/g, 'A^{-1}');
  s = s.replace(/B–1|B-1/g, 'B^{-1}');
  s = s.replace(/A2/g, 'A^2');
  s = s.replace(/B2/g, 'B^2');
  s = s.replace(/P2/g, 'P^2');
  s = s.replace(/Q2/g, 'Q^2');
  s = s.replace(/P3/g, 'P^3');
  s = s.replace(/Q3/g, 'Q^3');
  s = s.replace(/x2/g, 'x^2');
  s = s.replace(/x3/g, 'x^3');
  s = s.replace(/\[aij\s*\]/g, '[a_{ij}]');
  s = s.replace(/\[bij\s*\]/g, '[b_{ij}]');
  s = s.replace(/[]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

async function run() {
  const buf = new Uint8Array(fs.readFileSync('public/assets/aistudio/Matrices_Mega_XII_457f438e.pdf'));
  const parser = new PDFParse(buf);
  await parser.load();
  const page = await parser.doc.getPage(12);
  const tc = await page.getTextContent();
  const rawText = tc.items.map(it => it.str).join(' ');
  console.log('Cleaned text:\n', cleanMath(rawText.slice(200, 800)));
}
run();
