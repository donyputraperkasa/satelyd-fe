"use client";

import { useState, useEffect, type FormEvent } from "react";
import type { CreateDeckPayload, Deck, DeckDifficulty } from "@/types";

export function useDeckCreateForm(
  isOpen: boolean,
  initialData: Deck | null | undefined,
  onSubmit: (payload: CreateDeckPayload) => Promise<void>,
  onClose: () => void
) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Matematika");
  const [gradeLevel, setGradeLevel] = useState("Kelas 8 SMP");
  const [difficulty, setDifficulty] = useState<DeckDifficulty>("SEDANG");
  const [description, setDescription] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubject(initialData.subject);
      setGradeLevel(initialData.gradeLevel);
      setDifficulty(initialData.difficulty || "SEDANG");
      setDescription(initialData.description || "");
      setPinCode(initialData.pinCode || "");
    } else {
      setTitle("");
      setSubject("Matematika");
      setGradeLevel("Kelas 8 SMP");
      setDifficulty("SEDANG");
      setDescription("");
      setPinCode("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !gradeLevel.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        subject: subject.trim(),
        gradeLevel: gradeLevel.trim(),
        difficulty,
        description: description.trim(),
        pinCode: pinCode.trim().toUpperCase() || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    subject,
    setSubject,
    gradeLevel,
    setGradeLevel,
    difficulty,
    setDifficulty,
    description,
    setDescription,
    pinCode,
    setPinCode,
    isSubmitting,
    handleSubmit,
  };
}
