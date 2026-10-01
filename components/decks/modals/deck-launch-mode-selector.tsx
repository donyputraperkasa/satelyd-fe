"use client";

import type { GameType } from "@/types";

export type { GameType };

const GAME_OPTIONS: { id: GameType; label: string }[] = [
  { id: "FLIP_CARD", label: "Flip Card Game" },
  { id: "SPIN_WHEEL", label: "Roda Acak (Wheel)" },
  { id: "MATH_BATTLE_2P", label: "Duel 2 Player" },
];

interface DeckLaunchModeSelectorProps {
  selectedGame: GameType;
  onSelectGame: (type: GameType) => void;
}

export function DeckLaunchModeSelector({
  selectedGame,
  onSelectGame,
}: DeckLaunchModeSelectorProps) {
  return (
    <div className="space-y-2 mb-4">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
        1. Pilih Jenis Permainan:
      </label>
      <div className="grid grid-cols-3 gap-2">
        {GAME_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectGame(item.id)}
            className={`h-11 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
              selectedGame === item.id
                ? "border-[#451420] dark:border-white bg-[#451420] dark:bg-white text-white dark:text-[#10131B] shadow-xs"
                : "border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F8] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-[#222838] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
