"use client";

import { Check, X } from "lucide-react";
import { COLOR_OPTIONS } from "./flip-card-scoreboard-constants";
import type { GameTeam } from "@/types";

interface FlipCardColorPickerProps {
  team: GameTeam;
  visibleTeams: GameTeam[];
  idx?: number;
  onClose: () => void;
  onChangeTeamColor?: (teamId: string, color: string) => void;
}

export function FlipCardColorPicker({
  team,
  visibleTeams,
  idx = 0,
  onClose,
  onChangeTeamColor,
}: FlipCardColorPickerProps) {
  const isMobileRight = idx % 2 === 1;
  const isDesktopRight = idx >= 2;

  return (
    <>
      {/* Click outside backdrop to close */}
      <div
        className="fixed inset-0 z-20 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popover container */}
      <div
        className={`absolute top-8 sm:top-9 z-30 flex items-center gap-1.5 sm:gap-2
          p-2 sm:p-2.5 rounded-2xl bg-white border border-[#DFD0D5] shadow-xl
          animate-in fade-in zoom-in-95 duration-150 ${
            isMobileRight ? "right-0" : "left-0"
          } ${
            isDesktopRight ? "sm:right-0 sm:left-auto" : "sm:left-0 sm:right-auto"
          }`}
      >
        {COLOR_OPTIONS.map((opt) => {
          const isUsed = visibleTeams.some((t) => t.id !== team.id && t.color === opt.id);
          const isCurrent = team.color === opt.id;
          const isLightColor = opt.id === "amber" || opt.id === "yellow";

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
              className={`relative h-7.5 w-7.5 sm:h-8 sm:w-8 rounded-full ${opt.dot}
                transition-all border-2 border-white shadow-xs flex items-center justify-center ${
                  isUsed
                    ? "opacity-25 grayscale-[20%] cursor-not-allowed scale-95 pointer-events-none"
                    : isCurrent
                    ? "ring-2 ring-[#451420] ring-offset-2 scale-105 shadow-md"
                    : "hover:scale-115 hover:shadow-md active:scale-95 cursor-pointer"
                }`}
              title={
                isUsed
                  ? `Warna ${opt.label} sudah digunakan oleh regu lain`
                  : isCurrent
                  ? `Warna saat ini: ${opt.label}`
                  : `Ganti ke warna ${opt.label}`
              }
            >
              {isCurrent && (
                <Check
                  size={14}
                  className={`stroke-[3] drop-shadow-xs ${
                    isLightColor ? "text-amber-950" : "text-white"
                  }`}
                />
              )}
              {isUsed && (
                <X
                  size={14}
                  className={`stroke-[2.5] drop-shadow-xs ${
                    isLightColor ? "text-amber-950/70" : "text-white/80"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
