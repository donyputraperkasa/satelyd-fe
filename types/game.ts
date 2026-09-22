import type { ComponentType } from "react";
import type { Deck, DeckCard } from "./deck";

export type GameType = "FLIP_CARD" | "WHEELS" | "BATTLE_2P";

export interface GameTeam {
  id: string;
  name: string;
  color: string;
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
  openedCardIds: string[];
}

export interface FlipCardSessionState {
  currentCard: DeckCard | null;
  isAnswerRevealed: boolean;
  timerSeconds: number;
  isTimerRunning: boolean;
}

export interface GameCardConfig {
  type: GameType;
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  iconBg: string;
  image?: string;
}

export interface GameArenaProps {
  session: GameSession;
  onEndSession: () => void;
}

export type WheelsArenaProps = GameArenaProps;
export type FlipCardArenaProps = GameArenaProps;
export type BattleArenaProps = GameArenaProps;

export interface WheelsCanvasProps {
  cards: DeckCard[];
  allCards: DeckCard[];
  currentAngle: number;
  isSpinning: boolean;
  onSpin: () => void;
  pointerBounce: number;
}

export interface WheelsControlsProps {
  isSpinning: boolean;
  onSpin: () => void;
  activeCount: number;
  totalCount: number;
  answeredCount: number;
  eliminateOnAnswer: boolean;
  onToggleEliminate: (val: boolean) => void;
  onResetWheel: () => void;
}

export interface GameHeaderProps {
  session: GameSession;
  onEndSession: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export interface GameEndSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  gameType: GameType;
}

export interface GameHeaderBannerProps {
  title?: string;
  subtitle?: string;
}

export interface GameHeaderControlsProps {
  isFullscreen: boolean;
  isSoundMuted: boolean;
  onToggleFullscreen: () => void;
  onToggleSound: () => void;
  onOpenExitModal: () => void;
}

export interface GameSessionErrorProps {
  error: string | null;
  onBackToDashboard: () => void;
}

export interface GameModeCardProps {
  card: GameCardConfig;
  index: number;
  onSelect: (type: GameType) => void;
}

export interface GameTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  userTokens: number;
}

export interface GameSelectDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: GameType;
  onDeckSelected: (deck: Deck) => void;
}

export interface GameSelectDeckItemProps {
  deck: Deck;
  onSelect: (deck: Deck) => void;
}

export interface GameSelectDeckHeaderProps {
  gameType: GameType;
  onClose: () => void;
}

export interface GameSelectDeckFooterProps {
  onClose: () => void;
}

export interface GameSelectDeckListProps {
  decks: Deck[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectDeck: (deck: Deck) => void;
}
