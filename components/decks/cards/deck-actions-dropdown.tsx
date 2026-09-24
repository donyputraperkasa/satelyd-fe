"use client";

import { useState } from "react";
import { MoreVertical, Edit2, GraduationCap, Trash2 } from "lucide-react";
import type { Deck } from "@/types";

interface DeckActionsDropdownProps {
  deck: Deck;
  onEdit: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
  onDelete: (deck: Deck) => void;
}

export function DeckActionsDropdown({
  deck,
  onEdit,
  onExportToExam,
  onDelete,
}: DeckActionsDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowMenu(!showMenu)}
        className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-[#9C737F] hover:text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
        title="Opsi Deck"
      >
        <MoreVertical size={16} />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-8 z-30 w-48 rounded-2xl border border-[#E5D7DC] bg-white py-1.5 shadow-xl">
            <button
              onClick={() => {
                setShowMenu(false);
                onEdit(deck);
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
                onDelete(deck);
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
  );
}
