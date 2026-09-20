import type { Deck, DeckCard } from "./deck";

export type GameType = "FLIP_CARD" | "WHEELS" | "BATTLE_2P";

export interface GameTeam {
  id: string;
  name: string;
  color: string; // e.g. "red", "blue", "green", "amber"
  score: number;
}

export interface GameSession {
  id: string;
  pinCode: string;
  deckId: string;
  deck: Deck;
  gameType: GameType;
  status: "ACTIVE" | "ENDED";
  createdAt: string;
  teams: GameTeam[];
  openedCardIds: string[]; // Cards that have been flipped/answered
}

export interface FlipCardSessionState {
  currentCard: DeckCard | null;
  isAnswerRevealed: boolean;
  timerSeconds: number;
  isTimerRunning: boolean;
}
