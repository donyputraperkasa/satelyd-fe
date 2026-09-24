export interface DeckCardOption {
  key: string; // e.g. "A", "B", "C", "D", "E"
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
  onCreateNew: () => void;
  onOpenGuide: () => void;
}

export interface DeckQuickActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  totalCount: number;
}

export interface DeleteDeckModalProps {
  isOpen: boolean;
  deck: Deck | null;
  onClose: () => void;
  onConfirm: (deckId: string) => Promise<void> | void;
}

export interface DeckFlipCardPreviewProps {
  card: DeckCard;
  index: number;
}

export interface DeckCardItemProps {
  deck: Deck;
  onManageCards: (deck: Deck) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deck: Deck) => void;
  onPlayOnTv: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
}

export interface DeckTableRowProps {
  deck: Deck;
  index: number;
  onManageCards: (deck: Deck) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deck: Deck) => void;
  onPlayOnTv: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
}

export interface DeckTableProps {
  decks: Deck[];
  onManageCards: (deck: Deck) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deck: Deck) => void;
  onPlayOnTv: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
}

export interface DeckCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateDeckPayload) => Promise<void>;
  initialData?: Deck | null;
}

export interface DeckLaunchSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck | null;
}

export interface DeckCardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck;
  onSaveCards: (deckId: string, cards: DeckCard[]) => Promise<void>;
}

export interface DeckEmptyStateProps {
  searchQuery: string;
  onResetSearch: () => void;
  onCreateNew: () => void;
}

// Subcomponent Props for Deck Card Editor
export interface CardEditorHeaderProps {
  title: string;
  subject: string;
  gradeLevel: string;
  sessionPin: string;
  isSavedToast: boolean;
  onClose: () => void;
}

export interface CardEditorSidebarProps {
  cards: DeckCard[];
  activeCardIndex: number;
  totalPoints: number;
  onSelectCard: (index: number) => void;
  onAddCard: () => void;
}

export interface CardEditorOptionsListProps {
  options: DeckCardOption[];
  correctKey: string;
  onSelectCorrect: (opt: DeckCardOption) => void;
  onUpdateText: (key: string, text: string) => void;
  onSetCount: (count: number) => void;
  onAddOption: () => void;
  onRemoveOption: (key: string) => void;
}

export interface CardEditorFormProps {
  currentCard: DeckCard;
  cardIndex: number;
  totalCards: number;
  options: DeckCardOption[];
  correctKey: string;
  questionImageInputRef: React.RefObject<HTMLInputElement | null>;
  answerImageInputRef: React.RefObject<HTMLInputElement | null>;
  onUpdateCurrentCard: (updates: Partial<DeckCard>) => void;
  onDeleteCard: (index: number) => void;
  onSelectCorrectOption: (opt: DeckCardOption) => void;
  onUpdateOptionText: (key: string, text: string) => void;
  onSetOptionCount: (count: number) => void;
  onAddOption: () => void;
  onRemoveOption: (key: string) => void;
  onImageUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "question" | "answer"
  ) => void;
}

export interface CardEditorFooterProps {
  onClose: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export type DeckDifficulty = "MUDAH" | "SEDANG" | "SULIT" | "CAMPURAN";

export interface DeckCreateFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  gradeLevel: string;
  setGradeLevel: (val: string) => void;
  difficulty: DeckDifficulty;
  setDifficulty: (val: DeckDifficulty) => void;
  description: string;
  setDescription: (val: string) => void;
  pinCode: string;
  setPinCode: (val: string) => void;
}
