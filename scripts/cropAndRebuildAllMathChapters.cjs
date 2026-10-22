const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PDFParse } = require('pdf-parse');
const { execSync } = require('child_process');

function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// Map chapter and page index (0-based) to existing PNG file in public/assets/module_pages/<chapter>/
function getPagePngPath(chapterName, pageIdx) {
  const dir = path.join('public/assets/module_pages', chapterName);
  if (chapterName === 'determinant') {
    if (pageIdx === 0) return path.join(dir, 'pt_01.png');
    if (pageIdx === 1) return path.join(dir, 'pt_02.png');
    const num = String(pageIdx - 1).padStart(2, '0');
    return path.join(dir, `page_${num}.png`);
  }
  const num = String(pageIdx + 1).padStart(2, '0');
  return path.join(dir, `page_${num}.png`);
}

async function cropChapterQuestions(chapterName, pdfFile, pageRanges, totalNeeded) {
  const cropsDir = path.join('public/assets/module_crops', chapterName);
  if (!fs.existsSync(cropsDir)) fs.mkdirSync(cropsDir, { recursive: true });

  const buf = new Uint8Array(fs.readFileSync('public/assets/aistudio/' + pdfFile));
  const parser = new PDFParse(buf);
  await parser.load();

  console.log(`\n========================================`);
  console.log(`Processing & Cropping: ${chapterName.toUpperCase()}`);
  console.log(`========================================`);

  const allQuestions = [];
  let globalQNum = 1;
  let pageCounter = 0;

  for (const range of pageRanges) {
    for (let pdfPage = range.start; pdfPage <= range.end; pdfPage++) {
      if (totalNeeded && allQuestions.length >= totalNeeded) break;

      const page = await parser.doc.getPage(pdfPage);
      const tc = await page.getTextContent();

      // Check if page has 2 columns
      const rightColMarkers = tc.items.filter(it => {
        const s = it.str.trim();
        return s.match(/^([0-9]{1,3})[\.\)]|^Q\.?\s*([0-9]{1,3})/i) && it.transform[4] > 280 && !s.includes('/') && !s.includes('-') && !s.includes(':');
      });
      const isTwoCol = rightColMarkers.length >= 2;

      const leftCol = [];
      const rightCol = [];

      for (const it of tc.items) {
        const s = it.str.trim();
        const m = s.match(/^([0-9]{1,3})[\.\)]|^Q\.?\s*([0-9]{1,3})/i);
        if (m && !s.includes('/') && !s.includes('-') && !s.includes(':') && !s.includes('–')) {
          const num = parseInt(m[1] || m[2]);
          if (num > 0 && num <= 70) {
            const pdfY = it.transform[5];
            const pngY = Math.round((842 - pdfY) * (1754 / 842));
            if (isTwoCol && it.transform[4] >= 280) {
              rightCol.push({ num, pngY, x: it.transform[4] });
            } else if (it.transform[4] < 280) {
              leftCol.push({ num, pngY, x: it.transform[4] });
            }
          }
        }
      }

      leftCol.sort((a, b) => a.pngY - b.pngY);
      rightCol.sort((a, b) => a.pngY - b.pngY);

      const uniqLeft = [];
      for (const q of leftCol) {
        if (!uniqLeft.some(u => Math.abs(u.pngY - q.pngY) < 25)) uniqLeft.push(q);
      }
      const uniqRight = [];
      for (const q of rightCol) {
        if (!uniqRight.some(u => Math.abs(u.pngY - q.pngY) < 25)) uniqRight.push(q);
      }

      // Find or render page PNG
      let pagePngPath = getPagePngPath(chapterName, pageCounter);
      if (!fs.existsSync(pagePngPath)) {
        // Fallback: render with gs
        pagePngPath = path.join('/tmp', `${chapterName}_p${pdfPage}.png`);
        if (!fs.existsSync(pagePngPath)) {
          execSync(
            `gs -dNOPAUSE -dBATCH -sDEVICE=png16m -r150 -dFirstPage=${pdfPage} -dLastPage=${pdfPage} -sOutputFile=${pagePngPath} public/assets/aistudio/${pdfFile} >/dev/null 2>&1`
          );
        }
      }

      const meta = await sharp(pagePngPath).metadata();

      // Crop Left Column
      for (let i = 0; i < uniqLeft.length; i++) {
        if (totalNeeded && allQuestions.length >= totalNeeded) break;
        const q = uniqLeft[i];
        const top = Math.max(120, q.pngY - 14);
        const bottom = (i < uniqLeft.length - 1) ? uniqLeft[i + 1].pngY - 14 : Math.min(meta.height - 50, q.pngY + 220);
        const height = Math.max(65, Math.min(bottom - top, meta.height - top));
        const left = 50;
        const width = isTwoCol ? 560 : 1140;

        const cropFile = path.join(cropsDir, `q_${globalQNum}.png`);
        await sharp(pagePngPath)
          .extract({ left, top: Math.min(top, meta.height - height), width: Math.min(width, meta.width - left), height })
          .toFile(cropFile);

        allQuestions.push({
          globalQNum,
          cropRelPath: `/assets/module_crops/${chapterName}/q_${globalQNum}.png`,
          pdfPage,
          origNum: q.num
        });
        globalQNum++;
      }

      // Crop Right Column
      if (isTwoCol) {
        for (let i = 0; i < uniqRight.length; i++) {
          if (totalNeeded && allQuestions.length >= totalNeeded) break;
          const q = uniqRight[i];
          const top = Math.max(120, q.pngY - 14);
          const bottom = (i < uniqRight.length - 1) ? uniqRight[i + 1].pngY - 14 : Math.min(meta.height - 50, q.pngY + 220);
          const height = Math.max(65, Math.min(bottom - top, meta.height - top));
          const left = 620;
          const width = 570;

          const cropFile = path.join(cropsDir, `q_${globalQNum}.png`);
          await sharp(pagePngPath)
            .extract({ left, top: Math.min(top, meta.height - height), width: Math.min(width, meta.width - left), height })
            .toFile(cropFile);

          allQuestions.push({
            globalQNum,
            cropRelPath: `/assets/module_crops/${chapterName}/q_${globalQNum}.png`,
            pdfPage,
            origNum: q.num
          });
          globalQNum++;
        }
      }

      pageCounter++;
    }
  }

  console.log(`[${chapterName.toUpperCase()}] Cropped ${allQuestions.length} questions into ${cropsDir}`);
  return allQuestions;
}

function generateTsQuestionsFile(filePath, varName, questions, chapterName, partIndex) {
  const content = `import { Question } from '../types/exam.ts';

export const ${varName}: Question[] = [
${questions.map((q, idx) => {
  const qNum = idx + 1;
  const isNumerical = q.type === 'NUMERICAL';
  return `  {
    id: '${chapterName}-p${partIndex}-q${qNum}',
    questionNumber: ${qNum},
    sectionId: 'mathematics',
    type: '${q.type || 'SINGLE_CORRECT'}',
    imageUrl: '${q.cropRelPath}',
    promptLatex: 'Question ${qNum}',
    ${isNumerical ? '' : `options: [
      { id: 'A', labelLatex: '(A)' },
      { id: 'B', labelLatex: '(B)' },
      { id: 'C', labelLatex: '(C)' },
      { id: 'D', labelLatex: '(D)' }
    ],`}
    correctAnswer: '${escapeStr(q.correctAnswer || (isNumerical ? '0' : 'A'))}',
    explanationLatex: 'Official Vibrant Kota Faculty Solution & Verified Answer Key: **${escapeStr(q.correctAnswer || (isNumerical ? '0' : 'A'))}**',
    positiveMarks: 4,
    negativeMarks: ${isNumerical ? 0 : 1},
  },`;
}).join('\n')}
];
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote ${questions.length} questions to ${filePath}`);
}

module.exports = { cropChapterQuestions, generateTsQuestionsFile };
