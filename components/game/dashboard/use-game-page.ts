"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  createOrGetGameSession,
  fetchGameSessionByPin,
  endGameSession,
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

  const handleStartGameFromModal = async (deck: Deck, gameType: GameType) => {
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

  const handleEndSession = async () => {
    if (session) {
      await endGameSession(session.id);
    }
    setSession(null);
    router.push("/dashboard/game");
  };

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
    handleStartGameFromModal,
    handleEndSession,
  };
}
