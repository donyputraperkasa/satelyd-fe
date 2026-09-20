"use client";

import { Tv } from "lucide-react";
import type { Deck } from "@/types";

interface GameSelectDeckFooterProps {
  selectedDeck: Deck | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function GameSelectDeckFooter({
  selectedDeck,
  onClose,
  onConfirm,
}: GameSelectDeckFooterProps) {
  return (
    <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#EADEE2]">
      <button
        type="button"
        onClick={onClose}
        className="h-10 inline-flex items-center justify-center px-4
          rounded-xl border border-[#DFD0D5] bg-white text-xs sm:text-sm
          font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
      >
        Batal
      </button>

      <button
        type="button"
        disabled={!selectedDeck}
        onClick={onConfirm}
        className={`h-10 inline-flex items-center justify-center gap-2 px-5
          rounded-xl text-xs sm:text-sm font-bold text-white transition
          cursor-pointer shadow-xs ${
            selectedDeck
              ? "bg-[#451420] hover:bg-[#5B1C2E]"
              : "bg-[#451420]/40 cursor-not-allowed"
          }`}
      >
        <Tv size={15} />
        <span>Mulai Game di Layar TV</span>
      </button>
    </div>
  );
}
