"use client";

import { Volume2, VolumeX, Maximize2, Minimize2, LogOut } from "lucide-react";

interface GameHeaderControlsProps {
  isSoundMuted: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenConfirmExit: () => void;
}

export function GameHeaderControls({
  isSoundMuted,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  onOpenConfirmExit,
}: GameHeaderControlsProps) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Sound Toggle */}
      <button
        type="button"
        onClick={onToggleSound}
        className={`h-9 w-9 inline-flex items-center justify-center
          rounded-xl border transition cursor-pointer ${
            isSoundMuted
              ? "border-[#DFD0D5] bg-white text-[#8E6C75] hover:bg-[#FAF7F2]"
              : "border-[#C67D00]/40 bg-[#FFF8E6] text-[#9A6200] hover:bg-[#FFF2D1]"
          }`}
        title={isSoundMuted ? "Aktifkan Suara" : "Bisukan Suara"}
      >
        {isSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Fullscreen Toggle */}
      <button
        type="button"
        onClick={onToggleFullscreen}
        className="h-9 w-9 inline-flex items-center justify-center
          rounded-xl border border-[#DFD0D5] bg-white text-[#451420]
          hover:bg-[#FAF7F2] transition cursor-pointer shrink-0"
        title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Full Screen)"}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>

      {/* End Session Button */}
      <button
        type="button"
        onClick={onOpenConfirmExit}
        className="h-9 inline-flex items-center gap-1.5 px-3 rounded-xl
          border border-[#DFD0D5] bg-white hover:bg-[#FBEAEB]
          hover:border-[#F2C2C6] text-[#7A283C] hover:text-[#B3261E]
          text-xs font-bold transition cursor-pointer shrink-0"
        title="Akhiri sesi permainan"
      >
        <LogOut size={14} />
        <span className="hidden sm:inline">Akhiri Sesi</span>
      </button>
    </div>
  );
}
