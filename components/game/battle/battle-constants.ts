import type { DeckCard } from "@/types";

export interface BattleTeamConfig {
  id: string;
  name: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  buzzerBg: string;
  buzzerHover: string;
  buzzerBorder: string;
  buzzerShadow: string;
  glowColor: string;
  shortcutKey: string;
  shortcutCode: string;
}

export const BATTLE_TEAMS: BattleTeamConfig[] = [
  {
    id: "team-left",
    name: "Tim 1 (Merah)",
    color: "red",
    badgeBg: "bg-[#FBEAEB]",
    badgeBorder: "border-[#F2C2C6]",
    badgeText: "text-[#B3261E]",
    buzzerBg: "bg-[#B3261E]",
    buzzerHover: "hover:bg-[#8F1D17]",
    buzzerBorder: "border-[#F2C2C6]",
    buzzerShadow: "shadow-md shadow-[#B3261E]/30",
    glowColor: "rgba(179, 38, 30, 0.45)",
    shortcutKey: "A",
    shortcutCode: "KeyA",
  },
  {
    id: "team-right",
    name: "Tim 2 (Biru)",
    color: "blue",
    badgeBg: "bg-[#EBF2FC]",
    badgeBorder: "border-[#C5D8F7]",
    badgeText: "text-[#1557B0]",
    buzzerBg: "bg-[#1557B0]",
    buzzerHover: "hover:bg-[#0E3E80]",
    buzzerBorder: "border-[#C5D8F7]",
    buzzerShadow: "shadow-md shadow-[#1557B0]/30",
    glowColor: "rgba(21, 87, 176, 0.45)",
    shortcutKey: "L",
    shortcutCode: "KeyL",
  },
];

export const BATTLE_CONFIG = {
  answerTimerSeconds: 15,
  stealTimerSeconds: 10,
};

/**
 * Robust check if a selected option key matches the card's answer.
 * Handles:
 * - Direct letter match ("A" === "A")
 * - Formatted letter answers ("A. 11x - 2", "A) Kelembaman", "A - ...", "A:")
 * - First character matches
 * - Option text matches backAnswer directly
 */
export function checkOptionCorrectness(
  optionKey: string,
  card: DeckCard | null
): boolean {
  if (!card || !card.backAnswer) return false;
  const rawBack = card.backAnswer.trim().toUpperCase();
  const rawKey = optionKey.trim().toUpperCase();

  if (rawKey === rawBack) return true;

  if (
    rawBack.startsWith(rawKey + ".") ||
    rawBack.startsWith(rawKey + ")") ||
    rawBack.startsWith(rawKey + " -") ||
    rawBack.startsWith(rawKey + ":") ||
    rawBack.startsWith(rawKey + " ")
  ) {
    return true;
  }

  if (rawBack.length > 0 && rawBack[0] === rawKey) {
    return true;
  }

  if (card.options && Array.isArray(card.options)) {
    const matchedOpt = card.options.find(
      (opt) => opt.key.trim().toUpperCase() === rawKey
    );
    if (matchedOpt && matchedOpt.text) {
      const optText = matchedOpt.text.trim().toUpperCase();
      if (rawBack === optText || rawBack.includes(optText) || optText.includes(rawBack)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Extracts a normalized single-letter key (e.g. "A", "B", "C", "D") for display.
 */
export function extractCorrectKey(card: DeckCard | null): string {
  if (!card || !card.backAnswer) return "A";
  const rawBack = card.backAnswer.trim().toUpperCase();
  const firstChar = rawBack.slice(0, 1);
  if (["A", "B", "C", "D", "E"].includes(firstChar)) {
    return firstChar;
  }
  if (card.options && Array.isArray(card.options)) {
    for (const opt of card.options) {
      const optText = opt.text.trim().toUpperCase();
      if (rawBack === optText || rawBack.includes(optText) || optText.includes(rawBack)) {
        return opt.key.trim().toUpperCase();
      }
    }
  }
  return firstChar;
}
