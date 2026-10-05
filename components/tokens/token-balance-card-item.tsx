"use client";

import { Plus } from "lucide-react";
import type { TokenBalanceCardItemProps } from "@/types";

export function TokenBalanceCardItem({
  title,
  icon,
  balance,
  label,
  isUnlimited,
  buttonLabel = "Top Up Token",
  onTopUp,
}: TokenBalanceCardItemProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#E5D7DC]
        dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-5 shadow-xs
        flex flex-col justify-between min-h-[175px] sm:min-h-[220px]"
    >
      {/* Top Row: Icon & Unlimited Badge */}
      <div>
        <div className="flex items-center justify-between gap-1 w-full">
          {icon}
          {isUnlimited && (
            <span
              className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50
                dark:bg-emerald-950/40 border border-emerald-200
                dark:border-emerald-800 text-emerald-800 dark:text-emerald-400
                text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0"
            >
              Unlimited
            </span>
          )}
        </div>

        {/* Title on its own line so it never truncates to T... */}
        <h3
          className="mt-2 text-xs sm:text-base font-extrabold text-[#451420]
            dark:text-[#F8FAFC] leading-snug line-clamp-1"
        >
          {title}
        </h3>
      </div>

      {/* Balance Section */}
      <div className="my-auto py-1 sm:py-2">
        <div className="flex flex-col xs:flex-row items-baseline gap-0.5 sm:gap-2">
          <span
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-black
              text-[#451420] dark:text-[#F8FAFC] tracking-tight leading-tight"
          >
            {isUnlimited ? "∞" : balance.toLocaleString("id-ID")}
          </span>
          <span
            className="text-[10px] sm:text-xs font-semibold
              text-[#7A5661] dark:text-[#94A3B8]"
          >
            {label}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onTopUp}
        className="h-8 sm:h-10 w-full px-2 sm:px-3 rounded-xl bg-[#451420]
          dark:bg-white text-white dark:text-[#10131B] hover:bg-[#320E17]
          dark:hover:bg-[#F1F5F9] font-bold text-[10px] sm:text-xs shadow-xs
          transition flex items-center justify-center gap-1 cursor-pointer active:scale-98"
      >
        <Plus size={13} className="shrink-0" />
        <span className="truncate">{buttonLabel}</span>
      </button>
    </div>
  );
}
