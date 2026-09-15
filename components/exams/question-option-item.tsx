"use client";

import { CheckCircle2 } from "lucide-react";

interface QuestionOptionItemProps {
  optKey: string;
  optText: string;
  isCorrect: boolean;
  onSelectCorrect: () => void;
  onUpdateText: (val: string) => void;
}

export function QuestionOptionItem({
  optKey,
  optText,
  isCorrect,
  onSelectCorrect,
  onUpdateText,
}: QuestionOptionItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-xl border transition ${
        isCorrect
          ? "bg-[#F4F9F4] border-[#81C784] shadow-xs"
          : "bg-white border-[#E5D7DC] hover:border-[#DFD0D5]"
      }`}
    >
      <button
        type="button"
        onClick={onSelectCorrect}
        className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-xs transition cursor-pointer shrink-0 ${
          isCorrect
            ? "bg-[#2E7D32] text-white shadow-2xs scale-105"
            : "bg-[#FAF7F2] border border-[#DFD0D5] text-[#7A5661] hover:border-[#2E7D32] hover:text-[#2E7D32]"
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
        className="flex-1 bg-transparent px-2 py-1 text-sm font-medium text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:outline-none"
      />

      {isCorrect && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] pr-2 shrink-0">
          <CheckCircle2 size={14} />
          <span>Kunci Jawaban</span>
        </span>
      )}
    </div>
  );
}
