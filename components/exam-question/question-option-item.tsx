"use client";

import { CheckCircle2, Trash2 } from "lucide-react";

interface QuestionOptionItemProps {
  optKey: string;
  optText: string;
  isCorrect: boolean;
  onSelectCorrect: () => void;
  onUpdateText: (val: string) => void;
  canRemove?: boolean;
  onRemove?: () => void;
}

export function QuestionOptionItem({
  optKey,
  optText,
  isCorrect,
  onSelectCorrect,
  onUpdateText,
  canRemove,
  onRemove,
}: QuestionOptionItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-xl border transition ${
        isCorrect
          ? "bg-[#F4F9F4] dark:bg-emerald-950/40 border-[#81C784] dark:border-emerald-700/60 shadow-xs"
          : "bg-white dark:bg-[#1C202C] border-[#E5D7DC] dark:border-[#282E3E] hover:border-[#DFD0D5] dark:hover:border-[#3D4559]"
      }`}
    >
      <button
        type="button"
        onClick={onSelectCorrect}
        className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-xs transition cursor-pointer shrink-0 ${
          isCorrect
            ? "bg-[#2E7D32] text-white shadow-2xs scale-105"
            : "bg-[#FAF7F2] dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E] text-[#7A5661] dark:text-[#94A3B8] hover:border-[#2E7D32] hover:text-[#2E7D32]"
        }`}
        title={`Jadikan Opsi ${optKey} sebagai Kunci Jawaban Benar`}
      >
        {optKey}
      </button>

      <input
        type="text"
        value={optText}
        onChange={(e) => onUpdateText(e.target.value)}
        placeholder={`Teks pilihan jawaban ${optKey}...`}
        className="flex-1 bg-transparent px-2 py-1 text-sm font-medium text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] placeholder:font-normal focus:outline-none"
      />

      {isCorrect && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] dark:text-emerald-400 pr-2 shrink-0">
          <CheckCircle2 size={14} />
          <span>Kunci Jawaban</span>
        </span>
      )}

      {canRemove && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 rounded-lg text-[#A48E95] dark:text-[#94A3B8] hover:text-[#B3261E] dark:hover:text-rose-400 hover:bg-[#FBEAEB] dark:hover:bg-rose-950/40 transition cursor-pointer shrink-0"
          title={`Hapus Pilihan ${optKey}`}
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
