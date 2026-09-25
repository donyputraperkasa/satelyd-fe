"use client";

import { Minus } from "lucide-react";
import type { GameTeam } from "@/types";
import { COLOR_OPTIONS, TEAM_COLOR_STYLES } from "./flip-card-scoreboard-constants";
import { FlipCardColorPicker } from "./flip-card-color-picker";

interface FlipCardTeamCardProps {
  team: GameTeam;
  idx: number;
  visibleTeams: GameTeam[];
  activeColorPickerTeamId: string | null;
  onToggleColorPicker: (teamId: string) => void;
  onChangeTeamColor?: (teamId: string, color: string) => void;
  onHandleScore: (teamId: string, delta: number) => void;
}

export function FlipCardTeamCard({
  team,
  idx,
  visibleTeams,
  activeColorPickerTeamId,
  onToggleColorPicker,
  onChangeTeamColor,
  onHandleScore,
}: FlipCardTeamCardProps) {
  const style = TEAM_COLOR_STYLES[team.color] || TEAM_COLOR_STYLES.red;
  const teamLabel = COLOR_OPTIONS.find((c) => c.id === team.color)?.label || "Warna";
  const isPickerOpen = activeColorPickerTeamId === team.id;

  return (
    <div
      className={`flex flex-col justify-between p-3.5 rounded-2xl
        border ${style.bg} ${style.border} transition shadow-2xs`}
    >
      {/* Team Name and Dot */}
      <div className="relative flex items-center justify-between gap-1.5 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => onToggleColorPicker(team.id)}
            className={`h-5 w-5 sm:h-6 sm:w-6 rounded-full ${style.badge} shrink-0
              shadow-xs hover:scale-115 active:scale-95 transition-all cursor-pointer border-2 border-white ring-1 ring-[#DFD0D5] hover:ring-[#451420]/40`}
            title="Klik untuk ganti warna tim"
          />
          <span className={`text-xs sm:text-sm font-black truncate ${style.text}`}>
            {`Tim ${idx + 1} (${teamLabel})`}
          </span>
        </div>

        {isPickerOpen && (
          <FlipCardColorPicker
            team={team}
            visibleTeams={visibleTeams}
            idx={idx}
            onClose={() => onToggleColorPicker(team.id)}
            onChangeTeamColor={onChangeTeamColor}
          />
        )}
      </div>

      {/* Score Number */}
      <div className="my-1.5 text-center">
        <span className={`font-mono text-3xl sm:text-4xl font-black ${style.text}`}>
          {team.score}
        </span>
        <span className="text-[10px] font-bold text-[#8E6C75] block -mt-0.5 uppercase tracking-wider">
          Poin
        </span>
      </div>

      {/* Quick Score Buttons */}
      <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-[#DFD0D5]/50">
        <button
          type="button"
          onClick={() => onHandleScore(team.id, -5)}
          className="h-7 w-7 inline-flex items-center justify-center rounded-xl
            bg-white hover:bg-[#FBEAEB] text-[#7A5661] hover:text-[#B3261E]
            border border-[#DFD0D5] text-[11px] font-bold shadow-2xs transition cursor-pointer"
          title="Kurangi 5 poin"
        >
          <Minus size={12} />
        </button>
        <button
          type="button"
          onClick={() => onHandleScore(team.id, 5)}
          className="h-7 px-2.5 inline-flex items-center justify-center rounded-xl
            bg-white hover:bg-[#FAF7F2] text-[#451420] border border-[#DFD0D5]
            text-xs font-black shadow-2xs transition cursor-pointer"
          title="Tambah 5 poin"
        >
          +5
        </button>
        <button
          type="button"
          onClick={() => onHandleScore(team.id, 10)}
          className="h-7 px-3 inline-flex items-center justify-center rounded-xl
            bg-[#451420] hover:bg-[#5B1C2E] text-white text-xs font-black
            shadow-2xs transition cursor-pointer"
          title="Tambah 10 poin"
        >
          +10
        </button>
      </div>
    </div>
  );
}
