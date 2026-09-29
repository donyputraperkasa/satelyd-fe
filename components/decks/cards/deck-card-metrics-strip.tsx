"use client";

import { Layers, Clock, Award, Tv } from "lucide-react";

interface DeckCardMetricsStripProps {
  cardCount: number;
  estimatedSeconds: number;
  totalPoints: number;
}

export function DeckCardMetricsStrip({
  cardCount,
  estimatedSeconds,
  totalPoints,
}: DeckCardMetricsStripProps) {
  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#ECDDE2]/80 dark:border-[#282E3E] text-xs">
      <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
        <Layers size={15} className="text-[#7A283C] dark:text-[#C67D00] shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Soal</p>
          <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">{cardCount} Kartu</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
        <Clock size={15} className="text-[#7A283C] dark:text-[#C67D00] shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Est. Waktu</p>
          <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">
            ~{Math.round(estimatedSeconds / 60) || 2} Menit
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
        <Award size={15} className="text-amber-700 dark:text-amber-400 shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Total Poin</p>
          <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">{totalPoints} Pts</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852] dark:text-[#94A3B8]">
        <Tv size={15} className="text-[#2E7D32] dark:text-emerald-400 shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F] dark:text-[#64748B]">Smart TV</p>
          <p className="font-bold text-[#2E7D32] dark:text-emerald-400">Siap Main</p>
        </div>
      </div>
    </div>
  );
}
