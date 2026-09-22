"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  createOrGetGameSession,
  fetchGameSessionByPin,
  endGameSession,
  validateGameSessionStart,
  deductGameToken,
  recordGameSessionUsage,
  getUserTokenBalances,
} from "@/services";
import type { GameSession, Deck, GameType } from "@/types";

export function useGamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const deckId = searchParams.get("deckId");
  const modeParam = searchParams.get("mode") as GameType | null;
  const pinParam = searchParams.get("pin");

  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Modals state
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [selectedGameForGuide, setSelectedGameForGuide] =
    useState<GameType | null>(null);
  const [selectedGameForModal, setSelectedGameForModal] =
    useState<GameType | null>(null);

  // Token & quota validation state
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [pendingDeck, setPendingDeck] = useState<Deck | null>(null);
  const [pendingGameType, setPendingGameType] = useState<GameType | null>(null);
  const [tokenValidation, setTokenValidation] = useState<{
    allowed: boolean;
    requiresToken: boolean;
    reason?: "DAILY_LIMIT_EXCEEDED" | "NEEDS_TOKEN_FOR_DECK";
    tokenCost: number;
  } | null>(null);

  useEffect(() => {
    async function initGameSession() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        if (deckId) {
          const loaded = await createOrGetGameSession(
            deckId,
            modeParam || "FLIP_CARD"
          );
          setSession(loaded);
        } else if (pinParam) {
          const loaded = await fetchGameSessionByPin(pinParam);
          if (!loaded) {
            throw new Error(`Sesi dengan PIN "${pinParam}" tidak ditemukan.`);
          }
          setSession(loaded);
        } else {
          setSession(null);
        }
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Gagal memuat sesi permainan."
        );
      } finally {
        setIsLoading(false);
      }
    }
    initGameSession();
  }, [deckId, modeParam, pinParam]);

  const executeStartSession = async (deck: Deck, gameType: GameType) => {
    setIsLoading(true);
    try {
      const newSession = await createOrGetGameSession(deck.id, gameType);
      setSession(newSession);
      router.push(
        `/dashboard/game?deckId=${encodeURIComponent(deck.id)}&mode=${gameType}`
      );
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Gagal memulai sesi permainan."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartGameFromModal = async (deck: Deck, gameType: GameType) => {
    const cardCount = deck.cards?.length || deck.cardCount || 0;
    const validation = validateGameSessionStart(cardCount);

    if (validation.requiresToken) {
      setPendingDeck(deck);
      setPendingGameType(gameType);
      setTokenValidation(validation);
      setSelectedGameForModal(null);
      setIsTokenModalOpen(true);
      return;
    }

    // Free within daily quota (Deck <= 8 and remaining > 0)
    recordGameSessionUsage();
    await executeStartSession(deck, gameType);
  };

  const handleConfirmUseToken = async () => {
    if (!pendingDeck || !pendingGameType) return;
    const deducted = deductGameToken();
    if (!deducted) {
      setErrorMsg("Saldo Token Game tidak mencukupi.");
      setIsTokenModalOpen(false);
      return;
    }

    recordGameSessionUsage();
    setIsTokenModalOpen(false);
    await executeStartSession(pendingDeck, pendingGameType);
  };

  const handleEndSession = async () => {
    if (session) {
      await endGameSession(session.id);
    }
    setSession(null);
    router.push("/dashboard/game");
  };

  const { gameTokenBalance } = getUserTokenBalances();

  return {
    session,
    isLoading,
    errorMsg,
    setErrorMsg,
    isGuideModalOpen,
    setIsGuideModalOpen,
    selectedGameForGuide,
    setSelectedGameForGuide,
    selectedGameForModal,
    setSelectedGameForModal,
    isTokenModalOpen,
    setIsTokenModalOpen,
    pendingDeck,
    pendingGameType,
    tokenValidation,
    gameTokenBalance,
    handleStartGameFromModal,
    handleConfirmUseToken,
    handleEndSession,
  };
}
