"use client";

import type { DeckCard, DeckCardOption } from "@/types";
import { ALL_DECK_OPTION_KEYS } from "./card-editor-options-list";

export const DEFAULT_DECK_OPTIONS: DeckCardOption[] = [
  { key: "A", text: "" },
  { key: "B", text: "" },
  { key: "C", text: "" },
  { key: "D", text: "" },
  { key: "E", text: "" },
];

export function useCardEditorOptions(
  currentCard: DeckCard | undefined,
  updateCurrentCard: (updates: Partial<DeckCard>) => void
) {
  const options: DeckCardOption[] =
    currentCard?.options && currentCard.options.length >= 3
      ? currentCard.options
      : DEFAULT_DECK_OPTIONS.slice(0, 4).map(
          (def) => currentCard?.options?.find((o) => o.key === def.key) || def
        );

  const correctKey =
    currentCard?.backAnswer?.match(/^([A-E])\./)?.[1] ||
    (currentCard?.options?.[0]?.key ?? "A");

  const handleSetOptionCount = (count: number) => {
    if (count < 3 || count > 5) return;
    let newOptions = [...options];
    if (newOptions.length > count) {
      newOptions = newOptions.slice(0, count);
    } else if (newOptions.length < count) {
      for (let i = newOptions.length; i < count; i++) {
        newOptions.push({ key: ALL_DECK_OPTION_KEYS[i], text: "" });
      }
    }
    const hasCurrentCorrect = newOptions.some((o) => o.key === correctKey);
    let newBackAnswer = currentCard?.backAnswer || "";
    if (!hasCurrentCorrect && newOptions[0]) {
      const firstOpt = newOptions[0];
      newBackAnswer = `${firstOpt.key}. ${firstOpt.text || `Pilihan ${firstOpt.key}`}`;
    }
    updateCurrentCard({ options: newOptions, backAnswer: newBackAnswer });
  };

  const handleAddOption = () => {
    if (options.length >= 5) return;
    const nextKey = ALL_DECK_OPTION_KEYS[options.length];
    const newOptions = [...options, { key: nextKey, text: "" }];
    updateCurrentCard({ options: newOptions });
  };

  const handleRemoveOption = (optKey: string) => {
    if (options.length <= 3) return;
    const filtered = options.filter((o) => o.key !== optKey);
    const reKeyed = filtered.map((o, idx) => ({
      key: ALL_DECK_OPTION_KEYS[idx],
      text: o.text,
    }));
    const hasCurrentCorrect = reKeyed.some((o) => o.key === correctKey);
    let newBackAnswer = currentCard?.backAnswer || "";
    if (!hasCurrentCorrect && reKeyed[0]) {
      const firstOpt = reKeyed[0];
      newBackAnswer = `${firstOpt.key}. ${firstOpt.text || `Pilihan ${firstOpt.key}`}`;
    }
    updateCurrentCard({ options: reKeyed, backAnswer: newBackAnswer });
  };

  const updateOptionText = (optKey: string, text: string) => {
    const updatedOptions = options.map((opt) =>
      opt.key === optKey ? { ...opt, text } : opt
    );
    let newBackAnswer = currentCard?.backAnswer || "";
    if (newBackAnswer.startsWith(`${optKey}.`)) {
      newBackAnswer = `${optKey}. ${text}`;
    }
    updateCurrentCard({ options: updatedOptions, backAnswer: newBackAnswer });
  };

  const setCorrectOption = (opt: DeckCardOption) => {
    updateCurrentCard({
      backAnswer: `${opt.key}. ${opt.text || `Pilihan ${opt.key}`}`,
    });
  };

  return {
    options,
    correctKey,
    handleSetOptionCount,
    handleAddOption,
    handleRemoveOption,
    updateOptionText,
    setCorrectOption,
  };
}
