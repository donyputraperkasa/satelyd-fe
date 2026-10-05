"use client";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import type { StatCardItemProps } from "@/types";

export function StatCardItem({
  title,
  icon: Icon,
  value,
  subtitle,
  priceText,
  topUpHref,
  isAdmin,
}: StatCardItemProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#E5D7DC]
        dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-5 shadow-xs
        transition hover:shadow-md flex flex-col justify-between"
    >
      <div>
        {/* Top Row: Icon and Unlimited Badge */}
        <div className="flex items-center justify-between">
          <div
            className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center
              rounded-lg sm:rounded-xl bg-[#F5EDF0] dark:bg-[#141720]
              text-[#451420] dark:text-[#FBBF24] shrink-0"
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          {isAdmin && (
            <span
              className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50
                dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800
                text-emerald-800 dark:text-emerald-400 text-[9px] sm:text-[10px]
                font-black uppercase tracking-wider shrink-0"
            >
              Unlimited
            </span>
          )}
        </div>

        {/* Title and Value */}
        <div className="mt-2 sm:mt-3">
          <p
            className="text-[11px] sm:text-xs font-semibold
              text-[#7A5661] dark:text-[#94A3B8] truncate"
          >
            {title}
          </p>
          <h3
            className="font-display text-sm sm:text-2xl font-extrabold
              text-[#451420] dark:text-[#F8FAFC] mt-0.5 leading-snug"
          >
            {value}
          </h3>
        </div>

        <p
          className="mt-2 text-[10px] sm:text-xs text-[#7A5661]
            dark:text-[#94A3B8] leading-relaxed line-clamp-2"
        >
          {subtitle}
        </p>
      </div>

      {/* Footer */}
      <div
        className="mt-3 sm:mt-4 flex flex-col xs:flex-row sm:flex-row
          items-start xs:items-center justify-between border-t border-[#F2EAEC]
          dark:border-[#282E3E] pt-2 sm:pt-3 text-[10px] sm:text-xs gap-1"
      >
        <span className="text-[#A48E95] dark:text-[#64748B]">
          {priceText}
        </span>
        <Link
          href={topUpHref}
          className="font-bold text-[#451420] dark:text-[#F8FAFC]
            hover:text-[#C67D00] dark:hover:text-[#FBBF24] inline-flex
            items-center gap-1 transition focus-visible:outline-2"
        >
          <PlusCircle size={12} />
          <span>Top Up</span>
        </Link>
      </div>
    </div>
  );
}
