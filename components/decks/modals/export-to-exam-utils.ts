import type { DeckCard, ExamQuestion } from "@/types";
import { extractCorrectKey } from "@/components/game/battle/battle-constants";

export function buildQuestionsFromCards(cards: DeckCard[]): ExamQuestion[] {
  return cards.map((card, idx) => {
    let options =
      card.options && card.options.length > 0
        ? card.options.map((opt) => ({
            key: opt.key.trim().toUpperCase(),
            text: opt.text.trim(),
          }))
        : [];

    if (options.length < 2) {
      const rawAns =
        card.backAnswer?.replace(/^[A-E]\.\s*/i, "").trim() || "Pilihan A";
      options = [
        { key: "A", text: rawAns },
        { key: "B", text: "Pilihan B" },
        { key: "C", text: "Pilihan C" },
        { key: "D", text: "Pilihan D" },
      ];
    }

    const correctKey = extractCorrectKey(card);

    return {
      id: card.id || `q-${idx + 1}-${Date.now()}`,
      number: idx + 1,
      questionText: card.frontQuestion || `Pertanyaan #${idx + 1}`,
      questionType: "MULTIPLE_CHOICE",
      options,
      correctAnswer: correctKey,
      points: card.points || 10,
      imageUrl: card.imageUrl,
      explanation: card.explanation,
    };
  });
}
