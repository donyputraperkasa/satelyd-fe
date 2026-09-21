"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import type { GameSession, DeckCard } from "@/types";
import { gameAudio } from "../audio";
import { markCardOpened, updateTeamScore } from "@/services";
import {
  BATTLE_TEAMS,
  BATTLE_CONFIG,
  checkOptionCorrectness,
  extractCorrectKey,
} from "./battle-constants";

export type BattlePhase = "READY" | "BUZZED" | "STEAL" | "REVEALED";

const emptySubscribe = () => () => {};

export function useBattleArena(session: GameSession) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const cards = session.deck.cards || [];
  const totalCards = cards.length;

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [phase, setPhase] = useState<BattlePhase>("READY");
  const [buzzedTeamId, setBuzzedTeamId] = useState<string | null>(null);
  const [firstFailedTeamId, setFirstFailedTeamId] = useState<string | null>(null);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [failedOptionKeys, setFailedOptionKeys] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number>(BATTLE_CONFIG.answerTimerSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(gameAudio.getMuted());

  // Teams score & name state
  const [teamScores, setTeamScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {
      "team-left": 0,
      "team-right": 0,
    };
    if (session.teams && session.teams.length >= 2) {
      initial["team-left"] = session.teams[0].score || 0;
      initial["team-right"] = session.teams[1].score || 0;
    }
    return initial;
  });

  const [teamNames, setTeamNames] = useState<Record<string, string>>(() => {
    const names: Record<string, string> = {
      "team-left": BATTLE_TEAMS[0].name,
      "team-right": BATTLE_TEAMS[1].name,
    };
    if (session.teams && session.teams.length >= 2) {
      names["team-left"] = session.teams[0].name || BATTLE_TEAMS[0].name;
      names["team-right"] = session.teams[1].name || BATTLE_TEAMS[1].name;
    }
    return names;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentCard = cards[currentCardIndex] || null;
  const points = currentCard?.points || 10;
  const correctKey = extractCorrectKey(currentCard);

  // Handle sound mute
  const handleToggleSound = () => {
    const next = !isSoundMuted;
    setIsSoundMuted(next);
    gameAudio.setMuted(next);
  };

  // Fullscreen lock body
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          if (prev <= 4) {
            gameAudio.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  // Handle timer running out (Timeout)
  useEffect(() => {
    if (timerSeconds === 0 && (phase === "BUZZED" || phase === "STEAL")) {
      gameAudio.playIncorrectBuzzer();
      if (phase === "BUZZED" && !firstFailedTeamId) {
        // Switch to STEAL
        const otherTeamId = buzzedTeamId === "team-left" ? "team-right" : "team-left";
        setFirstFailedTeamId(buzzedTeamId);
        setBuzzedTeamId(otherTeamId);
        setPhase("STEAL");
        setTimerSeconds(BATTLE_CONFIG.stealTimerSeconds);
        setIsTimerRunning(true);
      } else {
        // Both failed
        setPhase("REVEALED");
        setIsTimerRunning(false);
      }
    }
  }, [timerSeconds, phase, buzzedTeamId, firstFailedTeamId]);

  // Buzzer trigger
  const triggerBuzzer = useCallback(
    (teamId: string) => {
      if (phase !== "READY") return;
      gameAudio.playBuzzerDing();
      setBuzzedTeamId(teamId);
      setPhase("BUZZED");
      setTimerSeconds(currentCard?.timerSeconds || BATTLE_CONFIG.answerTimerSeconds);
      setIsTimerRunning(true);
    },
    [phase, currentCard]
  );

  // Keyboard shortcut listener for Buzzers & Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Buzzer Left: A, Q, Z
      if (
        (e.code === "KeyA" || e.code === "KeyQ" || e.code === "KeyZ") &&
        phase === "READY"
      ) {
        e.preventDefault();
        triggerBuzzer("team-left");
      }

      // Buzzer Right: L, P, Enter
      if (
        (e.code === "KeyL" || e.code === "KeyP" || e.code === "Enter") &&
        phase === "READY"
      ) {
        e.preventDefault();
        triggerBuzzer("team-right");
      }

      // Spacebar to advance if round is finished
      if (e.code === "Space" && phase === "REVEALED") {
        e.preventDefault();
        handleNextRound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, triggerBuzzer]);

  // Answer selection
  const handleSelectOption = (optionKey: string) => {
    if (phase !== "BUZZED" && phase !== "STEAL") return;
    if (isTimerRunning) setIsTimerRunning(false);
    setSelectedOptionKey(optionKey);

    const isCorrect = checkOptionCorrectness(optionKey, currentCard);

    if (isCorrect) {
      // Award score to buzzed team
      gameAudio.playCorrectFanfare();
      if (buzzedTeamId) {
        setTeamScores((prev) => ({
          ...prev,
          [buzzedTeamId]: prev[buzzedTeamId] + points,
        }));
        // Update backend
        if (session.teams && session.teams.length >= 2) {
          const tIdx = buzzedTeamId === "team-left" ? 0 : 1;
          updateTeamScore(session.id, session.teams[tIdx].id, points).catch(() => {});
        }
      }
      setPhase("REVEALED");
      if (currentCard) {
        markCardOpened(session.id, currentCard.id).catch(() => {});
      }
    } else {
      // Wrong answer
      gameAudio.playIncorrectBuzzer();
      setFailedOptionKeys((prev) => (prev.includes(optionKey) ? prev : [...prev, optionKey]));
      if (phase === "BUZZED" && !firstFailedTeamId) {
        // Trigger Steal opportunity for other team
        const otherTeamId = buzzedTeamId === "team-left" ? "team-right" : "team-left";
        setFirstFailedTeamId(buzzedTeamId);
        setBuzzedTeamId(otherTeamId);
        setPhase("STEAL");
        setSelectedOptionKey(null);
        setTimerSeconds(BATTLE_CONFIG.stealTimerSeconds);
        setIsTimerRunning(true);
      } else {
        // Both teams failed
        setPhase("REVEALED");
        if (currentCard) {
          markCardOpened(session.id, currentCard.id).catch(() => {});
        }
      }
    }
  };

  // Manual point award for Essay questions
  const handleAwardEssay = (teamId: string, delta: number) => {
    if (delta > 0) {
      gameAudio.playCorrectFanfare();
    } else {
      gameAudio.playClick();
    }
    setTeamScores((prev) => ({
      ...prev,
      [teamId]: Math.max(0, prev[teamId] + delta),
    }));
    if (session.teams && session.teams.length >= 2) {
      const tIdx = teamId === "team-left" ? 0 : 1;
      updateTeamScore(session.id, session.teams[tIdx].id, delta).catch(() => {});
    }
  };

  // Move to next question / finish
  const handleNextRound = () => {
    gameAudio.playClick();
    setFailedOptionKeys([]);
    if (currentCardIndex + 1 < totalCards) {
      setCurrentCardIndex((prev) => prev + 1);
      setPhase("READY");
      setBuzzedTeamId(null);
      setFirstFailedTeamId(null);
      setSelectedOptionKey(null);
      setIsTimerRunning(false);
      setTimerSeconds(cards[currentCardIndex + 1]?.timerSeconds || BATTLE_CONFIG.answerTimerSeconds);
    } else {
      // Finished all questions -> Show Victory
      gameAudio.playCorrectFanfare();
      setIsVictoryModalOpen(true);
    }
  };

  // Restart game from start
  const handleRestartGame = () => {
    setCurrentCardIndex(0);
    setPhase("READY");
    setBuzzedTeamId(null);
    setFirstFailedTeamId(null);
    setSelectedOptionKey(null);
    setFailedOptionKeys([]);
    setIsTimerRunning(false);
    setIsVictoryModalOpen(false);
    setTeamScores({
      "team-left": 0,
      "team-right": 0,
    });
  };

  // Change team name
  const handleChangeTeamName = (teamId: string, newName: string) => {
    setTeamNames((prev) => ({
      ...prev,
      [teamId]: newName,
    }));
  };

  return {
    mounted,
    cards,
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
    isTimerRunning,
    teamScores,
    teamNames,
    isVictoryModalOpen,
    setIsVictoryModalOpen,
    isSoundMuted,
    handleToggleSound,
    triggerBuzzer,
    handleSelectOption,
    handleAwardEssay,
    handleNextRound,
    handleRestartGame,
    handleChangeTeamName,
  };
}
