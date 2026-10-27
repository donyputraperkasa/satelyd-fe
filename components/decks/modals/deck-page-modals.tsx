"use client";

import type { DeckPageModalsProps } from "@/types";
import { DeckCreateModal } from "./deck-create-modal";
import { DeckCardEditorModal } from "./deck-card-editor-modal";
import { DeleteDeckModal } from "./delete-deck-modal";
import { DeckLaunchSessionModal } from "./deck-launch-session-modal";
import { ExportToExamModal } from "./export-to-exam-modal";
import { GuideModal } from "@/components/guides";

export function DeckPageModals({
  isCreateModalOpen,
  setIsCreateModalOpen,
  editingDeck,
  setEditingDeck,
  managingDeck,
  setManagingDeck,
  deleteCandidate,
  setDeleteCandidate,
  exportCandidate,
  setExportCandidate,
  onExportSuccess,
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

      <ExportToExamModal
        isOpen={!!exportCandidate}
        deck={exportCandidate}
        onClose={() => setExportCandidate(null)}
        onSuccess={onExportSuccess}
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
