"use client";

import { Gamepad2, BookOpen } from "lucide-react";

interface GameHeaderBannerProps {
  onOpenGuide: () => void;
}

export function GameHeaderBanner({ onOpenGuide }: GameHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1
          className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420] dark:text-[#F8FAFC] transition-colors"
        >
          Pilihan Game Interaktif TV Kelas
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] transition-colors">
          Pilih jenis interaksi kuis kelas untuk ditampilkan di proyektor atau
          Smart TV kelas.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#222838] hover:border-[#451420] dark:hover:border-[#475569] transition cursor-pointer"
          title="Buka petunjuk lengkap penggunaan game interaktif kelas"
        >
          <BookOpen size={15} className="text-[#451420] dark:text-[#CBD5E1]" />
          <span>Panduan Game</span>
        </button>
      </div>
    </div>
  );
}
