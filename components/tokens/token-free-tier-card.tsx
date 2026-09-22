"use client";

import { Sparkles } from "lucide-react";

interface TokenFreeTierCardProps {
  freeSessionsRemaining: number;
  freeSessionsMax: number;
  freeUsagePercent: number;
}

export function TokenFreeTierCard({
  freeSessionsRemaining,
  freeSessionsMax,
  freeUsagePercent,
}: TokenFreeTierCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#ECD0D8] bg-[#FAF0F3]/40 p-6 shadow-xs flex flex-col justify-between min-h-[220px] sm:min-h-[235px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#ECD0D8] text-[#7A283C] shrink-0">
            <Sparkles size={18} />
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#451420]">
            Sesi Game Gratis
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#ECD0D8] text-[#7A283C] text-[10px] font-black">
          Reset 00:00
        </span>
      </div>

      <div className="my-auto py-2 space-y-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-5xl sm:text-6xl font-black text-[#451420] tracking-tight">
            {freeSessionsRemaining}
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#7A5661]">
            dari {freeSessionsMax} Sesi Hari Ini
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E5D7DC] overflow-hidden">
          <div
            className="h-full bg-[#451420] rounded-full transition-all duration-300"
            style={{ width: `${freeUsagePercent}%` }}
          />
        </div>
      </div>

      <div className="h-11 w-full px-3 rounded-xl bg-white border border-[#ECD0D8] text-[#7A283C] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs">
        <Sparkles size={14} className="shrink-0 text-[#C67D00]" />
        <span>
          {freeSessionsRemaining > 0
            ? `Sisa ${freeSessionsRemaining} Sesi Gratis Hari Ini`
            : "Kuota Gratis Hari Ini Habis"}
        </span>
      </div>
    </div>
  );
}
