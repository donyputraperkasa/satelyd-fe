"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  ExamStats,
  ExamCard,
  ExamTable,
  ExamQuickActions,
  ExamCreateModal,
  ExamQuestionEditorModal,
  ExamEmptyState,
  ExamHeaderBanner,
  DeleteExamModal,
  CloseSessionModal,
  ExamRecapModal,
} from "@/components/exams";
import { type Exam, type ExamStatus } from "@/types";

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("satelyd.exams");
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExamStatus | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [managingExam, setManagingExam] = useState<Exam | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Exam | null>(null);
  const [closeCandidate, setCloseCandidate] = useState<Exam | null>(null);
  const [recapCandidate, setRecapCandidate] = useState<Exam | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const persistExams = (updated: Exam[]) => {
    setExams(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("satelyd.exams", JSON.stringify(updated));
    }
  };

  const handleCreate = (newExam: Exam) => {
    persistExams([newExam, ...exams]);
    notify(`Draft "${newExam.title}" berhasil dibuat! Silakan kelola butir soal.`);
    setManagingExam(newExam);
  };

  const handleSaveQuestions = (updated: Exam) => {
    const list = exams.some((e) => e.id === updated.id)
      ? exams.map((e) => (e.id === updated.id ? updated : e))
      : [updated, ...exams];
    persistExams(list);
    setManagingExam(updated);
    notify(`Bank soal "${updated.title}" berhasil disimpan! (${updated.totalQuestions} Soal)`);
  };

  const handleConfirmDelete = (exam: Exam) => {
    persistExams(exams.filter((e) => e.id !== exam.id));
    notify(`Paket ujian "${exam.title}" berhasil dihapus.`);
  };

  const handleConfirmClose = (exam: Exam) => {
    const updated = exams.map((e) => (e.id === exam.id ? { ...e, status: "CLOSED" as ExamStatus } : e));
    persistExams(updated);
    notify(`Sesi ujian "${exam.title}" ditutup. Anda kini dapat melihat rekap skor atau mengelola soal kembali.`);
  };

  const handleActionMonitor = (exam: Exam) => {
    if (exam.status === "CLOSED") {
      setRecapCandidate(exam);
    } else {
      notify(`Monitoring live pengerjaan siswa untuk "${exam.title}"`);
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

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl border border-[#C8E6C9] bg-white/95 px-4 py-3 text-xs sm:text-sm font-bold text-[#1B4D20] shadow-xl backdrop-blur-md">
          <CheckCircle2 size={18} className="text-[#2E7D32] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <ExamHeaderBanner />
      <ExamStats exams={exams} />

      <ExamQuickActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateNew={() => setIsCreateModalOpen(true)}
        onJoinRoom={(code) => notify(`Membuka ruang ujian [${code}]`)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {filtered.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((e) => (
              <ExamCard key={e.id} exam={e} onManage={setManagingExam} onMonitor={handleActionMonitor} onCloseSession={setCloseCandidate} onDelete={setDeleteCandidate} />
            ))}
          </div>
        ) : (
          <ExamTable exams={filtered} onManage={setManagingExam} onMonitor={handleActionMonitor} onCloseSession={setCloseCandidate} onDelete={setDeleteCandidate} />
        )
      ) : (
        <ExamEmptyState />
      )}

      <ExamCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreate} />
      {managingExam && (
        <ExamQuestionEditorModal key={managingExam.id} isOpen={Boolean(managingExam)} exam={managingExam} onClose={() => setManagingExam(null)} onSaveExam={handleSaveQuestions} />
      )}
      <DeleteExamModal isOpen={Boolean(deleteCandidate)} exam={deleteCandidate} onClose={() => setDeleteCandidate(null)} onConfirm={handleConfirmDelete} />
      <CloseSessionModal isOpen={Boolean(closeCandidate)} exam={closeCandidate} onClose={() => setCloseCandidate(null)} onConfirm={handleConfirmClose} />
      <ExamRecapModal isOpen={Boolean(recapCandidate)} exam={recapCandidate} onClose={() => setRecapCandidate(null)} onReopenManage={(e) => setManagingExam(e)} />
    </div>
  );
}
