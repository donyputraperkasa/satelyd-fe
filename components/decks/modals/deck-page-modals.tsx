"use client";

import type { Deck, DeckCard, CreateDeckPayload } from "@/types";
import { DeckCreateModal } from "./deck-create-modal";
import { DeckCardEditorModal } from "./deck-card-editor-modal";
import { DeleteDeckModal } from "./delete-deck-modal";
import { DeckLaunchSessionModal } from "./deck-launch-session-modal";
import { GuideModal } from "@/components/guides";

interface DeckPageModalsProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (val: boolean) => void;
  editingDeck: Deck | null;
  setEditingDeck: (deck: Deck | null) => void;
  managingDeck: Deck | null;
  setManagingDeck: (deck: Deck | null) => void;
  deleteCandidate: Deck | null;
  setDeleteCandidate: (deck: Deck | null) => void;
  sessionDeck: Deck | null;
  setSessionDeck: (deck: Deck | null) => void;
  isGuideModalOpen: boolean;
  setIsGuideModalOpen: (val: boolean) => void;
  handleCreateOrUpdate: (payload: CreateDeckPayload) => Promise<void>;
  handleSaveCards: (deckId: string, cards: DeckCard[]) => Promise<void>;
  handleConfirmDelete: (deckId: string) => Promise<void>;
}

export function DeckPageModals({
  isCreateModalOpen,
  setIsCreateModalOpen,
  editingDeck,
  setEditingDeck,
  managingDeck,
  setManagingDeck,
  deleteCandidate,
  setDeleteCandidate,
  sessionDeck,
  setSessionDeck,
  isGuideModalOpen,
  setIsGuideModalOpen,
  handleCreateOrUpdate,
  handleSaveCards,
  handleConfirmDelete,
}: DeckPageModalsProps) {
  return (
    <>
      <DeckCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingDeck(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingDeck}
      />

      {managingDeck && (
        <DeckCardEditorModal
          isOpen={!!managingDeck}
          onClose={() => setManagingDeck(null)}
          deck={managingDeck}
          onSaveCards={handleSaveCards}
        />
      )}

      <DeleteDeckModal
        isOpen={!!deleteCandidate}
        deck={deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={handleConfirmDelete}
      />

      <DeckLaunchSessionModal
        isOpen={!!sessionDeck}
        onClose={() => setSessionDeck(null)}
        deck={sessionDeck}
      />

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        type="DECKS"
      />
    </>
  );
}
