"use client";

import { COLOR_OPTIONS } from "./flip-card-scoreboard-constants";
import type { GameTeam } from "@/types";

interface FlipCardColorPickerProps {
  team: GameTeam;
  visibleTeams: GameTeam[];
  onClose: () => void;
  onChangeTeamColor?: (teamId: string, color: string) => void;
}

export function FlipCardColorPicker({
  team,
  visibleTeams,
  onClose,
  onChangeTeamColor,
}: FlipCardColorPickerProps) {
  return (
    <div
      className="absolute left-0 top-7 z-30 flex items-center gap-1.5
        p-2 rounded-2xl bg-white border border-[#DFD0D5] shadow-xl
        animate-in fade-in zoom-in-95 duration-150"
    >
      {COLOR_OPTIONS.map((opt) => {
        const isUsed = visibleTeams.some((t) => t.id !== team.id && t.color === opt.id);
        const isCurrent = team.color === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            disabled={isUsed}
            onClick={() => {
              if (!isUsed && onChangeTeamColor) {
                onChangeTeamColor(team.id, opt.id);
              }
              onClose();
            }}
            className={`relative h-5 w-5 rounded-full ${opt.dot}
              transition border border-white shadow-2xs flex items-center justify-center ${
                isUsed
                  ? "opacity-20 cursor-not-allowed scale-80 pointer-events-none"
                  : isCurrent
                  ? "ring-2 ring-[#451420] ring-offset-1 scale-110"
                  : "hover:scale-125 cursor-pointer"
              }`}
            title={
              isUsed
                ? `Warna ${opt.label} sudah digunakan oleh regu lain`
                : isCurrent
                ? `Warna saat ini: ${opt.label}`
                : `Ganti ke warna ${opt.label}`
            }
          >
            {isUsed && (
              <span className="text-[10px] text-white font-black leading-none drop-shadow-sm">
                ×
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
