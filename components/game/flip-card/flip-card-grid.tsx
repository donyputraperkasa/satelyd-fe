"use client";

import type { DeckCard } from "@/types";
import { FlipCardItem } from "./flip-card-item";

interface FlipCardGridProps {
  cards: DeckCard[];
  openedCardIds: string[];
  onSelectCard: (card: DeckCard, index: number) => void;
}

export function FlipCardGrid({
  cards,
  openedCardIds,
  onSelectCard,
}: FlipCardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#E5D7DC] p-8">
        <h3 className="text-lg font-black text-[#451420]">
          Belum Ada Kartu Soal di Deck Ini
        </h3>
        <p className="text-xs text-[#7A5661] mt-1">
          Tambahkan butir soal terlebih dahulu di menu Kelola Soal untuk memainkannya di TV.
        </p>
      </div>
    );
  }

  // Determine grid columns dynamically based on card count
  const getGridCols = () => {
    if (cards.length <= 6) {
      return "grid-cols-2 sm:grid-cols-3";
    }
    if (cards.length <= 12) {
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
    }
    return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
  };

  return (
    <div className={`grid ${getGridCols()} gap-3.5 sm:gap-5`}>
      {cards.map((card, idx) => {
        const isOpened = openedCardIds.includes(card.id);

        return (
          <FlipCardItem
            key={card.id || `card-${idx}`}
            card={card}
            index={idx}
            isOpened={isOpened}
            onSelect={() => onSelectCard(card, idx)}
          />
        );
      })}
    </div>
  );
}
