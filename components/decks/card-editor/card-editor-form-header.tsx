"use client";

import { Clock, Award, Trash2 } from "lucide-react";

interface CardEditorFormHeaderProps {
  cardIndex: number;
  totalCards: number;
  timerSeconds?: number;
  points?: number;
  onUpdateTimer: (val: number) => void;
  onUpdatePoints: (val: number) => void;
  onDeleteCard: (index: number) => void;
}

export function CardEditorFormHeader({
  cardIndex,
  totalCards,
  timerSeconds = 30,
  points = 10,
  onUpdateTimer,
  onUpdatePoints,
  onDeleteCard,
}: CardEditorFormHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-[#E5D7DC]">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#451420] text-white font-black text-xs">
          #{cardIndex + 1}
        </span>
        <h3 className="text-sm font-black text-[#451420]">
          Butir Soal Nomor {cardIndex + 1}
        </h3>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Timer Selector */}
        <div className="h-8 flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-xl px-2.5 shadow-2xs">
          <Clock size={14} className="text-amber-700 shrink-0" />
          <span className="text-[11px] font-bold text-[#7A5661]">Timer:</span>
          <select
            value={timerSeconds}
            onChange={(e) => onUpdateTimer(Number(e.target.value))}
            className="text-xs font-bold text-amber-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value={15}>15 Detik</option>
            <option value={20}>20 Detik</option>
            <option value={30}>30 Detik</option>
            <option value={45}>45 Detik</option>
            <option value={60}>60 Detik</option>
          </select>
        </div>

        {/* Points Input */}
        <div className="h-8 flex items-center gap-1.5 bg-white border border-[#E5D7DC] rounded-xl px-2.5 shadow-2xs">
          <Award size={14} className="text-amber-700 shrink-0" />
          <span className="text-[11px] font-bold text-[#7A5661]">Poin:</span>
          <input
            type="number"
            min={1}
            max={100}
            value={points}
            onChange={(e) => onUpdatePoints(Number(e.target.value) || 1)}
            className="w-10 text-center text-xs font-mono font-black text-[#451420] focus:outline-none"
          />
        </div>

        {/* Hapus Soal Button */}
        {totalCards > 1 && (
          <button
            type="button"
            onClick={() => onDeleteCard(cardIndex)}
            className="h-8 px-2.5 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100 text-red-700 text-[11px] font-bold inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            title="Hapus Nomor Soal Ini"
          >
            <Trash2 size={13} />
            <span>Hapus Soal</span>
          </button>
        )}
      </div>
    </div>
  );
}
