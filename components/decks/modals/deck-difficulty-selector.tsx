"use client";

import type { DeckDifficulty } from "@/types";

interface DeckDifficultySelectorProps {
  difficulty: DeckDifficulty;
  setDifficulty: (val: DeckDifficulty) => void;
}

const DIFFICULTIES: DeckDifficulty[] = ["MUDAH", "SEDANG", "SULIT", "CAMPURAN"];

export function DeckDifficultySelector({ difficulty, setDifficulty }: DeckDifficultySelectorProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
        Tingkat Kesulitan Materi
      </label>
      <div className="grid grid-cols-4 gap-2">
        {DIFFICULTIES.map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => setDifficulty(lvl)}
            className={`rounded-xl py-2 text-xs font-bold transition cursor-pointer ${
              difficulty === lvl
                ? "bg-[#451420] text-white shadow-xs"
                : "bg-[#FAF7F8] border border-[#E2D5D9] text-[#7A5661] hover:border-[#451420]"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
}
