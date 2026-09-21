"use client";

import { useState } from "react";
import { Shield, Bell, Check, Edit2 } from "lucide-react";
import type { BattleTeamConfig } from "./battle-constants";
import type { BattlePhase } from "./use-battle-arena";

interface BattleTeamPanelProps {
  team: BattleTeamConfig;
  teamName: string;
  score: number;
  phase: BattlePhase;
  isBuzzed: boolean;
  isFailed: boolean;
  onBuzz: () => void;
  onChangeName: (newName: string) => void;
  align: "left" | "right";
}

export function BattleTeamPanel({
  team,
  teamName,
  score,
  phase,
  isBuzzed,
  isFailed,
  onBuzz,
  onChangeName,
  align,
}: BattleTeamPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(teamName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onChangeName(tempName.trim());
    }
    setIsEditing(false);
  };

  const isReady = phase === "READY";
  const isStealActive = phase === "STEAL" && isBuzzed;

  return (
    <div
      className={`relative h-full w-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-3xl transition-all duration-300 border-2 bg-white ${
        isBuzzed
          ? isStealActive
            ? "border-amber-500 shadow-xl ring-4 ring-amber-400/30"
            : `border-${team.color}-500 shadow-xl ring-4 ring-${team.color}-400/30`
          : isFailed
          ? "border-[#E5D7DC] opacity-60"
          : "border-[#DFD0D5] shadow-xs"
      }`}
      style={{
        boxShadow: isBuzzed ? `0 0 28px ${team.glowColor}` : undefined,
      }}
    >
      {/* Top Header: Team Avatar & Name */}
      <div className="w-full flex flex-col items-center space-y-2">
        <div
          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border ${team.badgeBg} ${team.badgeBorder} ${team.badgeText} shadow-2xs`}
        >
          <Shield size={26} />
        </div>

        {/* Team Name */}
        {isEditing ? (
          <div className="flex items-center gap-1.5 w-full max-w-[180px]">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
              className="w-full px-2.5 py-1 text-xs font-bold text-center border border-[#DFD0D5] rounded-lg bg-[#FAF7F2] text-[#451420] focus:outline-none focus:ring-2 focus:ring-[#451420]"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSaveName}
              className="p-1 rounded-md bg-[#451420] text-white hover:bg-[#5B1C2E] cursor-pointer"
            >
              <Check size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTempName(teamName);
              setIsEditing(true);
            }}
            className="group flex items-center gap-1.5 text-sm sm:text-base font-black text-[#451420] hover:text-[#7A283C] transition cursor-pointer"
            title="Klik untuk ubah nama tim"
          >
            <span>{teamName}</span>
            <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition text-[#A48E95]" />
          </button>
        )}

        {isFailed && !isBuzzed && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF0F3] text-[#9F1239] border border-[#ECD0D8]">
            <span>Kesempatan Habis</span>
          </div>
        )}
      </div>

      {/* Center: Live Score Display */}
      <div className="my-auto py-6 flex flex-col items-center">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A5661]">
          Skor Tim
        </span>
        <span
          className={`font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${
            score > 0 ? "text-[#451420]" : "text-[#A48E95]"
          }`}
        >
          {score}
        </span>
        <span className="text-[11px] font-semibold text-[#7A5661]">Poin</span>
      </div>

      {/* Bottom: Big Buzzer Button */}
      <div className="w-full flex flex-col items-center space-y-2 mt-auto">
        <button
          type="button"
          onClick={onBuzz}
          disabled={!isReady}
          className={`w-full py-4 sm:py-5 px-4 rounded-2xl font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1 border-2 transition-all duration-150 select-none ${
            isReady
              ? `${team.buzzerBg} ${team.buzzerHover} text-white ${team.buzzerBorder} ${team.buzzerShadow} hover:scale-[1.02] active:scale-95 cursor-pointer`
              : isBuzzed
              ? `${team.buzzerBg} text-white opacity-95 border-white shadow-lg ring-2 ring-white/50`
              : "bg-[#E5D7DC] text-[#7A5661] border-[#D4C3C9] cursor-not-allowed opacity-60"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell size={20} className={isReady ? "animate-wiggle" : ""} />
            <span>BUZZER</span>
          </div>
          <span className="text-[11px] font-semibold opacity-90">
            {isReady ? `Klik / Tombol [${team.shortcutKey}]` : isBuzzed ? "Terkunci!" : "Menunggu..."}
          </span>
        </button>

        <span className="text-[10px] font-bold text-[#7A5661]/80 text-center">
          {align === "left" ? "Shortcut: [A]" : "Shortcut: [L]"}
        </span>
      </div>
    </div>
  );
}
