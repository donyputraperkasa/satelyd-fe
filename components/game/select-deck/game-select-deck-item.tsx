"use client";

import { CheckCircle2, Layers } from "lucide-react";
import type { Deck } from "@/types";

interface GameSelectDeckItemProps {
  deck: Deck;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function GameSelectDeckItem({
  deck,
  isSelected,
  onSelect,
}: GameSelectDeckItemProps) {
  const cardCount = deck.cards ? deck.cards.length : deck.cardCount;

  return (
    <div
      onClick={() => onSelect(deck.id)}
      className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl
        border transition cursor-pointer ${
          isSelected
            ? "border-[#451420] bg-white shadow-sm ring-2 ring-[#451420]/15"
            : "border-[#E5D7DC] bg-white/70 hover:bg-white hover:border-[#C5A5B0]"
        }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center
            rounded-full border transition ${
              isSelected ? "border-[#451420] bg-[#451420] text-white" : "border-[#C5A5B0] bg-white"
            }`}
        >
          {isSelected && <CheckCircle2 size={13} className="text-white" />}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8]
                px-2 py-0.5 text-[10px] font-bold text-[#7A283C]"
            >
              {deck.subject}
            </span>
            <span
              className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC]
                px-2 py-0.5 text-[10px] font-semibold text-[#573E47]"
            >
              {deck.gradeLevel}
            </span>
          </div>
          <h4 className="text-sm font-black text-[#451420] truncate">
            {deck.title}
          </h4>
          <p className="text-[11px] text-[#7A5661] truncate mt-0.5">
            {deck.description || "Draft kuis kartu materi kelas."}
          </p>
        </div>
      </div>

      <div className="text-right shrink-0 ml-3">
        <span
          className="inline-flex items-center gap-1 text-xs font-mono
            font-black text-[#451420] bg-[#FDFBF7] px-2.5 py-1
            rounded-lg border border-[#ECDDE2]"
        >
          <Layers size={12} className="text-[#C67D00]" />
          {cardCount} Kartu
        </span>
      </div>
    </div>
  );
}
