"use client";

import { useState, useEffect } from "react";
import type { Deck, DeckCard } from "@/types";
import { useToast } from "@/components/ui";
import { getStoredUser } from "@/lib/auth/storage";
import { useCardEditorOptions, DEFAULT_DECK_OPTIONS } from "./use-card-editor-options";
import { useCardImageUpload } from "./use-card-image-upload";
import { createInitialDeckCard, createNewDeckCard } from "./card-editor-utils";

export { DEFAULT_DECK_OPTIONS };

export function useCardEditor(
  deck: Deck,
  isOpen: boolean,
  onSaveCards: (deckId: string, cards: DeckCard[]) => Promise<void>,
  onClose: () => void
) {
  const { toast } = useToast();
  const [cards, setCards] = useState<DeckCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavedToast, setIsSavedToast] = useState(false);

  const draftKey = deck?.id ? `satelyd_draft_deck_${deck.id}` : null;

  useEffect(() => {
    if (!isOpen || !deck?.id) return;

    if (draftKey && typeof window !== "undefined") {
      try {
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCards(parsed);
            setActiveCardIndex(0);
            toast.info(`Memulihkan draf ${parsed.length} soal yang belum tersimpan.`);
            return;
          }
        }
      } catch {}
    }

    if (deck?.cards && deck.cards.length > 0) {
      setCards(JSON.parse(JSON.stringify(deck.cards)));
    } else {
      setCards([createInitialDeckCard(deck.id)]);
    }
    setActiveCardIndex(0);
  }, [deck, isOpen]);

  // Simpan draf otomatis ke localStorage setiap kali ada perubahan kartu
  useEffect(() => {
    if (!isOpen || !draftKey || cards.length === 0 || typeof window === "undefined") return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(cards));
    } catch {}
  }, [cards, isOpen, draftKey]);

  const currentCard: DeckCard | undefined = cards[activeCardIndex] || cards[0];
  const totalPoints = cards.reduce((sum, c) => sum + (c.points || 10), 0);

  const updateCurrentCard = (updates: Partial<DeckCard>) => {
    setCards((prev) => {
      const copy = [...prev];
      if (copy[activeCardIndex]) copy[activeCardIndex] = { ...copy[activeCardIndex], ...updates };
      return copy;
    });
  };

  const optionHandlers = useCardEditorOptions(currentCard, updateCurrentCard);
  const imageHandlers = useCardImageUpload(updateCurrentCard);

  const handleAddCard = () => {
    const newNumber = cards.length + 1;
    const newCard = createNewDeckCard(deck.id, newNumber, optionHandlers.options.length);
    setCards((prev) => [...prev, newCard]);
    setActiveCardIndex(cards.length);
  };

  const handleDeleteCard = (index: number) => {
    if (cards.length <= 1) {
      toast.error("Deck materi harus memiliki minimal 1 kartu soal.");
      return;
    }
    const filtered = cards.filter((_, idx) => idx !== index).map((c, idx) => ({ ...c, orderIndex: idx + 1 }));
    setCards(filtered);
    if (activeCardIndex >= filtered.length) {
      setActiveCardIndex(Math.max(0, filtered.length - 1));
    }
    toast.delete(`Kartu soal nomor ${index + 1} berhasil dihapus.`);
  };

  const handleSave = async () => {
    const user = getStoredUser();
    const isAdmin = user?.role === "ADMIN";
    const maxFree = 8;
    const isUnlocked = Boolean(deck.isTokenUnlocked);

    if (cards.length > maxFree && !isAdmin && !isUnlocked) {
      const balance = user?.gameTokenBalance ?? 0;
      if (balance < 1) {
        toast.error(
          `Deck ini memiliki ${cards.length} soal (melebihi kuota ${maxFree} soal gratis). Anda memerlukan 1 Token Game (Rp 2.500) untuk membuka kuota tak terbatas, atau kurangi jumlah soal menjadi ${maxFree}.`
        );
        return;
      }
    }

    setIsSaving(true);
    try {
      await onSaveCards(deck.id, cards);
      setIsSavedToast(true);
      if (draftKey && typeof window !== "undefined") {
        try {
          localStorage.removeItem(draftKey);
        } catch {}
      }
      setTimeout(() => setIsSavedToast(false), 2000);
      onClose();
    } catch (err) {
      // JANGAN tutup modal agar soal yang sudah diketik tidak hilang!
      console.error("Gagal menyimpan kartu:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    cards,
    activeCardIndex,
    setActiveCardIndex,
    currentCard,
    ...optionHandlers,
    ...imageHandlers,
    totalPoints,
    isSaving,
    isSavedToast,
    updateCurrentCard,
    handleAddCard,
    handleDeleteCard,
    handleSave,
  };
}
