import { ExamPaper, Question } from '../types/exam';
import { randomizeQuestionMcq } from './questionSplitter';

export function parsePastedQuestionsInstant(
  rawText: string,
  examTitle: string = 'JEE CBT Mock Test',
  pattern: string = 'JEE_MAIN',
  customDurationMinutes: number = 180,
  images: any[] = [],
  randomizeMcq?: boolean
): { success: boolean; paper?: ExamPaper; rawQuestions?: Question[]; error?: string } {
  if (!rawText || !rawText.trim()) {
    return { success: false, error: 'No question text provided' };
  }

  try {
    const lines = rawText.split('\n');
    const questions: Question[] = [];
    let currentQ: {
      num: number;
      text: string;
      options: { id: string; labelLatex: string }[];
      ans?: string;
      sol?: string;
    } | null = null;

    const finalizeCurrent = () => {
      if (!currentQ) return;
      const isNumerical = currentQ.options.length === 0;
      const qNum = questions.length + 1;
      const defaultAns = isNumerical ? '0' : 'A';

      let qObj: Question = {
        id: `instant-q-${qNum}`,
        questionNumber: qNum,
        sectionId: 'physics',
        type: isNumerical ? 'NUMERICAL' : 'SINGLE_CORRECT',
        promptLatex: currentQ.text.trim(),
        options: isNumerical ? undefined : currentQ.options,
        correctAnswer: currentQ.ans ? currentQ.ans.trim().toUpperCase() : defaultAns,
        explanationLatex: currentQ.sol ? currentQ.sol.trim() : `Solution for Question ${qNum}.`,
        positiveMarks: 4,
        negativeMarks: isNumerical && pattern === 'JEE_MAIN' ? 0 : 1,
      };

      if (randomizeMcq && !isNumerical) {
        qObj = randomizeQuestionMcq(qObj);
      }

      questions.push(qObj);
      currentQ = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Question start pattern: "1. ", "Q.1", "Question 1:", etc.
      const qMatch = line.match(/^(?:Q(?:uestion)?\.?\s*)?(\d+)[\.\:\)]\s*(.*)$/i);
      if (qMatch && parseInt(qMatch[1], 10) > 0) {
        finalizeCurrent();
        currentQ = {
          num: parseInt(qMatch[1], 10),
          text: qMatch[2] || '',
          options: [],
        };
        continue;
      }

      // Option pattern: "(A) ...", "A) ...", "[A] ...", "A. ..."
      const optMatch = line.match(/^(?:\(?([A-D1-4])\)?[\.\:\-\]]|\(([A-D1-4])\))\s*(.*)$/i);
      if (optMatch && currentQ) {
        let optId = (optMatch[1] || optMatch[2]).toUpperCase();
        if (optId === '1') optId = 'A';
        else if (optId === '2') optId = 'B';
        else if (optId === '3') optId = 'C';
        else if (optId === '4') optId = 'D';

        currentQ.options.push({
          id: optId,
          labelLatex: optMatch[3].trim() || `Option ${optId}`,
        });
        continue;
      }

      // Answer key pattern: "Ans: A", "Answer: B", "Correct: 5"
      const ansMatch = line.match(/^(?:Ans(?:wer)?|Correct(?:\s*Ans(?:wer)?)?)\s*[\:\-]\s*([A-D0-9\.\-]+)/i);
      if (ansMatch && currentQ) {
        currentQ.ans = ansMatch[1].trim();
        continue;
      }

      // Solution pattern
      const solMatch = line.match(/^(?:Solution|Sol|Explanation)\s*[\:\-]\s*(.*)$/i);
      if (solMatch && currentQ) {
        currentQ.sol = (currentQ.sol ? currentQ.sol + ' ' : '') + solMatch[1].trim();
        continue;
      }

      // Regular line continuation
      if (currentQ) {
        if (currentQ.options.length > 0) {
          // append to the last option if there's no answer yet
          currentQ.options[currentQ.options.length - 1].labelLatex += ' ' + line;
        } else {
          currentQ.text += (currentQ.text ? ' ' : '') + line;
        }
      }
    }

    finalizeCurrent();

    if (questions.length === 0) {
      let singleQ: Question = {
        id: 'instant-q-1',
        questionNumber: 1,
        sectionId: 'physics',
        type: 'SINGLE_CORRECT',
        promptLatex: rawText.trim(),
        options: [
          { id: 'A', labelLatex: 'Option A' },
          { id: 'B', labelLatex: 'Option B' },
          { id: 'C', labelLatex: 'Option C' },
          { id: 'D', labelLatex: 'Option D' },
        ],
        correctAnswer: 'A',
        explanationLatex: 'Standard solution derivation.',
        positiveMarks: 4,
        negativeMarks: 1,
      };
      if (randomizeMcq) singleQ = randomizeQuestionMcq(singleQ);
      questions.push(singleQ);
    }

    // Attach images if provided
    if (images && images.length > 0) {
      questions.forEach((q, idx) => {
        if (idx < images.length) {
          const img = images[idx];
          const b64 = typeof img === 'string' ? img : img.base64 || img.data || img.dataUrl;
          if (b64) {
            q.imageUrl = b64.startsWith('data:') ? b64 : `data:image/jpeg;base64,${b64}`;
          }
        }
      });
    }

    const paper: ExamPaper = {
      id: `instant-paper-${Date.now()}`,
      title: examTitle,
      pattern,
      durationMinutes: customDurationMinutes || 180,
      totalMarks: questions.length * 4,
      sections: [
        {
          id: 'physics',
          name: 'ALL QUESTIONS',
          questions,
        },
      ],
    };

    return { success: true, paper, rawQuestions: questions };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
