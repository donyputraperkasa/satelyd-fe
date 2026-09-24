"use client";

import { useState } from "react";
import {
  DeckHeaderBanner,
  DeckQuickActions,
  DeckCardItem,
  DeckTable,
  DeckEmptyState,
  DeckPageModals,
} from "@/components/decks";
import { useDecksPage } from "./use-decks-page";

export default function DecksPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const pageState = useDecksPage();

  const handleOpenCreate = () => {
    pageState.setEditingDeck(null);
    pageState.setIsCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <DeckHeaderBanner
        onCreateNew={handleOpenCreate}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      <DeckQuickActions
        searchQuery={pageState.searchQuery}
        onSearchChange={pageState.setSearchQuery}
        viewMode={pageState.viewMode}
        onViewModeChange={pageState.setViewMode}
        totalCount={pageState.decks.length}
      />

      {pageState.filteredDecks.length > 0 ? (
        pageState.viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {pageState.filteredDecks.map((deck) => (
              <DeckCardItem
                key={deck.id}
                deck={deck}
                onManageCards={(d) => pageState.setManagingDeck(d)}
                onEditDeck={(d) => {
                  pageState.setEditingDeck(d);
                  pageState.setIsCreateModalOpen(true);
                }}
                onDeleteDeck={(d) => pageState.setDeleteCandidate(d)}
                onPlayOnTv={pageState.handlePlayOnTv}
                onExportToExam={pageState.handleExportToExam}
              />
            ))}
          </div>
        ) : (
          <DeckTable
            decks={pageState.filteredDecks}
            onManageCards={(d) => pageState.setManagingDeck(d)}
            onEditDeck={(d) => {
              pageState.setEditingDeck(d);
              pageState.setIsCreateModalOpen(true);
            }}
            onDeleteDeck={(d) => pageState.setDeleteCandidate(d)}
            onPlayOnTv={pageState.handlePlayOnTv}
            onExportToExam={pageState.handleExportToExam}
          />
        )
      ) : (
        <DeckEmptyState
          searchQuery={pageState.searchQuery}
          onResetSearch={() => pageState.setSearchQuery("")}
          onCreateNew={handleOpenCreate}
        />
      )}

      <DeckPageModals
        isCreateModalOpen={pageState.isCreateModalOpen}
        setIsCreateModalOpen={pageState.setIsCreateModalOpen}
        editingDeck={pageState.editingDeck}
        setEditingDeck={pageState.setEditingDeck}
        managingDeck={pageState.managingDeck}
        setManagingDeck={pageState.setManagingDeck}
        deleteCandidate={pageState.deleteCandidate}
        setDeleteCandidate={pageState.setDeleteCandidate}
        sessionDeck={pageState.sessionDeck}
        setSessionDeck={pageState.setSessionDeck}
        isGuideModalOpen={isGuideModalOpen}
        setIsGuideModalOpen={setIsGuideModalOpen}
        handleCreateOrUpdate={pageState.handleCreateOrUpdate}
        handleSaveCards={pageState.handleSaveCards}
        handleConfirmDelete={pageState.handleConfirmDelete}
      />
    </div>
  );
}
