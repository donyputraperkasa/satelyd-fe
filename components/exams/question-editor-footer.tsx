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
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5D7DC] bg-white px-5 py-3.5 shrink-0">
      <button
        type="button"
        onClick={onClose}
        className="h-10 px-4 inline-flex items-center justify-center rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
      >
        Tutup
      </button>

      <div className="flex items-center gap-2.5">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] text-xs font-bold text-[#1B4D20]">
            <Lock size={13} className="text-[#2E7D32]" />
            <span className="h-2 w-2 rounded-full bg-[#2E7D32] animate-pulse" /> Ujian Live — Soal Dikunci
          </span>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onSave(false)}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-4 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
            >
              <Save size={15} /> Simpan Draf Soal
            </button>

            <button
              type="button"
              onClick={() => onSave(true)}
              className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-5 text-xs font-black text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              <Sparkles size={15} /> Publikasikan Ujian
            </button>
          </>
        )}
      </div>
    </div>
  );
}
