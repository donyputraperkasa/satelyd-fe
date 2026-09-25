import { apiClient } from "@/lib/api/client";
import type { Exam, ExamQuestion, LiveStudent } from "@/types";

const LOCAL_EXAMS_KEY = "satelyd.exams";

interface ApiQuestionOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

interface ApiExamQuestion {
  id: string;
  order: number;
  question: string;
  explanation?: string;
  imageUrl?: string;
  options: ApiQuestionOption[];
}

interface ApiExam {
  id: string;
  title: string;
  description?: string;
  durationMinutes: number;
  pin: string;
  shareToken: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  closedAt?: string;
  questions?: ApiExamQuestion[];
  _count?: {
    questions: number;
    participants: number;
  };
}

interface ApiParticipant {
  id: string;
  name: string;
  attendanceNumber?: string;
  className: string;
  status: "IN_PROGRESS" | "SUBMITTED" | "BLOCKED";
  score?: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  answeredQuestions: number;
  currentQuestionIndex: number;
  violationCount: number;
  lastActivityAt: string;
  startedAt: string;
  submittedAt?: string;
  blockedAt?: string;
}

function mapApiExamToExam(api: ApiExam): Exam {
  return {
    id: api.id,
    title: api.title,
    subject: "Materi Ujian",
    gradeLevel: "Semua Kelas",
    durationMinutes: api.durationMinutes || 60,
    totalQuestions: api.questions?.length || api._count?.questions || 0,
    totalParticipants: api._count?.participants || 0,
    activeParticipants: 0,
    status: api.status,
    tokenCode: api.shareToken || api.pin,
    passingScore: 75,
    createdAt: api.createdAt,
    description: api.description,
    questions: (api.questions || []).map((q, idx) => ({
      id: q.id,
      number: q.order || idx + 1,
      questionText: q.question,
      questionType: "MULTIPLE_CHOICE",
      imageUrl: q.imageUrl,
      explanation: q.explanation,
      points: 10,
      options: q.options?.map((opt) => ({
        key: opt.label,
        text: opt.text,
      })) || [],
      correctAnswer: q.options?.find((opt) => opt.isCorrect)?.label || "A",
    })),
  };
}

/**
 * Fetch all teacher exams from backend API, fallback to local storage
 */
export async function fetchTeacherExams(): Promise<Exam[]> {
  try {
    const list = await apiClient<ApiExam[]>("/teacher-exams");
    if (Array.isArray(list)) {
      const mapped = list.map(mapApiExamToExam);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_EXAMS_KEY, JSON.stringify(mapped));
      }
      return mapped;
    }
  } catch (err) {
    console.warn("fetchTeacherExams API failed, using localStorage:", err);
  }

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCAL_EXAMS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
  }
  return [];
}

/**
 * Fetch detailed exam with full questions and options
 */
export async function fetchTeacherExamById(examId: string): Promise<Exam | null> {
  try {
    const detail = await apiClient<ApiExam>(`/teacher-exams/${encodeURIComponent(examId)}`);
    if (detail && detail.id) {
      return mapApiExamToExam(detail);
    }
  } catch (err) {
    console.warn("fetchTeacherExamById API failed:", err);
  }
  return null;
}

/**
 * Create a new exam package (DRAFT)
 */
export async function createTeacherExam(payload: {
  title: string;
  description?: string;
  durationMinutes: number;
  pin?: string;
}): Promise<Exam> {
  const pin = payload.pin?.trim() || Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const res = await apiClient<ApiExam>("/teacher-exams", {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        durationMinutes: payload.durationMinutes,
        pin,
      }),
    });
    if (res && res.id) {
      return mapApiExamToExam(res);
    }
  } catch (err) {
    console.warn("createTeacherExam API failed, using local exam:", err);
  }

  return {
    id: `exam-${Date.now()}`,
    title: payload.title,
    subject: "Materi Ujian",
    gradeLevel: "Semua Kelas",
    durationMinutes: payload.durationMinutes,
    totalQuestions: 0,
    totalParticipants: 0,
    activeParticipants: 0,
    status: "DRAFT",
    tokenCode: pin,
    passingScore: 75,
    createdAt: new Date().toISOString(),
    description: payload.description,
    questions: [],
  };
}

/**
 * Save questions to an exam in backend
 */
export async function saveExamQuestions(
  examId: string,
  questions: ExamQuestion[]
): Promise<void> {
  try {
    // 1. Fetch current backend exam questions to know what to add vs update
    const currentExam = await apiClient<ApiExam>(`/teacher-exams/${encodeURIComponent(examId)}`);
    const existingQuestionIds = new Set((currentExam?.questions || []).map((q) => q.id));

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const optionsPayload = (q.options || []).map((opt) => ({
        label: opt.key,
        text: opt.text,
        isCorrect: opt.key === q.correctAnswer,
      }));

      const body = {
        question: q.questionText,
        explanation: q.explanation,
        imageUrl: q.imageUrl,
        options: optionsPayload,
      };

      if (existingQuestionIds.has(q.id)) {
        await apiClient(`/teacher-exams/${encodeURIComponent(examId)}/questions/${encodeURIComponent(q.id)}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        await apiClient(`/teacher-exams/${encodeURIComponent(examId)}/questions`, {
          method: "POST",
          body: JSON.stringify(body),
        });
      }
    }
  } catch (err) {
    console.warn("saveExamQuestions API failed:", err);
  }
}

/**
 * Publish an exam (consumes 1 exam credit in DB)
 */
export async function publishTeacherExam(examId: string): Promise<Exam | null> {
  try {
    const res = await apiClient<ApiExam>(`/teacher-exams/${encodeURIComponent(examId)}/publish`, {
      method: "PATCH",
    });
    if (res && res.id) {
      return mapApiExamToExam(res);
    }
  } catch (err) {
    console.error("publishTeacherExam failed:", err);
    throw err;
  }
  return null;
}

/**
 * Close an active exam session
 */
export async function closeTeacherExam(examId: string): Promise<Exam | null> {
  try {
    const res = await apiClient<ApiExam>(`/teacher-exams/${encodeURIComponent(examId)}/close`, {
      method: "PATCH",
    });
    if (res && res.id) {
      return mapApiExamToExam(res);
    }
  } catch (err) {
    console.warn("closeTeacherExam API failed:", err);
  }
  return null;
}

/**
 * Delete a draft exam package
 */
export async function deleteTeacherExam(examId: string): Promise<void> {
  try {
    await apiClient(`/teacher-exams/${encodeURIComponent(examId)}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("deleteTeacherExam API failed:", err);
  }
}

/**
 * Fetch live participants for an exam
 */
export async function fetchLiveParticipants(examId: string): Promise<LiveStudent[]> {
  try {
    const participants = await apiClient<ApiParticipant[]>(
      `/teacher-exams/${encodeURIComponent(examId)}/participants`
    );
    if (Array.isArray(participants)) {
      return participants.map((p) => ({
        id: p.id,
        name: p.name,
        className: p.className,
        attendanceNumber: p.attendanceNumber,
        answeredCount: p.answeredQuestions || 0,
        totalQuestions: (p.answeredQuestions || 0) + (p.unansweredQuestions || 0),
        violations: p.violationCount || 0,
        isBlocked: p.status === "BLOCKED",
        isSubmitted: p.status === "SUBMITTED",
        score: p.score,
        startedAt: new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(p.startedAt)),
      }));
    }
  } catch (err) {
    console.warn("fetchLiveParticipants API failed:", err);
  }
  return [];
}

/**
 * Unblock a student participant in backend
 */
export async function unblockParticipantApi(examId: string, participantId: string): Promise<void> {
  try {
    await apiClient(
      `/teacher-exams/${encodeURIComponent(examId)}/participants/${encodeURIComponent(participantId)}/unblock`,
      { method: "PATCH" }
    );
  } catch (err) {
    console.warn("unblockParticipantApi failed:", err);
  }
}
