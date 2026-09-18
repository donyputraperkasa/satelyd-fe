"use client";

import { useState, useEffect } from "react";
import type { Exam, StudentExamSession } from "@/types";
import type { RecapStudentItem } from "./recap-table";
import { exportExamReportPdf } from "@/lib/export-exam-pdf";

export function useExamRecap(isOpen: boolean, exam: Exam | null) {
  const [sessions, setSessions] = useState<StudentExamSession[]>([]);

  useEffect(() => {
    if (!isOpen || !exam?.tokenCode || typeof window === "undefined") {
      setSessions([]);
      return;
    }
    const cleanToken = exam.tokenCode.toUpperCase();
    const loadedList: StudentExamSession[] = [];

    try {
      const saved = localStorage.getItem(`satelyd.exam_submissions_${cleanToken}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) loadedList.push(...parsed);
      }
    } catch {}

    try {
      const savedSingle = localStorage.getItem(`satelyd.exam_session_${cleanToken}`);
      if (savedSingle) {
        const parsed: StudentExamSession = JSON.parse(savedSingle);
        if (parsed?.participant) {
          const exists = loadedList.some(
            (s) =>
              s.participant.id === parsed.participant.id ||
              s.participant.name.trim().toLowerCase() === parsed.participant.name.trim().toLowerCase()
          );
          if (!exists) loadedList.push(parsed);
        }
      }
    } catch {}

    setSessions(loadedList);
  }, [isOpen, exam?.tokenCode]);

  const blockedStudent = sessions.find((s) => (s.violationCount || 0) >= 3);

  const handleUnblock = () => {
    if (!blockedStudent || !exam) return;
    const updated = sessions.map((s) =>
      s.participant.id === blockedStudent.participant.id ? { ...s, violationCount: 0 } : s
    );
    setSessions(updated);
    if (typeof window !== "undefined") {
      const cleanToken = exam.tokenCode.toUpperCase();
      localStorage.setItem(`satelyd.exam_submissions_${cleanToken}`, JSON.stringify(updated));
      const single = localStorage.getItem(`satelyd.exam_session_${cleanToken}`);
      if (single) {
        try {
          const parsed = JSON.parse(single);
          if (parsed.participant.id === blockedStudent.participant.id) {
            localStorage.setItem(`satelyd.exam_session_${cleanToken}`, JSON.stringify({ ...parsed, violationCount: 0 }));
          }
        } catch {}
      }
    }
  };

  const studentList: RecapStudentItem[] = (() => {
    if (!exam) return [];
    const qCount = exam.questions?.length || exam.totalQuestions || 3;
    const passingScore = exam.passingScore || 75;

    if (sessions.length > 0) {
      return sessions
        .map((s) => {
          let correct = 0;
          if (exam.questions && exam.questions.length > 0 && s.answers) {
            exam.questions.forEach((q) => {
              if (s.answers[q.id] && s.answers[q.id] === q.correctAnswer) correct++;
            });
          } else if (typeof s.score === "number") {
            correct = Math.min(qCount, Math.round((s.score / 100) * qCount));
          } else {
            correct = qCount;
          }
          const wrong = Math.max(0, qCount - correct);
          const score = typeof s.score === "number" ? s.score : Math.round((correct / qCount) * 100);

          let durationText = "Selesai";
          if (s.startedAt && s.submittedAt) {
            const startMs = typeof s.startedAt === "number" ? s.startedAt : new Date(s.startedAt).getTime();
            const endMs = new Date(s.submittedAt).getTime();
            const diffMin = Math.max(1, Math.round((endMs - startMs) / (1000 * 60)));
            durationText = `${diffMin} Menit`;
          }

          return {
            id: s.participant.id,
            name: s.participant.name,
            score,
            correct,
            wrong,
            passed: score >= passingScore,
            time: durationText,
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((s, idx) => ({ ...s, rank: idx + 1 }));
    }

    const mockRatios = [
      { name: "Ahmad Fauzi", ratio: 0.95, time: "42 Menit" },
      { name: "Siti Rahmawati", ratio: 0.88, time: "48 Menit" },
      { name: "Budi Santoso", ratio: 0.84, time: "50 Menit" },
      { name: "Dewi Lestari", ratio: 0.76, time: "55 Menit" },
      { name: "Rian Hidayat", ratio: 0.64, time: "58 Menit" },
    ];

    return mockRatios.map((m, idx) => {
      const correct = Math.min(qCount, Math.max(1, Math.round(m.ratio * qCount)));
      const score = Math.round((correct / qCount) * 100);
      return {
        id: `mock-${idx}`,
        name: m.name,
        score,
        correct,
        wrong: Math.max(0, qCount - correct),
        passed: score >= passingScore,
        time: m.time,
        rank: idx + 1,
      };
    });
  })();

  const totalScores = studentList.reduce((acc, cur) => acc + cur.score, 0);
  const avgScore = studentList.length > 0 ? Number((totalScores / studentList.length).toFixed(1)) : 0;
  const passedCount = studentList.filter((s) => s.passed).length;
  const passRate = studentList.length > 0 ? Math.round((passedCount / studentList.length) * 100) : 0;
  const highestScore = studentList.length > 0 ? Math.max(...studentList.map((s) => s.score)) : 0;

  const handlePrintPdf = () => {
    if (exam) exportExamReportPdf(exam, studentList, avgScore, passRate);
  };

  return { studentList, avgScore, passRate, highestScore, blockedStudent, handleUnblock, handlePrintPdf };
}
