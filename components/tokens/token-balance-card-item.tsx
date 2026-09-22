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
    <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs flex flex-col justify-between min-h-[220px] sm:min-h-[235px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="text-base sm:text-lg font-black text-[#451420]">
            {title}
          </h3>
        </div>
        {isUnlimited && (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
            Unlimited
          </span>
        )}
      </div>

      <div className="my-auto py-2">
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-5xl sm:text-6xl font-black text-[#451420] tracking-tight">
            {isUnlimited ? "∞" : balance}
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#7A5661]">
            {label}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onTopUp}
        className="h-11 w-full px-4 rounded-xl bg-[#451420] text-white hover:bg-[#320E17] font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <Plus size={15} />
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}
