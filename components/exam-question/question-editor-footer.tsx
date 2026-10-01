"use client";

import { Save, Sparkles, Lock } from "lucide-react";
import type { ExamStatus } from "@/types";

interface QuestionEditorFooterProps {
  examStatus: ExamStatus;
  onClose: () => void;
  onSave: (publish: boolean) => void;
}

export function QuestionEditorFooter({ examStatus, onClose, onSave }: QuestionEditorFooterProps) {
  const isLive = examStatus === "PUBLISHED";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-5 py-3.5 shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition cursor-pointer"
      >
        Tutup
      </button>

      <div className="flex items-center gap-2.5">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDF7ED] dark:bg-emerald-950/60 border border-[#C8E6C9] dark:border-emerald-800/60 text-xs font-bold text-[#1B4D20] dark:text-emerald-300">
            <Lock size={13} className="text-[#2E7D32] dark:text-emerald-400" />
            <span className="h-2 w-2 rounded-full bg-[#2E7D32] dark:bg-emerald-400 animate-pulse" /> Ujian Live — Soal Dikunci
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onSave(false)}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition cursor-pointer shadow-2xs"
            >
              <Save size={15} /> Simpan Draf Soal
            </button>

            <button
              type="button"
              onClick={() => onSave(true)}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] dark:bg-white px-5 text-xs font-black text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition cursor-pointer shadow-xs"
            >
              <Sparkles size={15} /> Publikasikan Ujian
            </button>
          </>
        )}
      </div>
    </div>
  );
}
