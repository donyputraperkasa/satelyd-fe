"use client";

import { useState } from "react";
import type { Exam } from "@/types";
import {
  ExamHeaderBanner,
  ExamQuickActions,
  ExamCard,
  ExamTable,
  ExamEmptyState,
  ExamModalsContainer,
} from "@/components/exams";
import { useExamsPage } from "./use-exams-page";

export default function ExamsPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const {
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
    closeMonitor,
    handleCreate,
    handleSaveQuestions,
    handleConfirmDelete,
    handleConfirmClose,
    handleActionMonitor,
    handleJoinRoom,
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
        onJoinRoom={handleJoinRoom}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {filtered.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((e) => (
              <ExamCard 
                key={e.id} 
                exam={e} 
                onManage={setManagingExam} 
                onMonitor={handleActionMonitor} 
                onCloseSession={setCloseCandidate} 
                onDelete={setDeleteCandidate}
              />
            ))}
          </div>
        ) : (
          <ExamTable 
            exams={filtered} 
            onManage={setManagingExam} 
            onMonitor={handleActionMonitor} 
            onCloseSession={setCloseCandidate} 
            onDelete={setDeleteCandidate}
          />
        )
      ) : (
        <ExamEmptyState />
      )}

      <ExamModalsContainer
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        handleCreate={handleCreate}
        managingExam={managingExam}
        setManagingExam={setManagingExam}
        handleSaveQuestions={handleSaveQuestions}
        deleteCandidate={deleteCandidate}
        setDeleteCandidate={setDeleteCandidate}
        handleConfirmDelete={handleConfirmDelete}
        closeCandidate={closeCandidate}
        setCloseCandidate={setCloseCandidate}
        handleConfirmClose={handleConfirmClose}
        recapCandidate={recapCandidate}
        setRecapCandidate={setRecapCandidate}
        liveMonitorExam={liveMonitorExam}
        closeMonitor={closeMonitor}
        isGuideModalOpen={isGuideModalOpen}
        setIsGuideModalOpen={setIsGuideModalOpen}
      />
    </div>
  );
}
