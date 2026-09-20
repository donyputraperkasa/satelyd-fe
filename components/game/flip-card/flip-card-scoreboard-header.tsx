"use client";

import { Trophy, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { FlipCardModeToggle } from "./flip-card-mode-toggle";

interface FlipCardScoreboardHeaderProps {
  isTeamMode: boolean;
  onToggleTeamMode: (isTeam: boolean) => void;
  teamCount: number;
  onChangeTeamCount: (count: number) => void;
  onResetScores: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function FlipCardScoreboardHeader({
  isTeamMode,
  onToggleTeamMode,
  teamCount,
  onChangeTeamCount,
  onResetScores,
  isCollapsed,
  onToggleCollapse,
}: FlipCardScoreboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#F0E6E9]">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E6] text-[#9A6200] border border-[#F2DEB0]">
          <Trophy size={18} className="text-[#C67D00]" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#451420] leading-none">
            Papan Skor Kelas
          </h3>
          <p className="text-[11px] text-[#7A5661] mt-0.5">
            {isTeamMode
              ? "Apresiasi poin per regu / kelompok"
              : "Mode Santai: Murid maju bergiliran tanpa sistem poin"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FlipCardModeToggle
          isTeamMode={isTeamMode}
          onToggleTeamMode={onToggleTeamMode}
          teamCount={teamCount}
          onChangeTeamCount={onChangeTeamCount}
        />

        {isTeamMode && (
          <button
            type="button"
            onClick={onResetScores}
            className="h-8 px-2.5 inline-flex items-center gap-1 rounded-xl border border-[#DFD0D5] bg-white hover:bg-[#FAF7F2] text-[#7A5661] hover:text-[#451420] text-xs font-bold transition cursor-pointer"
            title="Reset seluruh poin tim menjadi 0"
          >
            <RotateCcw size={12} />
            <span className="hidden md:inline">Reset Skor</span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className="h-8 w-8 inline-flex items-center justify-center rounded-xl text-[#7A5661] hover:text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer"
          title={isCollapsed ? "Tampilkan Papan Nilai" : "Sembunyikan"}
        >
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
    </div>
  );
}
