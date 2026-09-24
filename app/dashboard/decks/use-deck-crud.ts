"use client";

import { useState } from "react";
import type { Deck, DeckCard, CreateDeckPayload } from "@/types";
import { useToast } from "@/components/ui";
import {
  createDeck,
  updateDeck,
  saveDeckCards,
  deleteDeck,
} from "@/services";

export function useDeckCrud(
  decks: Deck[],
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>,
  editingDeck: Deck | null,
  setEditingDeck: (d: Deck | null) => void,
  managingDeck: Deck | null,
  setManagingDeck: (d: Deck | null) => void,
  setDeleteCandidate: (d: Deck | null) => void
) {
  const { toast } = useToast();

  const handleCreateOrUpdate = async (payload: CreateDeckPayload) => {
    if (editingDeck) {
      const updated = await updateDeck(editingDeck.id, payload);
      setDecks((prev) =>
        prev.map((d) => (d.id === updated.id ? updated : d))
      );
      setEditingDeck(null);
      toast.success(`Deck "${updated.title}" berhasil diperbarui.`);
    } else {
      const created = await createDeck(payload);
      setDecks((prev) => [created, ...prev]);
      toast.success(`Deck "${created.title}" berhasil dibuat!`);
      setManagingDeck(created);
    }
  };

  const handleSaveCards = async (deckId: string, cards: DeckCard[]) => {
    const updated = await saveDeckCards(deckId, cards);
    setDecks((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
    if (managingDeck?.id === deckId) {
      setManagingDeck(updated);
    }
    toast.success(`Tersimpan ${cards.length} kartu soal untuk deck "${updated.title}".`);
  };

  const handleConfirmDelete = async (deckId: string) => {
    const target = decks.find((d) => d.id === deckId);
    await deleteDeck(deckId);
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
    setDeleteCandidate(null);
    toast.delete(`Deck materi "${target?.title || deckId}" berhasil dihapus.`);
  };

  return {
    handleCreateOrUpdate,
    handleSaveCards,
    handleConfirmDelete,
  };
}
