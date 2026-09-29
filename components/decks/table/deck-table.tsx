"use client";

import type { DeckTableProps } from "@/types";
import { DeckTableRow } from "./deck-table-row";

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
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[#451420] dark:text-[#F8FAFC] min-w-[760px]">
          <thead className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-xs font-black uppercase tracking-wider text-[#7A5661] dark:text-[#94A3B8]">
            <tr>
              <th className="py-4 px-4 w-12 text-center">No</th>
              <th className="py-4 px-6 text-left">Paket Deck & Identitas Materi</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">Jumlah Soal</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">Tingkat Kesulitan</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">Tanggal Dibuat</th>
              <th className="py-4 px-6 text-center whitespace-nowrap w-44">Aksi</th>
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
    </div>
  );
}
