import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

const KATEX_OPTIONS = {
  throwOnError: false,
  errorColor: '#ef4444',
  strict: false,
  trust: true,
  macros: {
    '\\R': '\\mathbb{R}',
    '\\N': '\\mathbb{N}',
    '\\Z': '\\mathbb{Z}',
    '\\C': '\\mathbb{C}',
    '\\d': '\\mathrm{d}',
  },
};

/**
 * Preprocesses raw mathematical text to ensure all matrix environments,
 * vertical determinant bars, integration expressions, and LaTeX commands
 * are properly delimited and formatted for KaTeX rendering.
 */
function normalizeMathText(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Repair single backslash in common LaTeX matrix row breaks
  // e.g. "a & b \ c & d" -> "a & b \\ c & d" inside matrices
  text = text.replace(/(\\begin\{(?:vmatrix|Vmatrix|bmatrix|pmatrix|matrix|array|cases|aligned)\}[\s\S]*?\\end\{(?:vmatrix|Vmatrix|bmatrix|pmatrix|matrix|array|cases|aligned)\})/gi, (matrixBlock) => {
    // If inside a matrix there are single backslashes followed by newline or spaces then letters/numbers, convert to \\
    return matrixBlock.replace(/(?<!\\)\\\s*(?=\r?\n|[a-zA-Z0-9\-\+&])/g, '\\\\ ');
  });

  // 2. Auto-wrap naked matrix environments in $$...$$ if not already wrapped in $ or $$
  // Supported: vmatrix (determinants with single vertical lines), Vmatrix (double vertical lines),
  // bmatrix (brackets), pmatrix (parentheses), matrix, array (partitioned matrices with vertical lines |), cases, aligned
  const matrixEnvRegex = /(?<!\$)\s*(\\begin\{(?:vmatrix|Vmatrix|bmatrix|pmatrix|matrix|array|cases|aligned)\}[\s\S]*?\\end\{(?:vmatrix|Vmatrix|bmatrix|pmatrix|matrix|array|cases|aligned)\})\s*(?!\$)/gi;
  text = text.replace(matrixEnvRegex, (match, env) => {
    return `\n$$\n${env.trim()}\n$$\n`;
  });

  // 3. Auto-wrap naked integration expressions: e.g. \int_{0}^{1} ... dx or \int ... dx
  const integralRegex = /(?<!\$)(?:^|(?<=\s))(\\int(?:_\{[^{}]*\}|\^\{[^{}]*\}|_[a-zA-Z0-9\-\+\\]|\^[a-zA-Z0-9\-\+\\]|\s)*[\s\S]*?\\mathrm\{d\}[a-zA-Z]|\\int(?:_\{[^{}]*\}|\^\{[^{}]*\}|_[a-zA-Z0-9\-\+\\]|\^[a-zA-Z0-9\-\+\\]|\s)*[\s\S]*?\bd[a-zA-Z]\b)(?!\$)/g;
  text = text.replace(integralRegex, (match, expr) => {
    return `$${expr.trim()}$`;
  });

  // 4. Auto-wrap naked limits: e.g. \lim_{x \to 0} ...
  const limitRegex = /(?<!\$)(?:^|(?<=\s))(\\lim_\{[^{}]*\}[\s\S]*?)(?=[,\.\s\n]|$)(?!\$)/g;
  text = text.replace(limitRegex, (match, expr) => {
    return `$${expr.trim()}$`;
  });

  return text;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content = '',
  className = '',
  block = false,
}) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    try {
      // If the content is purely a math block without delimiters
      if (block && !content.includes('$')) {
        return katex.renderToString(content.trim(), {
          ...KATEX_OPTIONS,
          displayMode: true,
        });
      }

      const preprocessed = normalizeMathText(content);
      let parsed = preprocessed;

      // 1. Match display/block math: $$...$$
      parsed = parsed.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            ...KATEX_OPTIONS,
            displayMode: true,
          });
        } catch (e: any) {
          console.warn('KaTeX block parse error:', e);
          return `<div class="p-2 border border-rose-500/30 rounded bg-rose-500/10 text-rose-300 font-mono text-xs my-2 overflow-x-auto">${math}</div>`;
        }
      });

      // 2. Match inline math: $...$ (ensure not preceded by backslash)
      parsed = parsed.replace(/(?<!\\)\$([^\$]+?)\$/g, (_, math) => {
        try {
          return katex.renderToString(math.trim(), {
            ...KATEX_OPTIONS,
            displayMode: false,
          });
        } catch (e: any) {
          console.warn('KaTeX inline parse error:', e);
          return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
        }
      });

      // 3. Match standalone un-delimited LaTeX macros if any remain (e.g. \frac{1}{2}, \sqrt{3}, \alpha, \vec{v}, \int, \begin)
      parsed = parsed.replace(
        /\\(frac|sqrt|vec|hat|bar|tilde|int|oint|iint|sum|prod|alpha|beta|gamma|delta|theta|lambda|mu|pi|sigma|omega|Delta|Omega|times|div|pm|approx|neq|leq|geq|infty|rightarrow|leftarrow|partial|nabla|sin|cos|tan|cot|sec|csc|ln|log)(?:\{[^{}]*\}|\[[^\[\]]*\]|[a-zA-Z0-9\^_\+\-\*\/= ])+/g,
        (matched) => {
          try {
            return katex.renderToString(matched.trim(), {
              ...KATEX_OPTIONS,
              displayMode: false,
            });
          } catch {
            return matched;
          }
        }
      );

      // 4. Format linebreaks cleanly
      parsed = parsed.replace(/\n/g, '<br/>');

      return parsed;
    } catch (e) {
      console.error('KaTeX rendering error:', e);
      return content;
    }
  }, [content, block]);

  return (
    <div
      className={`math-content leading-relaxed text-slate-800 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};
