import { Question } from '../types/exam';

export interface AiSolutionReport {
  keyConcept: string;
  stepByStep: string;
  shortcutTrick: string;
  commonMistake: string;
}

export function synthesizeAutomaticAiSolution(
  question: Question,
  userAnswer?: any
): AiSolutionReport {
  const prompt = question.promptLatex || '';
  const explanation = question.explanationLatex || '';
  const correct = String(question.correctAnswer || 'A');

  // Determine physics/chemistry/math topics heuristically
  let keyConcept = 'Core Principles & Mathematical Theorems';
  let shortcutTrick = 'Apply dimensional analysis or eliminate extreme boundary cases in 15 seconds.';
  let commonMistake = 'Sign error or misinterpreting standard SI units and formula boundary conditions.';

  const lower = prompt.toLowerCase();
  if (lower.includes('cylinder') || lower.includes('rolling') || lower.includes('incline')) {
    keyConcept = 'Rotational Dynamics & Pure Rolling Without Slipping ($a_{cm} = \\frac{g\\sin\\theta}{1 + I/mR^2}$)';
    shortcutTrick = 'Remember standard $k^2/R^2$ values: Ring = 1, Disc = 1/2, Solid Sphere = 2/5, Hollow Sphere = 2/3.';
    commonMistake = 'Forgetting to include rotational inertia or applying sliding friction formulas during pure rolling.';
  } else if (lower.includes('charge') || lower.includes('electric') || lower.includes('potential')) {
    keyConcept = 'Coulomb’s Law, Superposition & Small Oscillations (Taylor Series Restoring Force)';
    shortcutTrick = 'For small displacements $y \\ll a$, approximate $(a^2 + y^2)^{-3/2} \\approx a^{-3}(1 - \\frac{3y^2}{2a^2})$.';
    commonMistake = 'Mixing up positive and negative charge attraction or missing factor of 2 in two-charge systems.';
  } else if (lower.includes('gas') || lower.includes('adiabatic') || lower.includes('isothermal')) {
    keyConcept = 'Thermodynamics & Adiabatic Processes ($TV^{\\gamma-1} = \\text{const}$, $PV^\\gamma = \\text{const}$)';
    shortcutTrick = 'Use $\\gamma = 5/3$ for monoatomic, $7/5$ for diatomic gas directly in fractional exponents.';
    commonMistake = 'Using $PV = nRT$ without accounting for $Q = 0$ in adiabatic processes.';
  } else if (lower.includes('matrix') || lower.includes('determinant')) {
    keyConcept = 'Linear Algebra, Matrix Properties & Inversion ($A \\cdot \\text{adj}(A) = |A| I$)';
    shortcutTrick = 'For diagonal or triangular matrices, the determinant is simply the product of the main diagonal elements.';
    commonMistake = 'Assuming matrix multiplication is commutative ($AB \\ne BA$ in general).';
  } else if (lower.includes('binomial') || lower.includes('expansion')) {
    keyConcept = 'Binomial Theorem General Term $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$ & Coefficient Series';
    shortcutTrick = 'Substitute $x = 1$ to find sum of all coefficients, or $x = -1$ for alternating coefficient sums.';
    commonMistake = 'Off-by-one error between term number $k$ and index $r = k - 1$.';
  }

  const stepByStep = explanation || `1. Identify given parameters and fundamental equations.\n2. Formulate the governing system equation.\n3. Solve algebraically to deduce the correct result: **${correct}**.`;

  return {
    keyConcept,
    stepByStep,
    shortcutTrick,
    commonMistake,
  };
}
