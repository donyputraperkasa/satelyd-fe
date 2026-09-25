"use client";

import { useState, useEffect, useCallback } from "react";
import type { Exam, ExamStatus } from "@/types";
import { useToast } from "@/components/ui";
import {
  fetchTeacherExams,
  createTeacherExam,
  saveExamQuestions,
  publishTeacherExam,
  closeTeacherExam,
  deleteTeacherExam,
} from "@/services";

export function useExamsPage() {
  const { toast } = useToast();
  const [exams, setExams] = useState<Exam[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satelyd.exams");
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExamStatus | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const [managingExam, setManagingExam] = useState<Exam | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Exam | null>(null);
  const [closeCandidate, setCloseCandidate] = useState<Exam | null>(null);
  const [recapCandidate, setRecapCandidate] = useState<Exam | null>(null);
  const [liveMonitorExam, setLiveMonitorExam] = useState<Exam | null>(null);

  const notify = (msg: string) => {
    toast.info(msg);
  };

  const loadExams = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTeacherExams();
      if (data && data.length > 0) {
        setExams(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExams();
  }, [loadExams]);

  const openMonitor = (exam: Exam) => {
    setLiveMonitorExam(exam);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("monitor", exam.tokenCode);
      window.history.replaceState(null, "", url.toString());
    }
  };

  const closeMonitor = () => {
    setLiveMonitorExam(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("monitor");
      window.history.replaceState(null, "", url.toString());
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const monitorToken = params.get("monitor");
    if (monitorToken) {
      const found = exams.find((e) => e.tokenCode?.toUpperCase() === monitorToken.toUpperCase());
      if (found) {
        if (found.status === "CLOSED") {
          setRecapCandidate(found);
          const url = new URL(window.location.href);
          url.searchParams.delete("monitor");
          window.history.replaceState(null, "", url.toString());
        } else {
          setLiveMonitorExam(found);
        }
      }
    }
  }, [exams]);

  const persistExams = (updated: Exam[]) => {
    setExams(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("satelyd.exams", JSON.stringify(updated));
    }
  };

  const handleCreate = async (newExam: Exam) => {
    try {
      const created = await createTeacherExam({
        title: newExam.title,
        description: newExam.description,
        durationMinutes: newExam.durationMinutes,
        pin: newExam.tokenCode,
      });
      persistExams([created, ...exams]);
      notify(`Draft "${created.title}" berhasil dibuat! Silakan kelola butir soal.`);
      setManagingExam(created);
    } catch {
      persistExams([newExam, ...exams]);
      notify(`Draft "${newExam.title}" berhasil dibuat! Silakan kelola butir soal.`);
      setManagingExam(newExam);
    }
  };

  const handleSaveQuestions = async (updated: Exam) => {
    try {
      if (updated.questions && updated.questions.length > 0) {
        await saveExamQuestions(updated.id, updated.questions);
      }
      if (updated.status === "PUBLISHED") {
        await publishTeacherExam(updated.id);
      }
    } catch (err: unknown) {
      console.warn("Save questions API notice:", err);
    }

    const list = exams.some((e) => e.id === updated.id)
      ? exams.map((e) => (e.id === updated.id ? updated : e))
      : [updated, ...exams];
    persistExams(list);
    setManagingExam(updated);
    notify(`Bank soal "${updated.title}" berhasil disimpan! (${updated.totalQuestions} Soal)`);
  };

  const handleConfirmDelete = async (exam: Exam) => {
    try {
      await deleteTeacherExam(exam.id);
    } catch {}
    persistExams(exams.filter((e) => e.id !== exam.id));
    toast.delete(`Paket ujian "${exam.title}" berhasil dihapus.`);
  };

  const handleConfirmClose = async (exam: Exam) => {
    try {
      await closeTeacherExam(exam.id);
    } catch {}
    const updated = exams.map((e) => (e.id === exam.id ? { ...e, status: "CLOSED" as ExamStatus } : e));
    persistExams(updated);
    notify(`Sesi ujian "${exam.title}" ditutup. Anda kini dapat melihat rekap skor atau mengelola soal kembali.`);
  };

  const handleActionMonitor = (exam: Exam) => {
    if (exam.status === "CLOSED") {
      setRecapCandidate(exam);
    } else {
      openMonitor(exam);
      notify(`Membuka pengawasan langsung untuk "${exam.title}"`);
    }
  };

  const counts = {
    all: exams.length,
    published: exams.filter((e) => e.status === "PUBLISHED").length,
    draft: exams.filter((e) => e.status === "DRAFT").length,
    closed: exams.filter((e) => e.status === "CLOSED").length,
  };

  const filtered = exams.filter((e) => {
    const matchStatus = statusFilter === "ALL" || e.status === statusFilter;
    const q = searchQuery.toLowerCase();
    return matchStatus && (!q || [e.title, e.subject, e.tokenCode, e.gradeLevel].some((s) => s.toLowerCase().includes(q)));
  });

  return {
    exams, filtered, counts, toast, isLoading,
    isCreateModalOpen, setIsCreateModalOpen,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    viewMode, setViewMode,
    managingExam, setManagingExam,
    deleteCandidate, setDeleteCandidate,
    closeCandidate, setCloseCandidate,
    recapCandidate, setRecapCandidate,
    liveMonitorExam, openMonitor, closeMonitor,
    notify, handleCreate, handleSaveQuestions,
    handleConfirmDelete, handleConfirmClose, handleActionMonitor,
  };
}
