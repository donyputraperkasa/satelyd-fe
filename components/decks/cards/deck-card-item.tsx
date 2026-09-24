"use client";

import type { DeckCardItemProps } from "@/types";
import { DeckActionsDropdown } from "./deck-actions-dropdown";
import { DeckCardItemFooter } from "./deck-card-item-footer";
import { DeckCardMetricsStrip } from "./deck-card-metrics-strip";
import { DIFFICULTY_BADGES, getDeckSessionPin } from "../deck-constants";

export function DeckCardItem({
  deck,
  onManageCards,
  onEditDeck,
  onDeleteDeck,
  onPlayOnTv,
  onExportToExam,
}: DeckCardItemProps) {
  const sessionPin = getDeckSessionPin(deck.id, deck.pinCode);
  const cardCount = deck.cards ? deck.cards.length : deck.cardCount;
  const totalPoints = deck.cards
    ? deck.cards.reduce((sum, c) => sum + (c.points || 10), 0)
    : cardCount * 10;
  const estimatedSeconds = deck.cards
    ? deck.cards.reduce((sum, c) => sum + (c.timerSeconds || 30), 0)
    : cardCount * 30;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs hover:border-[#C5A5B0] hover:shadow-md transition-all duration-200">
      <div>
        {/* Top Badges & Dropdown Menu */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-1 text-xs font-bold text-[#7A283C]">
              {deck.subject}
            </span>
            <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2.5 py-1 text-xs font-semibold text-[#573E47]">
              {deck.gradeLevel}
            </span>
            {deck.difficulty && (
              <span className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold ${DIFFICULTY_BADGES[deck.difficulty] || DIFFICULTY_BADGES.SEDANG}`}>
                {deck.difficulty}
              </span>
            )}
          </div>

          <DeckActionsDropdown
            deck={deck}
            onEdit={onEditDeck}
            onExportToExam={onExportToExam}
            onDelete={onDeleteDeck}
          />
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="text-lg sm:text-xl font-black text-[#451420] group-hover:text-[#6E1F33] transition-colors leading-snug">
            {deck.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#7A5661] line-clamp-2 leading-relaxed">
            {deck.description || "Kumpulan kartu pertanyaan kuis interaktif untuk latihan harian dan evaluasi kelas."}
          </p>
        </div>

        {/* Middle Metrics Strip */}
        <DeckCardMetricsStrip
          cardCount={cardCount}
          estimatedSeconds={estimatedSeconds}
          totalPoints={totalPoints}
        />
      </div>

      {/* Footer Area with PIN Sesi TV & Buttons */}
      <DeckCardItemFooter
        deck={deck}
        sessionPin={sessionPin}
        onPlayOnTv={onPlayOnTv}
        onManageCards={onManageCards}
      />
    </div>
  );
}
