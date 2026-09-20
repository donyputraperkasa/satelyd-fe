"use client";

import type { DeckCard, GameTeam } from "@/types";
import { useFlipCardQuestionLogic } from "./use-flip-card-question-logic";
import { FlipCardModalHeader } from "./flip-card-modal-header";
import { FlipCardOptionsList } from "./flip-card-options-list";
import { FlipCardAnswerPanel } from "./flip-card-answer-panel";
import { FlipCardAwardPanel } from "./flip-card-award-panel";
import { FlipCardModalFooter } from "./flip-card-modal-footer";

interface FlipCardQuestionModalProps {
  card: DeckCard;
  cardNumber: number;
  onClose: () => void;
  onMarkCompleted: (cardId: string) => void;
  teams: GameTeam[];
  isTeamMode?: boolean;
  onAwardScore: (teamId: string, delta: number) => void;
}

export function FlipCardQuestionModal({
  card,
  cardNumber,
  onClose,
  onMarkCompleted,
  teams,
  isTeamMode = true,
  onAwardScore,
}: FlipCardQuestionModalProps) {
  const {
    seconds,
    isRunning,
    toggleTimer,
    resetTimer,
    isAnswerRevealed,
    selectedOptionKey,
    awardedTeamId,
    setAwardedTeamId,
    points,
    correctKey,
    handleSelectOption,
    handleRevealAnswer,
    handleFinish,
  } = useFlipCardQuestionLogic(card, onMarkCompleted, onClose);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FDFBF7] rounded-3xl border-2 border-[#DFD0D5] shadow-2xl flex flex-col overflow-hidden">
        <FlipCardModalHeader
          cardNumber={cardNumber}
          points={points}
          questionType={card.questionType}
          seconds={seconds}
          isRunning={isRunning}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          onClose={handleFinish}
        />

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5661]">
              Pertanyaan:
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#451420] leading-snug">
              {card.frontQuestion}
            </h2>
          </div>

          {card.imageUrl && (
            <div className="rounded-2xl border border-[#E5D7DC] bg-white p-2 max-w-lg mx-auto overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageUrl}
                alt="Gambar Soal"
                className="w-full h-auto max-h-[300px] object-contain rounded-xl"
              />
            </div>
          )}

          <FlipCardOptionsList
            card={card}
            selectedOptionKey={selectedOptionKey}
            isAnswerRevealed={isAnswerRevealed}
            correctKey={correctKey}
            onSelectOption={handleSelectOption}
          />

          <FlipCardAnswerPanel
            card={card}
            isAnswerRevealed={isAnswerRevealed}
            onRevealAnswer={handleRevealAnswer}
          />

          <FlipCardAwardPanel
            isTeamMode={isTeamMode}
            isAnswerRevealed={isAnswerRevealed}
            teams={teams}
            points={points}
            awardedTeamId={awardedTeamId}
            onAward={(teamId) => {
              onAwardScore(teamId, points);
              setAwardedTeamId(teamId);
            }}
          />
        </div>

        <FlipCardModalFooter onFinish={handleFinish} />
      </div>
    </div>
  );
}
