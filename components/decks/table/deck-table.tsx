"use client";

import type { DeckTableProps } from "@/types";
import { DeckTableRow } from "./deck-table-row";
import { DeckTableMobileCard } from "./deck-table-mobile-card";

export function DeckTable({
  decks,
  onManageCards,
  onEditDeck,
  onDeleteDeck,
  onPlayOnTv,
  onExportToExam,
}: DeckTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-xs">
      {/* 1. Desktop & Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-[#451420] dark:text-[#F8FAFC] min-w-[880px]">
          <thead className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-xs font-black uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            <tr>
              <th className="py-4 px-4 w-12 text-center">No</th>
              <th className="py-4 px-6 text-left min-w-[280px]">Paket Deck & Identitas Materi</th>
              <th className="py-4 px-4 text-center whitespace-nowrap w-32">Jumlah Soal</th>
              <th className="py-4 px-4 text-center whitespace-nowrap w-36">Tingkat Kesulitan</th>
              <th className="py-4 px-4 text-center whitespace-nowrap w-36">Tanggal Dibuat</th>
              <th className="py-4 px-6 text-center whitespace-nowrap w-56 min-w-[220px]">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5D7DC]/70 dark:divide-[#282E3E]">
            {decks.map((deck, index) => (
              <DeckTableRow
                key={deck.id}
                deck={deck}
                index={index}
                onManageCards={onManageCards}
                onEditDeck={onEditDeck}
                onDeleteDeck={onDeleteDeck}
                onPlayOnTv={onPlayOnTv}
                onExportToExam={onExportToExam}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile Responsive Card-Row View */}
      <div className="md:hidden divide-y divide-[#E5D7DC]/70 dark:divide-[#282E3E]">
        {decks.map((deck, index) => (
          <DeckTableMobileCard
            key={deck.id}
            deck={deck}
            index={index}
            onManageCards={onManageCards}
            onEditDeck={onEditDeck}
            onDeleteDeck={onDeleteDeck}
            onPlayOnTv={onPlayOnTv}
            onExportToExam={onExportToExam}
          />
        ))}
      </div>
    </div>
  );
}
