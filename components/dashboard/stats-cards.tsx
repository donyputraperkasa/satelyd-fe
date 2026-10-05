"use client";

import { Gamepad2, GraduationCap, PlusCircle } from "lucide-react";
import Link from "next/link";
import type { StatsCardsProps } from "@/types";

export function StatsCards({ user }: StatsCardsProps) {
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const gameTokens = user.gameTokenBalance ?? 0;
  const examCredits = user.examCreditBalance ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full">
      {/* Game Token Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3.5 sm:p-6 shadow-xs transition hover:shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24] shrink-0">
                <Gamepad2 className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8] truncate">Token Game TV</p>
                <h3 className="font-display text-lg sm:text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] truncate">
                  {isAdmin ? "Tak Terbatas" : gameTokens.toLocaleString("id-ID")}
                </h3>
              </div>
            </div>
          </div>
          <p className="mt-2.5 sm:mt-4 text-[11px] sm:text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed line-clamp-2 sm:line-clamp-none">
            Digunakan untuk unlock limit kartu game &amp; sesi battle TV kelas.
          </p>
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row sm:flex-row items-start xs:items-center justify-between border-t border-[#F2EAEC] dark:border-[#282E3E] pt-2.5 sm:pt-3 text-[11px] sm:text-xs gap-1">
          <span className="text-[#A48E95] dark:text-[#64748B] text-[10px] sm:text-xs">Rp 2.500 / token</span>
          <Link
            href="/dashboard/tokens?type=GAME#catalog-section"
            className="font-bold text-[#451420] dark:text-[#F8FAFC] hover:text-[#C67D00] dark:hover:text-[#FBBF24] inline-flex items-center gap-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67D00]"
          >
            <PlusCircle size={13} />
            <span>Top Up</span>
          </Link>
        </div>
      </div>

      {/* Exam Credit Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3.5 sm:p-6 shadow-xs transition hover:shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24] shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8] truncate">Token Mode Ujian</p>
                <h3 className="font-display text-lg sm:text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] truncate">
                  {isAdmin ? "Tak Terbatas" : examCredits.toLocaleString("id-ID")}
                </h3>
              </div>
            </div>
          </div>
          <p className="mt-2.5 sm:mt-4 text-[11px] sm:text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed line-clamp-2 sm:line-clamp-none">
            Digunakan untuk menerbitkan paket ujian online anti-curang 7 hari.
          </p>
        </div>
        <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row sm:flex-row items-start xs:items-center justify-between border-t border-[#F2EAEC] dark:border-[#282E3E] pt-2.5 sm:pt-3 text-[11px] sm:text-xs gap-1">
          <span className="text-[#A48E95] dark:text-[#64748B] text-[10px] sm:text-xs">Rp 14.900 / token</span>
          <Link
            href="/dashboard/tokens?type=EXAM#catalog-section"
            className="font-bold text-[#451420] dark:text-[#F8FAFC] hover:text-[#C67D00] dark:hover:text-[#FBBF24] inline-flex items-center gap-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67D00]"
          >
            <PlusCircle size={13} />
            <span>Top Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
