export type ExamPattern = 'JEE_MAIN' | 'JEE_ADVANCED' | string;

export type SubjectId = 'physics' | 'chemistry' | 'mathematics' | string;

export type QuestionType =
  | 'SINGLE_CORRECT'
  | 'MULTIPLE_CORRECT'
  | 'NUMERICAL'
  | 'MATRIX_MATCH';

export type QuestionStatus =
  | 'NOT_VISITED'
  | 'NOT_ANSWERED'
  | 'ANSWERED'
  | 'MARKED_FOR_REVIEW'
  | 'ANSWERED_AND_MARKED_FOR_REVIEW';

export type UIMode = 'NTA_OFFICIAL' | 'MATHONGO_MODERN' | 'MATHANGO';

export type QuestionTag = 'HARD' | 'TRICKY' | 'DOUBT' | 'RACE_STAR' | 'REVISE' | string;

export type MistakeReason =
  | 'CALCULATION_ERROR'
  | 'CONCEPT_GAP'
  | 'MISREAD_QUESTION'
  | 'TIME_PRESSURE'
  | 'GUESS'
  | string;

export type RoutineType =
  | 'MODULE_PRACTICE'
  | 'REAL_TEST'
  | 'DAILY_RACE'
  | 'MISTAKE_REVISION'
  | 'CBT_MOCK';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  labelLatex: string;
}

export interface Question {
  id: string;
  sectionId: SubjectId;
  questionNumber: number;
  type: QuestionType | string;
  promptLatex: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanationLatex?: string;
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string;
  diagramDescription?: string;
  imageIndex?: number;
}

export interface ExamSection {
  id: SubjectId;
  name: string;
  questions: Question[];
}

export interface ExamPaper {
  id: string;
  title: string;
  pattern: ExamPattern | string;
  durationMinutes: number;
  totalMarks: number;
  createdAt?: string;
  sections: ExamSection[];
}

export interface StudentAttempt {
  id?: string;
  examId: string;
  examTitle?: string;
  paper?: ExamPaper;
  startTime?: number;
  startedAt?: number;
  endTime?: number;
  submittedAt?: number;
  timeSpentSeconds: Record<string, number>;
  answers: Record<string, any>;
  statuses: Record<string, QuestionStatus>;
  questionTags?: Record<string, QuestionTag[]>;
  score?: number;
  totalMarks?: number;
  totalPossibleMarks?: number;
  accuracyPercentage?: number;
  mode?: UIMode;
  pattern?: ExamPattern | string;
}

export interface SyllabusTopic {
  id: string;
  subject: SubjectId;
  name: string;
  completed: boolean;
}

export interface ScheduledTest {
  id: string;
  title: string;
  pattern: ExamPattern;
  scheduledDate: string; // YYYY-MM-DD
  startTime: string; // '09:00'
  endTime: string; // '12:00'
  durationMinutes: number;
  totalMarks: number;
  paperId?: string;
  paper?: ExamPaper;
  status?: 'UPCOMING_LOCKED' | 'READY' | 'COMPLETED' | 'MISSED' | string;
  isLocked?: boolean;
  scheduledAt?: number;
  syllabus: SyllabusTopic[];
  score?: number;
}

export interface DailyRoutineItem {
  id: string;
  type: RoutineType | string;
  title: string;
  chapterOrTopic: string;
  subject: SubjectId;
  scheduledDate: string;
  scheduledSlot: string;
  durationMinutes: number;
  questionCount: number;
  isCompleted: boolean;
  weekNumber: number;
  dayName: string;
  paperId?: string;
  paper?: ExamPaper;
}

export interface TaggedQuestionEntry {
  id: string;
  question: Question;
  examId: string;
  examTitle: string;
  subject: SubjectId;
  tags: QuestionTag[];
  correctAnswer: string;
  addedAt: number;
  practiceCount: number;
  notes?: string;
}

export interface MistakeEntry {
  id: string;
  question: Question;
  reason: MistakeReason;
  timestamp?: number;
  createdAt?: number;
  notes?: string;
  examTitle?: string;
  studentAnswer?: any;
  userAnswer?: any;
  timeSpentSeconds?: number;
  correctAnswer?: string;
}

export interface RemedialQuestion {
  id: string;
  type: 'SINGLE_CORRECT' | 'NUMERICAL' | string;
  historicalTag: string;
  promptLatex: string;
  options?: QuestionOption[];
  correctAnswer: string;
  solutionLatex: string;
}

export interface RemedialPack {
  topicName: string;
  conceptSummary: string;
  remedialQuestions: RemedialQuestion[];
}
