"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import type { DeleteDeckModalProps } from "@/types";

export function DeleteDeckModal({
  isOpen,
  deck,
  onClose,
  onConfirm,
}: DeleteDeckModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !deck) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(deck.id);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-[#F2C2C6] bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 text-[#8A1F2D] mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBEAEB] border border-[#F2C2C6]">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="text-base font-black text-[#451420]">
              Hapus Deck Materi?
            </h3>
            <p className="text-xs text-[#7A5661]">Tindakan ini tidak dapat dibatalkan</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#542B37] leading-relaxed">
          Apakah Anda yakin ingin menghapus deck{" "}
          <strong className="text-[#451420]">"{deck.title}"</strong> beserta seluruh{" "}
          <strong className="text-[#451420]">
            {deck.cards ? deck.cards.length : deck.cardCount} kartu soal
          </strong>{" "}
          di dalamnya?
        </p>

        <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-[#F0E6E9] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DFD0D5] bg-white px-4 py-2 text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F8] transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#8A1F2D] hover:bg-[#6D1823] px-4 py-2 text-xs font-bold text-white shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            <Trash2 size={14} />
            <span>{isDeleting ? "Menghapus..." : "Ya, Hapus Deck"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
