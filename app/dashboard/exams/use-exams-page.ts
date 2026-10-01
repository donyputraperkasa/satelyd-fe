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
  const [exams, setExams] = useState<Exam[]>([]);
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
      setExams(data || []);
    } catch (err) {
      console.error("Gagal memuat daftar ujian:", err);
      toast.error("Gagal memuat daftar ujian dari server.");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

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

  const handleCreate = async (newExam: Exam) => {
    try {
      const created = await createTeacherExam({
        title: newExam.title,
        description: newExam.description,
        durationMinutes: newExam.durationMinutes,
        pin: newExam.tokenCode,
      });
      setExams((prev) => [created, ...prev]);
      notify(`Draft "${created.title}" berhasil dibuat! Silakan kelola butir soal.`);
      setManagingExam(created);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat paket ujian di server.";
      toast.error(msg);
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
      setExams((prev) =>
        prev.some((e) => e.id === updated.id)
          ? prev.map((e) => (e.id === updated.id ? updated : e))
          : [updated, ...prev]
      );
      setManagingExam(updated);
      notify(`Bank soal "${updated.title}" berhasil disimpan! (${updated.totalQuestions} Soal)`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan butir soal ke server.";
      toast.error(msg);
    }
  };

  const handleConfirmDelete = async (exam: Exam) => {
    try {
      await deleteTeacherExam(exam.id);
      setExams((prev) => prev.filter((e) => e.id !== exam.id));
      toast.delete(`Paket ujian "${exam.title}" berhasil dihapus.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus paket ujian dari server.";
      toast.error(msg);
    }
  };

  const handleConfirmClose = async (exam: Exam) => {
    try {
      await closeTeacherExam(exam.id);
      setExams((prev) =>
        prev.map((e) => (e.id === exam.id ? { ...e, status: "CLOSED" as ExamStatus } : e))
      );
      notify(`Sesi ujian "${exam.title}" ditutup. Anda kini dapat melihat rekap skor atau mengelola soal kembali.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menutup sesi ujian di server.";
      toast.error(msg);
    }
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
