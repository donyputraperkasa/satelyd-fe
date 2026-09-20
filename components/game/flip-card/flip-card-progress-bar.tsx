"use client";

import { Layers, RotateCcw } from "lucide-react";

interface FlipCardProgressBarProps {
  openedCount: number;
  totalCards: number;
  onResetCards: () => void;
}

export function FlipCardProgressBar({
  openedCount,
  totalCards,
  onResetCards,
}: FlipCardProgressBarProps) {
  const percent = totalCards > 0 ? (openedCount / totalCards) * 100 : 0;

  return (
    <div
      className="h-14 sm:h-16 px-5 sm:px-6 rounded-2xl sm:rounded-3xl
        bg-white border border-[#DFD0D5] flex items-center justify-between shadow-xs"
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <Layers size={18} className="text-[#C67D00]" />
        <span className="text-xs sm:text-sm font-bold text-[#451420]">
          Pustaka Kartu Soal ({openedCount} dari {totalCards} Selesai)
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Progress Bar */}
        <div className="w-28 sm:w-56 h-3 rounded-full bg-[#FAF0F3] border border-[#ECD0D8] overflow-hidden">
          <div
            className="h-full bg-[#451420] rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Reset Opened Cards Button */}
        {openedCount > 0 && (
          <button
            type="button"
            onClick={onResetCards}
            className="inline-flex items-center gap-1.5 px-3 py-1.5
              rounded-xl border border-[#DFD0D5] bg-[#FAF7F8]
              hover:bg-[#F0E6E9] text-[11px] font-bold text-[#7A5661]
              hover:text-[#451420] transition cursor-pointer shadow-2xs"
            title="Buka kembali semua kartu"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset Kartu</span>
          </button>
        )}
      </div>
    </div>
  );
}
