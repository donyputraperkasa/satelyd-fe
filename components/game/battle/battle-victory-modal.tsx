"use client";

import { Trophy, Award, RotateCcw, LogOut, Sparkles } from "lucide-react";
import { BATTLE_TEAMS } from "./battle-constants";

interface BattleVictoryModalProps {
  isOpen: boolean;
  teamScores: Record<string, number>;
  teamNames: Record<string, string>;
  onRestart: () => void;
  onEndSession: () => void;
}

export function BattleVictoryModal({
  isOpen,
  teamScores,
  teamNames,
  onRestart,
  onEndSession,
}: BattleVictoryModalProps) {
  if (!isOpen) return null;

  const scoreLeft = teamScores["team-left"] || 0;
  const scoreRight = teamScores["team-right"] || 0;
  const nameLeft = teamNames["team-left"] || BATTLE_TEAMS[0].name;
  const nameRight = teamNames["team-right"] || BATTLE_TEAMS[1].name;

  const isDraw = scoreLeft === scoreRight;
  const isLeftWinner = scoreLeft > scoreRight;
  const winnerName = isLeftWinner ? nameLeft : nameRight;
  const winnerTeam = isLeftWinner ? BATTLE_TEAMS[0] : BATTLE_TEAMS[1];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#DFD0D5] flex flex-col items-center text-center space-y-6">
        {/* Glow Header Icon */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl ${
              isDraw
                ? "bg-amber-500 shadow-amber-500/30"
                : `bg-${winnerTeam.color}-600 shadow-${winnerTeam.color}-600/40`
            }`}
            style={{
              backgroundColor: isDraw
                ? "#D97706"
                : winnerTeam.id === "team-left"
                ? "#DC2626"
                : "#2563EB",
            }}
          >
            {isDraw ? (
              <Award className="w-10 h-10 animate-bounce" />
            ) : (
              <Trophy className="w-10 h-10 animate-bounce" />
            )}
          </div>
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
        </div>

        {/* Title & Winner announcement */}
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#7A283C]">
            Pertandingan Selesai
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#451420]">
            {isDraw ? "Pertandingan Imbang! 🤝" : `${winnerName} Menang! 🎉`}
          </h2>
          <p className="text-sm font-medium text-[#7A283C]/80">
            {isDraw
              ? "Kedua tim bertarung dengan sangat sengit dan meraih poin yang sama."
              : `Selamat kepada ${winnerName} atas kecepatan dan kecermatan yang luar biasa!`}
          </p>
        </div>

        {/* Score comparison card */}
        <div className="w-full grid grid-cols-2 gap-4">
          {/* Left Team */}
          <div
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              isLeftWinner && !isDraw
                ? "border-red-500 bg-red-50/50 shadow-md ring-2 ring-red-400/20"
                : "border-[#E5D7DC] bg-[#FAF0F3]/40"
            }`}
          >
            <span className="text-xs font-black text-red-700 truncate max-w-[140px]">
              {nameLeft}
            </span>
            <span className="text-3xl font-black text-red-600 mt-1">
              {scoreLeft}
            </span>
            <span className="text-[10px] font-bold text-[#7A283C]/70 uppercase tracking-wider mt-0.5">
              Poin
            </span>
          </div>

          {/* Right Team */}
          <div
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
              !isLeftWinner && !isDraw
                ? "border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-400/20"
                : "border-[#E5D7DC] bg-[#FAF0F3]/40"
            }`}
          >
            <span className="text-xs font-black text-blue-700 truncate max-w-[140px]">
              {nameRight}
            </span>
            <span className="text-3xl font-black text-blue-600 mt-1">
              {scoreRight}
            </span>
            <span className="text-[10px] font-bold text-[#7A283C]/70 uppercase tracking-wider mt-0.5">
              Poin
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-[#DFD0D5] text-[#451420] hover:bg-[#FAF0F3] hover:border-[#ECD0D8] font-bold text-sm transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Main Ulang
          </button>
          <button
            type="button"
            onClick={onEndSession}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#451420] text-white hover:bg-[#320E17] font-bold text-sm transition-all shadow-md cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Akhiri Sesi
          </button>
        </div>
      </div>
    </div>
  );
}
