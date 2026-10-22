export type ShiftDifficulty = 'TOUGH' | 'MODERATE' | 'EASY';

export interface PercentileReport {
  percentileString: string;
  percentileRange: string;
  estimatedRank: number;
  rankRange: string;
  categoryCutoffStatus: string;
  targetColleges: string[];
  nextMilestone: {
    marksNeeded: number;
    targetPercentile: number;
    rankJump: number;
    advice: string;
  };
}

export function estimateMathonGoPercentile(
  score: number,
  totalMarks: number = 300,
  pattern: string = 'JEE_MAIN',
  shiftDifficulty: ShiftDifficulty = 'MODERATE'
): PercentileReport {
  // Normalize score to 300 scale
  const normMarks = totalMarks > 0 ? (score / totalMarks) * 300 : score;

  // Shift difficulty offset
  let shiftOffset = 0;
  if (shiftDifficulty === 'TOUGH') shiftOffset = -15; // lower marks yield higher percentile
  if (shiftDifficulty === 'EASY') shiftOffset = +15;  // higher marks needed

  const effectiveMarks = Math.max(0, normMarks - shiftOffset);

  let percentile = 50.0;
  if (effectiveMarks >= 280) percentile = 99.95;
  else if (effectiveMarks >= 260) percentile = 99.85;
  else if (effectiveMarks >= 240) percentile = 99.60;
  else if (effectiveMarks >= 220) percentile = 99.20;
  else if (effectiveMarks >= 200) percentile = 98.80;
  else if (effectiveMarks >= 180) percentile = 98.00;
  else if (effectiveMarks >= 160) percentile = 96.80;
  else if (effectiveMarks >= 140) percentile = 94.50;
  else if (effectiveMarks >= 120) percentile = 91.00;
  else if (effectiveMarks >= 100) percentile = 86.00;
  else if (effectiveMarks >= 80) percentile = 78.00;
  else if (effectiveMarks >= 60) percentile = 68.00;
  else if (effectiveMarks >= 40) percentile = 54.00;
  else percentile = Math.max(10, Math.round(effectiveMarks * 1.2));

  // Total JEE candidates ~ 1.4 million (14,00,000)
  const totalCandidates = 1400000;
  const estimatedRank = Math.max(1, Math.round(((100 - percentile) / 100) * totalCandidates));

  const rankLow = Math.max(1, Math.round(estimatedRank * 0.9));
  const rankHigh = Math.round(estimatedRank * 1.15);
  const rankRange = `AIR ${rankLow.toLocaleString()} - ${rankHigh.toLocaleString()}`;

  const percentileLow = (percentile - 0.3).toFixed(2);
  const percentileHigh = Math.min(100, percentile + 0.3).toFixed(2);
  const percentileRange = `${percentileLow}% - ${percentileHigh}%`;

  let categoryCutoffStatus = 'General Cutoff Cleared (Qualified for JEE Advanced)';
  if (percentile < 90) {
    categoryCutoffStatus = 'Below General Cutoff (~93.2%ile needed for Advanced)';
  }

  const targetColleges: string[] = [];
  if (percentile >= 99.5) {
    targetColleges.push('NIT Trichy / Surathkal / Warangal (Computer Science & Engineering)');
    targetColleges.push('IIIT Hyderabad / Allahabad (CSE)');
  } else if (percentile >= 98.5) {
    targetColleges.push('Top 5 NITs (ECE / Electrical Engineering)');
    targetColleges.push('MNNIT Allahabad / VNIT Nagpur (CSE)');
  } else if (percentile >= 96.0) {
    targetColleges.push('Top NITs (Mechanical / Chemical Engineering)');
    targetColleges.push('DTU / NSUT Delhi Core Branches');
  } else if (percentile >= 92.0) {
    targetColleges.push('Newer NITs / IIITs (State Quota)');
    targetColleges.push('Tier-1 State Government Engineering Colleges');
  } else {
    targetColleges.push('Aim for 140+ marks in upcoming mock tests to secure top NIT branches.');
  }

  const marksNeeded = 20;
  const targetPercentile = Math.min(99.9, Math.round((percentile + 1.8) * 10) / 10);
  const targetRank = Math.max(1, Math.round(((100 - targetPercentile) / 100) * totalCandidates));
  const rankJump = Math.max(500, estimatedRank - targetRank);

  return {
    percentileString: `${percentile.toFixed(2)}%ile`,
    percentileRange,
    estimatedRank,
    rankRange,
    categoryCutoffStatus,
    targetColleges,
    nextMilestone: {
      marksNeeded,
      targetPercentile,
      rankJump,
      advice: 'Target 5 extra correct questions without negative marking in Physics & Chemistry to jump thousands of AIR ranks.',
    },
  };
}
