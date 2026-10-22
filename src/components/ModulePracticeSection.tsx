import React, { useState, useRef, useEffect } from 'react';
import {
  ExamPaper,
  SubjectId,
  DailyRoutineItem,
  StudentAttempt,
} from '../types/exam';
import {
  VIBRANT_ELECTROSTATICS_MARATHON_PAPER,
  VIBRANT_KINEMATICS_MARATHON_PAPER,
  VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER,
  VIBRANT_MODERN_PHYSICS_MARATHON_PAPER,
  VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER,
  VIBRANT_VECTORS_3D_MARATHON_PAPER,
  VIBRANT_INTEGRATION_MARATHON_PAPER,
  VIBRANT_MATRICES_MARATHON_PAPER,
  VIBRANT_DETERMINANT_MARATHON_PAPER,
  VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER,
  VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER,
  VIBRANT_BINOMIAL_MARATHON_PAPER,
} from '../data/moduleMarathonPapers';
import { estimateMathonGoPercentile } from '../utils/mathongoPercentileEstimator';
import {
  Layers,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
  FileText,
  BarChart3,
  Award,
  Zap,
  Flame,
  Pause,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface ModulePracticeSectionProps {
  onStartExam: (paper: ExamPaper, directToRoom?: boolean) => void;
  onAddCustomPaper: (paper: ExamPaper) => void;
  onAddRoutineItems: (items: DailyRoutineItem[]) => void;
  savedCustomPapers: ExamPaper[];
  savedAttempts?: StudentAttempt[];
  onViewAttempt?: (attempt: StudentAttempt, paper: ExamPaper) => void;
}

export interface ChapterMarathonModule {
  id: string;
  title: string;
  subject: SubjectId;
  chapter: string;
  totalQuestions: number;
  durationMinutes: number; // strictly 4 minutes x number of questions
  difficulty: 'JEE Main' | 'JEE Advanced' | 'Allen Leader Ex-1';
  paper: ExamPaper;
  coachingSource: string;
  description: string;
}

export const ModulePracticeSection: React.FC<ModulePracticeSectionProps> = ({
  onStartExam,
  onAddCustomPaper,
  onAddRoutineItems,
  savedCustomPapers,
  savedAttempts = [],
  onViewAttempt,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'ALL'>('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleSubject, setModuleSubject] = useState<SubjectId>('physics');
  const [scheduledSlot, setScheduledSlot] = useState<string>('19:00 - 20:00');
  const [moduleUserCommand, setModuleUserCommand] = useState<string>('');

  const qFileInputRef = useRef<HTMLInputElement | null>(null);
  const solInputRef = useRef<HTMLInputElement | null>(null);
  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [solutionFile, setSolutionFile] = useState<File | null>(null);

  // Trigger re-render when sessions or attempts change
  const [sessionTick, setSessionTick] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => setSessionTick((prev) => prev + 1);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 12 Authentic Chapter Marathon Tests with all questions from that chapter (4 min/question)
  const marathonModules: ChapterMarathonModule[] = [
    {
      id: 'module-marathon-electrostatics',
      title: 'Vibrant Kota Physics • Electrostatics Complete Chapter Marathon',
      subject: 'physics',
      chapter: 'Electrostatics & Capacitance',
      totalQuestions: 265,
      durationMinutes: 265 * 4, // 1060 minutes (17h 40m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Academy Kota XII Module',
      description: 'Every single question from Coulomb law, Gauss law, potential, dipoles, conductors and RC dielectric systems.',
      paper: VIBRANT_ELECTROSTATICS_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-kinematics',
      title: 'Allen Kota Physics • Kinematics 1D & 2D Complete Marathon',
      subject: 'physics',
      chapter: 'Kinematics 1D & 2D',
      totalQuestions: 88,
      durationMinutes: 88 * 4, // 352 minutes (5h 52m)
      difficulty: 'Allen Leader Ex-1',
      coachingSource: 'Allen Leader Batch Exercise 1 & 2',
      description: 'Full question set of rectilinear motion, graphs, projectile motion, and river-boat/relative velocity problems.',
      paper: VIBRANT_KINEMATICS_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-geometrical-optics',
      title: 'Vibrant Kota Physics • Geometrical Optics Chapter Marathon',
      subject: 'physics',
      chapter: 'Geometrical Optics & Instruments',
      totalQuestions: 229,
      durationMinutes: 229 * 4, // 916 minutes (15h 16m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Master Collection',
      description: 'Complete optics archive: spherical mirrors, Snell law, total internal reflection, prisms, lenses, and optical systems.',
      paper: VIBRANT_GEOMETRICAL_OPTICS_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-modern-physics',
      title: 'Vibrant Kota Physics • Modern Physics Chapter Marathon',
      subject: 'physics',
      chapter: 'Modern Physics',
      totalQuestions: 243,
      durationMinutes: 243 * 4, // 972 minutes (16h 12m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Physics Archive',
      description: 'Full spectrum: photoelectric effect, Bohr model, de Broglie wavelength, X-rays, nuclear decay, binding energy & radioactivity.',
      paper: VIBRANT_MODERN_PHYSICS_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-current-electricity',
      title: 'Vibrant Kota Physics • Current Electricity Chapter Marathon',
      subject: 'physics',
      chapter: 'Current Electricity & Circuits',
      totalQuestions: 224,
      durationMinutes: 224 * 4, // 896 minutes (14h 56m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Physics Archive',
      description: 'Ohm law, symmetry lattices, Kirchhoff laws, potentiometer, meter bridge, RC transient charging, and galvanometer conversions.',
      paper: VIBRANT_CURRENT_ELECTRICITY_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-vectors-3d',
      title: 'Vibrant Kota Maths • Vectors & 3-D Geometry Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Vectors & 3-D Geometry',
      totalQuestions: 113,
      durationMinutes: 113 * 4, // 452 minutes (7h 32m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'Dot and cross products, scalar triple product, vector triple product, skew lines, planes, shortest distance, and coordinate geometry in 3D.',
      paper: VIBRANT_VECTORS_3D_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-integration',
      title: 'Vibrant Kota Maths • Integration Complete Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Indefinite & Definite Integration',
      totalQuestions: 185,
      durationMinutes: 185 * 4, // 740 minutes (12h 20m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'Standard substitutions, bypass integration, trigonometric powers, King property, Queen property, Leibniz rule, and reduction formulas.',
      paper: VIBRANT_INTEGRATION_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-matrices',
      title: 'Vibrant Kota Maths • Matrices Complete Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Matrices & Transformations',
      totalQuestions: 146,
      durationMinutes: 146 * 4, // 584 minutes (9h 44m)
      difficulty: 'Allen Leader Ex-1',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'Matrix multiplication, symmetric & skew-symmetric, orthogonal, nilpotent, involutory, adjoint formulas, and Cayley-Hamilton.',
      paper: VIBRANT_MATRICES_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-determinant',
      title: 'Vibrant Kota Maths • Determinants Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Determinants & Linear Systems',
      totalQuestions: 132,
      durationMinutes: 132 * 4, // 528 minutes (8h 48m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'Row and column transformations, circulant determinants, Cramer rule for homogeneous & non-homogeneous linear systems.',
      paper: VIBRANT_DETERMINANT_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-diffeq-auc',
      title: 'Vibrant Kota Maths • Diff Equations & AUC Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Differential Equations & Area Under Curve',
      totalQuestions: 200,
      durationMinutes: 200 * 4, // 800 minutes (13h 20m)
      difficulty: 'JEE Advanced',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'Variable separable, homogeneous, linear differential equations, Bernoulli equations, integrating factors, and bounded curve areas.',
      paper: VIBRANT_DIFF_EQ_AUC_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-lcd',
      title: 'Vibrant Kota Maths • Limit, Continuity & Diff Marathon',
      subject: 'mathematics',
      chapter: 'Limits, Continuity & Differentiability',
      totalQuestions: 237,
      durationMinutes: 237 * 4, // 948 minutes (15h 48m)
      difficulty: 'Allen Leader Ex-1',
      coachingSource: 'Vibrant Kota Mega XII Archive',
      description: 'L-Hopital rule, expansion series, standard forms 1^infinity, continuity of composite functions, differentiability at sharp corners.',
      paper: VIBRANT_LIMIT_CONT_DIFF_MARATHON_PAPER,
    },
    {
      id: 'module-marathon-binomial',
      title: 'Vibrant Kota Maths • Binomial Theorem Chapter Marathon',
      subject: 'mathematics',
      chapter: 'Binomial Theorem',
      totalQuestions: 108,
      durationMinutes: 108 * 4, // 432 minutes (7h 12m)
      difficulty: 'JEE Main',
      coachingSource: 'Vibrant Kota Micro XI Archive',
      description: 'General term T_{r+1}, middle terms, greatest coefficient, binomial coefficients summation identities, and multinational expansions.',
      paper: VIBRANT_BINOMIAL_MARATHON_PAPER,
    },
  ];

  // Also include custom-uploaded user papers
  const userCustomMarathons: ChapterMarathonModule[] = (savedCustomPapers || [])
    .filter((p) => !marathonModules.some((m) => m.paper.id === p.id))
    .map((p) => {
      const qCount = p.sections.reduce((acc, s) => acc + s.questions.length, 0);
      return {
        id: p.id,
        title: p.title,
        subject: (p.sections[0]?.id as SubjectId) || 'physics',
        chapter: p.title,
        totalQuestions: qCount,
        durationMinutes: p.durationMinutes || (qCount * 4),
        difficulty: 'JEE Main' as const,
        coachingSource: 'User Custom Extracted Module',
        description: `Custom practice test extracted with ${qCount} questions. Allotted 4 min/Q.`,
        paper: p,
      };
    });

  const allAvailableModules = [...marathonModules, ...userCustomMarathons];

  const filteredModules = allAvailableModules.filter(
    (m) => selectedSubject === 'ALL' || m.subject === selectedSubject
  );

  // Helper: Retrieve active in-progress session from localStorage
  const getSessionForPaper = (paperId: string) => {
    try {
      const key = `jee_live_session_${paperId}`;
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.secondsRemaining === 'number' && parsed.secondsRemaining > 0) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Helper: Clear in-progress session to restart fresh
  const handleResetSession = (paperId: string) => {
    try {
      localStorage.removeItem(`jee_live_session_${paperId}`);
      setSessionTick((prev) => prev + 1);
    } catch (e) {
      console.warn('Failed to clear session', e);
    }
  };

  // Helper: Format seconds to readable hours and minutes
  const formatSecondsToHM = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  // Helper: Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        const base64Data = res.split(',')[1] || '';
        resolve(base64Data);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  // Upload and process custom module PDF
  const handleUploadModule = async () => {
    if (!questionFile) {
      setUploadError('Please select a Module Questions PDF first');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadProgress('Extracting questions with Gemini Vision...');

    try {
      const qBase64 = await fileToBase64(questionFile);
      let solBase64: string | undefined;

      if (solutionFile) {
        solBase64 = await fileToBase64(solutionFile);
      }

      const title =
        moduleTitle.trim() ||
        questionFile.name.replace(/\.[^/.]+$/, '') ||
        'Custom Chapter Marathon';

      const response = await fetch('/api/parse-exam-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64: qBase64,
          pdfMimeType: questionFile.type || 'application/pdf',
          solutionBase64: solBase64,
          solutionMimeType: solutionFile?.type || 'application/pdf',
          pattern: 'JEE_MAIN',
          customTitle: title,
          userCommand:
            moduleUserCommand ||
            'Extract all exercise questions sequentially. Split into a clean CBT sprint with proper LaTeX formulas.',
        }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to parse module PDF');
      }

      const generatedPaper: ExamPaper = resData.data || resData.examPaper;
      const totalQCount = generatedPaper.sections.reduce((acc, s) => acc + s.questions.length, 0);

      // Strictly allot 4 minutes x number of questions
      generatedPaper.durationMinutes = totalQCount * 4;
      generatedPaper.totalMarks = totalQCount * 4;

      onAddCustomPaper(generatedPaper);
      setQuestionFile(null);
      setSolutionFile(null);
      setModuleTitle('');
      setSuccessNotice(
        `Success! "${generatedPaper.title}" (${totalQCount} Qs) has been added to Chapter Marathons with ${generatedPaper.durationMinutes} minutes timer (4 min/Q)!`
      );
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Failed to process module PDF.');
    } finally {
      setIsUploading(false);
      setUploadProgress('');
    }
  };

  // Schedule a curated module sprint into the daily routine
  const handleScheduleCuratedSprint = (mod: ChapterMarathonModule) => {
    const newItem: DailyRoutineItem = {
      id: `rout-curated-${Date.now()}`,
      type: 'MODULE_PRACTICE',
      title: `${mod.title} • Marathon Practice`,
      chapterOrTopic: mod.chapter,
      subject: mod.subject,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledSlot: scheduledSlot || '19:00 - 20:00',
      durationMinutes: mod.durationMinutes,
      questionCount: mod.totalQuestions,
      paperId: mod.paper.id,
      paper: mod.paper,
      isCompleted: false,
      weekNumber: 1,
      dayName: 'Today',
    };

    onAddRoutineItems([newItem]);
    setSuccessNotice(`"${mod.title}" has been scheduled into Today's Live Desk slot.`);
  };

  return (
    <div className="space-y-8 text-white select-none">
      {/* 1. SECTION BANNER & SPECIFICATION GUARANTEE */}
      <div className="bg-gradient-to-r from-red-950/60 via-zinc-950 to-black p-6 rounded-2xl border border-red-600/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.6)] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Marathon Practice Tests • 24/7 Open
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-amber-400 border border-amber-500/30 font-mono">
              ⚡ 4 Min / Question Strictly Allotted
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-emerald-400 border border-emerald-500/30 font-mono">
              💾 Auto-Resume on Escape
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-900 text-sky-400 border border-sky-500/30 font-mono">
              ♾️ Unlimited Reopening & Solutions
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black font-display text-white tracking-tight">
            Complete Chapter Marathon Practice Tests
          </h2>

          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            Every dummy mock test has been removed. Each card below contains the <strong>complete question archive of that chapter</strong> with an authentic time budget of <strong>4 minutes × total questions</strong>.
            You can practice anytime, pause or escape freely (your exact question and timer timestamp freeze and resume automatically), and re-open the test immediately after submission with MathonGo percentile analytics and full solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">Chapters</div>
              <div className="text-base font-black text-white font-mono">12 Full Modules</div>
            </div>
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">Total Archive</div>
              <div className="text-base font-black text-white font-mono">2,168 Real Questions</div>
            </div>
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">Time Allotment</div>
              <div className="text-base font-black text-amber-400 font-mono">4.0 Min / Question</div>
            </div>
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800">
              <div className="text-[10px] text-zinc-400 font-bold uppercase">Availability</div>
              <div className="text-base font-black text-emerald-400 font-mono">Open 24/7 Any Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS / ERROR ALERTS */}
      {successNotice && (
        <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
          <button
            onClick={() => setSuccessNotice('')}
            className="text-emerald-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {uploadError && (
        <div className="p-4 bg-red-950/60 border border-red-500/60 rounded-xl text-xs text-red-200 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            onClick={() => setUploadError('')}
            className="text-red-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. OPTIONAL CUSTOM MODULE PDF EXTRACTOR */}
      <details className="group bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
        <summary className="p-4 cursor-pointer flex items-center justify-between text-xs md:text-sm font-bold text-zinc-300 hover:text-white transition-colors bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>Have your own coaching PDF / DPP? Convert to Marathon CBT (4 Min/Q)</span>
          </div>
          <span className="text-[11px] text-zinc-500 group-open:rotate-90 transition-transform">▶</span>
        </summary>

        <div className="p-6 space-y-4 border-t border-zinc-800/80 bg-black/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300">Chapter / Title</label>
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="e.g. Chemical Bonding Marathon"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-800 bg-black text-white focus:outline-hidden focus:border-red-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300">Subject</label>
              <select
                value={moduleSubject}
                onChange={(e) => setModuleSubject(e.target.value as SubjectId)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-800 bg-black text-white focus:outline-hidden focus:border-red-600 font-semibold"
              >
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="mathematics">Mathematics</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-300">Routine Slot (Optional)</label>
              <input
                type="text"
                value={scheduledSlot}
                onChange={(e) => setScheduledSlot(e.target.value)}
                placeholder="e.g. 19:00 - 20:00"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-800 bg-black text-white focus:outline-hidden focus:border-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => qFileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                questionFile
                  ? 'border-red-600 bg-red-950/20 text-white'
                  : 'border-zinc-800 hover:border-red-600/70 bg-black/40 hover:bg-zinc-900/50'
              }`}
            >
              <input
                type="file"
                ref={qFileInputRef}
                accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => setQuestionFile(e.target.files?.[0] || null)}
              />
              <FileText className="w-5 h-5 mx-auto text-red-500 mb-1" />
              <div className="text-xs font-bold text-white">
                {questionFile ? questionFile.name : 'Select Questions PDF / Image'}
              </div>
            </div>

            <div
              onClick={() => solInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                solutionFile
                  ? 'border-red-600 bg-red-950/20 text-white'
                  : 'border-zinc-800 hover:border-red-600/70 bg-black/40 hover:bg-zinc-900/50'
              }`}
            >
              <input
                type="file"
                ref={solInputRef}
                accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => setSolutionFile(e.target.files?.[0] || null)}
              />
              <FileText className="w-5 h-5 mx-auto text-zinc-400 mb-1" />
              <div className="text-xs font-bold text-white">
                {solutionFile ? solutionFile.name : 'Optional Solutions PDF'}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleUploadModule}
              disabled={!questionFile || isUploading}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isUploading ? (uploadProgress || 'Extracting...') : 'Extract & Create Marathon (4m/Q)'}
            </button>
          </div>
        </div>
      </details>

      {/* 3. MARATHON CHAPTER TESTS GRID */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base md:text-lg font-bold font-display text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-500" />
              Chapter Marathon Library ({filteredModules.length} Modules)
            </h3>
            <p className="text-xs text-zinc-400">
              Select any chapter to begin or resume marathon practice. The test remains open 24/7 with automatic timestamp freezing when you exit.
            </p>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(['ALL', 'physics', 'mathematics', 'chemistry'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                  selectedSubject === sub
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.4)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sub === 'ALL' ? 'All Subjects' : sub}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map((mod) => {
            // Check if there is an in-progress paused session in localStorage
            const liveSession = getSessionForPaper(mod.paper.id);
            const isPausedInProgress = liveSession !== null;

            // Check if user has previously submitted this test
            const attemptsForThisPaper = savedAttempts.filter(
              (a) => a.examId === mod.paper.id
            );
            const latestAttempt = attemptsForThisPaper[0];
            const hasCompletedAttempt = Boolean(latestAttempt);

            // Calculate answered count if paused
            const answeredInSession = liveSession?.statuses
              ? Object.values(liveSession.statuses).filter(
                  (st) => st === 'ANSWERED' || st === 'ANSWERED_AND_MARKED_FOR_REVIEW'
                ).length
              : 0;

            const currentQIndex = typeof liveSession?.activeQuestionIndex === 'number'
              ? liveSession.activeQuestionIndex
              : 0;

            const remainingSec = liveSession?.secondsRemaining || mod.durationMinutes * 60;

            // Percentile estimation for previously submitted attempt
            const bestAttempt = attemptsForThisPaper.reduce((best, curr) => {
              const currScore = curr.totalMarks || curr.score || 0;
              const bestScore = best?.totalMarks || best?.score || 0;
              return currScore >= bestScore ? curr : best;
            }, latestAttempt);

            const bestScore = bestAttempt?.totalMarks || bestAttempt?.score || 0;
            const percentileReport = hasCompletedAttempt
              ? estimateMathonGoPercentile(bestScore, mod.paper.totalMarks, 'JEE_MAIN')
              : null;

            return (
              <div
                key={mod.id}
                className={`rounded-2xl p-5 border shadow-xl transition-all flex flex-col justify-between gap-4 group relative ${
                  isPausedInProgress
                    ? 'bg-gradient-to-b from-amber-950/20 via-zinc-950 to-zinc-950 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30'
                    : hasCompletedAttempt
                    ? 'bg-zinc-950 border-zinc-800 hover:border-emerald-500/50'
                    : 'bg-zinc-950 border-zinc-800 hover:border-red-600/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-700">
                      {mod.subject}
                    </span>

                    {isPausedInProgress ? (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-black flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse">
                        <Pause className="w-3 h-3 fill-current" />
                        Paused at Q{currentQIndex + 1}
                      </span>
                    ) : hasCompletedAttempt ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Completed ({percentileReport?.percentileString}%ile)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-950/60 text-red-400 border border-red-800/80">
                        {mod.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Title & Source */}
                  <div>
                    <h4 className="text-sm font-bold font-display text-white group-hover:text-red-400 transition-colors">
                      {mod.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {mod.coachingSource}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Live Paused Status Box if in progress */}
                  {isPausedInProgress && (
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-amber-200">Current Position:</span>
                        <strong className="text-white">Question {currentQIndex + 1} / {mod.totalQuestions}</strong>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-amber-200">Timer Frozen:</span>
                        <strong className="text-amber-400">{formatSecondsToHM(remainingSec)}</strong>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-amber-200">Answered:</span>
                        <strong className="text-emerald-400">{answeredInSession} / {mod.totalQuestions} Qs</strong>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${Math.round((answeredInSession / mod.totalQuestions) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Previous Attempt Summary if not paused and attempt exists */}
                  {!isPausedInProgress && hasCompletedAttempt && (
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Best Score:</span>
                        <span className="font-bold text-white font-mono">
                          {bestScore} / {mod.paper.totalMarks}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Percentile:</span>
                        <span className="font-bold text-emerald-400 font-mono">
                          {percentileReport?.percentileString} %ile
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span>Rank Estimate:</span>
                        <span className="text-zinc-300 font-mono">{percentileReport?.rankRange}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sprints Details & Action Buttons */}
                <div className="pt-3 border-t border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {mod.durationMinutes} mins ({Math.floor(mod.durationMinutes / 60)}h {mod.durationMinutes % 60}m)
                    </span>
                    <span className="font-mono font-bold text-white">
                      {mod.totalQuestions} Qs (4m/Q)
                    </span>
                  </div>

                  {/* Actions depending on state */}
                  {isPausedInProgress ? (
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={() => onStartExam(mod.paper, true)}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Resume at Q{currentQIndex + 1} ({formatSecondsToHM(remainingSec)})
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleResetSession(mod.paper.id)}
                          className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                          title="Discard paused progress and restart test from question 1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Restart Fresh
                        </button>

                        <button
                          onClick={() => handleScheduleCuratedSprint(mod)}
                          className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          To Daily Desk
                        </button>
                      </div>
                    </div>
                  ) : hasCompletedAttempt ? (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          if (latestAttempt && onViewAttempt) {
                            onViewAttempt(latestAttempt, mod.paper);
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        Solutions & %ile
                      </button>

                      <button
                        onClick={() => onStartExam(mod.paper, false)}
                        className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reattempt Test
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => handleScheduleCuratedSprint(mod)}
                        className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Schedule
                      </button>

                      <button
                        onClick={() => onStartExam(mod.paper, false)}
                        className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(220,38,38,0.4)]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Start Marathon
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
