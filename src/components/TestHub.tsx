import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ExamPaper,
  ExamPattern,
  StudentAttempt,
  ScheduledTest,
  DailyRoutineItem,
  TaggedQuestionEntry,
  QuestionTag,
  Question,
  MistakeEntry,
} from '../types/exam';
import { InspiroLogo } from './InspiroLogo';
import { MathRenderer } from './MathRenderer';
import { DailyRoutineDesk } from './DailyRoutineDesk';
import { ModulePracticeSection } from './ModulePracticeSection';
import { RaceQuestionBank } from './RaceQuestionBank';
import { SchedulePlanner } from './SchedulePlanner';
import { AIMentorSchedulerChat } from './AIMentorSchedulerChat';
import { MistakeNotebook } from './MistakeNotebook';
import { AdminPanelModal } from './AdminPanelModal';
import { SAMPLE_JEE_MAIN_MOCK } from '../data/samplePapers';
import { ALL_VIBRANT_ELECTROSTATICS_PAPERS } from '../data/vibrantElectrostaticsData';
import { ALL_VIBRANT_KINEMATICS_PAPERS } from '../data/vibrantKinematicsData';
import { ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS } from '../data/vibrantGeometricalOpticsData';
import { ALL_VIBRANT_VECTORS_3D_PAPERS } from '../data/vibrantVectors3DData';
import { parsePastedQuestionsInstant } from '../utils/instantQuestionParser';
import {
  getTodayIso,
  getTomorrowIso,
  generateLockedSchedule,
  parseScheduleCommand,
  getLiveTestWindowStatus,
} from '../utils/scheduleCalculator';
import {
  Play,
  Clock,
  Sparkles,
  Calendar,
  Lock,
  CheckCircle2,
  AlertCircle,
  Plus,
  History,
  Award,
  X,
  BarChart3,
  CalendarDays,
  Zap,
  Activity,
  Layers,
  Bot,
  BookOpen,
  ShieldAlert,
  Flame,
  Bell,
  AlertTriangle,
  Shield,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';

interface TestHubProps {
  onSelectExam: (paper: ExamPaper) => void;
  onViewAttempt: (attempt: StudentAttempt, paper: ExamPaper) => void;
  onReattemptTest?: (paper: ExamPaper, test?: ScheduledTest) => void;
  savedAttempts: StudentAttempt[];
  savedCustomPapers: ExamPaper[];
  onSaveCustomPaper: (paper: ExamPaper) => void;
  onDeleteCustomPaper?: (paperId: string) => void;
  mistakes: MistakeEntry[];
  onRemoveMistake?: (id: string) => void;
  onUpdateMistakeReason?: (id: string, reason: any, notes?: string) => void;
  onPracticeSimilar: (entry: MistakeEntry) => void;
  scheduledTests: ScheduledTest[];
  onToggleTopic: (testId: string, topicId: string) => void;
  onEnterLiveTest: (test: ScheduledTest) => void;
  onAttachPaper?: (testId: string, paper: ExamPaper) => void;
  onAddCustomSchedule: (newTests: ScheduledTest[]) => void;
  onDeleteScheduledTest?: (testId: string) => void;
  onClearAllScheduledTests?: () => void;
  routineItems?: DailyRoutineItem[];
  onStartRoutineTask?: (item: DailyRoutineItem) => void;
  onToggleRoutineComplete?: (itemId: string) => void;
  onAddCustomRoutine?: (items: DailyRoutineItem[]) => void;
  onDeleteRoutineItem?: (itemId: string) => void;
  taggedRaceQuestions?: TaggedQuestionEntry[];
  onRemoveTaggedQuestion?: (id: string) => void;
  onUpdateQuestionTags?: (id: string, tags: QuestionTag[]) => void;
  onToggleTagOnQuestion?: (question: Question, tag: QuestionTag) => void;
  onResetCoachingSchedule?: () => void;
}

export const TestHub: React.FC<TestHubProps> = ({
  onSelectExam,
  onViewAttempt,
  onReattemptTest,
  savedAttempts = [],
  savedCustomPapers = [],
  onSaveCustomPaper,
  onDeleteCustomPaper,
  mistakes = [],
  onRemoveMistake = () => {},
  onUpdateMistakeReason = () => {},
  onPracticeSimilar,
  scheduledTests = [],
  onToggleTopic,
  onEnterLiveTest,
  onAttachPaper = () => {},
  onAddCustomSchedule,
  onDeleteScheduledTest = () => {},
  onClearAllScheduledTests = () => {},
  routineItems = [],
  onStartRoutineTask = () => {},
  onToggleRoutineComplete = () => {},
  onAddCustomRoutine = () => {},
  onDeleteRoutineItem = () => {},
  taggedRaceQuestions = [],
  onRemoveTaggedQuestion = () => {},
  onUpdateQuestionTags = () => {},
  onToggleTagOnQuestion = () => {},
  onResetCoachingSchedule,
}) => {
  // Navigation Tabs for Students (Clean & focused)
  const [activeTab, setActiveTab] = useState<
    'TESTS' | 'ROUTINE' | 'MODULES' | 'RACE' | 'MENTOR' | 'MISTAKES' | 'HISTORY' | 'SCHEDULE'
  >('TESTS');

  // Filter for Homepage CBT Tests view matching Schedule Section
  const [homeFilter, setHomeFilter] = useState<'ALL' | 'LIVE' | 'TOMORROW' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [expandedTopicTestIds, setExpandedTopicTestIds] = useState<Record<string, boolean>>({});
  const toggleTopicExpand = (id: string) => {
    setExpandedTopicTestIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Admin Portal Modal State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Available Mock Papers (Vibrant Kinematics + Electrostatics + Geometrical Optics + Custom Uploads)
  const allAvailablePapers: ExamPaper[] = useMemo(() => {
    const list: ExamPaper[] = [
      ...ALL_VIBRANT_KINEMATICS_PAPERS,
      ...ALL_VIBRANT_ELECTROSTATICS_PAPERS,
      ...ALL_VIBRANT_GEOMETRICAL_OPTICS_PAPERS,
    ];
    savedCustomPapers.forEach((cp) => {
      if (!list.some((p) => p.id === cp.id)) {
        list.push(cp);
      }
    });
    return list;
  }, [savedCustomPapers]);

  // Input & AI Conversion State
  const [pastedText, setPastedText] = useState('');
  const [aiCommand, setAiCommand] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<ExamPattern>('JEE_MAIN');
  const [durationMinutes, setDurationMinutes] = useState<number>(180);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Clock Time Picker State
  const [clockStartTime, setClockStartTime] = useState('09:00');
  const [clockEndTime, setClockEndTime] = useState('12:00');
  const [scheduleTargetDate, setScheduleTargetDate] = useState(getTodayIso());
  const [scheduleCadence, setScheduleCadence] = useState<
    'SINGLE' | 'ALTERNATE_DAYS' | 'WEEKLY_SUNDAYS' | 'TWICE_WEEKLY'
  >('SINGLE');
  const [scheduleDurationMonths, setScheduleDurationMonths] = useState<1 | 3 | 6>(1);
  const [scheduleSuccessNotice, setScheduleSuccessNotice] = useState('');

  // Real-time ticking clock (updates every 30 seconds for live countdowns & window triggers)
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const creatorRef = useRef<HTMLDivElement | null>(null);

  // Today and Tomorrow strings
  const todayStr = useMemo(() => getTodayIso(), []);
  const tomorrowStr = useMemo(() => getTomorrowIso(), []);

  // Categorize Tests and evaluate strict live window states
  const { todayTests, tomorrowTests, upcomingTests, missedTests, completedTests, activeReminders } = useMemo(() => {
    const today: { test: ScheduledTest; windowInfo: ReturnType<typeof getLiveTestWindowStatus> }[] = [];
    const tomorrow: { test: ScheduledTest; windowInfo: ReturnType<typeof getLiveTestWindowStatus> }[] = [];
    const upcoming: { test: ScheduledTest; windowInfo: ReturnType<typeof getLiveTestWindowStatus> }[] = [];
    const missed: { test: ScheduledTest; windowInfo: ReturnType<typeof getLiveTestWindowStatus> }[] = [];
    const completed: ScheduledTest[] = [];
    const reminders: { id: string; title: string; type: 'STARTING_SOON' | 'ENDING_SOON'; message: string }[] = [];

    // Sort scheduled tests chronologically
    const sorted = [...scheduledTests].sort((a, b) =>
      a.scheduledDate.localeCompare(b.scheduledDate)
    );

    sorted.forEach((test) => {
      const windowInfo = getLiveTestWindowStatus(test, currentTime);

      if (test.status === 'COMPLETED') {
        completed.push(test);
      } else if (windowInfo.status === 'MISSED') {
        missed.push({ test, windowInfo });
      } else if (test.scheduledDate === todayStr) {
        today.push({ test, windowInfo });

        // Check reminders for today
        if (windowInfo.status === 'STARTING_SOON') {
          reminders.push({
            id: `start-rem-${test.id}`,
            title: test.title,
            type: 'STARTING_SOON',
            message: `⏰ UPCOMING LIVE TEST REMINDER: Starts at ${test.startTime}! (Only ${windowInfo.timeRemainingMinutes} mins left to start).`,
          });
        } else if (windowInfo.status === 'ENDING_SOON') {
          reminders.push({
            id: `end-rem-${test.id}`,
            title: test.title,
            type: 'ENDING_SOON',
            message: `⚠️ LIVE TEST WINDOW CLOSING SOON: Only ${windowInfo.timeRemainingMinutes} mins remaining before test window closes at ${test.endTime}!`,
          });
        }
      } else if (test.scheduledDate === tomorrowStr) {
        tomorrow.push({ test, windowInfo });
      } else if (test.scheduledDate > tomorrowStr) {
        upcoming.push({ test, windowInfo });
      } else {
        missed.push({ test, windowInfo });
      }
    });

    return {
      todayTests: today,
      tomorrowTests: tomorrow,
      upcomingTests: upcoming,
      missedTests: missed,
      completedTests: completed,
      activeReminders: reminders,
    };
  }, [scheduledTests, todayStr, tomorrowStr, currentTime]);

  // Unified homepage filter matching Schedule Section
  const filteredHomeTests = useMemo(() => {
    const sorted = [...scheduledTests].sort((a, b) =>
      a.scheduledDate.localeCompare(b.scheduledDate)
    );

    if (homeFilter === 'ALL') return sorted;
    if (homeFilter === 'LIVE') {
      return sorted.filter((t) => {
        const info = getLiveTestWindowStatus(t, currentTime);
        return info.isLive || t.status === 'LIVE_NOW';
      });
    }
    if (homeFilter === 'TOMORROW') {
      return sorted.filter((t) => t.scheduledDate === tomorrowStr && t.status !== 'COMPLETED');
    }
    if (homeFilter === 'UPCOMING') {
      return sorted.filter((t) => t.scheduledDate > tomorrowStr && t.status !== 'COMPLETED');
    }
    if (homeFilter === 'COMPLETED') {
      return sorted.filter((t) => t.status === 'COMPLETED');
    }
    return sorted;
  }, [scheduledTests, homeFilter, currentTime, tomorrowStr]);

  // Overall Stats
  const totalCompletedCount = savedAttempts.length;

  // 1-Click Fill Sample Questions
  const handleFillSample = () => {
    setPastedText(`1. A particle of mass $m$ undergoes SHM with displacement $x(t) = A \\cos(\\omega t + \\phi)$. What is the time period of oscillation if restoring force is $F = -kx$?
(A) $2\\pi \\sqrt{\\frac{m}{k}}$
(B) $\\pi \\sqrt{\\frac{m}{k}}$
(C) $2\\pi \\sqrt{\\frac{k}{m}}$
(D) $\\frac{1}{2\\pi} \\sqrt{\\frac{k}{m}}$
Answer: (A)
Solution: Comparing $F = -kx$ with $m a = -kx \\implies a = -\\frac{k}{m}x = -\\omega^2 x$. Hence $\\omega = \\sqrt{k/m}$, giving $T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{m}{k}}$.

2. Which of the following molecules has a non-zero permanent dipole moment?
(A) $CO_2$
(B) $BF_3$
(C) $NH_3$
(D) $CH_4$
Answer: (C)
Solution: $NH_3$ has a trigonal pyramidal structure with a lone pair that reinforces bond dipoles. $CO_2$ (linear), $BF_3$ (trigonal planar), and $CH_4$ (tetrahedral) have dipole moments cancelling to zero by symmetry.

3. Evaluate the definite integral: $\\int_0^1 (3x^2 + 2x) dx$.
Answer: 2
Solution: $\\int_0^1 (3x^2 + 2x) dx = [x^3 + x^2]_0^1 = (1 + 1) - 0 = 2$.`);
    setAiCommand('Schedule on alternate days starting tomorrow at 9 AM');
    setCustomTitle('Mechanics & Chemistry Sprint');
  };

  // Convert Pasted Text using AI & Deterministic Parser with Command & Clock Support
  const handleConvertAndSchedule = async () => {
    if (!pastedText.trim()) {
      setErrorMessage('Please paste questions or syllabus chapters in the text box first.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setStatusMessage('inspiro AI is extracting questions, formulas & calculating locked schedule...');

    const combinedTitle = customTitle.trim() || 'JEE CBT Custom Mock';

    try {
      const response = await fetch('/api/parse-exam-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textQuestions: pastedText.trim(),
          userCommand: aiCommand.trim(),
          examTitle: combinedTitle,
          pattern: selectedPattern,
          customDurationMinutes: durationMinutes,
          autoSchedule: true,
          scheduleOptions: {
            mode: scheduleCadence,
            startDate: scheduleTargetDate,
            startTime: clockStartTime,
            endTime: clockEndTime,
            durationMonths: scheduleDurationMonths,
          },
        }),
      });

      let paper: ExamPaper | null = null;
      let returnedScheduledTests: ScheduledTest[] | undefined = undefined;

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.examPaper) {
          paper = data.examPaper;
          returnedScheduledTests = data.scheduledTests;
        }
      }

      // If backend failed or key was absent, use our robust local parser & schedule calculator
      if (!paper) {
        console.log('[TestHub] Using local instant parser & clock scheduler...');
        const localRes = parsePastedQuestionsInstant(
          pastedText.trim(),
          combinedTitle,
          selectedPattern,
          durationMinutes
        );
        if (!localRes.success || !localRes.paper) {
          throw new Error(
            localRes.error ||
              'Could not parse questions. Ensure questions start with numbers like "1. ", "Q1.", or "(A)" options.'
          );
        }
        paper = localRes.paper;

        // Interpret scheduling command or use chosen clock times
        const parsedCmd = parseScheduleCommand(aiCommand);
        returnedScheduledTests = generateLockedSchedule({
          paper,
          mode: aiCommand.trim() ? parsedCmd.mode : scheduleCadence,
          startDate: (aiCommand.trim() && parsedCmd.startDate) || scheduleTargetDate,
          startTime: (aiCommand.trim() && parsedCmd.startTime) || clockStartTime,
          endTime: (aiCommand.trim() && parsedCmd.endTime) || clockEndTime,
          durationMonths: (aiCommand.trim() && parsedCmd.durationMonths) || scheduleDurationMonths,
        });
      }

      // Save custom paper
      onSaveCustomPaper(paper);

      // Add scheduled tests with strict lock
      if (returnedScheduledTests && returnedScheduledTests.length > 0) {
        onAddCustomSchedule([...returnedScheduledTests, ...scheduledTests]);
        setScheduleSuccessNotice(
          `🔒 Successfully locked ${returnedScheduledTests.length} test(s) in your live schedule! They will unlock strictly at their scheduled time window.`
        );
        setTimeout(() => setScheduleSuccessNotice(''), 7000);
      }
    } catch (err: any) {
      console.error('Extraction error:', err);
      setErrorMessage(err.message || 'Failed to convert text. Please check the question format.');
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-3 md:p-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ======================================================== */}
        {/* HEADER: Small inspiro LIVE, NO API connected text        */}
        {/* ======================================================== */}
        <header className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            {/* Small inspiro LIVE logo */}
            <InspiroLogo size="sm" showText />
            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 hidden sm:inline">
              JEE Live Test Series & Coaching Desk
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hidden sm:inline">
              Today: <strong className="text-white">{todayStr}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>NTA & MathonGo CBT</span>
            </span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
              title="Open Teacher & Administrator Console"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </header>

        {/* Live Test Active Reminders Banner (Before Test Starts or Before End) */}
        {activeReminders.length > 0 && (
          <div className="space-y-2">
            {activeReminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-1 ${
                  rem.type === 'ENDING_SOON'
                    ? 'bg-amber-950/70 border-amber-500/70 text-amber-200'
                    : 'bg-red-950/70 border-red-500/70 text-red-200'
                }`}
              >
                {rem.type === 'ENDING_SOON' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
                ) : (
                  <Bell className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
                )}
                <div className="text-xs md:text-sm font-semibold">{rem.message}</div>
              </div>
            ))}
          </div>
        )}

        {/* Global Schedule Notice */}
        {scheduleSuccessNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs md:text-sm font-medium">{scheduleSuccessNotice}</span>
            </div>
            <button
              onClick={() => setScheduleSuccessNotice('')}
              className="text-emerald-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* PRIMARY NAVIGATION TABS (STUDENT VIEW)                   */}
        {/* ======================================================== */}
        <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('TESTS')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'TESTS'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            CBT Tests & Mocks
          </button>

          <button
            onClick={() => setActiveTab('MODULES')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'MODULES'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Module Practice
          </button>

          <button
            onClick={() => setActiveTab('ROUTINE')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ROUTINE'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
            Daily Desk
          </button>

          <button
            onClick={() => setActiveTab('RACE')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 relative ${
              activeTab === 'RACE'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-red-400" />
            RACE & Doubts
            {taggedRaceQuestions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-black text-[10px] font-mono font-bold">
                {taggedRaceQuestions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('MENTOR')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'MENTOR'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            AI Academic Mentor
          </button>

          <button
            onClick={() => setActiveTab('MISTAKES')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 relative ${
              activeTab === 'MISTAKES'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            Mistake Notebook
            {mistakes.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-mono font-bold">
                {mistakes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'HISTORY'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            History ({savedAttempts.length + missedTests.length})
          </button>

          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={`px-3 py-2 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'SCHEDULE'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Schedule Calendar
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: LIVE, TOMORROW & UPCOMING CBT TESTS (LOCKED)      */}
        {/* ======================================================== */}
        {activeTab === 'TESTS' && (
          <div className="space-y-6">
            {/* Header & Filter Controls matching Schedule Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base md:text-lg font-bold font-display text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                  Live & Upcoming CBT Test Series
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Strictly locked official NTA & MathonGo CBT mode. Tests unlock only during their scheduled live window.
                </p>
              </div>

              {/* Controls: Re-align & Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {onResetCoachingSchedule && (
                  <button
                    type="button"
                    onClick={onResetCoachingSchedule}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Re-align full series: Day 1 Physics (Electrostatics), Day 2 Math (Vectors & 3-D), Day 13 Kinematics, Day 17 Geometrical Optics"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Re-align Series</span>
                  </button>
                )}

                {/* Filter tabs matching schedule section */}
                <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setHomeFilter('ALL')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      homeFilter === 'ALL'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    All Tests ({scheduledTests.length})
                  </button>
                  <button
                    onClick={() => setHomeFilter('LIVE')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      homeFilter === 'LIVE'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Live Now ({todayTests.filter(t => t.windowInfo.isLive).length})
                  </button>
                  <button
                    onClick={() => setHomeFilter('TOMORROW')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      homeFilter === 'TOMORROW'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Tomorrow ({tomorrowTests.length})
                  </button>
                  <button
                    onClick={() => setHomeFilter('UPCOMING')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      homeFilter === 'UPCOMING'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Upcoming ({upcomingTests.length})
                  </button>
                  <button
                    onClick={() => setHomeFilter('COMPLETED')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      homeFilter === 'COMPLETED'
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Completed ({completedTests.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Test Cards List matching schedule section */}
            <div className="space-y-4">
              {filteredHomeTests.length > 0 ? (
                filteredHomeTests.map((test, index) => {
                  const windowInfo = getLiveTestWindowStatus(test, currentTime);
                  const isExpanded = !!expandedTopicTestIds[test.id];
                  const completedTopics = test.syllabus.filter((t) => t.completed).length;
                  const isLive = windowInfo.isLive || test.status === 'LIVE_NOW';
                  const isTomorrow = test.scheduledDate === tomorrowStr;
                  const isCompleted = test.status === 'COMPLETED';
                  const isMissed = windowInfo.status === 'MISSED';

                  return (
                    <div
                      key={test.id}
                      className={`rounded-xl border p-5 md:p-6 shadow-xl space-y-4 transition-all ${
                        isLive
                          ? 'bg-gradient-to-r from-red-950/50 via-zinc-950 to-black border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                          : isTomorrow
                          ? 'bg-zinc-950 border-amber-600/40 hover:border-amber-500/60'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {/* Header row */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 uppercase">
                              Test #{index + 1}
                            </span>

                            {isLive ? (
                              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-[0_0_8px_rgba(220,38,38,0.6)] animate-pulse">
                                ● LIVE WINDOW
                              </span>
                            ) : isTomorrow ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                Opens Tomorrow @ {test.startTime}
                              </span>
                            ) : isCompleted ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600/50">
                                ✓ COMPLETED
                              </span>
                            ) : isMissed ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                                ❌ CLOSED / MISSED
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" />
                                Locked (Opens {test.scheduledDate})
                              </span>
                            )}

                            <span className="text-xs font-mono text-zinc-400">
                              Slot: {test.startTime} - {test.endTime}
                            </span>
                          </div>

                          <h4 className="font-bold text-base md:text-lg text-white">
                            {test.title}
                          </h4>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono">
                            <span>Date: {test.scheduledDate}</span>
                            <span>Duration: {test.durationMinutes} Mins</span>
                            <span>Marks: {test.totalMarks}</span>
                            <span>
                              Syllabus: {completedTopics}/{test.syllabus.length} Revised
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                          {test.syllabus.length > 0 && (
                            <button
                              onClick={() => toggleTopicExpand(test.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Syllabus Checklist</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          {isLive ? (
                            <button
                              onClick={() => onEnterLiveTest(test)}
                              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:scale-95 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse flex items-center gap-1.5 cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Take Live Test</span>
                            </button>
                          ) : isCompleted || isMissed ? (
                            <button
                              onClick={() => {
                                const paper = test.paper || savedCustomPapers.find(p => p.id === test.paperId) || { ...SAMPLE_JEE_MAIN_MOCK, id: test.paperId || test.id, title: test.title };
                                if (onReattemptTest) onReattemptTest(paper, test);
                                else onSelectExam(paper);
                              }}
                              className="px-4 py-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                              <span>Reattempt Test</span>
                            </button>
                          ) : (
                            <div
                              className="px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-1.5 select-none"
                              title="Test is locked until scheduled start window"
                            >
                              <Lock className="w-3.5 h-3.5 text-amber-400" />
                              <span>Locked Until Window</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Expandable Syllabus Checklist */}
                      {isExpanded && test.syllabus.length > 0 && (
                        <div className="pt-3 border-t border-zinc-800 space-y-3">
                          <div className="text-xs font-semibold text-zinc-400">
                            Topics covered in this exam:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {test.syllabus.map((topic) => (
                              <label
                                key={topic.id}
                                onClick={() => onToggleTopic(test.id, topic.id)}
                                className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                                  topic.completed
                                    ? 'bg-red-950/40 border-red-800 text-white'
                                    : 'bg-black/60 border-zinc-800 text-zinc-300'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={topic.completed}
                                  onChange={() => {}}
                                  className="w-3.5 h-3.5 text-red-600 rounded bg-zinc-900 border-zinc-700"
                                />
                                <span className={topic.completed ? 'line-through text-zinc-400' : ''}>
                                  {topic.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 text-center">
                  No tests found under the "{homeFilter}" filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SCHEDULE PLANNER (Original Full Roadmap)          */}
        {/* ======================================================== */}
        {activeTab === 'SCHEDULE' && (
          <SchedulePlanner
            scheduledTests={scheduledTests}
            onToggleTopic={onToggleTopic}
            onEnterLiveTest={onEnterLiveTest}
            onAttachPaper={onAttachPaper}
            onAddCustomSchedule={onAddCustomSchedule}
            onDeleteTest={onDeleteScheduledTest}
            onSelectExamDirectly={onSelectExam}
            savedCustomPapers={savedCustomPapers}
            onSaveCustomPaper={onSaveCustomPaper}
            onResetCoachingSchedule={onResetCoachingSchedule}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 4: DAILY ROUTINE DESK                                */}
        {/* ======================================================== */}
        {activeTab === 'ROUTINE' && (
          <DailyRoutineDesk
            routineItems={routineItems}
            onStartRoutineTask={onStartRoutineTask}
            onToggleRoutineComplete={onToggleRoutineComplete}
            onAddCustomRoutine={onAddCustomRoutine}
            onDeleteRoutineItem={onDeleteRoutineItem}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 5: MODULE PRACTICE                                   */}
        {/* ======================================================== */}
        {activeTab === 'MODULES' && (
          <ModulePracticeSection
            onStartExam={onSelectExam}
            onAddCustomPaper={onSaveCustomPaper}
            onAddRoutineItems={onAddCustomRoutine}
            savedCustomPapers={savedCustomPapers}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 6: ALLEN RACE & DOUBTS BANK                          */}
        {/* ======================================================== */}
        {activeTab === 'RACE' && (
          <RaceQuestionBank
            taggedQuestions={taggedRaceQuestions}
            onStartExam={onSelectExam}
            onRemoveTaggedQuestion={onRemoveTaggedQuestion}
            onUpdateTags={onUpdateQuestionTags}
            onScheduleRaceSession={(item) => onAddCustomRoutine([item])}
            onOpenAIMentorWithPrompt={() => setActiveTab('MENTOR')}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 7: AI ACADEMIC MENTOR CHAT                           */}
        {/* ======================================================== */}
        {activeTab === 'MENTOR' && (
          <AIMentorSchedulerChat
            onApplyRoutine={(items) => {
              onAddCustomRoutine(items);
              setActiveTab('ROUTINE');
            }}
            currentRoutineItems={routineItems}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 8: MISTAKE NOTEBOOK                                  */}
        {/* ======================================================== */}
        {activeTab === 'MISTAKES' && (
          <MistakeNotebook
            mistakes={mistakes}
            onRemoveMistake={onRemoveMistake}
            onUpdateMistakeReason={onUpdateMistakeReason}
            onPracticeSimilar={onPracticeSimilar}
          />
        )}

        {/* ======================================================== */}
        {/* TAB 9: TEST HISTORY & MISSED TESTS (BOLD RED MARKS)     */}
        {/* ======================================================== */}
        {activeTab === 'HISTORY' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold font-display text-white">
                  Exam History & Performance Log
                </h3>
              </div>
              <div className="text-xs font-mono text-zinc-400">
                Completed: <strong className="text-emerald-400">{savedAttempts.length}</strong> |{' '}
                Missed: <strong className="text-red-500">{missedTests.length}</strong>
              </div>
            </div>

            {/* MISSED TESTS (PROMINENT BOLD RED MARKS) */}
            {missedTests.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span>Missed Tests (Recorded as Incomplete — Rescheduling Permanently Disabled)</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {missedTests.map(({ test }) => (
                    <div
                      key={test.id}
                      className="p-4 rounded-xl bg-red-950/40 border-2 border-red-600/80 shadow-[0_0_15px_rgba(220,38,38,0.3)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black tracking-wider uppercase">
                            ❌ MISSED (0 MARKS RECORDED)
                          </span>
                          <span className="text-xs font-mono text-red-400">
                            Closed on {test.scheduledDate} at {test.endTime}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{test.title}</h4>
                        <div className="text-xs font-mono text-zinc-400">
                          Scheduled Slot: {test.startTime} - {test.endTime} • Duration: {test.durationMinutes}m
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const paper =
                              test.paper ||
                              savedCustomPapers.find((p) => p.id === test.paperId) || {
                                ...SAMPLE_JEE_MAIN_MOCK,
                                id: test.paperId || test.id,
                                title: test.title,
                              };
                            if (onReattemptTest) onReattemptTest(paper, test);
                            else onSelectExam(paper);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reattempt / Practice</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COMPLETED ATTEMPTS */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Completed Exam Attempts
              </div>

              {savedAttempts.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {savedAttempts.map((attempt) => {
                    const paper =
                      savedCustomPapers.find((p) => p.id === attempt.examId) ||
                      scheduledTests.find((t) => t.paperId === attempt.examId)?.paper || {
                        id: attempt.examId,
                        title: attempt.examTitle,
                        pattern: attempt.pattern,
                        durationMinutes: 180,
                        totalMarks: attempt.totalMarks,
                        sections: [],
                      };

                    return (
                      <div
                        key={attempt.id}
                        className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600/50 text-emerald-300 text-[10px] font-bold">
                              COMPLETED
                            </span>
                            <span className="text-xs font-mono text-zinc-500">
                              {new Date(attempt.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{attempt.examTitle}</h4>
                          <div className="text-xs font-mono text-zinc-400">
                            Score:{' '}
                            <strong className="text-emerald-400 font-bold">
                              {attempt.totalMarks}
                            </strong>{' '}
                            Marks
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (onReattemptTest) onReattemptTest(paper);
                              else onSelectExam(paper);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Reattempt Exam</span>
                          </button>
                          <button
                            onClick={() => onViewAttempt(attempt, paper)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 cursor-pointer"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                            <span>View Analysis</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-500 text-center">
                  No completed attempts yet. Sit for a live test to log your performance.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Admin Management Modal Console */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        savedCustomPapers={savedCustomPapers}
        onSaveCustomPaper={onSaveCustomPaper}
        onDeleteCustomPaper={onDeleteCustomPaper}
        scheduledTests={scheduledTests}
        onAddCustomSchedule={onAddCustomSchedule}
        onDeleteScheduledTest={onDeleteScheduledTest}
        onClearAllScheduledTests={onClearAllScheduledTests}
        onStartTestDirectly={onSelectExam}
      />
    </div>
  );
};
