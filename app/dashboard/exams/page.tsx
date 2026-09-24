"use client";

import { useState } from "react";
import type { Exam } from "@/types";
import {
  ExamHeaderBanner,
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
import { GuideModal } from "@/components/guides";
import { useExamsPage } from "./use-exams-page";

export default function ExamsPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const {
    exams,
    filtered,
    counts,
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

      <ExamHeaderBanner
        onCreateNew={() => setIsCreateModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

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
      <GuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} type="EXAMS" />
    </div>
  );
}
