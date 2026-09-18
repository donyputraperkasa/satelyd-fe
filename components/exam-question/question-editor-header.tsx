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
    <div className="flex items-center justify-between border-b border-[#E5D7DC] bg-white px-5 py-3.5 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
          <BookOpen size={20} />
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
          <h2 className="text-base sm:text-lg font-black text-[#451420] truncate mt-0.5">{exam.title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-3">
        {isSavedToast && (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] bg-[#EDF7ED] border border-[#C8E6C9] px-2.5 py-1 rounded-lg">
            <CheckCircle2 size={14} /> Tersimpan!
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-[#7A5661] hover:bg-[#FAF2F4] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
