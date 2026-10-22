const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

// Clean and normalize mathematical strings into KaTeX LaTeX
function cleanToKaTeX(raw) {
  if (!raw) return '';
  let s = raw;
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
  s = s.replace(/M–1|M-1/g, 'M^{-1}');
  s = s.replace(/P–1|P-1/g, 'P^{-1}');
  s = s.replace(/A2/g, 'A^2');
  s = s.replace(/B2/g, 'B^2');
  s = s.replace(/P2/g, 'P^2');
  s = s.replace(/Q2/g, 'Q^2');
  s = s.replace(/P3/g, 'P^3');
  s = s.replace(/Q3/g, 'Q^3');
  s = s.replace(/x2/g, 'x^2');
  s = s.replace(/x3/g, 'x^3');
  s = s.replace(/x 2/g, 'x^2');
  s = s.replace(/x 3/g, 'x^3');
  s = s.replace(/\[aij\s*\]/g, '[a_{ij}]');
  s = s.replace(/\[bij\s*\]/g, '[b_{ij}]');
  s = s.replace(/[]+/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function escapeTs(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

module.exports = { cleanToKaTeX, escapeTs };
