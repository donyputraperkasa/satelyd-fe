"use client";

import type { Exam } from "@/types";
import {
  ExamCreateModal,
  ExamQuestionEditorModal,
  DeleteExamModal,
  CloseSessionModal,
  ExamRecapModal,
  ExamLiveMonitorModal,
} from "@/components/exams";
import { GuideModal } from "@/components/guides";

interface ExamModalsContainerProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  handleCreate: (newExam: Exam) => void;
  managingExam: Exam | null;
  setManagingExam: (exam: Exam | null) => void;
  handleSaveQuestions: (updated: Exam) => void;
  deleteCandidate: Exam | null;
  setDeleteCandidate: (exam: Exam | null) => void;
  handleConfirmDelete: (exam: Exam) => void;
  closeCandidate: Exam | null;
  setCloseCandidate: (exam: Exam | null) => void;
  handleConfirmClose: (exam: Exam) => void;
  recapCandidate: Exam | null;
  setRecapCandidate: (exam: Exam | null) => void;
  liveMonitorExam: Exam | null;
  closeMonitor: () => void;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (open: boolean) => void;
}

export function ExamModalsContainer({
  isCreateModalOpen,
  setIsCreateModalOpen,
  handleCreate,
  managingExam,
  setManagingExam,
  handleSaveQuestions,
  deleteCandidate,
  setDeleteCandidate,
  handleConfirmDelete,
  closeCandidate,
  setCloseCandidate,
  handleConfirmClose,
  recapCandidate,
  setRecapCandidate,
  liveMonitorExam,
  closeMonitor,
  isGuideModalOpen,
  setIsGuideModalOpen,
}: ExamModalsContainerProps) {
  return (
    <>
      <ExamCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreate}
      />
      {managingExam && (
        <ExamQuestionEditorModal
          key={managingExam.id}
          isOpen={Boolean(managingExam)}
          exam={managingExam}
          onClose={() => setManagingExam(null)}
          onSaveExam={handleSaveQuestions}
        />
      )}
      <DeleteExamModal
        isOpen={Boolean(deleteCandidate)}
        exam={deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={handleConfirmDelete}
      />
      <CloseSessionModal
        isOpen={Boolean(closeCandidate)}
        exam={closeCandidate}
        onClose={() => setCloseCandidate(null)}
        onConfirm={handleConfirmClose}
      />
      <ExamRecapModal
        key={recapCandidate?.id || "recap"}
        isOpen={Boolean(recapCandidate)}
        exam={recapCandidate}
        onClose={() => setRecapCandidate(null)}
        onReopenManage={(e) => setManagingExam(e)}
      />
      <ExamLiveMonitorModal
        isOpen={Boolean(liveMonitorExam)}
        exam={liveMonitorExam}
        onClose={closeMonitor}
        onCloseSession={setCloseCandidate}
      />
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        type="EXAMS"
      />
    </>
  );
}
