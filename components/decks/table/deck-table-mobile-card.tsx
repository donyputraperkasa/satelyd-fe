"use client";

import { Layers, Tv, Settings2, ChevronRight } from "lucide-react";
import type { DeckTableRowProps } from "@/types";
import { DeckActionsDropdown } from "../cards/deck-actions-dropdown";
import { DIFFICULTY_BADGES, getDeckSessionPin, formatDeckDate } from "../deck-constants";

export function DeckTableMobileCard({
  deck,
  index,
  onManageCards,
  onEditDeck,
  onDeleteDeck,
  onPlayOnTv,
  onExportToExam,
}: DeckTableRowProps) {
  const cardCount = deck.cards ? deck.cards.length : deck.cardCount;
  const sessionPin = getDeckSessionPin(deck.id, deck.pinCode);

  return (
    <div className="p-4 space-y-3 bg-white dark:bg-[#1C202C]">
      {/* Top badges + Index & Dropdown */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          <span className="font-mono text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] mr-1">
            #{index + 1}
          </span>
          <span className="inline-flex items-center whitespace-nowrap rounded-md bg-[#FAF0F3] dark:bg-[#252B39] border border-[#ECD0D8] dark:border-[#394253] px-2 py-0.5 text-[11px] font-bold text-[#7A283C] dark:text-[#F8FAFC]">
            {deck.subject}
          </span>
          <span className="inline-flex items-center whitespace-nowrap rounded-md bg-[#F5EFEB] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] px-2 py-0.5 text-[11px] font-semibold text-[#573E47] dark:text-[#94A3B8]">
            {deck.gradeLevel}
          </span>
          {deck.difficulty && (
            <span
              className={`inline-block rounded-lg border px-2 py-0.5 text-[10px] font-bold ${
                DIFFICULTY_BADGES[deck.difficulty] || DIFFICULTY_BADGES.SEDANG
              }`}
            >
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
      <div>
        <h4 className="font-black text-sm text-[#451420] dark:text-[#F8FAFC] leading-snug">
          {deck.title}
        </h4>
        {deck.description && (
          <p className="mt-1 text-xs text-[#7A5661] dark:text-[#94A3B8] line-clamp-2">
            {deck.description}
          </p>
        )}
      </div>

      {/* Info Strip */}
      <div className="flex items-center justify-between gap-2 py-2 px-3 rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#ECDDE2] dark:border-[#282E3E] text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#451420] dark:text-[#F8FAFC]">
          <Layers size={13} className="text-[#7A283C] dark:text-[#C67D00]" />
          <span>{cardCount} Kartu</span>
        </div>

        <div className="flex items-center gap-1 font-mono font-bold text-[11px] text-[#451420] dark:text-[#F8FAFC]">
          <span className="text-[#7A5661] dark:text-[#94A3B8]">PIN:</span>
          <span>{sessionPin}</span>
        </div>

        <div className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
          {formatDeckDate(deck.createdAt)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          type="button"
          onClick={() => onPlayOnTv(deck)}
          className="h-9 inline-flex items-center justify-center gap-1 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] px-2.5 text-xs font-bold transition cursor-pointer shadow-2xs"
        >
          <Tv size={13} />
          <span>Mulai TV</span>
          <ChevronRight size={13} />
        </button>

        <button
          type="button"
          onClick={() => onManageCards(deck)}
          className="h-9 inline-flex items-center justify-center gap-1 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-2.5 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF7F2] dark:hover:bg-[#222838] transition cursor-pointer shadow-2xs"
        >
          <Settings2 size={13} />
          <span>Kelola Soal</span>
        </button>
      </div>
    </div>
  );
}
