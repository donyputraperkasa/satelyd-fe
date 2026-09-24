"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Deck } from "@/types";
import { useToast } from "@/components/ui";
import { fetchDecks } from "@/services";
import { useDeckCrud } from "./use-deck-crud";

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
    return decks.filter((deck) => (
      deck.title.toLowerCase().includes(q) ||
      deck.subject.toLowerCase().includes(q) ||
      deck.gradeLevel.toLowerCase().includes(q) ||
      Boolean(deck.description && deck.description.toLowerCase().includes(q))
    ));
  }, [decks, searchQuery]);

  const crud = useDeckCrud(
    decks,
    setDecks,
    editingDeck,
    setEditingDeck,
    managingDeck,
    setManagingDeck,
    setDeleteCandidate
  );

  const handlePlayOnTv = (deck: Deck) => setSessionDeck(deck);

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
    ...crud,
    handlePlayOnTv,
    handleExportToExam,
  };
}
