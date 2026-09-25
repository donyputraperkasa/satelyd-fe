"use client";

import { useState, useEffect, useCallback } from "react";
import type { Exam, StudentExamSession } from "@/types";
import type { LiveStudent } from "../exam-monitor/monitor-table";
import { fetchLiveParticipants, unblockParticipantApi } from "@/services";

export function useLiveMonitor(isOpen: boolean, exam: Exam | null) {
  const [copied, setCopied] = useState(false);
  const [filterTab, setFilterTab] = useState<"ALL" | "WORKING" | "BLOCKED" | "DONE">("ALL");
  const [students, setStudents] = useState<LiveStudent[]>([]);

  const loadParticipants = useCallback(async () => {
    if (!isOpen || !exam) return;

    try {
      const live = await fetchLiveParticipants(exam.id);
      if (live && live.length > 0) {
        setStudents(live);
        return;
      }
    } catch {}

    const baseList: LiveStudent[] = [
      {
        id: "stu-1",
        name: "Ahmad Fauzi",
        className: exam.gradeLevel || "XII IPA 1",
        attendanceNumber: "02",
        answeredCount: Math.min(exam.totalQuestions || 20, 18),
        totalQuestions: exam.totalQuestions || 20,
        violations: 0,
        isBlocked: false,
        isSubmitted: false,
        startedAt: "10 mnt lalu",
      },
      {
        id: "stu-2",
        name: "Siti Rahmawati",
        className: exam.gradeLevel || "XII IPA 1",
        attendanceNumber: "28",
        answeredCount: exam.totalQuestions || 20,
        totalQuestions: exam.totalQuestions || 20,
        violations: 1,
        isBlocked: false,
        isSubmitted: true,
        score: 88,
        startedAt: "25 mnt lalu",
      },
      {
        id: "stu-3",
        name: "Budi Pratama",
        className: exam.gradeLevel || "XII IPA 1",
        attendanceNumber: "08",
        answeredCount: 12,
        totalQuestions: exam.totalQuestions || 20,
        violations: 3,
        isBlocked: true,
        isSubmitted: false,
        startedAt: "15 mnt lalu",
      },
    ];

    if (typeof window !== "undefined" && exam.tokenCode) {
      const clean = exam.tokenCode.toUpperCase();
      const saved = localStorage.getItem(`satelyd.exam_session_${clean}`);
      if (saved) {
        try {
          const session: StudentExamSession = JSON.parse(saved);
          baseList.unshift({
            id: session.participant.id,
            name: session.participant.name,
            className: session.participant.className,
            attendanceNumber: session.participant.attendanceNumber,
            answeredCount: Object.keys(session.answers || {}).length,
            totalQuestions: exam.questions?.length || exam.totalQuestions || 20,
            violations: session.violationCount || 0,
            isBlocked: (session.violationCount || 0) >= 3,
            isSubmitted: session.isSubmitted,
            score: session.score,
            startedAt: "Sesi Aktif",
          });
        } catch {}
      }
    }

    setStudents(baseList);
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
    handleCopyLink,
    handleUnblock,
  };
}
