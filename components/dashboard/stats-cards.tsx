"use client";

import { Crown, Gamepad2, GraduationCap, PlusCircle, Sparkles } from "lucide-react";
import type { StatsCardsProps } from "@/types";

export function StatsCards({ user }: StatsCardsProps) {
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const gameTokens = user.gameTokenBalance ?? 0;
  const examCredits = user.examCreditBalance ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
      {/* Game Token Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF8E6] text-[#C67D00]">
              <Gamepad2 size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#7A5661]">Token Game TV</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420]">
                {isAdmin ? "Tak Terbatas" : gameTokens.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E6] px-2.5 py-0.5 text-2xs font-bold text-[#9A6200] border border-[#F2DEB0]">
              <Crown size={11} /> Owner
            </span>
          )}
        </div>
        <p className="mt-4 text-xs text-[#7A5661] leading-relaxed">
          Digunakan untuk unlock limit kartu game & menjalankan sesi battle TV kelas.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-[#F2EAEC] pt-3 text-xs">
          <span className="text-[#A48E95]">Tarif: Rp 2.500 / token</span>
          <button
            type="button"
            className="font-bold text-[#451420] hover:text-[#C67D00] inline-flex items-center gap-1 cursor-pointer transition"
          >
            <PlusCircle size={13} />
            Top Up
          </button>
        </div>
      </div>

      {/* Exam Credit Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5EDF0] text-[#451420]">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#7A5661]">Token Mode Ujian</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420]">
                {isAdmin ? "Tak Terbatas" : examCredits.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EDF0] px-2.5 py-0.5 text-2xs font-bold text-[#5C323E] border border-[#E2D5D9]">
              <Sparkles size={11} /> VIP
            </span>
          )}
        </div>
        <p className="mt-4 text-xs text-[#7A5661] leading-relaxed">
          Digunakan untuk menerbitkan paket ujian online anti-curang selama 7 hari.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-[#F2EAEC] pt-3 text-xs">
          <span className="text-[#A48E95]">Tarif: Rp 14.900 / token</span>
          <button
            type="button"
            className="font-bold text-[#451420] hover:text-[#C67D00] inline-flex items-center gap-1 cursor-pointer transition"
          >
            <PlusCircle size={13} />
            Top Up
          </button>
        </div>
      </div>
    </div>
  );
}
