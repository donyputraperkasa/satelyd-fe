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
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#ECDDE2]/80 text-xs">
      <div className="flex items-center gap-2 text-[#634852]">
        <Layers size={15} className="text-[#7A283C] shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F]">Soal</p>
          <p className="font-bold text-[#451420]">{cardCount} Kartu</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852]">
        <Clock size={15} className="text-[#7A283C] shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F]">Est. Waktu</p>
          <p className="font-bold text-[#451420]">
            ~{Math.round(estimatedSeconds / 60) || 2} Menit
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852]">
        <Award size={15} className="text-amber-700 shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F]">Total Poin</p>
          <p className="font-bold text-[#451420]">{totalPoints} Pts</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#634852]">
        <Tv size={15} className="text-[#2E7D32] shrink-0" />
        <div>
          <p className="text-[10px] uppercase font-bold text-[#9C737F]">Smart TV</p>
          <p className="font-bold text-[#2E7D32]">Siap Main</p>
        </div>
      </div>
    </div>
  );
}
