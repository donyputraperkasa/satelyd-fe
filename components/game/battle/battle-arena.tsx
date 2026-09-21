"use client";

import { createPortal } from "react-dom";
import type { GameSession } from "@/types";
import { GameHeader } from "../header";
import { BATTLE_TEAMS } from "./battle-constants";
import { BattleTeamPanel } from "./battle-team-panel";
import { BattleQuestionCard } from "./battle-question-card";
import { BattleVictoryModal } from "./battle-victory-modal";
import { useBattleArena } from "./use-battle-arena";

interface BattleArenaProps {
  session: GameSession;
  onEndSession: () => void;
}

export function BattleArena({ session, onEndSession }: BattleArenaProps) {
  const {
    mounted,
    totalCards,
    currentCard,
    currentCardIndex,
    phase,
    buzzedTeamId,
    firstFailedTeamId,
    selectedOptionKey,
    failedOptionKeys,
    correctKey,
    points,
    timerSeconds,
    teamScores,
    teamNames,
    isVictoryModalOpen,
    isSoundMuted,
    handleToggleSound,
    triggerBuzzer,
    handleSelectOption,
    handleAwardEssay,
    handleNextRound,
    handleRestartGame,
    handleChangeTeamName,
  } = useBattleArena(session);

  if (!mounted) return null;

  const buzzedTeamName = buzzedTeamId ? teamNames[buzzedTeamId] : undefined;

  const arenaContent = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#451420] selection:text-white">
      {/* Top Universal Game Header */}
      <GameHeader
        session={session}
        onEndSession={onEndSession}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main 3-Column Split Arena (Balanced height with elegant breathing room) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-auto min-h-[500px] sm:min-h-[550px] lg:min-h-[590px]">
          {/* Left Team Panel (Red / [A]) */}
          <div className="lg:col-span-3 flex flex-col order-2 lg:order-1 h-full">
            <BattleTeamPanel
              team={BATTLE_TEAMS[0]}
              teamName={teamNames["team-left"]}
              score={teamScores["team-left"]}
              phase={phase}
              isBuzzed={buzzedTeamId === "team-left"}
              isFailed={firstFailedTeamId === "team-left"}
              onBuzz={() => triggerBuzzer("team-left")}
              onChangeName={(name) => handleChangeTeamName("team-left", name)}
              align="left"
            />
          </div>

          {/* Center Arena Card (Questions & Answers) */}
          <div className="lg:col-span-6 flex flex-col order-1 lg:order-2 h-full">
            <BattleQuestionCard
              card={currentCard}
              cardIndex={currentCardIndex}
              totalCards={totalCards}
              phase={phase}
              timerSeconds={timerSeconds}
              selectedOptionKey={selectedOptionKey}
              failedOptionKeys={failedOptionKeys}
              correctKey={correctKey}
              points={points}
              buzzedTeamName={buzzedTeamName}
              onSelectOption={handleSelectOption}
              onNextRound={handleNextRound}
              onAwardEssay={handleAwardEssay}
              teamNames={teamNames}
            />
          </div>

          {/* Right Team Panel (Blue / [L]) */}
          <div className="lg:col-span-3 flex flex-col order-3 h-full">
            <BattleTeamPanel
              team={BATTLE_TEAMS[1]}
              teamName={teamNames["team-right"]}
              score={teamScores["team-right"]}
              phase={phase}
              isBuzzed={buzzedTeamId === "team-right"}
              isFailed={firstFailedTeamId === "team-right"}
              onBuzz={() => triggerBuzzer("team-right")}
              onChangeName={(name) => handleChangeTeamName("team-right", name)}
              align="right"
            />
          </div>
        </div>

        {/* Bottom Keyboard Shortcut Quick Reference */}
        <div className="mt-4 pt-3 border-t border-[#E5D7DC] flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#7A283C]/70">
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-white border border-[#DFD0D5] font-mono text-[11px] shadow-xs text-red-600 font-bold">
              A
            </kbd>
            Bel Tim Kiri
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-white border border-[#DFD0D5] font-mono text-[11px] shadow-xs text-blue-600 font-bold">
              L
            </kbd>
            Bel Tim Kanan
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-0.5 rounded bg-white border border-[#DFD0D5] font-mono text-[11px] shadow-xs text-[#451420] font-bold">
              Spasi
            </kbd>
            Soal Selanjutnya
          </span>
        </div>
      </main>

      {/* Victory Celebration Modal */}
      <BattleVictoryModal
        isOpen={isVictoryModalOpen}
        teamScores={teamScores}
        teamNames={teamNames}
        onRestart={handleRestartGame}
        onEndSession={onEndSession}
      />
    </div>
  );

  return createPortal(arenaContent, document.body);
}
