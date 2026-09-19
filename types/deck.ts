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
