export type ExamStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export interface ExamQuestion {
  id: string;
  examId?: string;
  number: number;
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "ESSAY";
  options?: { key: string; text: string }[];
  correctAnswer?: string;
  points: number;
  imageUrl?: string;
  explanation?: string;
  explanationLink?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  durationMinutes: number;
  totalQuestions: number;
  totalParticipants: number;
  activeParticipants: number;
  status: ExamStatus;
  tokenCode: string;
  passingScore: number;
  createdAt: string;
  description?: string;
  scheduledAt?: string;
  questions?: ExamQuestion[];
}

export interface ExamSummaryMetrics {
  totalExams: number;
  activeExams: number;
  totalParticipants: number;
  averageScore: number;
}

export interface StudentParticipant {
  id: string;
  name: string;
  className: string;
  attendanceNumber?: string;
  participantToken: string;
  startedAt?: string;
}

export interface StudentExamSession {
  exam: Exam;
  participant: StudentParticipant;
  answers: Record<string, string>;
  doubtful: Record<string, boolean>;
  startedAt: number;
  remainingSeconds: number;
  isSubmitted: boolean;
  violationCount: number;
  score?: number;
  submittedAt?: string;
}

export interface JoinStudentExamPayload {
  name: string;
  className: string;
  attendanceNumber?: string;
  pin?: string;
}

export interface LiveStudent {
  id: string;
  name: string;
  className: string;
  attendanceNumber?: string;
  answeredCount: number;
  totalQuestions: number;
  violations: number;
  isBlocked: boolean;
  isSubmitted: boolean;
  score?: number;
  startedAt: string;
}

export interface RecapStudentItem {
  id: string;
  name: string;
  score: number;
  correct: number;
  wrong: number;
  passed: boolean;
  time: string;
  rank: number;
}

export interface MonitorTableProps {
  students: LiveStudent[];
  onUnblock: (studentId: string) => void;
}

export interface MonitorMetricsProps {
  students: LiveStudent[];
}

export interface RecapTableProps {
  students: RecapStudentItem[];
  onPrintPdf: () => void;
}

export interface RecapMetricsProps {
  students: RecapStudentItem[];
  passingScore?: number;
}

export interface RecapBlockedAlertProps {
  blockedCount: number;
}

export interface StudentExamHeaderProps {
  examTitle: string;
  subject: string;
  studentName: string;
  remainingSeconds: number;
  isSubmitted: boolean;
}

export interface StudentQuestionCardProps {
  question: ExamQuestion;
  currentNumber: number;
  totalQuestions: number;
  selectedOptionKey?: string;
  isDoubtful: boolean;
  onSelectOption: (optionKey: string) => void;
  onToggleDoubtful: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface StudentQuestionGridProps {
  questions: ExamQuestion[];
  answers: Record<string, string>;
  doubtful: Record<string, boolean>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
}

export interface StudentSubmitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  unansweredCount: number;
  doubtfulCount: number;
  isSubmitting?: boolean;
}

export interface StudentAntiCheatAlertProps {
  violationCount: number;
  maxViolations?: number;
}

export interface StudentExamResultProps {
  exam: Exam;
  score: number;
  participantName: string;
}

export interface StudentJoinGateProps {
  pin: string;
  onJoin: (payload: JoinStudentExamPayload) => void;
  isLoading: boolean;
  error?: string | null;
}
