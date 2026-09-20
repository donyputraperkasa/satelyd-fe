"use client";

import { X, Sparkles } from "lucide-react";
import type { GameType } from "@/types";
import { GAME_METADATA } from "./game-select-deck-constants";

interface GameSelectDeckHeaderProps {
  gameType: GameType;
  onClose: () => void;
}

export function GameSelectDeckHeader({
  gameType,
  onClose,
}: GameSelectDeckHeaderProps) {
  const meta = GAME_METADATA[gameType] || GAME_METADATA.FLIP_CARD;
  const GameIcon = meta.icon;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EADEE2] pb-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl
            bg-[#FAF0F3] text-[#451420] border border-[#ECD0D8] shadow-2xs"
        >
          <GameIcon size={22} className="text-[#451420]" />
        </div>
        <div>
          <div
            className="inline-flex items-center gap-1.5 rounded-md bg-[#FAF0F3]
              px-2 py-0.5 text-[11px] font-bold text-[#7A283C] mb-1"
          >
            <Sparkles size={11} />
            <span>{meta.badge}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#451420]">
            Pilih Draft Soal untuk {meta.title}
          </h2>
          <p className="text-xs text-[#7A5661] mt-0.5">{meta.subtitle}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-xl
          text-[#7A5661] transition hover:bg-[#F5EDF0] hover:text-[#451420] cursor-pointer"
        title="Tutup"
      >
        <X size={18} />
      </button>
    </div>
  );
}
