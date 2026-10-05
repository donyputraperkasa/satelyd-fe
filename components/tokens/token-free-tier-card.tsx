"use client";

import { Sparkles } from "lucide-react";

interface TokenFreeTierCardProps {
  freeSessionsRemaining: number;
  freeSessionsMax: number;
  freeUsagePercent: number;
  className?: string;
}

export function TokenFreeTierCard({
  freeSessionsRemaining,
  freeSessionsMax,
  freeUsagePercent,
  className = "",
}: TokenFreeTierCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#ECD0D8] dark:border-[#282E3E] bg-[#FAF0F3]/40 dark:bg-[#1C202C] p-3.5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[170px] sm:min-h-[235px] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-white dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] text-[#7A283C] dark:text-[#FBBF24] shrink-0">
            <Sparkles className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </div>
          <h3 className="text-sm sm:text-lg font-black text-[#451420] dark:text-[#F8FAFC]">
            Sesi Game Gratis
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] text-[#7A283C] dark:text-[#94A3B8] text-[10px] font-black">
            Reset 00:00
        </span>
      </div>

      <div className="my-auto py-2 space-y-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-5xl sm:text-6xl font-black text-[#451420] dark:text-[#F8FAFC] tracking-tight">
            {freeSessionsRemaining}
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#7A5661] dark:text-[#94A3B8]">
            dari {freeSessionsMax} Sesi Hari Ini
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#E5D7DC] dark:bg-[#282E3E] overflow-hidden">
          <div
            className="h-full bg-[#451420] dark:bg-[#C67D00] rounded-full transition-all duration-300"
            style={{ width: `${freeUsagePercent}%` }}
          />
        </div>
      </div>

      <div className="h-11 w-full px-3 rounded-xl bg-white dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] text-[#7A283C] dark:text-[#FBBF24] font-bold text-xs flex items-center justify-center gap-2 shadow-2xs">
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
