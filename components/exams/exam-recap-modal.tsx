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
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-[#451420]/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] text-[#451420] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5D7DC] bg-white px-5 py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
              <Award size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">
                  {exam.subject}
                </span>
                <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#634852]">
                  {exam.gradeLevel}
                </span>
                <span className="font-mono text-xs font-black text-[#7A283C] bg-[#FAF7F2] border border-[#E5D7DC] px-2 py-0.5 rounded-md">
                  TOKEN: {exam.tokenCode}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#451420] truncate mt-0.5">
                Rekapitulasi Nilai: {exam.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#7A5661] hover:bg-[#FAF2F4] hover:text-[#451420] transition cursor-pointer"
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

        <div className="flex items-center justify-between border-t border-[#E5D7DC] bg-white px-5 py-3.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-5 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] cursor-pointer"
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
              className="h-10 px-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] text-xs font-black text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer"
            >
              <BookOpen size={14} /> Kelola & Publikasikan Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
