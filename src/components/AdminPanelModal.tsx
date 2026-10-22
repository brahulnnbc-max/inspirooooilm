import React, { useState, useRef } from 'react';
import {
  ExamPaper,
  ExamPattern,
  ScheduledTest,
  DailyRoutineItem,
  Question,
} from '../types/exam';
import { compressImageFile } from '../utils/imageCompressor';
import { parsePastedQuestionsInstant } from '../utils/instantQuestionParser';
import { splitQuestionsIntoFiftyChunks, schedulePapersOnAlternateDays } from '../utils/questionSplitter';
import {
  SAMPLE_JEE_FIFTY_PART_1,
  SAMPLE_JEE_REMAINING_PART_2,
  getFiftyAndRemainingScheduledMockTests,
} from '../data/sampleSplitFiftyPapers';
import { DiagnosisWorkbench } from './DiagnosisWorkbench';
import {
  X,
  Shield,
  FileText,
  Upload,
  Calendar,
  Activity,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Play,
  Clock,
  Lock,
  Layers,
  Zap,
  RefreshCw,
  Cpu,
  BookOpen,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCustomPapers: ExamPaper[];
  onSaveCustomPaper: (paper: ExamPaper) => void;
  onDeleteCustomPaper?: (paperId: string) => void;
  scheduledTests: ScheduledTest[];
  onAddCustomSchedule: (newTests: ScheduledTest[]) => void;
  onDeleteScheduledTest: (testId: string) => void;
  onClearAllScheduledTests: () => void;
  onStartTestDirectly: (paper: ExamPaper) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  savedCustomPapers,
  onSaveCustomPaper,
  onDeleteCustomPaper,
  scheduledTests,
  onAddCustomSchedule,
  onDeleteScheduledTest,
  onClearAllScheduledTests,
  onStartTestDirectly,
}) => {
  const [activeTab, setActiveTab] = useState<'PAPERS' | 'SCHEDULE' | 'DIAGNOSIS' | 'AI_STATUS'>('PAPERS');
  const [creatorMode, setCreatorMode] = useState<'PASTE' | 'UPLOAD' | 'LIST'>('PASTE');

  // Paste Text Creator State
  const [pastedText, setPastedText] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<ExamPattern>('JEE_MAIN');
  const [durationMinutes, setDurationMinutes] = useState<number>(180);
  const [isProcessing, setIsProcessing] = useState(false);
  const [creatorError, setCreatorError] = useState('');
  const [creatorSuccess, setCreatorSuccess] = useState('');

  // Upload PDF / Image State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Manual Schedule State
  const [schedulePaperId, setSchedulePaperId] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [scheduleStartTime, setScheduleStartTime] = useState<string>('09:00');
  const [scheduleEndTime, setScheduleEndTime] = useState<string>('12:00');
  const [scheduleNotice, setScheduleNotice] = useState<string>('');

  // 50-Question Section Chunker & Alternate Day Scheduler State
  const [splitFiftyMode, setSplitFiftyMode] = useState<boolean>(true);
  const [randomizeMcqMode, setRandomizeMcqMode] = useState<boolean>(true);

  // 1-Click Schedule 50-Q Part 1 & Remaining Part 2 onto Alternate Days (09:00 - 12:00)
  const handleScheduleDefaultFiftySuite = () => {
    onSaveCustomPaper(SAMPLE_JEE_FIFTY_PART_1);
    onSaveCustomPaper(SAMPLE_JEE_REMAINING_PART_2);
    const mockTests = getFiftyAndRemainingScheduledMockTests();
    onAddCustomSchedule(mockTests);
    setScheduleNotice(`🔒 Successfully scheduled 2 locked CBT tests in My Tests: Part 1 (50 Qs • 180 Mins) and Part 2 (25 Qs • 100 Mins) on alternate days from 9:00 AM to 12:00 PM!`);
    setTimeout(() => setScheduleNotice(''), 8000);
  };

  // Chunk any existing paper into 50-Q tests and schedule on alternate days
  const handleChunkAndSchedulePaper = (paperIdToChunk: string) => {
    const paper = savedCustomPapers.find((p) => p.id === paperIdToChunk) || SAMPLE_JEE_FIFTY_PART_1;
    if (!paper) return;

    const allQ: any[] = [];
    paper.sections.forEach((sec) => {
      if (Array.isArray(sec.questions)) allQ.push(...sec.questions);
    });

    if (allQ.length === 0) {
      setScheduleNotice('⚠️ Selected paper has no questions to chunk.');
      return;
    }

    const splitPapers = splitQuestionsIntoFiftyChunks(
      allQ,
      paper.title,
      paper.pattern,
      randomizeMcqMode
    );

    splitPapers.forEach((sp) => onSaveCustomPaper(sp));

    const scheduled = schedulePapersOnAlternateDays(splitPapers, {
      startDate: scheduleDate,
      startTime: scheduleStartTime || '09:00',
      endTime: scheduleEndTime || '12:00',
    });

    onAddCustomSchedule(scheduled);
    setScheduleNotice(`🔒 Successfully created ${splitPapers.length} tests (50-question 180m & remaining Q×4m) and locked them in My Tests on alternate days starting ${scheduleDate} @ ${scheduleStartTime}!`);
    setTimeout(() => setScheduleNotice(''), 8000);
  };

  // AI Connection Test State
  const [isTestingAI, setIsTestingAI] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{
    success: boolean;
    latencyMs?: number;
    model?: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  // Handle Fill Sample Questions for Fast Testing
  const handleFillSample = () => {
    setPaperTitle('Rotational Dynamics & Thermodynamics Mock');
    setPastedText(`1. A solid sphere of mass $M$ and radius $R$ rolls down an incline of angle $\\theta$ without slipping. What is the acceleration of its center of mass?
(A) $\\frac{5}{7} g \\sin\\theta$
(B) $\\frac{2}{5} g \\sin\\theta$
(C) $\\frac{1}{2} g \\sin\\theta$
(D) $g \\sin\\theta$
Answer: (A)
Solution: For pure rolling, $a = \\frac{g \\sin\\theta}{1 + I/(MR^2)}$. For solid sphere $I = \\frac{2}{5}MR^2$, hence $a = \\frac{g \\sin\\theta}{1 + 2/5} = \\frac{5}{7}g \\sin\\theta$.

2. One mole of an ideal monoatomic gas is heated at constant pressure from $300\\text{ K}$ to $400\\text{ K}$. Find the heat supplied to the gas ($R = 8.31\\text{ J/mol K}$).
(A) $2077.5\\text{ J}$
(B) $1246.5\\text{ J}$
(C) $831.0\\text{ J}$
(D) $415.5\\text{ J}$
Answer: (A)
Solution: At constant pressure, $Q = n C_p \\Delta T = 1 \\times (\\frac{5}{2} R) \\times (400 - 300) = 2.5 \\times 8.31 \\times 100 = 2077.5\\text{ J}$.

3. Find the integer value of $\\lim_{x \\to 0} \\frac{\\sin(3x) - 3x}{x^3}$.
Answer: -4.5
Solution: By Taylor expansion $\\sin(3x) = 3x - \\frac{(3x)^3}{6} = 3x - \\frac{27x^3}{6} = 3x - 4.5x^3$. Thus the limit is $-4.5$.`);
  };

  // Instant Deterministic Conversion (Keyless, 0 Delay)
  const handleInstantParse = () => {
    if (!pastedText.trim()) {
      setCreatorError('Please enter question text before parsing.');
      return;
    }
    setCreatorError('');
    setCreatorSuccess('');
    setIsProcessing(true);

    try {
      const res = parsePastedQuestionsInstant(
        pastedText.trim(),
        paperTitle.trim() || 'Custom JEE Test Paper',
        selectedPattern,
        durationMinutes,
        undefined,
        randomizeMcqMode
      );

      if (!res.success || !res.paper) {
        throw new Error(res.error || 'Failed to parse questions.');
      }

      const allQ: Question[] = res.rawQuestions && res.rawQuestions.length > 0
        ? res.rawQuestions
        : res.paper.sections.flatMap((s) => s.questions || []);

      if (splitFiftyMode && allQ.length > 0) {
        const splitPapers = splitQuestionsIntoFiftyChunks(
          allQ,
          paperTitle.trim() || 'JEE CBT Test Series',
          selectedPattern,
          randomizeMcqMode
        );
        splitPapers.forEach((sp) => onSaveCustomPaper(sp));
        const scheduled = schedulePapersOnAlternateDays(splitPapers, {
          startDate: scheduleDate,
          startTime: scheduleStartTime || '09:00',
          endTime: scheduleEndTime || '12:00',
        });
        onAddCustomSchedule(scheduled);
        setCreatorSuccess(`✅ Parsed ${allQ.length} questions with bottom solutions, scrambled MCQs, and locked ${splitPapers.length} tests in My Tests on alternate days (09:00 - 12:00)!`);
      } else {
        onSaveCustomPaper(res.paper);
        setCreatorSuccess(`✅ Successfully created test paper "${res.paper.title}" with ${allQ.length} question(s)!`);
      }

      setPastedText('');
      setPaperTitle('');
      setCreatorMode('LIST');
    } catch (err: any) {
      setCreatorError(err.message || 'Error parsing questions.');
    } finally {
      setIsProcessing(false);
    }
  };

  // AI Flash Parse (Gemini 3.8 Flash Free Tier)
  const handleAIFlashParse = async () => {
    if (!pastedText.trim()) {
      setCreatorError('Please enter question text before processing with AI.');
      return;
    }
    setCreatorError('');
    setCreatorSuccess('');
    setIsProcessing(true);

    try {
      const title = paperTitle.trim() || 'JEE CBT Custom Mock';
      const response = await fetch('/api/parse-exam-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textQuestions: pastedText.trim(),
          examTitle: title,
          pattern: selectedPattern,
          customDurationMinutes: durationMinutes,
          explicitScheduleRequested: false,
        }),
      });

      const data = await response.json();
      let extractedPaper: ExamPaper;

      if (!response.ok || !data.success || !data.examPaper) {
        console.warn('AI parse returned error or keyless, using instant parser fallback...');
        const localRes = parsePastedQuestionsInstant(
          pastedText.trim(),
          title,
          selectedPattern,
          durationMinutes,
          undefined,
          randomizeMcqMode
        );
        if (!localRes.success || !localRes.paper) {
          throw new Error(data.error || 'Failed to process question text.');
        }
        extractedPaper = localRes.paper;
      } else {
        extractedPaper = data.examPaper;
      }

      const allQ: Question[] = extractedPaper.sections.flatMap((s) => s.questions || []);

      if (splitFiftyMode && allQ.length > 0) {
        const splitPapers = splitQuestionsIntoFiftyChunks(
          allQ,
          title,
          selectedPattern,
          randomizeMcqMode
        );
        splitPapers.forEach((sp) => onSaveCustomPaper(sp));
        const scheduled = schedulePapersOnAlternateDays(splitPapers, {
          startDate: scheduleDate,
          startTime: scheduleStartTime || '09:00',
          endTime: scheduleEndTime || '12:00',
        });
        onAddCustomSchedule(scheduled);
        setCreatorSuccess(`✅ Processed ${allQ.length} questions, scrambled MCQs, and locked ${splitPapers.length} tests in My Tests on alternate days (09:00 - 12:00)!`);
      } else {
        onSaveCustomPaper(extractedPaper);
        setCreatorSuccess(`✅ Successfully parsed test paper "${extractedPaper.title}" with ${allQ.length} question(s)!`);
      }

      setPastedText('');
      setPaperTitle('');
      setCreatorMode('LIST');
    } catch (err: any) {
      setCreatorError(err.message || 'Failed to process questions with AI.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Upload PDF or Image File
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setCreatorError('');
    setCreatorSuccess('');
    setIsProcessing(true);
    setUploadProgress('Compressing & reading file...');

    try {
      const compressed = await compressImageFile(file, file.name);
      setUploadProgress('Gemini extracting questions, bottom solutions & LaTeX...');

      const title = paperTitle.trim() || file.name.replace(/\.[^/.]+$/, '');
      const response = await fetch('/api/parse-exam-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileBase64: compressed.base64,
          mimeType: compressed.mimeType,
          images: [
            {
              base64: compressed.base64,
              mimeType: compressed.mimeType,
              name: file.name,
            },
          ],
          examTitle: title,
          pattern: selectedPattern,
          customDurationMinutes: durationMinutes,
          explicitScheduleRequested: false,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success || !data.examPaper) {
        throw new Error(data.error || 'Failed to extract questions from file.');
      }

      const extractedPaper: ExamPaper = data.examPaper;
      const allQ: Question[] = extractedPaper.sections.flatMap((s) => s.questions || []);

      if (splitFiftyMode && allQ.length > 0) {
        const splitPapers = splitQuestionsIntoFiftyChunks(
          allQ,
          title,
          selectedPattern,
          randomizeMcqMode
        );
        splitPapers.forEach((sp) => onSaveCustomPaper(sp));
        const scheduled = schedulePapersOnAlternateDays(splitPapers, {
          startDate: scheduleDate,
          startTime: scheduleStartTime || '09:00',
          endTime: scheduleEndTime || '12:00',
        });
        onAddCustomSchedule(scheduled);
        setCreatorSuccess(`✅ Extracted ${allQ.length} questions from ${file.name}, scrambled MCQs, and locked ${splitPapers.length} tests in My Tests on alternate days from 9:00 AM!`);
      } else {
        onSaveCustomPaper(extractedPaper);
        setCreatorSuccess(`✅ Successfully extracted test paper "${extractedPaper.title}" with ${allQ.length} question(s)!`);
      }

      setUploadedFile(null);
      setPaperTitle('');
      setCreatorMode('LIST');
    } catch (err: any) {
      setCreatorError(err.message || 'Failed to upload and extract test paper.');
    } finally {
      setIsProcessing(false);
      setUploadProgress('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Manual Schedule Handler
  const handleManualSchedule = () => {
    if (!schedulePaperId) {
      setScheduleNotice('⚠️ Please select a test paper to schedule.');
      return;
    }
    const chosenPaper = savedCustomPapers.find((p) => p.id === schedulePaperId);
    if (!chosenPaper) return;

    const newTest: ScheduledTest = {
      id: `sched-${Date.now()}`,
      paperId: chosenPaper.id,
      paper: chosenPaper,
      title: chosenPaper.title,
      scheduledDate: scheduleDate,
      startTime: scheduleStartTime,
      endTime: scheduleEndTime,
      pattern: chosenPaper.pattern,
      durationMinutes: chosenPaper.durationMinutes,
      totalMarks: chosenPaper.totalMarks,
      status: 'UPCOMING_LOCKED',
      isLocked: true,
      syllabus: chosenPaper.sections.map((s) => ({
        id: `syl-${s.id}`,
        subject: s.id as any,
        name: s.name,
        completed: false,
      })),
    };

    onAddCustomSchedule([newTest, ...scheduledTests]);
    setScheduleNotice(`🔒 Scheduled "${chosenPaper.title}" for ${scheduleDate} (${scheduleStartTime} - ${scheduleEndTime}).`);
    setTimeout(() => setScheduleNotice(''), 5000);
  };

  // Test AI Connection Handler
  const handleTestAI = async () => {
    setIsTestingAI(true);
    setAiTestResult(null);

    try {
      const res = await fetch('/api/test-ai');
      const data = await res.json();
      setAiTestResult(data);
    } catch (err: any) {
      setAiTestResult({
        success: false,
        message: err.message || 'Failed to connect to /api/test-ai',
      });
    } finally {
      setIsTestingAI(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ======================================================== */}
        {/* MODAL HEADER                                             */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/50 flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-white">
                  Teacher & Administrator Console
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white">
                  ADMIN ONLY
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Manage test papers, schedule live exams, run diagnostics, and monitor AI free tier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* ADMIN PRIMARY NAVIGATION TABS                            */}
        {/* ======================================================== */}
        <div className="flex items-center gap-1.5 px-5 pt-3 border-b border-zinc-800 bg-zinc-950 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('PAPERS')}
            className={`px-3.5 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'PAPERS'
                ? 'bg-zinc-900 text-white border-t-2 border-red-500 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span>Test & Paper Creator</span>
            {savedCustomPapers.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                {savedCustomPapers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={`px-3.5 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'SCHEDULE'
                ? 'bg-zinc-900 text-white border-t-2 border-red-500 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>Schedule & Lock Manager</span>
            {scheduledTests.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                {scheduledTests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('DIAGNOSIS')}
            className={`px-3.5 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'DIAGNOSIS'
                ? 'bg-zinc-900 text-white border-t-2 border-red-500 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span>Diagnosis Workbench</span>
          </button>

          <button
            onClick={() => setActiveTab('AI_STATUS')}
            className={`px-3.5 py-2 text-xs md:text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'AI_STATUS'
                ? 'bg-zinc-900 text-white border-t-2 border-red-500 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI & Free Plan Diagnostics</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* MODAL BODY (SCROLLABLE)                                  */}
        {/* ======================================================== */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* ==================================================== */}
          {/* TAB 1: TEST & PAPER CREATOR                          */}
          {/* ==================================================== */}
          {activeTab === 'PAPERS' && (
            <div className="space-y-4">
              {/* Subtabs: Paste / Upload / Existing Papers */}
              <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-2">
                <button
                  onClick={() => setCreatorMode('PASTE')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    creatorMode === 'PASTE'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Paste Question Text
                </button>
                <button
                  onClick={() => setCreatorMode('UPLOAD')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    creatorMode === 'UPLOAD'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload PDF / Images
                </button>
                <button
                  onClick={() => setCreatorMode('LIST')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    creatorMode === 'LIST'
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Manage Papers ({savedCustomPapers.length})
                </button>
              </div>

              {/* Status & Error Notices */}
              {creatorSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{creatorSuccess}</span>
                </div>
              )}
              {creatorError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{creatorError}</span>
                </div>
              )}

              {/* 1A: PASTE QUESTIONS */}
              {creatorMode === 'PASTE' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Test Title:</label>
                      <input
                        type="text"
                        value={paperTitle}
                        onChange={(e) => setPaperTitle(e.target.value)}
                        placeholder="e.g. Kinematics & Mechanics Mock 01"
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Exam Pattern:</label>
                      <select
                        value={selectedPattern}
                        onChange={(e) => setSelectedPattern(e.target.value as ExamPattern)}
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-red-500"
                      >
                        <option value="JEE_MAIN">JEE Main (+4 / -1)</option>
                        <option value="JEE_ADVANCED">JEE Advanced (Multi-correct & Partial)</option>
                        <option value="CHAPTER_DRILL">Chapter Drill (+4 / 0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Duration (Minutes):</label>
                      <input
                        type="number"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(Number(e.target.value) || 180)}
                        min={10}
                        max={360}
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-zinc-300">
                        Paste Questions with Options & LaTeX:
                      </label>
                      <button
                        type="button"
                        onClick={handleFillSample}
                        className="text-xs text-red-400 hover:text-red-300 font-mono underline cursor-pointer"
                      >
                        Paste Sample Questions
                      </button>
                    </div>
                    <textarea
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      rows={8}
                      placeholder="1. A particle of mass $m$ undergoes SHM...
(A) Option A
(B) Option B
(C) Option C
(D) Option D
Answer: (A)
Solution: Detailed step-by-step calculation..."
                      className="w-full rounded-xl bg-black border border-zinc-800 p-3.5 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  {/* 50-Question Section Chunker & CBT Scrambling Options */}
                  <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                        <input
                          type="checkbox"
                          checked={splitFiftyMode}
                          onChange={(e) => setSplitFiftyMode(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 cursor-pointer w-4 h-4"
                        />
                        <span>⚡ 50-Question Chunker: Split into 50-Q tests (180 mins) & remaining (Q × 4 mins) locked on alternate days (9:00 AM - 12:00 PM)</span>
                      </label>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 font-bold">
                        NTA CBT ALTERNATE DAY
                      </span>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-zinc-400">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                        <input
                          type="checkbox"
                          checked={randomizeMcqMode}
                          onChange={(e) => setRandomizeMcqMode(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 cursor-pointer w-3.5 h-3.5"
                        />
                        <span>🎲 Randomize MCQ options so no one can guess (authentic CBT scrambling with exact key mapping)</span>
                      </label>
                      <span className="text-zinc-500 font-mono text-[10px]">
                        Diagrams & bottom solutions/answer keys auto-paired
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-[11px] text-zinc-500">
                      Supports standard LaTeX ($...$ and $$...$$), MCQ with diagrams, and bottom solutions.
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={handleInstantParse}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        title="Keyless & instantaneous deterministic parsing"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Instant Parser (0 Delay)</span>
                      </button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={handleAIFlashParse}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(220,38,38,0.4)] cursor-pointer disabled:opacity-50"
                        title="Extracts tricky formulas, concepts & formatting with Gemini 3.8 Flash Free Tier"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                            <span>AI Flash Parse (Gemini 3.8)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 1B: UPLOAD PDF / IMAGES */}
              {creatorMode === 'UPLOAD' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Test Title (Optional):</label>
                      <input
                        type="text"
                        value={paperTitle}
                        onChange={(e) => setPaperTitle(e.target.value)}
                        placeholder="Leave blank to use filename"
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Exam Pattern:</label>
                      <select
                        value={selectedPattern}
                        onChange={(e) => setSelectedPattern(e.target.value as ExamPattern)}
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-red-500"
                      >
                        <option value="JEE_MAIN">JEE Main (+4 / -1)</option>
                        <option value="JEE_ADVANCED">JEE Advanced</option>
                        <option value="CHAPTER_DRILL">Chapter Drill (+4 / 0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Duration (Minutes):</label>
                      <input
                        type="number"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(Number(e.target.value) || 180)}
                        min={10}
                        max={360}
                        className="w-full rounded-lg bg-black border border-zinc-800 px-3 py-2 text-xs text-zinc-200 font-mono focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* 50-Question Section Chunker & CBT Scrambling Options for PDF/Image */}
                  <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                        <input
                          type="checkbox"
                          checked={splitFiftyMode}
                          onChange={(e) => setSplitFiftyMode(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 cursor-pointer w-4 h-4"
                        />
                        <span>⚡ 50-Question Chunker: Split uploaded PDF into 50-Q tests (180m) & remaining (Q × 4m) locked on alternate days (9:00 AM - 12:00 PM)</span>
                      </label>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 font-bold">
                        NTA CBT ALTERNATE DAY
                      </span>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-zinc-400">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                        <input
                          type="checkbox"
                          checked={randomizeMcqMode}
                          onChange={(e) => setRandomizeMcqMode(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-900 text-red-600 focus:ring-red-600 cursor-pointer w-3.5 h-3.5"
                        />
                        <span>🎲 Randomize MCQ options so no one can guess (authentic CBT scrambling with exact key mapping)</span>
                      </label>
                      <span className="text-zinc-500 font-mono text-[10px]">
                        Diagrams & bottom solutions/answer keys auto-paired
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-zinc-800 hover:border-red-600/80 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-black/50 space-y-2"
                  >
                    <Upload className="w-8 h-8 text-red-500 mx-auto" />
                    <div className="text-sm font-bold text-white">
                      Click to upload Question Paper PDF or Question Images
                    </div>
                    <div className="text-xs text-zinc-500">
                      Supports PDF, PNG, JPG. Automatically compressed to prevent server memory limits.
                    </div>
                    {uploadedFile && (
                      <div className="pt-2 text-xs font-mono text-emerald-400 font-bold">
                        Selected: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,image/png,image/jpeg,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {uploadProgress && (
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      <span>{uploadProgress}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 1C: MANAGE EXISTING PAPERS */}
              {creatorMode === 'LIST' && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    All Available Test Papers ({savedCustomPapers.length})
                  </div>

                  {savedCustomPapers.length === 0 ? (
                    <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-xs text-zinc-500">
                      No custom papers uploaded yet. Use the "Paste Question Text" or "Upload PDF" tabs to create your first test.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {savedCustomPapers.map((paper) => {
                        const totalQuestions = paper.sections.reduce(
                          (acc, s) => acc + (s.questions?.length || 0),
                          0
                        );
                        return (
                          <div
                            key={paper.id}
                            className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="px-2 py-0.5 rounded font-mono font-bold bg-zinc-800 text-zinc-300 text-[10px]">
                                  {paper.pattern}
                                </span>
                                <span className="font-mono text-zinc-500 text-[11px]">
                                  {paper.durationMinutes}m • {paper.totalMarks} Marks
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-white mt-1.5">{paper.title}</h4>
                              <div className="text-xs text-zinc-400 font-mono mt-1">
                                {totalQuestions} Questions across {paper.sections.length} Section(s)
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                              <button
                                onClick={() => {
                                  onStartTestDirectly(paper);
                                  onClose();
                                }}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Start Exam</span>
                              </button>

                              {onDeleteCustomPaper && (
                                <button
                                  onClick={() => onDeleteCustomPaper(paper.id)}
                                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                                  title="Delete Paper"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: SCHEDULE & LOCK MANAGER                       */}
          {/* ==================================================== */}
          {activeTab === 'SCHEDULE' && (
            <div className="space-y-5">
              {scheduleNotice && (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{scheduleNotice}</span>
                </div>
              )}

              {/* 50-Question Section Chunker & Alternate Day Suite */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-black border-2 border-red-600/70 shadow-[0_0_20px_rgba(220,38,38,0.25)] space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400 fill-current" />
                      <h3 className="text-sm font-bold font-display uppercase tracking-wider text-white">
                        50-Question Section Chunker & Alternate Day Scheduler
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-red-600 text-white">
                        180m / 4m per Q
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 mt-0.5">
                      Splits tests into 50-question 180 min tests. Any remaining questions are scheduled for (number of questions × 4 min). Randomizes MCQ options so no one can guess, and locks on alternate days from 9:00 AM to 12:00 PM.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleScheduleDefaultFiftySuite}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 active:scale-95 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>🚀 1-Click: Schedule 50-Q Suite into My Tests</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-zinc-400">Chunk Existing Paper:</span>
                    <select
                      value={schedulePaperId}
                      onChange={(e) => setSchedulePaperId(e.target.value)}
                      className="rounded bg-black border border-zinc-700 px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-red-500"
                    >
                      <option value="">-- Select Paper to Chunk --</option>
                      <option value="part1">All India 50-Q Sprint Paper</option>
                      {savedCustomPapers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleChunkAndSchedulePaper(schedulePaperId)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chunk Selected Paper & Lock Alternate Days</span>
                  </button>
                </div>
              </div>

              {/* Schedule a Test Form */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-bold font-display uppercase tracking-wider text-white">
                    Schedule a Live Exam into Calendar
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="text-zinc-400 block mb-1">Select Paper:</label>
                    <select
                      value={schedulePaperId}
                      onChange={(e) => setSchedulePaperId(e.target.value)}
                      className="w-full rounded bg-black border border-zinc-700 px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-red-500"
                    >
                      <option value="">-- Choose a Test Paper --</option>
                      {savedCustomPapers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.pattern})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Date:</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full rounded bg-black border border-zinc-700 px-2 py-1.5 text-zinc-200 font-mono text-xs focus:outline-none focus:border-red-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-1 pt-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setScheduleDate(new Date().toISOString().split('T')[0])}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() + 1);
                          setScheduleDate(d.toISOString().split('T')[0]);
                        }}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          const daysUntilSunday = (7 - d.getDay()) % 7 || 7;
                          const sunday = new Date(d.getTime() + daysUntilSunday * 86400000);
                          setScheduleDate(sunday.toISOString().split('T')[0]);
                        }}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        Sunday
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Start & End Clock Slot:</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="time"
                        value={scheduleStartTime}
                        onChange={(e) => setScheduleStartTime(e.target.value)}
                        className="w-1/2 rounded bg-black border border-zinc-700 px-1 py-1.5 text-zinc-200 font-mono text-[11px] focus:outline-none focus:border-red-500 cursor-pointer"
                      />
                      <span className="text-zinc-500">-</span>
                      <input
                        type="time"
                        value={scheduleEndTime}
                        onChange={(e) => setScheduleEndTime(e.target.value)}
                        className="w-1/2 rounded bg-black border border-zinc-700 px-1 py-1.5 text-zinc-200 font-mono text-[11px] focus:outline-none focus:border-red-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          setScheduleStartTime('09:00');
                          setScheduleEndTime('12:00');
                        }}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        09:00-12:00
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setScheduleStartTime('14:00');
                          setScheduleEndTime('17:00');
                        }}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        14:00-17:00
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setScheduleStartTime('18:00');
                          setScheduleEndTime('21:00');
                        }}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                      >
                        18:00-21:00
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-500" />
                    Locked: Unlocks strictly at designated window.
                  </span>
                  <button
                    onClick={handleManualSchedule}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer"
                  >
                    Lock Test in Calendar
                  </button>
                </div>
              </div>

              {/* Active Scheduled Tests List + Clear All Button */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Currently Scheduled Tests ({scheduledTests.length})
                  </div>

                  {scheduledTests.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete all scheduled dummy tests? This will completely clear your test schedule.')) {
                          onClearAllScheduledTests();
                          setScheduleNotice('🗑️ All scheduled/dummy tests have been wiped!');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Wipe All Dummy / Scheduled Tests</span>
                    </button>
                  )}
                </div>

                {scheduledTests.length === 0 ? (
                  <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center text-xs text-zinc-500">
                    No scheduled tests currently in queue. Schedule a test above when you want a timed live exam.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {scheduledTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-red-400">{test.scheduledDate}</span>
                            <span className="font-mono text-zinc-500 text-[11px]">
                              {test.startTime} - {test.endTime}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                              {test.pattern}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5">{test.title}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onDeleteScheduledTest(test.id)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Remove scheduled test"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: DIAGNOSIS WORKBENCH (MOVED TO ADMIN)          */}
          {/* ==================================================== */}
          {activeTab === 'DIAGNOSIS' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
                <span className="text-red-400 font-bold">Admin Diagnosis Workbench:</span> This section is isolated inside the Admin console to keep the student's dashboard ultra-clean and focused on tests.
              </div>
              <DiagnosisWorkbench
                onNavigateToTab={() => {}}
                onLaunchSampleTest={() => {
                  if (savedCustomPapers.length > 0) {
                    onStartTestDirectly(savedCustomPapers[0]);
                    onClose();
                  }
                }}
              />
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: AI & FREE PLAN DIAGNOSTICS                    */}
          {/* ==================================================== */}
          {activeTab === 'AI_STATUS' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Google AI Studio Free Plan Architecture</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The application is configured to run on the <strong className="text-emerald-400">Google Gemini Free Plan</strong> without requiring paid billing or card setup.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[11px]">Primary STEM Reasoner:</span>
                    <strong className="text-white font-mono">gemini-3.8-flash</strong>
                    <span className="text-[10px] text-emerald-400 block">Free Tier (1500 req/day)</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[11px]">Low-Latency Backup:</span>
                    <strong className="text-white font-mono">gemini-3.1-flash-lite</strong>
                    <span className="text-[10px] text-emerald-400 block">Free Tier (1500 req/day)</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1">
                    <span className="text-zinc-500 block text-[11px]">Keyless Fallback:</span>
                    <strong className="text-white font-mono">Instant Parser</strong>
                    <span className="text-[10px] text-amber-400 block">100% Offline & Deterministic</span>
                  </div>
                </div>
              </div>

              {/* Real-time Connection Test */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Live AI API Connection Test
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Ping server-side Gemini SDK to verify model response and latency
                    </p>
                  </div>

                  <button
                    onClick={handleTestAI}
                    disabled={isTestingAI}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isTestingAI ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Test AI Response</span>
                      </>
                    )}
                  </button>
                </div>

                {aiTestResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                      aiTestResult.success
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-red-950/60 border-red-500/50 text-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold">
                      {aiTestResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span>{aiTestResult.message}</span>
                    </div>
                    {aiTestResult.model && (
                      <div className="font-mono text-[11px] text-zinc-300">
                        Active Model: {aiTestResult.model}
                        {aiTestResult.latencyMs !== undefined && ` • Response Latency: ${aiTestResult.latencyMs}ms`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
