"use client";

import { Layers, CheckCircle2, X } from "lucide-react";
import type { CardEditorHeaderProps } from "@/types";

export function CardEditorHeader({
  title,
  subject,
  gradeLevel,
  sessionPin,
  isSavedToast,
  onClose,
}: CardEditorHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E5D7DC] bg-white px-5 sm:px-6 py-4 shrink-0">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
          <Layers size={20} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-[#451420] truncate tracking-tight">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-xs text-[#7A5661] font-medium mt-0.5 flex-wrap">
            <span className="font-semibold text-[#5B1C2E]">{subject}</span>
            <span className="text-[#C5A5B0]">•</span>
            <span>{gradeLevel}</span>
            <span className="text-[#C5A5B0]">•</span>
            <span className="font-mono font-bold text-[#451420]">
              Token: {sessionPin}
            </span>
          </div>
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
          title="Tutup Modal"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
