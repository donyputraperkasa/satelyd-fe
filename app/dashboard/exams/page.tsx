"use client";

import { CheckCircle2 } from "lucide-react";
import type { Exam } from "@/types";
import {
  ExamHeaderBanner,
  ExamStats,
  ExamQuickActions,
  ExamCard,
  ExamTable,
  ExamEmptyState,
  ExamCreateModal,
  ExamQuestionEditorModal,
  DeleteExamModal,
  CloseSessionModal,
  ExamRecapModal,
  ExamLiveMonitorModal,
} from "@/components/exams";
import { useExamsPage } from "./use-exams-page";

export default function ExamsPage() {
  const {
    exams,
    filtered,
    counts,
    toast,
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
    handleSaveQuestions,
    handleConfirmDelete,
    handleConfirmClose,
    handleActionMonitor,
  } = useExamsPage();

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
        onJoinRoom={(code) => {
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
        }}
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
      <ExamRecapModal key={recapCandidate?.id || "recap"} isOpen={Boolean(recapCandidate)} exam={recapCandidate} onClose={() => setRecapCandidate(null)} onReopenManage={(e) => setManagingExam(e)} />
      <ExamLiveMonitorModal isOpen={Boolean(liveMonitorExam)} exam={liveMonitorExam} onClose={closeMonitor} onCloseSession={setCloseCandidate} />
    </div>
  );
}
