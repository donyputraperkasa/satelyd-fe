"use client";

import { Layers, Tv, Settings2, ChevronRight } from "lucide-react";
import type { DeckTableRowProps } from "@/types";
import { DeckActionsDropdown } from "../cards/deck-actions-dropdown";
import { DIFFICULTY_BADGES, getDeckSessionPin } from "../deck-constants";

export function DeckTableRow({
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
    <tr className="hover:bg-[#FAF7F8] transition-colors group">
      {/* Nomor */}
      <td className="py-4 px-6 text-xs font-bold text-[#7A5661]">
        {index + 1}
      </td>

      {/* Judul & Mata Pelajaran */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">
            {deck.subject}
          </span>
          <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#573E47]">
            {deck.gradeLevel}
          </span>
          <span className="font-mono text-[11px] font-black text-[#451420] bg-white border border-[#DFD0D5] px-2 py-0.5 rounded">
            PIN: {sessionPin}
          </span>
        </div>
        <h4 className="font-black text-sm text-[#451420] group-hover:text-[#6E1F33] transition-colors line-clamp-1">
          {deck.title}
        </h4>
        {deck.description && (
          <p className="text-xs text-[#7A5661] line-clamp-1 mt-0.5 max-w-md">
            {deck.description}
          </p>
        )}
      </td>

      {/* Jumlah Kartu */}
      <td className="py-4 px-4 text-center whitespace-nowrap">
        <span className="inline-flex items-center gap-1 font-bold text-xs text-[#451420] bg-[#FAF7F2] border border-[#ECDDE2] px-2.5 py-1 rounded-lg">
          <Layers size={13} className="text-[#7A283C]" />
          <span>{cardCount} Kartu</span>
        </span>
      </td>

      {/* Tingkat Kesulitan */}
      <td className="py-4 px-4 text-center whitespace-nowrap">
        {deck.difficulty ? (
          <span
            className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${
              DIFFICULTY_BADGES[deck.difficulty] || DIFFICULTY_BADGES.SEDANG
            }`}
          >
            {deck.difficulty}
          </span>
        ) : (
          <span className="text-xs text-[#9C737F]">-</span>
        )}
      </td>

      {/* Tanggal */}
      <td className="py-4 px-4 text-center whitespace-nowrap text-xs text-[#7A5661]">
        {deck.createdAt}
      </td>

      {/* Aksi */}
      <td className="py-4 px-6 text-center whitespace-nowrap">
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => onPlayOnTv(deck)}
            className="h-9 inline-flex items-center gap-1 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-2.5 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer shadow-2xs"
            title="Mulai Sesi di Smart TV"
          >
            <Tv size={13} />
            <span>Mulai Sesi TV</span>
            <ChevronRight size={13} />
          </button>

          <button
            type="button"
            onClick={() => onManageCards(deck)}
            className="h-9 inline-flex items-center gap-1 rounded-xl border border-[#DFD0D5] bg-white px-2.5 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
            title="Kelola butir kartu soal"
          >
            <Settings2 size={13} />
            <span>Kelola</span>
          </button>

          <DeckActionsDropdown
            deck={deck}
            onEdit={onEditDeck}
            onExportToExam={onExportToExam}
            onDelete={onDeleteDeck}
          />
        </div>
      </td>
    </tr>
  );
}
