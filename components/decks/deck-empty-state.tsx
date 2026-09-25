"use client";

import { Layers, Plus } from "lucide-react";
import type { DeckEmptyStateProps } from "@/types";

export function DeckEmptyState({
  searchQuery,
  onResetSearch,
  onCreateNew,
}: DeckEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#ECD0D8] bg-[#FAF7F8] p-10 sm:p-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF0F3] text-[#7A283C] mb-3">
        <Layers size={28} />
      </div>
      <h3 className="text-base sm:text-lg font-black text-[#451420]">
        {searchQuery
          ? "Tidak ada deck yang sesuai pencarian"
          : "Belum ada Deck Soal"}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-[#7A5661] max-w-sm">
        {searchQuery
          ? "Coba ubah kata kunci pencarian Anda."
          : "Mulai buat deck pertama Anda untuk mengelompokkan kartu soal kuis Smart TV dan Ujian."}
      </p>

      <button
        type="button"
        onClick={() => {
          if (searchQuery) {
            onResetSearch();
          } else {
            onCreateNew();
          }
        }}
        className="mt-4 inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer"
      >
        {searchQuery ? (
          <span>Reset Pencarian</span>
        ) : (
          <>
            <Plus size={16} />
            <span>Buat Deck Sekarang</span>
          </>
        )}
      </button>
    </div>
  );
}
