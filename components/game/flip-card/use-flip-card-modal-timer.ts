import { useState, useEffect } from "react";
import type { DeckCard } from "@/types";
import { gameAudio } from "../game-audio";

export function useFlipCardModalTimer(card: DeckCard | null) {
  const initialSeconds = card?.timerSeconds || 30;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Auto-start timer whenever card changes
  useEffect(() => {
    if (card) {
      setSeconds(card.timerSeconds || 30);
      setIsRunning(true);
      gameAudio.playCardFlip();
    }
  }, [card]);

  // Countdown loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            gameAudio.playTimerAlarm();
            setIsRunning(false);
            return 0;
          }
          if (prev <= 5) {
            gameAudio.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  const toggleTimer = () => {
    gameAudio.playClick();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    gameAudio.playClick();
    setIsRunning(true);
    setSeconds(card?.timerSeconds || 30);
  };

  return {
    seconds,
    isRunning,
    toggleTimer,
    resetTimer,
  };
}
