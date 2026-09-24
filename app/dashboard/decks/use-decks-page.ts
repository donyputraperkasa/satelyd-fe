"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Deck, DeckCard, CreateDeckPayload } from "@/types";
import { useToast } from "@/components/ui";
import {
  fetchDecks,
  createDeck,
  updateDeck,
  saveDeckCards,
  deleteDeck,
} from "@/services";

export function useDecksPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [managingDeck, setManagingDeck] = useState<Deck | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Deck | null>(null);
  const [sessionDeck, setSessionDeck] = useState<Deck | null>(null);

  const notify = (msg: string) => {
    toast.info(msg);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDecks();
      setDecks(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDecks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return decks;
    return decks.filter((deck) => {
      return (
        deck.title.toLowerCase().includes(q) ||
        deck.subject.toLowerCase().includes(q) ||
        deck.gradeLevel.toLowerCase().includes(q) ||
        (deck.description && deck.description.toLowerCase().includes(q))
      );
    });
  }, [decks, searchQuery]);

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
      // Auto open card editor for the newly created deck
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

  const handlePlayOnTv = (deck: Deck) => {
    setSessionDeck(deck);
  };

  const handleExportToExam = (deck: Deck) => {
    toast.info(`Mengimpor butir soal dari "${deck.title}" ke paket Ujian Sekolah...`);
    router.push(`/dashboard/exams?importDeckId=${encodeURIComponent(deck.id)}`);
  };

  return {
    decks,
    filteredDecks,
    isLoading,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    toast,
    notify,
    isCreateModalOpen,
    setIsCreateModalOpen,
    editingDeck,
    setEditingDeck,
    managingDeck,
    setManagingDeck,
    deleteCandidate,
    setDeleteCandidate,
    sessionDeck,
    setSessionDeck,
    handleCreateOrUpdate,
    handleSaveCards,
    handleConfirmDelete,
    handlePlayOnTv,
    handleExportToExam,
  };
}
