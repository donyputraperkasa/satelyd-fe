"use client";

import { createPortal } from "react-dom";
import type { GameSession } from "@/types";
import { GameHeader } from "../header";
import { FlipCardScoreboard } from "../flip-card/flip-card-scoreboard";
import { FlipCardQuestionModal } from "../flip-card/flip-card-question-modal";
import { WheelsCanvas } from "./wheels-canvas";
import { WheelsControls } from "./wheels-controls";
import { useWheelsArena } from "./use-wheels-arena";

interface WheelsArenaProps {
  session: GameSession;
  onEndSession: () => void;
}

export function WheelsArena({ session, onEndSession }: WheelsArenaProps) {
  const {
    mounted,
    allCards,
    totalCards,
    activeCards,
    openedCardIds,
    eliminateOnAnswer,
    setEliminateOnAnswer,
    teams,
    isTeamMode,
    setIsTeamMode,
    teamCount,
    setTeamCount,
    isSoundMuted,
    handleToggleSound,
    currentAngle,
    isSpinning,
    pointerBounce,
    selectedCard,
    setSelectedCard,
    selectedCardIndex,
    spinWheel,
    handleMarkCompleted,
    handleUpdateScore,
    handleChangeTeamColor,
    handleResetScores,
    handleResetWheel,
  } = useWheelsArena(session);

  if (!mounted) return null;

  const arenaContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#451420] selection:text-white"
    >
      <GameHeader
        session={session}
        onEndSession={onEndSession}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Scoreboard */}
        <FlipCardScoreboard
          teams={teams}
          isTeamMode={isTeamMode}
          onToggleTeamMode={setIsTeamMode}
          teamCount={teamCount}
          onChangeTeamCount={setTeamCount}
          onUpdateScore={handleUpdateScore}
          onChangeTeamColor={handleChangeTeamColor}
          onResetScores={handleResetScores}
        />

        {/* Wheels Main Stage */}
        <div className="w-full bg-white border border-[#DFD0D5] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-center space-y-6">
          {/* Wheel Graphic with Ticker */}
          <WheelsCanvas
            cards={activeCards}
            allCards={allCards}
            currentAngle={currentAngle}
            isSpinning={isSpinning}
            onSpin={spinWheel}
            pointerBounce={pointerBounce}
          />

          {/* Controls, Badges, and Spin Button */}
          <WheelsControls
            isSpinning={isSpinning}
            onSpin={spinWheel}
            activeCount={activeCards.length}
            totalCount={totalCards}
            answeredCount={openedCardIds.length}
            eliminateOnAnswer={eliminateOnAnswer}
            onToggleEliminate={setEliminateOnAnswer}
            onResetWheel={handleResetWheel}
          />
        </div>
      </main>

      {/* Question Solving & Point Awarding Modal */}
      {selectedCard && (
        <FlipCardQuestionModal
          card={selectedCard}
          cardNumber={selectedCardIndex + 1}
          onClose={() => setSelectedCard(null)}
          onMarkCompleted={handleMarkCompleted}
          teams={teams}
          isTeamMode={isTeamMode}
          onAwardScore={handleUpdateScore}
        />
      )}
    </div>
  );

  return createPortal(arenaContent, document.body);
}
