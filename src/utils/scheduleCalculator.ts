import type { ScheduledTest, ExamPattern, ExamPaper, SyllabusTopic } from '../types/exam.ts';

export interface ScheduleOptions {
  paper: ExamPaper;
  mode: 'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY_SUNDAYS' | 'TWICE_WEEKLY' | 'CUSTOM_INTERVAL';
  startDate?: string; // YYYY-MM-DD
  startTime?: string; // "09:00"
  endTime?: string; // "12:00"
  durationMonths?: number; // 1, 3, or 6
  intervalDays?: number; // e.g. 2 for alternate days
}

/**
 * Returns formatted local ISO date string "YYYY-MM-DD"
 */
export function getIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's ISO date string based on current local date (or simulated environment)
 */
export function getTodayIso(): string {
  return getIsoDate(new Date());
}

/**
 * Returns tomorrow's ISO date string
 */
export function getTomorrowIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return getIsoDate(d);
}

/**
 * Parses natural language commands like:
 * - "schedule on alternate days"
 * - "schedule every Sunday for 3 months"
 * - "schedule on alternate days starting Monday at 9 AM"
 * - "schedule for tomorrow at 2 PM"
 * - "schedule for specific date 2026-10-25"
 */
export function parseScheduleCommand(command: string): {
  mode: 'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY_SUNDAYS' | 'TWICE_WEEKLY';
  startDate?: string;
  startTime?: string;
  endTime?: string;
  durationMonths: number;
} {
  const lower = (command || '').toLowerCase().trim();
  let mode: 'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY_SUNDAYS' | 'TWICE_WEEKLY' = 'SINGLE';
  let durationMonths = 1;

  if (lower.includes('6 month') || lower.includes('6-month') || lower.includes('six month')) {
    durationMonths = 6;
  } else if (lower.includes('3 month') || lower.includes('3-month') || lower.includes('three month')) {
    durationMonths = 3;
  } else if (lower.includes('month')) {
    durationMonths = 1;
  }

  // Detect time
  let startTime = '09:00';
  let endTime = '12:00';
  if (lower.includes('14:00') || lower.includes('2 pm') || lower.includes('afternoon')) {
    startTime = '14:00';
    endTime = '17:00';
  } else if (lower.includes('19:00') || lower.includes('7 pm') || lower.includes('evening')) {
    startTime = '19:00';
    endTime = '22:00';
  } else if (lower.includes('10 am') || lower.includes('10:00')) {
    startTime = '10:00';
    endTime = '13:00';
  }

  // Detect start date
  let startDate: string | undefined = undefined;
  const dateMatch = lower.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (dateMatch) {
    startDate = dateMatch[1];
  } else if (lower.includes('tomorrow') || lower.includes('tommorow')) {
    startDate = getTomorrowIso();
  } else if (lower.includes('today')) {
    startDate = getTodayIso();
  }

  // Detect mode
  if (lower.includes('alternate') || lower.includes('alternative') || lower.includes('every other day')) {
    mode = 'ALTERNATE_DAYS';
    if (!startDate) startDate = getTomorrowIso();
  } else if (lower.includes('sunday') || lower.includes('sundays') || lower.includes('weekend')) {
    mode = 'WEEKLY_SUNDAYS';
  } else if (lower.includes('twice a week') || lower.includes('biweekly')) {
    mode = 'TWICE_WEEKLY';
  }

  return { mode, startDate, startTime, endTime, durationMonths };
}

/**
 * Builds standard syllabus checklist items for a test paper based on its sections
 */
export function buildSyllabusFromPaper(paper: ExamPaper): SyllabusTopic[] {
  const topics: SyllabusTopic[] = [];
  paper.sections.forEach((sec, secIdx) => {
    topics.push({
      id: `top-${paper.id}-${sec.id}-${secIdx}`,
      subject: sec.id,
      name: `${sec.name} (${sec.questions.length} Questions)`,
      completed: false,
    });
  });
  if (topics.length === 0) {
    topics.push(
      { id: 'top-p', subject: 'physics', name: 'Physics Section Drill', completed: false },
      { id: 'top-c', subject: 'chemistry', name: 'Chemistry Section Drill', completed: false },
      { id: 'top-m', subject: 'mathematics', name: 'Mathematics Section Drill', completed: false }
    );
  }
  return topics;
}

/**
 * Generates an immutable, locked list of scheduled tests up to 6 months
 */
export function generateLockedSchedule(options: ScheduleOptions): ScheduledTest[] {
  const {
    paper,
    mode,
    startDate = getTodayIso(),
    startTime = '09:00',
    endTime = '12:00',
    durationMonths = 1,
    intervalDays = 2,
  } = options;

  const tests: ScheduledTest[] = [];
  const baseDate = new Date(startDate);
  const now = Date.now();
  const todayIso = getTodayIso();

  const totalDays = Math.min(durationMonths * 30, 180); // up to 6 months (180 days)

  if (mode === 'SINGLE') {
    const isToday = startDate === todayIso;
    tests.push({
      id: `live-sched-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: paper.title,
      pattern: paper.pattern,
      scheduledDate: startDate,
      startTime,
      endTime,
      durationMinutes: paper.durationMinutes || 180,
      totalMarks: paper.totalMarks || (paper.pattern === 'JEE_MAIN' ? 300 : 180),
      syllabus: buildSyllabusFromPaper(paper),
      paperId: paper.id,
      paper,
      status: isToday ? 'LIVE_NOW' : 'UPCOMING_LOCKED',
      isLocked: true, // STRICT IMMUTABILITY: Cannot be edited or rescheduled
      scheduledAt: now,
    });
    return tests;
  }

  if (mode === 'ALTERNATE_DAYS') {
    // Generate tests every 2 days for the duration
    let curDate = new Date(baseDate);
    const stepDays = intervalDays || 2;
    let index = 1;

    for (let dayOffset = 0; dayOffset < totalDays; dayOffset += stepDays) {
      const testDate = new Date(baseDate);
      testDate.setDate(baseDate.getDate() + dayOffset);
      const isoStr = getIsoDate(testDate);
      const isToday = isoStr === todayIso;

      tests.push({
        id: `live-sched-${now}-${index}`,
        title: `${paper.title} • Test ${String(index).padStart(2, '0')}`,
        pattern: paper.pattern,
        scheduledDate: isoStr,
        startTime,
        endTime,
        durationMinutes: paper.durationMinutes || 180,
        totalMarks: paper.totalMarks || (paper.pattern === 'JEE_MAIN' ? 300 : 180),
        syllabus: buildSyllabusFromPaper(paper),
        paperId: paper.id,
        paper,
        status: isToday ? 'LIVE_NOW' : 'UPCOMING_LOCKED',
        isLocked: true,
        scheduledAt: now,
      });
      index++;
    }
    return tests;
  }

  if (mode === 'WEEKLY_SUNDAYS') {
    // Find all Sundays up to totalDays (up to 6 months)
    let cur = new Date(baseDate);
    let index = 1;
    for (let i = 0; i < totalDays; i++) {
      const checkDate = new Date(baseDate);
      checkDate.setDate(baseDate.getDate() + i);
      if (checkDate.getDay() === 0) {
        // Sunday
        const isoStr = getIsoDate(checkDate);
        const isToday = isoStr === todayIso;
        tests.push({
          id: `live-sched-sun-${now}-${index}`,
          title: `${paper.title} • Sunday All-India Mock ${String(index).padStart(2, '0')}`,
          pattern: paper.pattern,
          scheduledDate: isoStr,
          startTime,
          endTime,
          durationMinutes: paper.durationMinutes || 180,
          totalMarks: paper.totalMarks || (paper.pattern === 'JEE_MAIN' ? 300 : 180),
          syllabus: buildSyllabusFromPaper(paper),
          paperId: paper.id,
          paper,
          status: isToday ? 'LIVE_NOW' : 'UPCOMING_LOCKED',
          isLocked: true,
          scheduledAt: now,
        });
        index++;
      }
    }
    return tests;
  }

  if (mode === 'TWICE_WEEKLY') {
    // Wednesdays (3) and Saturdays (6)
    let index = 1;
    for (let i = 0; i < totalDays; i++) {
      const checkDate = new Date(baseDate);
      checkDate.setDate(baseDate.getDate() + i);
      const day = checkDate.getDay();
      if (day === 3 || day === 6) {
        const isoStr = getIsoDate(checkDate);
        const isToday = isoStr === todayIso;
        tests.push({
          id: `live-sched-bi-${now}-${index}`,
          title: `${paper.title} • Live Session ${String(index).padStart(2, '0')}`,
          pattern: paper.pattern,
          scheduledDate: isoStr,
          startTime,
          endTime,
          durationMinutes: paper.durationMinutes || 180,
          totalMarks: paper.totalMarks || (paper.pattern === 'JEE_MAIN' ? 300 : 180),
          syllabus: buildSyllabusFromPaper(paper),
          paperId: paper.id,
          paper,
          status: isToday ? 'LIVE_NOW' : 'UPCOMING_LOCKED',
          isLocked: true,
          scheduledAt: now,
        });
        index++;
      }
    }
    return tests;
  }

  return tests;
}

export interface LiveWindowInfo {
  status: 'UPCOMING_LOCKED' | 'STARTING_SOON' | 'LIVE_NOW' | 'ENDING_SOON' | 'MISSED' | 'COMPLETED';
  isLive: boolean;
  canEnter: boolean;
  timeRemainingMinutes: number;
  message: string;
  badgeColor: string;
}

/**
 * Calculates live window status with strict locked start/end durations and reminders
 */
export function getLiveTestWindowStatus(test: ScheduledTest, now: Date = new Date()): LiveWindowInfo {
  if (test.status === 'COMPLETED') {
    return {
      status: 'COMPLETED',
      isLive: false,
      canEnter: false,
      timeRemainingMinutes: 0,
      message: 'Completed',
      badgeColor: 'emerald',
    };
  }

  const [startH, startM] = (test.startTime || '09:00').split(':').map(Number);
  const [endH, endM] = (test.endTime || '12:00').split(':').map(Number);

  // Parse test start & end timestamps
  const testStartDate = new Date(`${test.scheduledDate}T${String(startH || 9).padStart(2, '0')}:${String(startM || 0).padStart(2, '0')}:00`);
  const testEndDate = new Date(`${test.scheduledDate}T${String(endH || 12).padStart(2, '0')}:${String(endM || 0).padStart(2, '0')}:00`);

  const nowMs = now.getTime();
  const startMs = testStartDate.getTime();
  const endMs = testEndDate.getTime();

  // If scheduled test date & end time have already passed without completion
  if (nowMs > endMs) {
    return {
      status: 'MISSED',
      isLive: false,
      canEnter: false,
      timeRemainingMinutes: 0,
      message: 'MISSED (Test Window Closed)',
      badgeColor: 'red',
    };
  }

  // If currently strictly within live duration (between startTime and endTime)
  if (nowMs >= startMs && nowMs <= endMs) {
    const minsLeft = Math.max(0, Math.round((endMs - nowMs) / 60000));
    const isEndingSoon = minsLeft <= 15;
    return {
      status: isEndingSoon ? 'ENDING_SOON' : 'LIVE_NOW',
      isLive: true,
      canEnter: true,
      timeRemainingMinutes: minsLeft,
      message: isEndingSoon ? `⚠️ Ending in ${minsLeft}m! Submit soon.` : `🔴 Live Now (${minsLeft}m left)`,
      badgeColor: isEndingSoon ? 'amber' : 'red',
    };
  }

  // Before start time: Locked until start time
  const minsToStart = Math.max(0, Math.round((startMs - nowMs) / 60000));
  const isStartingSoon = minsToStart <= 15;
  const hoursToStart = Math.floor(minsToStart / 60);
  const remMins = minsToStart % 60;
  const startStr = hoursToStart > 0 ? `${hoursToStart}h ${remMins}m` : `${remMins}m`;

  return {
    status: isStartingSoon ? 'STARTING_SOON' : 'UPCOMING_LOCKED',
    isLive: false,
    canEnter: false,
    timeRemainingMinutes: minsToStart,
    message: isStartingSoon ? `⏰ Starts in ${startStr}!` : `Opens in ${startStr} (at ${test.startTime})`,
    badgeColor: isStartingSoon ? 'amber' : 'zinc',
  };
}

