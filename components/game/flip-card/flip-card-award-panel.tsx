"use client";

import { Trophy, CheckCircle2 } from "lucide-react";
import type { GameTeam } from "@/types";

interface FlipCardAwardPanelProps {
  isTeamMode: boolean;
  isAnswerRevealed: boolean;
  teams: GameTeam[];
  points: number;
  awardedTeamId: string | null;
  onAward: (teamId: string) => void;
}

export function FlipCardAwardPanel({
  isTeamMode,
  isAnswerRevealed,
  teams,
  points,
  awardedTeamId,
  onAward,
}: FlipCardAwardPanelProps) {
  if (!isAnswerRevealed || !isTeamMode) return null;

  return (
    <div className="rounded-2xl border border-[#E5D7DC] bg-[#FAF7F2] p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-[#C67D00]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#451420]">
            Beri Skor Poin ke Regu yang Benar:
          </span>
        </div>
        {awardedTeamId && (
          <span className="text-xs font-bold text-[#1D6C31] inline-flex items-center gap-1">
            <CheckCircle2 size={13} /> Poin Telah Ditambahkan!
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {teams.map((team) => (
          <button
            key={team.id}
            type="button"
            onClick={() => onAward(team.id)}
            className={`h-10 px-3 rounded-xl font-black text-xs transition border cursor-pointer flex items-center justify-between ${
              awardedTeamId === team.id
                ? "bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs"
                : "bg-white hover:bg-[#FAF0F3] text-[#451420] border-[#DFD0D5] hover:border-[#451420]"
            }`}
          >
            <span className="truncate">{team.name}</span>
            <span className="shrink-0 font-mono text-[11px] font-bold">+{points}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
