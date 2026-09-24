"use client";

import { CheckCircle2 } from "lucide-react";
import type { DeckCard } from "@/types";

interface DeckFlipCardAnswerProps {
  card: DeckCard;
}

export function DeckFlipCardAnswer({ card }: DeckFlipCardAnswerProps) {
  return (
    <div className="rounded-xl border border-[#C8E6C9] bg-[#F0FDF4] p-3 text-xs animate-in fade-in duration-200 space-y-2">
      <div className="flex items-center gap-1.5 text-[#1D6C31] font-bold">
        <CheckCircle2 size={13} />
        <span>Kunci Jawaban: {card.backAnswer || "Belum ada kunci"}</span>
      </div>

      {card.answerImageUrl && (
        <div className="rounded-lg border border-[#C8E6C9] overflow-hidden max-h-32 bg-white">
          <img
            src={card.answerImageUrl}
            alt="Lampiran Kunci Jawaban"
            className="w-full h-auto max-h-32 object-contain mx-auto"
          />
        </div>
      )}

      {card.explanation && (
        <p className="text-[#2A4433] text-[11px] leading-relaxed border-t border-[#C8E6C9]/60 pt-1.5">
          {card.explanation}
        </p>
      )}
    </div>
  );
}
