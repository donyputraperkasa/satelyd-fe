"use client";

import { useRef } from "react";
import type { DeckCard } from "@/types";

export function useCardImageUpload(
  updateCurrentCard: (updates: Partial<DeckCard>) => void
) {
  const questionImageInputRef = useRef<HTMLInputElement>(null);
  const answerImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "question" | "answer"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("Ukuran gambar maksimal 2MB");
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateCurrentCard(
        target === "question" ? { imageUrl: dataUrl } : { answerImageUrl: dataUrl }
      );
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return {
    questionImageInputRef,
    answerImageInputRef,
    handleImageUpload,
  };
}
