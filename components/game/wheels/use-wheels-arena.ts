"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { GameSession, DeckCard, GameTeam } from "@/types";
import { COLOR_OPTIONS } from "../flip-card/flip-card-scoreboard-constants";
import { gameAudio } from "../audio";
import { markCardOpened, updateTeamScore } from "@/services";
import { WHEEL_CONFIG } from "./wheels-constants";

const emptySubscribe = () => () => {};

export function useWheelsArena(session: GameSession) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [openedCardIds, setOpenedCardIds] = useState<string[]>(
    session.openedCardIds || []
  );
  const [eliminatedCardIds, setEliminatedCardIds] = useState<string[]>(
    session.openedCardIds || []
  );
  const [eliminateOnAnswer, setEliminateOnAnswer] = useState<boolean>(true);

  // Teams & Scoring
  const [teams, setTeams] = useState<GameTeam[]>(() => {
    return (session.teams || []).map((t, idx) => ({
      ...t,
      name: `Tim ${idx + 1} (${
        COLOR_OPTIONS.find((c) => c.id === t.color)?.label || "Warna"
      })`,
    }));
  });
  const [isTeamMode, setIsTeamMode] = useState<boolean>(true);
  const [teamCount, setTeamCount] = useState<number>(4);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(
    gameAudio.getMuted()
  );

  // Wheel State
  const [currentAngle, setCurrentAngle] = useState<number>(0); // In degrees
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [landedCard, setLandedCard] = useState<DeckCard | null>(null);
  const [landedOriginalIndex, setLandedOriginalIndex] = useState<number>(0);

  // Selected card for Question Modal
  const [selectedCard, setSelectedCard] = useState<DeckCard | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);

  // Pointer bounce trigger (timestamp or counter)
  const [pointerBounce, setPointerBounce] = useState<number>(0);

  const animFrameRef = useRef<number | null>(null);
  const lastPegIndexRef = useRef<number>(-1);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  const allCards = useMemo(() => session.deck.cards || [], [session.deck.cards]);
  const totalCards = allCards.length;

  // Active cards in wheel
  const activeCards = useMemo(() => {
    if (!eliminateOnAnswer) return allCards;
    const remaining = allCards.filter((c) => !eliminatedCardIds.includes(c.id));
    return remaining.length > 0 ? remaining : allCards;
  }, [allCards, eliminateOnAnswer, eliminatedCardIds]);

  const handleToggleSound = () => {
    const next = !isSoundMuted;
    setIsSoundMuted(next);
    gameAudio.setMuted(next);
  };

  // Spin the wheel with high realism easing
  const spinWheel = useCallback(() => {
    if (isSpinning || activeCards.length === 0) return;

    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    setIsSpinning(true);
    gameAudio.playClick();

    const segmentCount = activeCards.length;
    const segAngle = 360 / segmentCount;

    // 1. Pick a random winning segment index among active cards
    const winningActiveIdx = Math.floor(Math.random() * segmentCount);
    const winningCard = activeCards[winningActiveIdx];

    // Find original index in allCards for card number display
    const origIdx = allCards.findIndex((c) => c.id === winningCard.id);

    // Segment angle center (in wheel surface degrees)
    // Add jitter so it doesn't land dead-center: between 20% and 80% of the segment
    const jitter = (Math.random() * 0.6 + 0.2 - 0.5) * segAngle;
    const segCenterAngle = winningActiveIdx * segAngle + segAngle / 2 + jitter;

    // Pointer is at 12 o'clock = 270 degrees
    // We want: (segCenterAngle + targetAngle) % 360 == 270
    // So targetAngle % 360 = (270 - segCenterAngle + 360) % 360
    const desiredFinalMod = (270 - segCenterAngle + 720) % 360;

    const curMod = currentAngle % 360;
    let forwardDelta = desiredFinalMod - curMod;
    if (forwardDelta < 0) forwardDelta += 360;

    const fullRotations =
      Math.floor(
        Math.random() *
          (WHEEL_CONFIG.maxRotations - WHEEL_CONFIG.minRotations + 1)
      ) + WHEEL_CONFIG.minRotations;

    const totalDelta = fullRotations * 360 + forwardDelta;
    const startAngle = currentAngle;
    const endAngle = startAngle + totalDelta;

    const duration =
      Math.floor(
        Math.random() *
          (WHEEL_CONFIG.maxDurationMs - WHEEL_CONFIG.minDurationMs + 1)
      ) + WHEEL_CONFIG.minDurationMs;

    const startTime = performance.now();
    lastPegIndexRef.current = -1;

    // Ease-out quartic for realistic gradual deceleration
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easedProgress = easeOutQuart(progress);
      const angle = startAngle + totalDelta * easedProgress;

      setCurrentAngle(angle);

      // Check peg tick passing pointer (270 deg)
      // Pointer relative position on wheel
      const pointerOnWheel = (270 - (angle % 360) + 720) % 360;
      const currentPegIdx = Math.floor(pointerOnWheel / segAngle);

      if (currentPegIdx !== lastPegIndexRef.current) {
        lastPegIndexRef.current = currentPegIdx;
        // Pitch variation depending on speed
        const speedRatio = 1 - progress;
        gameAudio.playWheelTick(0.9 + speedRatio * 0.4);
        setPointerBounce(Date.now());
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation finished
        setCurrentAngle(endAngle);
        setIsSpinning(false);
        setLandedCard(winningCard);
        const resolvedIndex = origIdx >= 0 ? origIdx : winningActiveIdx;
        setLandedOriginalIndex(resolvedIndex);
        gameAudio.playCorrectFanfare();

        // Directly open the question modal after brief 600ms fanfare pause
        openTimerRef.current = setTimeout(() => {
          setSelectedCard(winningCard);
          setSelectedCardIndex(resolvedIndex);
        }, 600);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, activeCards, allCards, currentAngle]);

  // Mark card completed / answered
  const handleMarkCompleted = async (cardId: string) => {
    if (!openedCardIds.includes(cardId)) {
      setOpenedCardIds((prev) => [...prev, cardId]);
      try {
        await markCardOpened(session.id, cardId);
      } catch {}
    }
    if (eliminateOnAnswer && !eliminatedCardIds.includes(cardId)) {
      setEliminatedCardIds((prev) => [...prev, cardId]);
    }
  };

  // Scoring handlers
  const handleUpdateScore = async (teamId: string, delta: number) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t
      )
    );
    try {
      await updateTeamScore(session.id, teamId, delta);
    } catch {}
  };

  const handleChangeTeamColor = (teamId: string, color: string) => {
    const label = COLOR_OPTIONS.find((c) => c.id === color)?.label || color;
    setTeams((prev) =>
      prev.map((t, idx) =>
        t.id === teamId ? { ...t, color, name: `Tim ${idx + 1} (${label})` } : t
      )
    );
  };

  const handleResetScores = () => {
    if (confirm("Reset semua nilai tim menjadi 0 poin?")) {
      setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    }
  };

  const handleResetWheel = () => {
    setEliminatedCardIds([]);
    setOpenedCardIds([]);
    setLandedCard(null);
  };

  return {
    mounted,
    allCards,
    totalCards,
    activeCards,
    openedCardIds,
    eliminatedCardIds,
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
    landedCard,
    landedOriginalIndex,
    selectedCard,
    setSelectedCard,
    selectedCardIndex,
    spinWheel,
    handleMarkCompleted,
    handleUpdateScore,
    handleChangeTeamColor,
    handleResetScores,
    handleResetWheel,
  };
}
