import { useState } from "react";
import type { DeckCard } from "@/types";
import { gameAudio } from "../game-audio";
import { useFlipCardModalTimer } from "./use-flip-card-modal-timer";

export function useFlipCardQuestionLogic(
  card: DeckCard,
  onMarkCompleted: (cardId: string) => void,
  onClose: () => void
) {
  const { seconds, isRunning, toggleTimer, resetTimer } = useFlipCardModalTimer(card);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [awardedTeamId, setAwardedTeamId] = useState<string | null>(null);

  const points = card.points || 10;
  const correctKey = card.backAnswer?.trim().slice(0, 1).toUpperCase() || "A";

  const handleSelectOption = (key: string) => {
    setSelectedOptionKey(key);
    if (isAnswerRevealed) {
      const isCorrect = key.toUpperCase() === correctKey ||
        Boolean(card.backAnswer?.toUpperCase().startsWith(key.toUpperCase()));
      if (isCorrect) gameAudio.playCorrectFanfare();
      else gameAudio.playIncorrectBuzzer();
    } else {
      gameAudio.playSelectOption();
    }
  };

  const handleRevealAnswer = () => {
    setIsAnswerRevealed(true);
    const isCorrect = selectedOptionKey && (
      selectedOptionKey.toUpperCase() === correctKey ||
      Boolean(card.backAnswer?.toUpperCase().startsWith(selectedOptionKey.toUpperCase()))
    );
    if (isCorrect || !selectedOptionKey) gameAudio.playCorrectFanfare();
    else gameAudio.playIncorrectBuzzer();
  };

  const handleFinish = () => {
    onMarkCompleted(card.id);
    onClose();
  };

  return {
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
  };
}
