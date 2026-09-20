"use client";

import { Eye, CheckCircle2 } from "lucide-react";
import type { DeckCard } from "@/types";

interface FlipCardAnswerPanelProps {
  card: DeckCard;
  isAnswerRevealed: boolean;
  onRevealAnswer: () => void;
}

export function FlipCardAnswerPanel({
  card,
  isAnswerRevealed,
  onRevealAnswer,
}: FlipCardAnswerPanelProps) {
  return (
    <div className="pt-4 border-t border-[#E5D7DC]">
      {!isAnswerRevealed ? (
        <div className="text-center py-4">
          <button
            type="button"
            onClick={onRevealAnswer}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl
              bg-[#C67D00] hover:bg-[#A86A00] text-white text-sm sm:text-base
              font-black shadow-md transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye size={18} />
            <span>Buka Kunci Jawaban & Pembahasan</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-[#2E7D32]/40 bg-[#FAFDFB] p-5 sm:p-6 space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 text-[#2E7D32]">
            <CheckCircle2 size={20} />
            <span className="font-black text-sm sm:text-base uppercase tracking-wider">
              Kunci Jawaban Resmi:
            </span>
          </div>

          <div className="text-lg sm:text-xl font-black text-[#1B4D20] pl-1">
            {card.backAnswer}
          </div>

          {card.explanation && (
            <div className="pt-3 border-t border-[#C8E6C9] space-y-1">
              <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                Langkah & Pembahasan Rumus:
              </span>
              <p className="text-sm sm:text-base text-[#1E3B24] leading-relaxed">
                {card.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
