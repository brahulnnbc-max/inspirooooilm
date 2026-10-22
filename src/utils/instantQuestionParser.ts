import type { ExamPaper, ExamPattern, Question, ExamSection } from '../types/exam.ts';
import { randomizeQuestionMcq } from './questionSplitter.ts';

export interface ParseResult {
  success: boolean;
  paper?: ExamPaper;
  questionCount: number;
  message?: string;
  error?: string;
  rawQuestions?: Question[];
}

/**
 * High-speed deterministic question parser.
 * Converts raw text extracted from PDFs or pasted papers directly into CBT structure.
 * Handles:
 * - Answer key written at the very bottom in PDF (e.g. "ANSWER KEY\n1. (A) 2. (B)...")
 * - Solutions written at the very bottom in PDF (e.g. "HINTS & SOLUTIONS\n1. Solution...")
 * - Randomizes MCQ options so no one can guess, preserving exact correct answers
 * - Diagrams & images mapping
 */
export function parsePastedQuestionsInstant(
  rawText: string,
  customTitle: string = 'Custom Module Practice Test',
  pattern: ExamPattern = 'JEE_MAIN',
  customDuration: number = 180,
  attachedImages?: Array<{ dataUrl?: string; base64?: string; mimeType?: string; name?: string }>,
  randomizeMcq: boolean = true
): ParseResult {
  const text = (rawText || '').trim();
  if (!text) {
    return { success: false, questionCount: 0, error: 'Question text is empty' };
  }

  // 1. Check if the user pasted structured JSON
  try {
    const jsonParsed = JSON.parse(text);
    const rawList = Array.isArray(jsonParsed)
      ? jsonParsed
      : jsonParsed.questions || jsonParsed.items || (jsonParsed.examPaper && jsonParsed.examPaper.sections);

    if (Array.isArray(rawList) && rawList.length > 0) {
      if (rawList[0].questions && Array.isArray(rawList[0].questions)) {
        let totalCount = 0;
        rawList.forEach((s) => {
          totalCount += s.questions?.length || 0;
        });
        return {
          success: true,
          questionCount: totalCount,
          paper: {
            id: `custom-paper-${Date.now()}`,
            title: customTitle || jsonParsed.title || 'JEE Custom CBT Test',
            pattern: (jsonParsed.pattern as ExamPattern) || pattern,
            durationMinutes: jsonParsed.durationMinutes || customDuration || 180,
            totalMarks: jsonParsed.totalMarks || (pattern === 'JEE_MAIN' ? 300 : 180),
            sections: rawList,
          },
        };
      }

      const questions: Question[] = rawList.map((item: any, idx: number) => {
        const qNum = item.questionNumber || idx + 1;
        const rawOpts = item.options || [];
        const options = Array.isArray(rawOpts)
          ? rawOpts.map((opt: any, optIdx: number) => {
              const defaultId = ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx);
              if (typeof opt === 'string') {
                return { id: defaultId, labelLatex: opt.trim() };
              }
              return {
                id: String(opt.id || defaultId).toUpperCase(),
                labelLatex: String(opt.labelLatex || opt.text || opt.label || '').trim(),
              };
            })
          : undefined;

        let rawAns = String(item.correctAnswer || item.answer || item.key || 'A').trim().toUpperCase();
        if (rawAns === '1') rawAns = 'A';
        else if (rawAns === '2') rawAns = 'B';
        else if (rawAns === '3') rawAns = 'C';
        else if (rawAns === '4') rawAns = 'D';

        const isNumerical = !options || options.length === 0 || item.type === 'NUMERICAL';

        let q: Question = {
          id: item.id || `q-${qNum}`,
          questionNumber: qNum,
          sectionId: item.sectionId || 'physics',
          type: isNumerical ? 'NUMERICAL' : rawAns.includes(',') ? 'MULTIPLE_CORRECT' : 'SINGLE_CORRECT',
          promptLatex: String(item.promptLatex || item.question || item.prompt || '').trim(),
          options: options && options.length > 0 ? options : undefined,
          correctAnswer: isNumerical ? (item.correctAnswer || '0') : rawAns,
          explanationLatex: String(item.explanationLatex || item.explanation || item.solution || `Step-by-step solution for Question ${qNum}`).trim(),
          positiveMarks: item.positiveMarks || 4,
          negativeMarks: item.negativeMarks ?? (isNumerical ? 0 : 1),
        };

        if (randomizeMcq) {
          q = randomizeQuestionMcq(q);
        }
        return q;
      });

      return groupIntoExamPaper(questions, customTitle, pattern, customDuration);
    }
  } catch (_notJson) {
    // Proceed to standard text splitting
  }

  // 2. Extract Bottom Answer Key and Bottom Solutions if present in PDF/text
  const { questionTextOnly, bottomAnswerMap, bottomSolutionMap } = extractBottomSolutionsAndKeys(text);

  // 3. Text Parsing: Split by question boundary
  const questionBoundaryRegex = /(?:^|\n)\s*(?:Q(?:uestion)?\s*(\d+)[\.:\)]|Problem\s*(\d+)[\.:\)]|(\d+)[\.\)]\s+)/gi;
  const matches = [...questionTextOnly.matchAll(questionBoundaryRegex)];

  let chunks: { qNum: number; content: string }[] = [];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const qNum = parseInt(match[1] || match[2] || match[3] || String(i + 1), 10);
      const startIdx = match.index! + match[0].length;
      const endIdx = i + 1 < matches.length ? matches[i + 1].index! : questionTextOnly.length;
      const content = questionTextOnly.slice(startIdx, endIdx).trim();
      chunks.push({ qNum: isNaN(qNum) ? i + 1 : qNum, content });
    }
  } else {
    // If no numbered headers found, split by double newlines as fallback
    const rawBlocks = questionTextOnly.split(/\n\s*\n/).filter((b) => b.trim().length > 10);
    chunks = rawBlocks.map((content, idx) => ({ qNum: idx + 1, content }));
  }

  if (chunks.length === 0) {
    return { success: false, questionCount: 0, error: 'Could not identify any questions in the provided text' };
  }

  const parsedQuestions: Question[] = chunks.map((chunk, index) => {
    const qNum = chunk.qNum || index + 1;
    let q = parseSingleQuestionChunk(chunk.content, qNum);

    // Apply answer from bottom answer key if found
    if (bottomAnswerMap[qNum]) {
      q.correctAnswer = bottomAnswerMap[qNum];
      if (q.type === 'SINGLE_CORRECT' || q.type === 'MULTIPLE_CORRECT') {
        if (q.correctAnswer.length > 1 && q.correctAnswer.includes(',')) {
          q.type = 'MULTIPLE_CORRECT';
        }
      }
    }

    // Apply solution from bottom solutions section if found
    if (bottomSolutionMap[qNum]) {
      q.explanationLatex = bottomSolutionMap[qNum];
    }

    // If attached images are present, associate them intelligently
    if (attachedImages && attachedImages.length > 0) {
      const imgUrls = attachedImages.map((img) =>
        img.dataUrl || (img.base64 ? `data:${img.mimeType || 'image/jpeg'};base64,${img.base64}` : '')
      ).filter(Boolean);

      const explicitImgMatch = chunk.content.match(/(?:image|figure|diagram|fig)\s*[:#\-\s]*(\d+)/i);
      if (explicitImgMatch) {
        const imgNum = parseInt(explicitImgMatch[1], 10);
        const targetIdx = imgNum - 1;
        if (targetIdx >= 0 && targetIdx < imgUrls.length) {
          q.imageUrl = imgUrls[targetIdx];
        }
      }

      if (!q.imageUrl) {
        if (imgUrls.length === 1) {
          // All questions extracted from a single scanned sheet share this visual
          q.imageUrl = imgUrls[0];
        } else if (imgUrls.length > 0) {
          q.imageUrl = imgUrls[index % imgUrls.length];
        }
      }
    }

    // Scramble MCQ options if requested so nobody can guess ("Mcq will be random no one can guess.. Like cbt")
    if (randomizeMcq && q.options && q.options.length > 1) {
      q = randomizeQuestionMcq(q);
    }

    return q;
  });

  const res = groupIntoExamPaper(parsedQuestions, customTitle, pattern, customDuration);
  res.rawQuestions = parsedQuestions;
  return res;
}

/**
 * Extracts bottom answer key tables and bottom solutions sections from PDF text.
 */
function extractBottomSolutionsAndKeys(fullText: string): {
  questionTextOnly: string;
  bottomAnswerMap: Record<number, string>;
  bottomSolutionMap: Record<number, string>;
} {
  const bottomAnswerMap: Record<number, string> = {};
  const bottomSolutionMap: Record<number, string> = {};

  // Detect boundary of Answer Key or Solutions at the bottom of the PDF text
  const bottomMarkerRegex = /(?:^|\n)\s*(?:(?:ANSWER\s*KEY|ANSWERS|KEY\s*SHEET|FINAL\s*KEY|ANSWER\s*KEYS)|(?:HINTS\s*(?:&|AND)\s*SOLUTIONS|SOLUTIONS|DETAILED\s*SOLUTIONS|EXPLANATIONS))\s*[\:\-]*\s*(?:\n|$)/i;

  const match = fullText.match(bottomMarkerRegex);
  if (!match || match.index === undefined) {
    return { questionTextOnly: fullText, bottomAnswerMap, bottomSolutionMap };
  }

  const questionTextOnly = fullText.slice(0, match.index).trim();
  const bottomText = fullText.slice(match.index).trim();

  // 1. Extract answers: e.g. "1. (A)  2. (C)  3. 25" or "1-A, 2-C" or "Q1. B\nQ2. D"
  const answerPairRegex = /(?:Q(?:uestion)?\s*(\d+)|\b(\d+)\b)[\.\:\-\)\s]+(?:\(([A-D0-9\.\,\-]+)\)|([A-D0-9\.\,\-]+))/gi;
  for (const aMatch of bottomText.matchAll(answerPairRegex)) {
    const qNum = parseInt(aMatch[1] || aMatch[2], 10);
    let ans = (aMatch[3] || aMatch[4] || '').trim().toUpperCase();
    if (ans === '1') ans = 'A';
    else if (ans === '2') ans = 'B';
    else if (ans === '3') ans = 'C';
    else if (ans === '4') ans = 'D';

    if (!isNaN(qNum) && ans && (['A', 'B', 'C', 'D'].includes(ans) || /^-?\d+(\.\d+)?$/.test(ans) || ans.includes(','))) {
      bottomAnswerMap[qNum] = ans;
    }
  }

  // 2. Extract solutions: e.g. "1. Let acceleration be... \n2. For molecule..."
  const solBoundaryRegex = /(?:^|\n)\s*(?:Q(?:uestion)?\s*(\d+)[\.:\)]|(\d+)[\.\)]\s+)([\s\S]*?)(?=(?:\n\s*(?:Q(?:uestion)?\s*\d+[\.:\)]|\d+[\.\)]\s+))|$)/gi;
  for (const sMatch of bottomText.matchAll(solBoundaryRegex)) {
    const qNum = parseInt(sMatch[1] || sMatch[2], 10);
    const solBody = (sMatch[3] || '').trim();
    if (!isNaN(qNum) && solBody.length > 5) {
      bottomSolutionMap[qNum] = solBody;
    }
  }

  return { questionTextOnly, bottomAnswerMap, bottomSolutionMap };
}

function parseSingleQuestionChunk(rawChunk: string, qNumber: number): Question {
  let prompt = rawChunk.trim();
  let answer = '';
  let solution = '';
  const options: { id: string; labelLatex: string }[] = [];

  // 1. Extract Solution / Explanation at end of chunk if present
  const solMatch = prompt.match(/(?:^|\n)\s*(?:Solution|Explanation|Exp|Sol)[\s\.:]+([\s\S]*)$/i);
  if (solMatch && solMatch.index !== undefined) {
    solution = solMatch[1].trim();
    prompt = prompt.slice(0, solMatch.index).trim();
  }

  // 2. Extract Answer / Key if present
  const ansMatch = prompt.match(/(?:^|\n)\s*(?:Answer|Ans|Key|Correct Option|Correct Ans)[\s\.:]+([A-D0-9\.\,\-\s]+)(?:\n|$)/i);
  if (ansMatch && ansMatch.index !== undefined) {
    answer = ansMatch[1].trim().toUpperCase();
    prompt = prompt.slice(0, ansMatch.index) + prompt.slice(ansMatch.index + ansMatch[0].length);
  }

  // 3. Extract Options (A), (B), (C), (D) or A), B), C), D) or A., B., C., D.
  const lines = prompt.split('\n');
  const nonOptionLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const optMatch = trimmed.match(/^(?:\(([A-Da-d1-4])\)|([A-Da-d1-4])[\.\)\:\-])\s*(.*)$/);
    if (optMatch) {
      let optId = (optMatch[1] || optMatch[2]).toUpperCase();
      if (optId === '1') optId = 'A';
      else if (optId === '2') optId = 'B';
      else if (optId === '3') optId = 'C';
      else if (optId === '4') optId = 'D';
      options.push({ id: optId, labelLatex: optMatch[3].trim() });
    } else {
      if (options.length === 0) {
        nonOptionLines.push(line);
      } else {
        options[options.length - 1].labelLatex += ' ' + trimmed;
      }
    }
  }

  const cleanPrompt = nonOptionLines.join('\n').trim();

  // Normalize Answer
  if (answer === '1') answer = 'A';
  else if (answer === '2') answer = 'B';
  else if (answer === '3') answer = 'C';
  else if (answer === '4') answer = 'D';

  let type: 'SINGLE_CORRECT' | 'MULTIPLE_CORRECT' | 'NUMERICAL' = 'SINGLE_CORRECT';
  if (options.length === 0) {
    type = 'NUMERICAL';
    if (!answer) answer = '0';
  } else if (answer.includes(',') || answer.length > 1) {
    type = 'MULTIPLE_CORRECT';
  } else if (!answer) {
    answer = 'A';
  }

  return {
    id: `q-${qNumber}`,
    questionNumber: qNumber,
    sectionId: 'physics',
    type,
    promptLatex: cleanPrompt || `Question ${qNumber}`,
    options: options.length > 0 ? options : undefined,
    correctAnswer: answer,
    explanationLatex: solution || `Step-by-step solution for Question ${qNumber}. Correct Answer: ${answer}`,
    positiveMarks: 4,
    negativeMarks: type === 'NUMERICAL' ? 0 : 1,
  };
}

function groupIntoExamPaper(
  questions: Question[],
  customTitle: string,
  pattern: ExamPattern,
  customDuration: number
): ParseResult {
  const total = questions.length;
  let sections: ExamSection[] = [];

  if (total >= 45) {
    const third = Math.ceil(total / 3);
    const pQuestions = questions.slice(0, third).map((q, idx) => ({ ...q, sectionId: 'physics' as const, questionNumber: idx + 1 }));
    const cQuestions = questions.slice(third, third * 2).map((q, idx) => ({ ...q, sectionId: 'chemistry' as const, questionNumber: third + idx + 1 }));
    const mQuestions = questions.slice(third * 2).map((q, idx) => ({ ...q, sectionId: 'mathematics' as const, questionNumber: third * 2 + idx + 1 }));

    sections = [
      { id: 'physics', name: 'PHYSICS', questions: pQuestions },
      { id: 'chemistry', name: 'CHEMISTRY', questions: cQuestions },
      { id: 'mathematics', name: 'MATHEMATICS', questions: mQuestions },
    ];
  } else {
    sections = [
      {
        id: 'physics',
        name: 'ALL SUBJECTS',
        questions: questions.map((q, idx) => ({ ...q, sectionId: 'physics' as const, questionNumber: idx + 1 })),
      },
    ];
  }

  const totalMarks = questions.reduce((sum, q) => sum + (q.positiveMarks || 4), 0);

  const paper: ExamPaper = {
    id: `custom-paper-${Date.now()}`,
    title: customTitle || 'JEE Practice Test',
    pattern,
    durationMinutes: customDuration || (pattern === 'JEE_MAIN' ? 180 : 180),
    totalMarks: totalMarks > 0 ? totalMarks : 300,
    sections,
  };

  return {
    success: true,
    paper,
    questionCount: questions.length,
    message: `Successfully extracted ${questions.length} questions into CBT format.`,
  };
}
