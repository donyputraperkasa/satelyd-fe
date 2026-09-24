import type { DeckCard } from "@/types";
import { ALL_DECK_OPTION_KEYS } from "./card-editor-options-list";

export function createInitialDeckCard(deckId: string): DeckCard {
  return {
    id: `CRD-${Date.now()}-1`,
    deckId,
    orderIndex: 1,
    frontQuestion: "",
    questionType: "MULTIPLE_CHOICE",
    options: [
      { key: "A", text: "" },
      { key: "B", text: "" },
      { key: "C", text: "" },
      { key: "D", text: "" },
    ],
    backAnswer: "A. ",
    explanation: "",
    points: 10,
    timerSeconds: 30,
  };
}

export function createNewDeckCard(
  deckId: string,
  newNumber: number,
  optionCount: number
): DeckCard {
  const count = Math.max(3, Math.min(5, optionCount || 4));
  const options = ALL_DECK_OPTION_KEYS.slice(0, count).map((key) => ({
    key,
    text: "",
  }));

  return {
    id: `CRD-${Date.now()}-${newNumber}`,
    deckId,
    orderIndex: newNumber,
    frontQuestion: "",
    questionType: "MULTIPLE_CHOICE",
    options,
    backAnswer: "A. ",
    explanation: "",
    points: 10,
    timerSeconds: 30,
  };
}
