"use client";

import { useEffect } from "react";
import { Disc3, RotateCcw, CheckCircle2, Layers } from "lucide-react";

interface WheelsControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  activeCount: number;
  totalCount: number;
  answeredCount: number;
  eliminateOnAnswer: boolean;
  onToggleEliminate: (val: boolean) => void;
  onResetWheel: () => void;
}

export function WheelsControls({
  isSpinning,
  onSpin,
  activeCount,
  totalCount,
  answeredCount,
  eliminateOnAnswer,
  onToggleEliminate,
  onResetWheel,
}: WheelsControlsProps) {
  // Spacebar key shortcut to spin wheel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        !isSpinning &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        onSpin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpinning, onSpin]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-3 pt-1">
      {/* Info & Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#7A5661]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] font-semibold">
          <Layers size={13} className="text-[#451420]" />
          <span>
            {activeCount} dari {totalCount} soal di roda
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] font-semibold">
          <CheckCircle2 size={13} className="text-emerald-600" />
          <span>{answeredCount} telah dijawab</span>
        </div>

        {answeredCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Kembalikan semua soal yang telah dieliminasi ke dalam putaran roda?"
                )
              ) {
                onResetWheel();
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] font-bold hover:bg-[#F2DCE2] transition cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Roda</span>
          </button>
        )}
      </div>

      {/* Elimination Toggle Option */}
      <label className="flex items-center gap-2.5 text-xs font-semibold text-[#5B1C2E] cursor-pointer pt-1 selection:bg-transparent">
        <input
          type="checkbox"
          checked={eliminateOnAnswer}
          onChange={(e) => onToggleEliminate(e.target.checked)}
          className="w-4 h-4 rounded text-[#451420] focus:ring-[#451420] border-[#DFD0D5] cursor-pointer accent-[#451420]"
        />
        <span>Hilangkan nomor soal yang sudah selesai dijawab dari putaran</span>
      </label>

      {/* Keyboard & Click Hint */}
      <p className="text-[11px] text-[#7A5661]/80 font-medium pt-0.5">
        Tekan <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#DFD0D5] text-[#451420] font-bold text-[10px]">Spasi</kbd> atau klik tombol <strong className="text-[#451420]">SPIN</strong> di tengah roda untuk memutar
      </p>
    </div>
  );
}
