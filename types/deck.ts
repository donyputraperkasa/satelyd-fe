export interface DeckCardOption {
  key: string; // e.g. "A", "B", "C", "D"
  text: string;
}

export interface DeckCard {
  id: string;
  deckId: string;
  orderIndex: number;
  frontQuestion: string;
  questionType: "MULTIPLE_CHOICE" | "ESSAY";
  options?: DeckCardOption[];
  backAnswer: string;
  explanation?: string;
  points: number;
  timerSeconds?: number;
  imageUrl?: string;
  answerImageUrl?: string;
}

export interface Deck {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  description?: string;
  cardCount: number;
  difficulty?: "MUDAH" | "SEDANG" | "SULIT" | "CAMPURAN";
  pinCode?: string;
  createdAt: string;
  updatedAt?: string;
  cards?: DeckCard[];
}

export interface DeckSummaryMetrics {
  totalDecks: number;
  totalCards: number;
  totalSubjects: number;
  avgCardsPerDeck: number;
}

export interface CreateDeckPayload {
  title: string;
  subject: string;
  gradeLevel: string;
  description?: string;
  difficulty?: "MUDAH" | "SEDANG" | "SULIT" | "CAMPURAN";
  pinCode?: string;
}

export interface UpdateDeckPayload extends Partial<CreateDeckPayload> {
  cards?: DeckCard[];
}

export interface DeckStatsProps {
  decks: Deck[];
}

export interface DeckHeaderBannerProps {
  onOpenCreateModal: () => void;
  isCreating: boolean;
}

export interface DeckQuickActionsProps {
  onOpenCreateModal: () => void;
  isCreating: boolean;
}

export interface DeleteDeckModalProps {
  isOpen: boolean;
  deck: Deck | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface DeckFlipCardPreviewProps {
  card: DeckCard;
  cardNumber: number;
  totalCards: number;
  isRevealed: boolean;
  onToggleReveal: () => void;
  onNext: () => void;
  onPrev: () => void;
}
