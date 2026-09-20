import { useState, useEffect } from "react";
import type { Deck, GameType } from "@/types";
import { fetchDecks } from "@/services";

export function useGameSelectDeck(
  isOpen: boolean,
  onClose: () => void,
  gameType: GameType,
  onStartGame: (deck: Deck, gameType: GameType) => void
) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchDecks()
        .then((data) => {
          setDecks(data);
          if (data.length > 0 && !selectedDeckId) {
            setSelectedDeckId(data[0].id);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const filteredDecks = decks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDeck = decks.find((d) => d.id === selectedDeckId) || null;

  const handleConfirmStart = () => {
    if (selectedDeck) {
      onStartGame(selectedDeck, gameType);
      onClose();
    }
  };

  return {
    decks,
    filteredDecks,
    selectedDeck,
    selectedDeckId,
    setSelectedDeckId,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleConfirmStart,
  };
}
