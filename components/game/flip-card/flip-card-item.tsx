"use client";

import { CheckCircle2, ImageIcon } from "lucide-react";
import type { DeckCard } from "@/types";

interface FlipCardItemProps {
  card: DeckCard;
  index: number;
  isOpened: boolean;
  onSelect: (card: DeckCard) => void;
}

export function FlipCardItem({
  card,
  index,
  isOpened,
  onSelect,
}: FlipCardItemProps) {
  const cardNumber = String(index + 1).padStart(2, "0");

  // If card is already opened, display the revealed card showing the question!
  if (isOpened) {
    return (
      <button
        type="button"
        onClick={() => onSelect(card)}
        className="group relative flex flex-col justify-between p-5 sm:p-6
          rounded-3xl border-2 border-[#2E7D32]/50 bg-[#FAFDFB] text-left
          transition-all duration-300 select-none cursor-pointer shadow-xs
          hover:shadow-lg hover:border-[#2E7D32] hover:-translate-y-1
          min-h-[220px] sm:min-h-[260px] lg:min-h-[290px]"
        title="Kartu sudah selesai. Klik untuk melihat detail & pembahasan lagi."
      >
        {/* Top bar: Completed badge & card number */}
        <div className="w-full flex items-center justify-between pb-2 border-b border-[#C8E6C9]">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-[#EBF7EE] text-[#1D6C31] text-xs font-black border border-[#B9E5C2]"
          >
            <CheckCircle2 size={13} className="text-[#2E7D32]" />
            <span>Nomor {cardNumber} Selesai</span>
          </span>

          {card.imageUrl && (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-bold
                text-[#2E7D32] bg-[#EBF7EE] px-2 py-0.5 rounded-md"
            >
              <ImageIcon size={12} />
              <span>Gambar</span>
            </span>
          )}
        </div>

        {/* Question Text Visible on the flipped card */}
        <div className="my-auto py-2">
          <p className="text-sm sm:text-base lg:text-lg font-bold text-[#1E3B24] line-clamp-4 leading-snug">
            {card.frontQuestion}
          </p>
        </div>

        {/* Bottom bar: Answer summary */}
        <div
          className="w-full pt-2 border-t border-[#C8E6C9] flex items-center
            justify-between text-xs text-[#2E7D32] font-semibold"
        >
          <span className="truncate max-w-[180px] sm:max-w-[220px]">
            Kunci: <strong>{card.backAnswer}</strong>
          </span>
          <span className="text-[11px] underline group-hover:font-bold">
            Buka Detail
          </span>
        </div>
      </button>
    );
  }

  // If card is NOT yet opened, display ONLY the big number (Clean & Bold)!
  return (
    <button
      type="button"
      onClick={() => onSelect(card)}
      className="group relative flex flex-col items-center justify-center p-6
        rounded-3xl border-2 border-[#ECD0D8] bg-white text-center
        transition-all duration-300 select-none cursor-pointer shadow-md
        hover:shadow-2xl hover:border-[#451420] hover:-translate-y-2 active:scale-95
        min-h-[220px] sm:min-h-[260px] lg:min-h-[290px]"
    >
      {/* Big Card Number Only */}
      <div className="flex flex-col items-center justify-center">
        <span
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-black
            tracking-tight text-[#451420] transition-transform duration-300
            group-hover:scale-110 select-none"
        >
          {cardNumber}
        </span>
      </div>
    </button>
  );
}
