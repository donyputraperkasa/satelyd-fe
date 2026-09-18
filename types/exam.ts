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
  answers: Record<string, string>; // questionId -> selectedOptionKey (e.g. "A", "B")
  doubtful: Record<string, boolean>; // questionId -> boolean
  startedAt: number; // timestamp
  remainingSeconds: number;
  isSubmitted: boolean;
  violationCount: number;
  score?: number;
  submittedAt?: string;
}

