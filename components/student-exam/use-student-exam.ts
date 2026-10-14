"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Exam, StudentExamSession } from "@/types";
import {
  fetchExamByToken,
  joinExamSession,
  getActiveExamSession,
  saveActiveExamSession,
  submitStudentExam,
  recordStudentAnswer,
  recordAntiCheatEvent,
  fetchParticipantStatus,
  type JoinStudentExamPayload,
} from "@/services/student-exam.service";

export function useStudentExam(token: string) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [session, setSession] = useState<StudentExamSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [antiCheatOpen, setAntiCheatOpen] = useState(false);

  // Load Exam data and restore active session if any
  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const found = await fetchExamByToken(token);
        if (!isMounted) return;
        if (!found) {
          setErrorMsg(`Ujian dengan kode "${token.toUpperCase()}" tidak ditemukan atau belum dipublikasikan.`);
        } else {
          setExam(found);
          const existingSession = getActiveExamSession(token);
          if (existingSession) {
            setSession(existingSession);
            if (existingSession.violationCount >= 3) {
              setAntiCheatOpen(true);
            }
          }
        }

      } catch (err: unknown) {
        if (isMounted) setErrorMsg(err instanceof Error ? err.message : "Gagal memuat ujian");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [token]);

  // Handle final submission
  const handleFinalSubmit = useCallback(async () => {
    if (!session || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const finished = await submitStudentExam(session);
      setSession(finished);
      setIsSubmitModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [session, isSubmitting]);

  // Countdown Timer
  useEffect(() => {
    if (!session || session.isSubmitted) return;
    const interval = setInterval(() => {
      setSession((prev) => {
        if (!prev || prev.isSubmitted) return prev;
        const nextSeconds = prev.remainingSeconds - 1;
        if (nextSeconds <= 0) {
          clearInterval(interval);
          handleFinalSubmit();
          return { ...prev, remainingSeconds: 0 };
        }
        const updated = { ...prev, remainingSeconds: nextSeconds };
        saveActiveExamSession(token, updated);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [session?.isSubmitted, token, handleFinalSubmit]);

  // Anti-Cheat: Visibility Change, Window Blur, Right-Click, Screenshot, Copy
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);
  const maxViolations = 3;
  const lastViolationTimeRef = useRef(0);

  const triggerViolation = useCallback(
    (
      type:
        | "TAB_HIDDEN"
        | "WINDOW_BLUR"
        | "FULLSCREEN_EXIT"
        | "COPY_ATTEMPT"
        | "PASTE_ATTEMPT"
        | "RIGHT_CLICK"
        | "MANUAL_BLOCK",
      detail?: string
    ) => {
      const now = Date.now();
      // Debounce 1.2 detik agar event blur + visibilitychange tidak terhitung ganda secara bersamaan
      if (now - lastViolationTimeRef.current < 1200) return;
      lastViolationTimeRef.current = now;

      const current = sessionRef.current;
      if (!current || current.isSubmitted) return;

      const nextViolation = current.violationCount + 1;
      const updated = {
        ...current,
        violationCount: nextViolation,
      };
      setSession(updated);
      saveActiveExamSession(token, updated);
      setAntiCheatOpen(true);

      // Kirim event pelanggaran ke backend API secara real-time agar muncul di Pantau Live guru
      if (current.participant?.participantToken) {
        recordAntiCheatEvent(current.participant.participantToken, type, detail);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!session || session.isSubmitted) return;

    // 1. Pindah tab atau minimize browser
    const handleVisibility = () => {
      if (document.hidden) {
        triggerViolation("TAB_HIDDEN", "Berpindah tab atau browser diminimalkan");
      }
    };

    // 2. Window blur (klik di luar jendela ujian, buka aplikasi lain, dsb.)
    const handleBlur = () => {
      triggerViolation("WINDOW_BLUR", "Kehilangan fokus jendela ujian");
    };

    // 3. Klik kanan (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerViolation("RIGHT_CLICK", "Mencoba klik kanan pada lembar ujian");
    };

    // 4. Deteksi tombol screenshot, copy, print, dan developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        triggerViolation("COPY_ATTEMPT", "Mencoba tangkapan layar (PrintScreen)");
        return;
      }

      // Mac screenshot: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        triggerViolation("COPY_ATTEMPT", "Mencoba tangkapan layar (Cmd+Shift+Screenshot)");
        return;
      }

      // Windows Snipping Tool: Win+Shift+S (Shift + Meta/Ctrl + S)
      if (e.shiftKey && (e.metaKey || e.ctrlKey) && (e.key === "s" || e.key === "S")) {
        triggerViolation("COPY_ATTEMPT", "Mencoba tangkapan layar / potong layar");
        return;
      }

      // Inspect Element / DevTools: F12 atau Ctrl/Cmd+Shift+I / J / C
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "I", "j", "J", "c", "C"].includes(e.key))
      ) {
        e.preventDefault();
        triggerViolation("COPY_ATTEMPT", "Mencoba membuka inspect element / devtools");
        return;
      }

      // Print: Ctrl+P / Cmd+P
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        triggerViolation("COPY_ATTEMPT", "Mencoba mencetak lembar ujian");
        return;
      }
    };

    // 5. Copy attempt
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerViolation("COPY_ATTEMPT", "Mencoba menyalin (copy) teks soal");
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
    };
  }, [session?.isSubmitted, triggerViolation]);

  const isBlocked = Boolean(session && session.violationCount >= maxViolations);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Cross-tab real-time listener & remote polling for teacher unblock
  useEffect(() => {
    let isCancelled = false;

    const checkUnblockStatus = async () => {
      // 1. Cek storage lokal terlebih dahulu
      const fresh = getActiveExamSession(token);
      if (fresh && fresh.violationCount < maxViolations) {
        setSession(fresh);
        setAntiCheatOpen(false);
        return;
      }

      // 2. Jika sesi siswa memiliki participantToken, cek status langsung ke server backend guru
      if (fresh?.participant?.participantToken) {
        try {
          const remote = await fetchParticipantStatus(fresh.participant.participantToken);
          if (isCancelled) return;
          if (remote && remote.status === "IN_PROGRESS" && (remote.violationCount === 0 || remote.violationCount < maxViolations)) {
            const unlockedSession: StudentExamSession = {
              ...fresh,
              violationCount: remote.violationCount || 0,
            };
            setSession(unlockedSession);
            saveActiveExamSession(token, unlockedSession);
            setAntiCheatOpen(false);
          }
        } catch {}
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === `satelyd.exam_session_${token.toUpperCase()}`) {
        checkUnblockStatus();
      }
    };

    window.addEventListener("storage", handleStorage);
    // Polling setiap 2 detik agar begitu guru klik Buka Kunci, layar siswa otomatis langsung terbuka
    const pollTimer = setInterval(checkUnblockStatus, 2000);

    return () => {
      isCancelled = true;
      window.removeEventListener("storage", handleStorage);
      clearInterval(pollTimer);
    };
  }, [token, maxViolations]);



  const handleJoin = async (payload: JoinStudentExamPayload) => {
    if (!exam) return;
    setIsLoading(true);
    try {
      const newSession = await joinExamSession(exam, payload);
      setSession(newSession);
    } finally {
      setIsLoading(false);
    }
  };

  const currentQuestion = exam?.questions?.[currentIndex];

  const handleSelectOption = (optionKey: string) => {
    if (!session || !currentQuestion || session.isSubmitted) return;
    setSession((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, answers: { ...prev.answers, [currentQuestion.id]: optionKey } };
      saveActiveExamSession(token, updated);
      return updated;
    });
    if (session?.participant?.participantToken && currentQuestion?.id) {
      recordStudentAnswer(session.participant.participantToken, currentQuestion.id, optionKey);
    }
  };

  const handleToggleDoubtful = () => {
    if (!session || !currentQuestion || session.isSubmitted) return;
    setSession((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        doubtful: { ...prev.doubtful, [currentQuestion.id]: !prev.doubtful[currentQuestion.id] },
      };
      saveActiveExamSession(token, updated);
      return updated;
    });
  };

  const handleRefreshStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const current = sessionRef.current || getActiveExamSession(token);
      if (current?.participant?.participantToken) {
        const remote = await fetchParticipantStatus(current.participant.participantToken);
        if (remote && remote.status === "IN_PROGRESS" && (remote.violationCount === 0 || remote.violationCount < maxViolations)) {
          const unlocked: StudentExamSession = {
            ...current,
            violationCount: remote.violationCount || 0,
          };
          setSession(unlocked);
          saveActiveExamSession(token, unlocked);
          setAntiCheatOpen(false);
          return;
        }
      }

      // Fallback lokal jika backend tidak terjangkau atau masih sync
      const fresh = getActiveExamSession(token);
      if (fresh) {
        setSession(fresh);
        if (fresh.violationCount < maxViolations) {
          setAntiCheatOpen(false);
        }
      }
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return {
    exam,
    session,
    currentIndex,
    setCurrentIndex,
    isLoading,
    isSubmitting,
    isCheckingStatus,
    errorMsg,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    antiCheatOpen,
    setAntiCheatOpen,
    maxViolations,
    isBlocked,
    handleJoin,
    handleSelectOption,
    handleToggleDoubtful,
    handleFinalSubmit,
    handleRefreshStatus,
  };
}

