"use client";

import { useState, useEffect, useCallback } from "react";
import type { DeckCard, Exam, ExamQuestion, ExamStatus } from "@/types";
import { useToast } from "@/components/ui";
import {
  fetchTeacherExams,
  fetchTeacherExamById,
  createTeacherExam,
  saveExamQuestions,
  publishTeacherExam,
  closeTeacherExam,
  deleteTeacherExam,
  fetchDeckById,
} from "@/services";
import { extractCorrectKey } from "@/components/game/battle/battle-constants";

function convertCardsToQuestions(cards: DeckCard[]): ExamQuestion[] {
  return cards.map((card, idx) => {
    let options =
      card.options && card.options.length > 0
        ? card.options.map((opt) => ({
            key: opt.key.trim().toUpperCase(),
            text: opt.text.trim(),
          }))
        : [];

    if (options.length < 2) {
      const rawAns =
        card.backAnswer?.replace(/^[A-E]\.\s*/i, "").trim() || "Pilihan A";
      options = [
        { key: "A", text: rawAns },
        { key: "B", text: "Pilihan B" },
        { key: "C", text: "Pilihan C" },
        { key: "D", text: "Pilihan D" },
      ];
    }

    const correctKey = extractCorrectKey(card);

    return {
      id: card.id || `q-${idx + 1}-${Date.now()}`,
      number: idx + 1,
      questionText: card.frontQuestion || `Pertanyaan #${idx + 1}`,
      questionType: "MULTIPLE_CHOICE",
      options,
      correctAnswer: correctKey,
      points: card.points || 10,
      imageUrl: card.imageUrl,
      explanation: card.explanation,
    };
  });
}

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
    } catch (err: unknown) {
      console.error("Gagal memuat daftar ujian:", err);
      const isAuthError =
        err instanceof Error &&
        (err.message.includes("Unauthorized") || err.message.includes("401"));
      if (isAuthError) {
        toast.error("Sesi login Anda telah kedaluwarsa. Silakan masuk (login) kembali.");
      } else {
        toast.error("Gagal memuat daftar ujian dari server.");
      }
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

    const manageExamId = params.get("manageExamId");
    if (manageExamId) {
      const found = exams.find((e) => e.id === manageExamId);
      if (found) {
        handleOpenManage(found);
        const url = new URL(window.location.href);
        url.searchParams.delete("manageExamId");
        window.history.replaceState(null, "", url.toString());
      } else if (!isLoading && exams.length > 0) {
        fetchTeacherExamById(manageExamId).then((full) => {
          if (full) {
            setExams((prev) => [full, ...prev.filter((e) => e.id !== full.id)]);
            setManagingExam(full);
            const url = new URL(window.location.href);
            url.searchParams.delete("manageExamId");
            window.history.replaceState(null, "", url.toString());
          }
        });
      }
    }

    const importDeckId = params.get("importDeckId");
    if (importDeckId) {
      const url = new URL(window.location.href);
      url.searchParams.delete("importDeckId");
      window.history.replaceState(null, "", url.toString());

      fetchDeckById(importDeckId).then(async (deck) => {
        if (!deck) {
          toast.error("Bank soal tidak ditemukan.");
          return;
        }
        toast.info(
          `Mengonversi "${deck.title}" menjadi paket Ujian Siswa...`
        );
        try {
          const generatedPin = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

          const pinCode = deck.pinCode
            ? deck.pinCode.replace(/[^A-Za-z0-9]/g, "").slice(0, 6).toUpperCase()
            : generatedPin;

          const duration = Math.max(
            15,
            Math.min(120, Math.ceil((deck.cardCount || 10) * 2))
          );

          const created = await createTeacherExam({
            title: deck.title,
            description: deck.description,
            durationMinutes: duration,
            pin: pinCode,
          });

          const rawCards = deck.cards || [];
          if (rawCards.length > 0) {
            const questionsPayload = convertCardsToQuestions(rawCards);
            await saveExamQuestions(created.id, questionsPayload);
          }

          setExams((prev) => [created, ...prev]);
          handleOpenManage(created);
          toast.success(
            `Paket Ujian "${created.title}" berhasil dibuat dengan ${rawCards.length} butir soal!`
          );
        } catch (err: unknown) {
          const msg =
            err instanceof Error
              ? err.message
              : "Gagal mengimpor paket ujian.";
          toast.error(msg);
        }
      });
    }
  }, [exams, isLoading]);

  const handleOpenManage = async (exam: Exam) => {
    setManagingExam(exam);
    if (!exam.questions || exam.questions.length === 0) {
      try {
        const full = await fetchTeacherExamById(exam.id);
        if (full) {
          setManagingExam(full);
        }
      } catch (err) {
        console.error("Gagal memuat detail soal:", err);
      }
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

  const handleJoinRoom = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = exams.find((e) => e.tokenCode?.toUpperCase() === clean);
    if (found) {
      if (found.status === "CLOSED") {
        setRecapCandidate(found);
        notify(`Sesi ujian "${found.title}" sudah selesai. Menampilkan Rekap Nilai.`);
      } else {
        openMonitor(found);
        notify(`Membuka pengawasan langsung untuk "${found.title}"`);
      }
    } else {
      const tempExam: Exam = {
        id: `EXM-${clean}`,
        title: `Ruang Ujian [${clean}]`,
        subject: "Pengawasan Langsung",
        gradeLevel: "Semua Kelas",
        durationMinutes: 60,
        totalQuestions: 20,
        totalParticipants: 1,
        activeParticipants: 1,
        status: "PUBLISHED",
        tokenCode: clean,
        passingScore: 75,
        createdAt: "Hari ini",
      };
      openMonitor(tempExam);
      notify(`Membuka pengawasan ruang ujian [${clean}]`);
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
    const matchesQuery =
      !q ||
      [e.title, e.subject, e.tokenCode, e.gradeLevel].some((s) =>
        s.toLowerCase().includes(q)
      );
    return matchStatus && matchesQuery;
  });

  return {
    exams,
    filtered,
    counts,
    toast,
    isLoading,
    isCreateModalOpen,
    setIsCreateModalOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
    managingExam,
    setManagingExam,
    deleteCandidate,
    setDeleteCandidate,
    closeCandidate,
    setCloseCandidate,
    recapCandidate,
    setRecapCandidate,
    liveMonitorExam,
    openMonitor,
    closeMonitor,
    notify,
    handleCreate,
    handleOpenManage,
    handleSaveQuestions,
    handleConfirmDelete,
    handleConfirmClose,
    handleActionMonitor,
    handleJoinRoom,
  };
}
