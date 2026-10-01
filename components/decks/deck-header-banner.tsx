"use client";

import { Layers, BookOpen, Plus } from "lucide-react";
import type { DeckHeaderBannerProps } from "@/types";

export function DeckHeaderBanner({ onCreateNew, onOpenGuide }: DeckHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420] dark:text-[#F8FAFC] transition-colors">
          Pustaka Deck & Bank Soal
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] transition-colors">
          Kelola kumpulan kartu pertanyaan kuis interaktif untuk Smart TV Kelas dan paket Ujian Sekolah.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#222838] hover:border-[#451420] dark:hover:border-[#475569] transition cursor-pointer"
          title="Buka panduan lengkap pengelolaan deck"
        >
          <BookOpen size={15} className="text-[#451420] dark:text-[#CBD5E1]" />
          <span>Panduan Deck</span>
        </button>
        <button
          type="button"
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#451420] dark:bg-white text-xs font-bold text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition shadow-xs cursor-pointer"
        >
          <Plus size={16} />
          <span>Buat Deck Baru</span>
        </button>
      </div>
    </div>
  );
}
