"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";

interface TokenBalanceCardItemProps {
  title: string;
  icon: ReactNode;
  balance: number;
  label: string;
  isUnlimited: boolean;
  buttonLabel?: string;
  onTopUp: () => void;
}

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
    <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3.5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[180px] sm:min-h-[235px]">
      <div className="flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          {icon}
          <h3 className="text-sm sm:text-lg font-black text-[#451420] dark:text-[#F8FAFC] truncate">
            {title}
          </h3>
        </div>
        {isUnlimited && (
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0">
            Unlimited
          </span>
        )}
      </div>

      <div className="my-auto py-2">
        <div className="flex flex-col xs:flex-row sm:flex-row items-baseline gap-1 sm:gap-2.5">
          <span className="font-display text-2xl sm:text-5xl lg:text-6xl font-black text-[#451420] dark:text-[#F8FAFC] tracking-tight truncate max-w-full">
            {isUnlimited ? "∞" : balance.toLocaleString("id-ID")}
          </span>
          <span className="text-[11px] sm:text-sm font-bold text-[#7A5661] dark:text-[#94A3B8]">
            {label}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onTopUp}
        className="h-9 sm:h-11 w-full px-2.5 sm:px-4 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] hover:bg-[#320E17] dark:hover:bg-[#F1F5F9] font-bold text-[11px] sm:text-xs shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
      >
        <Plus size={14} className="shrink-0" />
        <span className="truncate">{buttonLabel}</span>
      </button>
    </div>
  );
}
