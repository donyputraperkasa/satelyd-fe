"use client";

import { Gamepad2, BookOpen } from "lucide-react";

interface GameHeaderBannerProps {
  onOpenGuide: () => void;
}

export function GameHeaderBanner({ onOpenGuide }: GameHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div
          className="inline-flex items-center gap-1.5 rounded-full border
            border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold
            text-[#7A283C]"
        >
          <Gamepad2 size={13} />
          <span>Mode Game Smart TV Kelas</span>
        </div>
        <h1
          className="mt-2 text-2xl sm:text-3xl font-black tracking-tight
            text-[#451420]"
        >
          Pilihan Game Interaktif TV Kelas
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
          Pilih jenis interaksi kuis kelas untuk ditampilkan di proyektor atau
          Smart TV kelas.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl
            border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420]
            shadow-2xs hover:bg-[#FAF7F2] hover:border-[#451420] transition
            cursor-pointer"
          title="Buka petunjuk lengkap penggunaan game interaktif kelas"
        >
          <BookOpen size={15} className="text-[#C67D00]" />
          <span>Panduan Game</span>
        </button>
      </div>
    </div>
  );
}
