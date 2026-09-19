"use client";

import { useState } from "react";
import {
  Layers,
  Tv,
  Settings2,
  ChevronRight,
  MoreVertical,
  Edit2,
  Trash2,
  GraduationCap,
} from "lucide-react";
import type { Deck } from "@/types";

interface DeckTableRowProps {
  deck: Deck;
  index: number;
  onManageCards: (deck: Deck) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deck: Deck) => void;
  onPlayOnTv: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
}

export function DeckTableRow({
  deck,
  index,
  onManageCards,
  onEditDeck,
  onDeleteDeck,
  onPlayOnTv,
  onExportToExam,
}: DeckTableRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const cardCount = deck.cards ? deck.cards.length : deck.cardCount;

  const difficultyBadges = {
    MUDAH: "bg-[#EDF7ED] border-[#C8E6C9] text-[#2E7D32]",
    SEDANG: "bg-amber-50 border-amber-200 text-amber-800",
    SULIT: "bg-rose-50 border-rose-200 text-rose-800",
    CAMPURAN: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <tr className="hover:bg-[#FAF7F2]/60 transition-colors group">
      {/* No */}
      <td className="py-4 px-4 text-center font-bold text-xs text-[#7A5661]">
        {index + 1}
      </td>

      {/* Judul Deck & Identitas */}
      <td className="py-4 px-6 text-left">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="rounded-md bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[11px] font-bold text-[#7A283C]">
            {deck.subject}
          </span>
          <span className="rounded-md bg-[#F5EFEB] border border-[#E5D7DC] px-2 py-0.5 text-[11px] font-semibold text-[#634852]">
            {deck.gradeLevel}
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
              difficultyBadges[deck.difficulty] || difficultyBadges.SEDANG
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

          {/* More Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-xl text-[#7A5661] hover:text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
            >
              <MoreVertical size={15} />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-9 z-30 w-48 rounded-2xl border border-[#E5D7DC] bg-white py-1.5 shadow-xl text-left">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEditDeck(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Edit Informasi Deck</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onExportToExam(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1B4D20] hover:bg-[#F0FDF4] transition cursor-pointer"
                  >
                    <GraduationCap size={13} />
                    <span>Jadikan Ujian Siswa</span>
                  </button>
                  <div className="my-1 border-t border-[#F0E6E9]" />
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDeleteDeck(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#8A1F2D] hover:bg-[#FBEAEB] transition cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Hapus Deck</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
