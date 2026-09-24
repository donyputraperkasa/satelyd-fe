"use client";

import { useState } from "react";
import { Tv, Settings2, ChevronRight, Copy, Check } from "lucide-react";
import type { Deck } from "@/types";

interface DeckCardItemFooterProps {
  deck: Deck;
  sessionPin: string;
  onPlayOnTv: (deck: Deck) => void;
  onManageCards: (deck: Deck) => void;
}

export function DeckCardItemFooter({
  deck,
  sessionPin,
  onPlayOnTv,
  onManageCards,
}: DeckCardItemFooterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(sessionPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-6 pt-4 border-t border-[#E5D7DC] space-y-2.5">
      {/* PIN Sesi Smart TV */}
      <div className="flex items-center justify-between rounded-xl border border-[#ECDDE2] bg-[#FAF7F2] px-3.5 py-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#7A5661]">
            PIN SESI TV:
          </span>
          <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#451420]">
            {sessionPin}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8F6672] bg-white px-2 py-0.5 rounded border border-[#DFD0D5]">
            {deck.createdAt}
          </span>
          <button
            type="button"
            onClick={handleCopyPin}
            className="h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-xs font-bold text-[#7A283C] bg-white border border-[#E5D7DC] hover:border-[#7A283C] hover:bg-[#FAF0F3] transition cursor-pointer shadow-2xs"
            title="Salin PIN Sesi TV"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#2E7D32]" />
                <span className="text-[#2E7D32]">Tersalin</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onPlayOnTv(deck)}
          className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer shadow-2xs"
        >
          <Tv size={14} />
          <span>Mulai Sesi TV</span>
          <ChevronRight size={14} />
        </button>

        <button
          type="button"
          onClick={() => onManageCards(deck)}
          className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
        >
          <Settings2 size={14} />
          <span>Kelola Soal</span>
        </button>
      </div>
    </div>
  );
}
