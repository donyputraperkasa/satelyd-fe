"use client";

import { useState, useEffect, useCallback } from "react";
import type { Exam, StudentExamSession } from "@/types";
import type { LiveStudent } from "../exam-monitor/monitor-table";
import { fetchLiveParticipants, unblockParticipantApi, unblockAllParticipantsApi } from "@/services";

export function useLiveMonitor(isOpen: boolean, exam: Exam | null) {
  const [copied, setCopied] = useState(false);
  const [filterTab, setFilterTab] = useState<"ALL" | "WORKING" | "BLOCKED" | "DONE">("ALL");
  const [students, setStudents] = useState<LiveStudent[]>([]);
  const [isUnblockingAll, setIsUnblockingAll] = useState(false);

  const loadParticipants = useCallback(async () => {
    if (!isOpen || !exam) return;

    const realStudents: LiveStudent[] = [];

    try {
      const live = await fetchLiveParticipants(exam.id);
      if (Array.isArray(live) && live.length > 0) {
        const total = exam.totalQuestions || exam.questions?.length || 8;
        realStudents.push(
          ...live.map((s) => ({
            ...s,
            totalQuestions: s.totalQuestions || total,
          }))
        );
      }
    } catch {}

    // Check if there is an active local participant session (e.g. testing in browser)
    if (typeof window !== "undefined" && exam.tokenCode) {
      const clean = exam.tokenCode.toUpperCase();
      const saved = localStorage.getItem(`satelyd.exam_session_${clean}`);
      if (saved) {
        try {
          const session: StudentExamSession = JSON.parse(saved);
          if (session?.participant?.id) {
            const existingIdx = realStudents.findIndex(
              (s) =>
                s.id === session.participant.id ||
                s.id === session.participant.participantToken ||
                (s.name.trim().toLowerCase() === session.participant.name.trim().toLowerCase() &&
                  s.className.trim().toLowerCase() === session.participant.className.trim().toLowerCase())
            );
            if (existingIdx >= 0) {
              realStudents[existingIdx].violations = Math.max(
                realStudents[existingIdx].violations,
                session.violationCount || 0
              );
              realStudents[existingIdx].answeredCount = Object.keys(session.answers || {}).length;
              realStudents[existingIdx].isBlocked =
                realStudents[existingIdx].isBlocked || (session.violationCount || 0) >= 3;
            } else {
              realStudents.unshift({
                id: session.participant.id,
                name: session.participant.name,
                className: session.participant.className,
                attendanceNumber: session.participant.attendanceNumber,
                answeredCount: Object.keys(session.answers || {}).length,
                totalQuestions: exam.questions?.length || exam.totalQuestions || 8,
                violations: session.violationCount || 0,
                isBlocked: (session.violationCount || 0) >= 3,
                isSubmitted: session.isSubmitted,
                score: session.score,
                startedAt: "Sesi Aktif",
              });
            }
          }
        } catch {}
      }
    }

    setStudents(realStudents);
  }, [isOpen, exam]);

  useEffect(() => {
    loadParticipants();
    if (!isOpen || !exam) return;
    const interval = setInterval(loadParticipants, 3000);
    return () => clearInterval(interval);
  }, [isOpen, exam, loadParticipants]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && exam) {
      navigator.clipboard.writeText(`${window.location.origin}/exam/${exam.tokenCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUnblock = async (studentId: string) => {
    if (exam?.id) {
      try {
        await unblockParticipantApi(exam.id, studentId);
      } catch {}
    }

    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, isBlocked: false, violations: 0 } : s))
    );
    if (typeof window !== "undefined" && exam?.tokenCode) {
      const key = `satelyd.exam_session_${exam.tokenCode.toUpperCase()}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const session: StudentExamSession = JSON.parse(saved);
          session.violationCount = 0;
          localStorage.setItem(key, JSON.stringify(session));
        } catch {}
      }
    }
  };

  const handleUnblockAll = async () => {
    setIsUnblockingAll(true);
    try {
      if (exam?.id) {
        await unblockAllParticipantsApi(exam.id);
      }
      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          isBlocked: false,
          violations: 0,
        }))
      );
      if (typeof window !== "undefined" && exam?.tokenCode) {
        const key = `satelyd.exam_session_${exam.tokenCode.toUpperCase()}`;
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const session: StudentExamSession = JSON.parse(saved);
            session.violationCount = 0;
            localStorage.setItem(key, JSON.stringify(session));
          } catch {}
        }
      }
    } catch {} finally {
      setIsUnblockingAll(false);
    }
  };

  const filtered = students.filter((s) => {
    if (filterTab === "WORKING") return !s.isSubmitted && !s.isBlocked;
    if (filterTab === "BLOCKED") return s.isBlocked;
    if (filterTab === "DONE") return s.isSubmitted;
    return true;
  });

  const blockedCount = students.filter((s) => s.isBlocked).length;
  const workingCount = students.filter((s) => !s.isSubmitted && !s.isBlocked).length;
  const doneCount = students.filter((s) => s.isSubmitted).length;

  return {
    copied,
    filterTab,
    setFilterTab,
    filtered,
    students,
    blockedCount,
    workingCount,
    doneCount,
    isUnblockingAll,
    handleCopyLink,
    handleUnblock,
    handleUnblockAll,
  };
}
