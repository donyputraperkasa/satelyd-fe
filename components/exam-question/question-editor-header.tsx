"use client";

import { X, BookOpen, CheckCircle2 } from "lucide-react";
import type { Exam } from "@/types";

interface QuestionEditorHeaderProps {
  exam: Exam;
  isSavedToast: boolean;
  onClose: () => void;
}

export function QuestionEditorHeader({ exam, isSavedToast, onClose }: QuestionEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-5 sm:px-6 py-4 shrink-0">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FAF0F3] dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] text-[#7A283C] dark:text-[#FBBF24] shrink-0">
          <BookOpen size={20} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-[#451420] dark:text-[#F8FAFC] truncate tracking-tight">
            {exam.title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-[#7A5661] dark:text-[#94A3B8] font-medium mt-0.5 flex-wrap">
            <span className="font-semibold text-[#5B1C2E] dark:text-[#FBBF24]">{exam.subject}</span>
            <span className="text-[#C5A5B0] dark:text-[#64748B]">•</span>
            <span>{exam.gradeLevel}</span>
            <span className="text-[#C5A5B0] dark:text-[#64748B]">•</span>
            <span className="font-mono font-bold text-[#451420] dark:text-[#F8FAFC]">
              Token: {exam.tokenCode}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        {isSavedToast && (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] dark:text-emerald-400 bg-[#EDF7ED] dark:bg-emerald-950/60 border border-[#C8E6C9] dark:border-emerald-800/60 px-2.5 py-1 rounded-lg">
            <CheckCircle2 size={14} /> Tersimpan!
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF2F4] dark:hover:bg-[#282E3E] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
