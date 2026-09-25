"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { GameSession } from "@/types";
import { GameEndSessionModal } from "./game-end-session-modal";
import { GameHeaderControls } from "./game-header-controls";

interface GameHeaderProps {
  session: GameSession;
  onEndSession: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export function GameHeader({
  session,
  onEndSession,
  isSoundMuted,
  onToggleSound,
}: GameHeaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const getGameLabel = () => {
    switch (session.gameType as string) {
      case "FLIP_CARD":
        return "🃏 Flip Card Game";
      case "SPIN_WHEEL":
      case "WHEELS":
        return "🎡 Wheels Question";
      case "MATH_BATTLE_2P":
      case "BATTLE_2P":
        return "⚔️ Duel 2 Player";
      default:
        return "Game TV Kelas";
    }
  };

  return (
    <>
      <header
        className="w-full bg-[#FAF7F2] border-b border-[#E5D7DC] px-4 sm:px-6
          py-3 shrink-0 shadow-2xs z-30"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand & Game Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span
              className="font-display text-lg font-black tracking-tight
                text-[#451420] shrink-0"
            >
              satel<span className="text-[#C67D00]">y</span>d
            </span>

            <span className="h-4 w-[1px] bg-[#DFD0D5] hidden sm:inline" />

            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                bg-[#451420] text-[#FDFBF7] text-xs font-bold shrink-0 shadow-2xs"
            >
              <Sparkles size={12} className="text-[#F2DEB0]" />
              <span>{getGameLabel()}</span>
            </div>
          </div>

          {/* Center: Deck Title & Sub-info */}
          <div className="hidden md:flex flex-col items-center text-center min-w-0 px-2">
            <h1 className="text-base lg:text-lg font-black text-[#451420] truncate max-w-md">
              {session.deck.title}
            </h1>
            <p className="text-[11px] font-medium text-[#7A5661] truncate">
              {session.deck.subject} • {session.deck.gradeLevel} •{" "}
              <span className="font-bold text-[#451420]">
                PIN: {session.pinCode}
              </span>
            </p>
          </div>

          {/* Right: Controls */}
          <GameHeaderControls
            isSoundMuted={isSoundMuted}
            onToggleSound={onToggleSound}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onOpenConfirmExit={() => setShowConfirmExit(true)}
          />
        </div>
      </header>

      <GameEndSessionModal
        isOpen={showConfirmExit}
        onClose={() => setShowConfirmExit(false)}
        onConfirm={onEndSession}
      />
    </>
  );
}
