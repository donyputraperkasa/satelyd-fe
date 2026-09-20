"use client";

import { Clock, Play, Pause, RotateCcw, X, Sparkles } from "lucide-react";

interface FlipCardModalHeaderProps {
  cardNumber: number;
  points: number;
  questionType?: string;
  seconds: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onClose: () => void;
}

export function FlipCardModalHeader({
  cardNumber,
  points,
  questionType,
  seconds,
  isRunning,
  onToggleTimer,
  onResetTimer,
  onClose,
}: FlipCardModalHeaderProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 px-6 py-4
        bg-[#FAF7F2] border-b border-[#E5D7DC] shrink-0"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-2xl
            bg-[#451420] text-white font-black text-sm shadow-xs"
        >
          {String(cardNumber).padStart(2, "0")}
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#451420]">
              Kartu Soal #{cardNumber}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                bg-[#FFF8E6] border border-[#F2DEB0] text-[11px] font-bold text-[#9A6200]"
            >
              <Sparkles size={11} className="text-[#C67D00]" />
              <span>+{points} Poin</span>
            </span>
          </div>
          <p className="text-[11px] text-[#7A5661]">
            {questionType === "ESSAY" ? "Format Uraian / Essay" : "Format Pilihan Ganda"}
          </p>
        </div>
      </div>

      {/* Timer & Close */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-2xl bg-white border border-[#DFD0D5] px-3 py-1.5 shadow-2xs">
          <Clock size={16} className={seconds <= 5 && isRunning ? "text-[#E53E3E] animate-pulse" : "text-[#451420]"} />
          <span className={`font-mono font-black text-sm ${seconds <= 5 ? "text-[#E53E3E]" : "text-[#451420]"}`}>
            {formatTime(seconds)}
          </span>
          <button
            type="button"
            onClick={onToggleTimer}
            className={`h-7 w-7 inline-flex items-center justify-center rounded-lg transition cursor-pointer ${
              isRunning ? "bg-[#FFF8E6] text-[#9A6200] hover:bg-[#FCEFD0]" : "bg-[#451420] text-white hover:bg-[#5B1C2E]"
            }`}
            title={isRunning ? "Jeda Timer" : "Mulai Timer"}
          >
            {isRunning ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={onResetTimer}
            className="h-7 w-7 inline-flex items-center justify-center rounded-lg bg-[#FAF7F8] hover:bg-[#F0E6E9] text-[#7A5661] hover:text-[#451420] transition cursor-pointer"
            title="Reset Waktu"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-[#7A5661] hover:text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
          title="Tutup Kartu"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
