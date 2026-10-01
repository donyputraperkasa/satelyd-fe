"use client";

import { Gamepad2, GraduationCap, PlusCircle } from "lucide-react";
import Link from "next/link";
import type { StatsCardsProps } from "@/types";

export function StatsCards({ user }: StatsCardsProps) {
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const gameTokens = user.gameTokenBalance ?? 0;
  const examCredits = user.examCreditBalance ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
      {/* Game Token Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xs transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]">
              <Gamepad2 size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Token Game TV</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
                {isAdmin ? "Tak Terbatas" : gameTokens.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
          Digunakan untuk unlock limit kartu game & menjalankan sesi battle TV kelas.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-[#F2EAEC] dark:border-[#282E3E] pt-3 text-xs">
          <span className="text-[#A48E95] dark:text-[#64748B]">Tarif: Rp 2.500 / token</span>
          <Link
            href="/dashboard/tokens"
            className="font-bold text-[#451420] dark:text-[#F8FAFC] hover:text-[#C67D00] dark:hover:text-[#FBBF24] inline-flex items-center gap-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67D00]"
          >
            <PlusCircle size={13} />
            Top Up
          </Link>
        </div>
      </div>

      {/* Exam Credit Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xs transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Token Mode Ujian</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
                {isAdmin ? "Tak Terbatas" : examCredits.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
          Digunakan untuk menerbitkan paket ujian online anti-curang selama 7 hari.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-[#F2EAEC] dark:border-[#282E3E] pt-3 text-xs">
          <span className="text-[#A48E95] dark:text-[#64748B]">Tarif: Rp 14.900 / token</span>
          <Link
            href="/dashboard/tokens"
            className="font-bold text-[#451420] dark:text-[#F8FAFC] hover:text-[#C67D00] dark:hover:text-[#FBBF24] inline-flex items-center gap-1 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C67D00]"
          >
            <PlusCircle size={13} />
            Top Up
          </Link>
        </div>
      </div>
    </div>
  );
}
