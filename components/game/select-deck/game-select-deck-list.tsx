"use client";

import { Loader2, AlertCircle } from "lucide-react";
import type { Deck } from "@/types";
import { GameSelectDeckItem } from "./game-select-deck-item";

interface GameSelectDeckListProps {
  isLoading: boolean;
  decks: Deck[];
  selectedDeckId: string | null;
  onSelectDeck: (id: string) => void;
}

export function GameSelectDeckList({
  isLoading,
  decks,
  selectedDeckId,
  onSelectDeck,
}: GameSelectDeckListProps) {
  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-2">
        <Loader2 size={28} className="animate-spin text-[#451420]" />
        <p className="text-xs font-bold text-[#7A5661]">Memuat draft soal...</p>
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="py-10 text-center rounded-2xl border border-dashed border-[#DFD0D5] bg-white p-6">
        <AlertCircle size={32} className="mx-auto text-[#7A5661] mb-2 opacity-60" />
        <p className="text-sm font-bold text-[#451420]">Tidak ada deck soal yang cocok</p>
        <p className="text-xs text-[#7A5661] mt-1">
          Silakan buat deck soal baru di menu Bank Soal & Deck terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[320px] overflow-y-auto space-y-2.5 pr-1">
      {decks.map((deck) => (
        <GameSelectDeckItem
          key={deck.id}
          deck={deck}
          isSelected={selectedDeckId === deck.id}
          onSelect={onSelectDeck}
        />
      ))}
    </div>
  );
}
