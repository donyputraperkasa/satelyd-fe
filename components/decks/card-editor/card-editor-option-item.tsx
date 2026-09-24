"use client";

import { CheckCircle2, Trash2 } from "lucide-react";
import type { DeckCardOption } from "@/types";

interface CardEditorOptionItemProps {
  opt: DeckCardOption;
  isCorrect: boolean;
  canRemove: boolean;
  onSelectCorrect: () => void;
  onUpdateText: (text: string) => void;
  onRemove: () => void;
}

export function CardEditorOptionItem({
  opt,
  isCorrect,
  canRemove,
  onSelectCorrect,
  onUpdateText,
  onRemove,
}: CardEditorOptionItemProps) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border p-2 transition ${
        isCorrect
          ? "border-[#2E7D32] bg-[#F0FDF4] shadow-2xs"
          : "border-[#E5D7DC] bg-white hover:border-[#DFD0D5]"
      }`}
    >
      <button
        type="button"
        onClick={onSelectCorrect}
        className={`h-7 w-7 rounded-lg text-xs font-black flex items-center justify-center cursor-pointer transition shrink-0 ${
          isCorrect
            ? "bg-[#2E7D32] text-white"
            : "bg-[#FAF7F2] text-[#7A5661] border border-[#E5D7DC] hover:border-[#2E7D32]"
        }`}
        title="Klik untuk jadikan kunci jawaban"
      >
        {opt.key}
      </button>

      <input
        type="text"
        value={opt.text}
        onChange={(e) => onUpdateText(e.target.value)}
        placeholder={`Teks pilihan jawaban ${opt.key}...`}
        className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] focus:outline-none"
      />

      {isCorrect && (
        <span className="flex items-center gap-1 pr-2 text-xs font-bold text-[#2E7D32] shrink-0">
          <CheckCircle2 size={14} /> Kunci Jawaban
        </span>
      )}

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 rounded-lg text-[#A48E95] hover:text-[#B3261E] hover:bg-[#FBEAEB] transition cursor-pointer shrink-0"
          title={`Hapus Pilihan ${opt.key}`}
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
