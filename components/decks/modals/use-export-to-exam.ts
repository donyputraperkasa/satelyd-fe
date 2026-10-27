"use client";

import { useState, useEffect, type FormEvent } from "react";
import type { Deck } from "@/types";
import { useToast } from "@/components/ui";
import {
  createTeacherExam,
  saveExamQuestions,
  fetchDeckById,
} from "@/services";
import { buildQuestionsFromCards } from "./export-to-exam-utils";

export function useExportToExam(
  deck: Deck | null,
  onClose: () => void,
  onSuccess: (examId: string) => void
) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [customPin, setCustomPin] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardCount = deck?.cards ? deck.cards.length : deck?.cardCount || 0;

  useEffect(() => {
    if (deck) {
      setTitle(deck.title || "");
      setDescription(deck.description || "");
      const estimatedMinutes = Math.max(
        15,
        Math.min(120, Math.ceil((cardCount || 10) * 2))
      );
      setDurationMinutes(estimatedMinutes);

      const rawPin = deck.pinCode
        ? deck.pinCode.replace(/[^A-Za-z0-9]/g, "").slice(0, 6).toUpperCase()
        : "";
      setCustomPin(rawPin);
    }
  }, [deck, cardCount]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!deck || !title.trim()) {
      toast.error("Judul ujian tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    try {
      let cards = deck.cards;
      if (!cards || cards.length === 0) {
        const fullDeck = await fetchDeckById(deck.id);
        if (fullDeck?.cards && fullDeck.cards.length > 0) {
          cards = fullDeck.cards;
        }
      }

      const generatedPin = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const pinCode = customPin.trim()
        ? customPin.trim().toUpperCase()
        : generatedPin;

      const createdExam = await createTeacherExam({
        title: title.trim(),
        description: description.trim() || undefined,
        durationMinutes: Number(durationMinutes) || 60,
        pin: pinCode,
      });

      const rawCards = cards || [];
      if (rawCards.length > 0) {
        const questionsPayload = buildQuestionsFromCards(rawCards);
        await saveExamQuestions(createdExam.id, questionsPayload);
      }

      toast.success(
        `Paket Ujian "${createdExam.title}" berhasil dibuat dengan ${rawCards.length} butir soal!`
      );
      onClose();
      onSuccess(createdExam.id);
    } catch (err: unknown) {
      console.error("Gagal mengekspor deck ke paket ujian:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Gagal membuat paket ujian dari deck.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    durationMinutes,
    setDurationMinutes,
    customPin,
    setCustomPin,
    description,
    setDescription,
    isSubmitting,
    cardCount,
    handleSubmit,
  };
}
