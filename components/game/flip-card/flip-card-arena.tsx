"use client";

import { createPortal } from "react-dom";
import type { GameSession } from "@/types";
import { GameHeader } from "../game-header";
import { FlipCardScoreboard } from "./flip-card-scoreboard";
import { FlipCardGrid } from "./flip-card-grid";
import { FlipCardQuestionModal } from "./flip-card-question-modal";
import { FlipCardProgressBar } from "./flip-card-progress-bar";
import { useFlipCardArena } from "./use-flip-card-arena";

interface FlipCardArenaProps {
  session: GameSession;
  onEndSession: () => void;
}

export function FlipCardArena({ session, onEndSession }: FlipCardArenaProps) {
  const {
    mounted,
    cards,
    totalCards,
    openedCount,
    openedCardIds,
    teams,
    isTeamMode,
    setIsTeamMode,
    teamCount,
    setTeamCount,
    selectedCard,
    setSelectedCard,
    selectedCardIndex,
    isSoundMuted,
    handleToggleSound,
    handleSelectCard,
    handleMarkCompleted,
    handleUpdateScore,
    handleChangeTeamColor,
    handleResetScores,
    handleResetCards,
  } = useFlipCardArena(session);

  if (!mounted) return null;

  const arenaContent = (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto min-h-screen flex
        flex-col bg-[#FDFBF7] selection:bg-[#451420] selection:text-white"
    >
      <GameHeader
        session={session}
        onEndSession={onEndSession}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
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

        <FlipCardProgressBar
          openedCount={openedCount}
          totalCards={totalCards}
          onResetCards={handleResetCards}
        />

        <FlipCardGrid
          cards={cards}
          openedCardIds={openedCardIds}
          onSelectCard={handleSelectCard}
        />
      </main>

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
