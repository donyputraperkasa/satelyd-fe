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

  // Anti-Cheat: Visibility Change & Window Blur
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const maxViolations = 3;

  useEffect(() => {
    if (!session || session.isSubmitted) return;
    const handleVisibility = () => {
      if (document.hidden && sessionRef.current && !sessionRef.current.isSubmitted) {
        setSession((prev) => {
          if (!prev || prev.isSubmitted) return prev;
          const nextViolation = prev.violationCount + 1;
          const updated = {
            ...prev,
            violationCount: nextViolation,
          };
          saveActiveExamSession(token, updated);
          return updated;
        });
        setAntiCheatOpen(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [session?.isSubmitted, token]);

  const isBlocked = Boolean(session && session.violationCount >= maxViolations);

  // Cross-tab real-time listener & polling for teacher unblock
  useEffect(() => {
    const checkUnblockStatus = () => {
      const fresh = getActiveExamSession(token);
      if (fresh && fresh.violationCount < maxViolations) {
        setSession(fresh);
        setAntiCheatOpen(false);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === `satelyd.exam_session_${token.toUpperCase()}`) {
        checkUnblockStatus();
      }
    };

    window.addEventListener("storage", handleStorage);
    const pollTimer = setInterval(checkUnblockStatus, 1000);

    return () => {
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
      recordStudentAnswer(session.participant.participantToken, currentQuestion.id);
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

  const handleRefreshStatus = () => {
    const fresh = getActiveExamSession(token);
    if (fresh) {
      setSession(fresh);
      if (fresh.violationCount < maxViolations) {
        setAntiCheatOpen(false);
      }
    }
  };

  return {
    exam,
    session,
    currentIndex,
    setCurrentIndex,
    isLoading,
    isSubmitting,
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

