import { apiClient } from "@/lib/api/client";
import type { Exam, StudentParticipant, StudentExamSession, JoinStudentExamPayload } from "@/types";

export type { JoinStudentExamPayload };


export async function fetchExamByToken(token: string): Promise<Exam | null> {
  const cleanToken = token.trim().toUpperCase();

  // 1. Coba ambil dari Backend API jika online
  try {
    const apiExam = await apiClient<{
      id: string;
      title: string;
      description?: string;
      durationMinutes: number;
      questions?: Array<{
        id: string;
        order: number;
        question: string;
        imageUrl?: string;
        explanation?: string;
        options: Array<{ id: string; optionKey: string; optionText: string }>;
      }>;
      _count?: { questions: number };
    }>(`/teacher-exams/public/${encodeURIComponent(cleanToken)}`);

    if (apiExam && apiExam.id) {
      return {
        id: apiExam.id,
        title: apiExam.title,
        subject: "Materi Ujian",
        gradeLevel: "Semua Kelas",
        durationMinutes: apiExam.durationMinutes || 60,
        totalQuestions: apiExam.questions?.length || apiExam._count?.questions || 0,
        totalParticipants: 0,
        activeParticipants: 0,
        status: "PUBLISHED",
        tokenCode: cleanToken,
        passingScore: 75,
        createdAt: new Date().toISOString(),
        description: apiExam.description,
        questions: (apiExam.questions || []).map((q, idx) => ({
          id: q.id,
          number: q.order || idx + 1,
          questionText: q.question,
          questionType: "MULTIPLE_CHOICE",
          imageUrl: q.imageUrl,
          points: 10,
          options: q.options?.map((opt) => ({
            key: opt.optionKey,
            text: opt.optionText,
          })) || [],
        })),
      };
    }
  } catch {
    // Lanjut ke fallback data lokal
  }

  // 2. Ambil dari localStorage (ujian yang dibuat guru di dashboard)
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("satelyd.exams");
    if (saved) {
      try {
        const localExams: Exam[] = JSON.parse(saved);
        const matched = localExams.find(
          (e) => e.tokenCode?.toUpperCase() === cleanToken
        );
        if (matched) return matched;
      } catch {
        // Abaikan parse error
      }
    }
  }

  return null;
}

export async function joinExamSession(
  exam: Exam,
  payload: JoinStudentExamPayload
): Promise<StudentExamSession> {
  const cleanToken = exam.tokenCode.toUpperCase();
  let participantToken = `part_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // Coba daftarkan peserta ke backend API
  try {
    const res = await apiClient<{
      id: string;
      participantToken: string;
    }>(`/teacher-exams/public/${encodeURIComponent(cleanToken)}/join`, {
      method: "POST",
      body: JSON.stringify({
        name: payload.name.trim(),
        className: payload.className.trim(),
        attendanceNumber: payload.attendanceNumber?.trim(),
        pin: payload.pin || cleanToken,
      }),
    });
    if (res?.participantToken) {
      participantToken = res.participantToken;
    }
  } catch {
    // Lanjut menggunakan lokal participant token
  }

  const participant: StudentParticipant = {
    id: participantToken,
    name: payload.name.trim(),
    className: payload.className.trim(),
    attendanceNumber: payload.attendanceNumber?.trim(),
    participantToken,
    startedAt: new Date().toISOString(),
  };

  const initialDurationSeconds = (exam.durationMinutes || 60) * 60;

  const newSession: StudentExamSession = {
    exam,
    participant,
    answers: {},
    doubtful: {},
    startedAt: Date.now(),
    remainingSeconds: initialDurationSeconds,
    isSubmitted: false,
    violationCount: 0,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(
      `satelyd.exam_session_${cleanToken}`,
      JSON.stringify(newSession)
    );

    // Simpan ke daftar riwayat peserta untuk token ini
    try {
      const listKey = `satelyd.exam_submissions_${cleanToken}`;
      const saved = localStorage.getItem(listKey);
      const list: StudentExamSession[] = saved ? JSON.parse(saved) : [];
      const updated = [
        newSession,
        ...list.filter(
          (s) =>
            s.participant.id !== newSession.participant.id &&
            s.participant.name.trim().toLowerCase() !== newSession.participant.name.trim().toLowerCase()
        ),
      ];
      localStorage.setItem(listKey, JSON.stringify(updated));
    } catch {}
  }

  return newSession;
}

export function getActiveExamSession(token: string): StudentExamSession | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(
    `satelyd.exam_session_${token.toUpperCase()}`
  );
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export function saveActiveExamSession(
  token: string,
  session: StudentExamSession
) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `satelyd.exam_session_${token.toUpperCase()}`,
    JSON.stringify(session)
  );
}

export async function submitStudentExam(
  session: StudentExamSession
): Promise<StudentExamSession> {
  const { exam, answers } = session;
  const questions = exam.questions || [];
  let correctCount = 0;

  questions.forEach((q) => {
    const studentAnswer = answers[q.id];
    if (studentAnswer && q.correctAnswer && studentAnswer === q.correctAnswer) {
      correctCount++;
    }
  });

  const finalScore = questions.length > 0
    ? Math.round((correctCount / questions.length) * 100)
    : 0;

  // Coba kirimkan submit ke backend API
  try {
    await apiClient(
      `/teacher-exams/participants/${encodeURIComponent(session.participant.participantToken)}/submit`,
      { method: "POST" }
    );
  } catch {
    // Lanjut lokal
  }

  const finishedSession: StudentExamSession = {
    ...session,
    isSubmitted: true,
    score: finalScore,
    submittedAt: new Date().toISOString(),
  };

  saveActiveExamSession(exam.tokenCode, finishedSession);

  // Perbarui daftar peserta ujian dan total peserta di localStorage
  if (typeof window !== "undefined") {
    const cleanToken = exam.tokenCode.toUpperCase();
    try {
      const listKey = `satelyd.exam_submissions_${cleanToken}`;
      const saved = localStorage.getItem(listKey);
      const list: StudentExamSession[] = saved ? JSON.parse(saved) : [];
      const updated = [
        finishedSession,
        ...list.filter(
          (s) =>
            s.participant.id !== finishedSession.participant.id &&
            s.participant.name.trim().toLowerCase() !== finishedSession.participant.name.trim().toLowerCase()
        ),
      ];
      localStorage.setItem(listKey, JSON.stringify(updated));
    } catch {}

    const savedExams = localStorage.getItem("satelyd.exams");
    if (savedExams) {
      try {
        const exams: Exam[] = JSON.parse(savedExams);
        const updated = exams.map((e) => {
          if (e.tokenCode?.toUpperCase() === cleanToken) {
            return {
              ...e,
              totalParticipants: Math.max(e.totalParticipants || 0, 1),
            };
          }
          return e;
        });
        localStorage.setItem("satelyd.exams", JSON.stringify(updated));
      } catch {
        // Abaikan
      }
    }
  }

  return finishedSession;
}

export async function recordStudentAnswer(
  participantToken: string,
  questionId: string,
  selectedOptionId?: string
): Promise<void> {
  try {
    await apiClient(
      `/teacher-exams/participants/${encodeURIComponent(participantToken)}/answers`,
      {
        method: "POST",
        body: JSON.stringify({
          questionId,
          selectedOptionId,
        }),
      }
    );
  } catch (err) {
    console.warn("recordStudentAnswer API notice:", err);
  }
}

export async function recordAntiCheatEvent(
  participantToken: string,
  type: "TAB_HIDDEN" | "WINDOW_BLUR" | "FULLSCREEN_EXIT" | "COPY_ATTEMPT" | "PASTE_ATTEMPT" | "RIGHT_CLICK" | "MANUAL_BLOCK",
  detail?: string
): Promise<void> {
  try {
    await apiClient(
      `/teacher-exams/participants/${encodeURIComponent(participantToken)}/events`,
      {
        method: "POST",
        body: JSON.stringify({
          type,
          detail,
        }),
      }
    );
  } catch (err) {
    console.warn("recordAntiCheatEvent API notice:", err);
  }
}
