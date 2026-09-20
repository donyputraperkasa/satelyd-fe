import { useState, useEffect } from "react";
import type { GameSession, DeckCard, GameTeam } from "@/types";
import { COLOR_OPTIONS } from "./flip-card-scoreboard-constants";
import { gameAudio } from "../audio";
import { markCardOpened, updateTeamScore } from "@/services";

export function useFlipCardArena(session: GameSession) {
  const [mounted, setMounted] = useState(false);
  const [openedCardIds, setOpenedCardIds] = useState<string[]>(session.openedCardIds || []);
  const [teams, setTeams] = useState<GameTeam[]>(() => {
    return (session.teams || []).map((t, idx) => ({
      ...t,
      name: `Tim ${idx + 1} (${COLOR_OPTIONS.find((c) => c.id === t.color)?.label || "Warna"})`,
    }));
  });
  const [isTeamMode, setIsTeamMode] = useState<boolean>(true);
  const [teamCount, setTeamCount] = useState<number>(4);
  const [selectedCard, setSelectedCard] = useState<DeckCard | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(gameAudio.getMuted());

  useEffect(() => {
    setMounted(true);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  const cards = session.deck.cards || [];
  const totalCards = cards.length;
  const openedCount = openedCardIds.length;

  const handleToggleSound = () => {
    const next = !isSoundMuted;
    setIsSoundMuted(next);
    gameAudio.setMuted(next);
  };

  const handleSelectCard = (card: DeckCard, index: number) => {
    setSelectedCard(card);
    setSelectedCardIndex(index);
  };

  const handleMarkCompleted = async (cardId: string) => {
    if (!openedCardIds.includes(cardId)) {
      setOpenedCardIds((prev) => [...prev, cardId]);
      try {
        await markCardOpened(session.id, cardId);
      } catch {}
    }
  };

  const handleUpdateScore = async (teamId: string, delta: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t))
    );
    try {
      await updateTeamScore(session.id, teamId, delta);
    } catch {}
  };

  const handleChangeTeamColor = (teamId: string, color: string) => {
    const label = COLOR_OPTIONS.find((c) => c.id === color)?.label || color;
    setTeams((prev) =>
      prev.map((t, idx) => (t.id === teamId ? { ...t, color, name: `Tim ${idx + 1} (${label})` } : t))
    );
  };

  const handleResetScores = () => {
    if (confirm("Reset semua nilai tim menjadi 0 poin?")) {
      setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    }
  };

  const handleResetCards = () => {
    if (confirm("Reset semua kartu menjadi belum dibuka? Poin tim tetap tersimpan.")) {
      setOpenedCardIds([]);
    }
  };

  return {
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
  };
}
