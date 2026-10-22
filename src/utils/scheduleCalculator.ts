import { ExamPaper, ScheduledTest, SyllabusTopic } from '../types/exam';

export function getIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayIso(): string {
  return getIsoDate(new Date());
}

export function getTomorrowIso(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getIsoDate(tomorrow);
}

export function parseScheduleCommand(command: string): {
  mode: 'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  startDate?: string;
  startTime?: string;
  endTime?: string;
  durationMonths?: number;
} {
  const lower = command.toLowerCase();
  let mode: 'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' = 'ALTERNATE_DAYS';

  if (lower.includes('single') || lower.includes('one test') || lower.includes('once')) {
    mode = 'SINGLE';
  } else if (lower.includes('alternate') || lower.includes('every other') || lower.includes('2 days')) {
    mode = 'ALTERNATE_DAYS';
  } else if (lower.includes('weekly') || lower.includes('every week') || lower.includes('sunday')) {
    mode = 'WEEKLY';
  } else if (lower.includes('biweekly') || lower.includes('every two weeks') || lower.includes('fortnight')) {
    mode = 'BIWEEKLY';
  } else if (lower.includes('month')) {
    mode = 'MONTHLY';
  }

  let startTime = '09:00';
  let endTime = '12:00';
  const timeMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:to|-)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (timeMatch) {
    let h1 = parseInt(timeMatch[1], 10);
    const m1 = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const p1 = timeMatch[3];
    if (p1 === 'pm' && h1 < 12) h1 += 12;
    if (p1 === 'am' && h1 === 12) h1 = 0;

    let h2 = parseInt(timeMatch[4], 10);
    const m2 = timeMatch[5] ? parseInt(timeMatch[5], 10) : 0;
    const p2 = timeMatch[6];
    if (p2 === 'pm' && h2 < 12) h2 += 12;
    if (p2 === 'am' && h2 === 12) h2 = 0;

    startTime = `${String(h1).padStart(2, '0')}:${String(m1).padStart(2, '0')}`;
    endTime = `${String(h2).padStart(2, '0')}:${String(m2).padStart(2, '0')}`;
  }

  let startDate: string | undefined;
  const dateMatch = command.match(/\b(202\d-\d{2}-\d{2})\b/);
  if (dateMatch) {
    startDate = dateMatch[1];
  } else if (lower.includes('tomorrow')) {
    startDate = getTomorrowIso();
  } else if (lower.includes('today')) {
    startDate = getTodayIso();
  }

  return { mode, startDate, startTime, endTime, durationMonths: 1 };
}

export interface GenerateScheduleOptions {
  paper: ExamPaper;
  mode?: string;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  durationMonths?: number;
}

export function generateLockedSchedule(options: GenerateScheduleOptions): ScheduledTest[] {
  const { paper, mode = 'ALTERNATE_DAYS', startTime = '09:00', endTime = '12:00' } = options;
  const start = options.startDate ? new Date(options.startDate + 'T00:00:00') : new Date();
  if (!options.startDate) {
    start.setDate(start.getDate() + 1);
  }

  const syllabus: SyllabusTopic[] = paper.sections.map((s) => ({
    id: `syl-${s.id}`,
    subject: (s.id === 'chemistry' || s.id === 'mathematics' ? s.id : 'physics') as any,
    name: `${s.name} (${s.questions.length} Qs)`,
    completed: false,
  }));

  const tests: ScheduledTest[] = [];
  const count = mode === 'SINGLE' ? 1 : 4;
  const stepDays = mode === 'WEEKLY' ? 7 : mode === 'BIWEEKLY' ? 14 : mode === 'MONTHLY' ? 30 : 2;

  for (let i = 0; i < count; i++) {
    const cur = new Date(start);
    cur.setDate(start.getDate() + i * stepDays);
    const dateStr = getIsoDate(cur);
    const testId = `locked-sched-${Date.now()}-${i + 1}`;
    tests.push({
      id: testId,
      title: count === 1 ? paper.title : `${paper.title} (Part ${i + 1})`,
      pattern: paper.pattern,
      scheduledDate: dateStr,
      startTime,
      endTime,
      durationMinutes: paper.durationMinutes || 180,
      totalMarks: paper.totalMarks || 300,
      paperId: paper.id,
      paper,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      scheduledAt: Date.now() + i,
      syllabus,
    });
  }

  return tests;
}

export interface LiveTestWindowStatus {
  isLive: boolean;
  status: 'STARTING_SOON' | 'ENDING_SOON' | 'LIVE' | 'UPCOMING' | 'MISSED' | 'COMPLETED';
  timeRemainingMinutes: number;
  label: string;
}

export function getLiveTestWindowStatus(test: ScheduledTest, currentTime?: Date): LiveTestWindowStatus {
  if (test.status === 'COMPLETED') {
    return { isLive: false, status: 'COMPLETED', timeRemainingMinutes: 0, label: 'Completed' };
  }

  const now = currentTime || new Date();
  const todayStr = getIsoDate(now);
  const scheduledDateStr = test.scheduledDate;

  const [startH, startM] = (test.startTime || '09:00').split(':').map(Number);
  const [endH, endM] = (test.endTime || '12:00').split(':').map(Number);

  const startMs = new Date(`${scheduledDateStr}T${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}:00`).getTime();
  const endMs = new Date(`${scheduledDateStr}T${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}:00`).getTime();
  const nowMs = now.getTime();

  if (nowMs > endMs) {
    return { isLive: false, status: 'MISSED', timeRemainingMinutes: 0, label: 'Window Closed (Missed)' };
  }

  if (nowMs >= startMs && nowMs <= endMs) {
    const minsToEnd = Math.round((endMs - nowMs) / 60000);
    if (minsToEnd <= 30) {
      return { isLive: true, status: 'ENDING_SOON', timeRemainingMinutes: minsToEnd, label: `Closing Soon (${minsToEnd}m left)` };
    }
    return { isLive: true, status: 'LIVE', timeRemainingMinutes: minsToEnd, label: 'Live Now' };
  }

  const minsToStart = Math.round((startMs - nowMs) / 60000);
  if (scheduledDateStr === todayStr && minsToStart <= 60 && minsToStart > 0) {
    return { isLive: false, status: 'STARTING_SOON', timeRemainingMinutes: minsToStart, label: `Starts in ${minsToStart}m` };
  }

  return { isLive: false, status: 'UPCOMING', timeRemainingMinutes: minsToStart, label: 'Upcoming Locked' };
}
