"use client";

import { X, Award, BookOpen } from "lucide-react";
import type { Exam } from "@/types";
import { RecapMetrics } from "../exam-recap/recap-metrics";
import { RecapTable } from "../exam-recap/recap-table";
import { RecapBlockedAlert } from "../exam-recap/recap-blocked-alert";
import { useExamRecap } from "../exam-recap/use-exam-recap";

interface ExamRecapModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onReopenManage?: (exam: Exam) => void;
}

export function ExamRecapModal({
  isOpen,
  exam,
  onClose,
  onReopenManage,
}: ExamRecapModalProps) {
  const {
    studentList,
    avgScore,
    passRate,
    highestScore,
    blockedStudent,
    handleUnblock,
    handlePrintPdf,
  } = useExamRecap(isOpen, exam);

  if (!isOpen || !exam) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FDFBF7] dark:bg-[#1C202C] text-[#451420] dark:text-[#F8FAFC] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-5 py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 text-[#7A283C] dark:text-[#FBBF24] shrink-0">
              <Award size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-md bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 px-2 py-0.5 text-[11px] font-bold text-[#7A283C] dark:text-[#FBBF24]">
                  {exam.subject}
                </span>
                <span className="rounded-md bg-[#F5EFEB] dark:bg-[#1C202C] border border-[#E5D7DC] dark:border-[#282E3E] px-2 py-0.5 text-[11px] font-semibold text-[#634852] dark:text-[#94A3B8]">
                  {exam.gradeLevel}
                </span>
                <span className="font-mono text-xs font-black text-[#7A283C] dark:text-[#FBBF24] bg-[#FAF7F2] dark:bg-[#1C202C] border border-[#E5D7DC] dark:border-[#282E3E] px-2 py-0.5 rounded-md">
                  TOKEN: {exam.tokenCode}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#451420] dark:text-[#F8FAFC] truncate mt-0.5">
                Rekapitulasi Nilai: {exam.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF2F4] dark:hover:bg-[#282E3E] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          <RecapMetrics
            avgScore={avgScore}
            passRate={passRate}
            highestScore={highestScore}
            totalParticipants={studentList.length}
            passingScore={exam.passingScore || 75}
          />

          {blockedStudent && (blockedStudent.violationCount || 0) >= 3 && exam.status !== "CLOSED" && (
            <RecapBlockedAlert blockedStudent={blockedStudent} onUnblock={handleUnblock} />
          )}

          <RecapTable students={studentList} onPrintPdf={handlePrintPdf} />
        </div>

        <div className="flex items-center justify-between border-t border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-5 py-3.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] cursor-pointer"
          >
            Tutup
          </button>
          {onReopenManage && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onReopenManage(exam);
              }}
              className="h-10 px-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] dark:bg-[#C67D00] text-xs font-black text-white dark:text-[#141720] hover:bg-[#5B1C2E] dark:hover:bg-[#B37000] transition shadow-xs cursor-pointer"
            >
              <BookOpen size={14} /> Kelola & Publikasikan Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
