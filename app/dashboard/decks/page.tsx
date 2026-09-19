"use client";

import { useState } from "react";
import { CheckCircle2, Layers, Plus } from "lucide-react";
import {
  DeckHeaderBanner,
  DeckQuickActions,
  DeckCardItem,
  DeckTable,
  DeckCreateModal,
  DeckCardEditorModal,
  DeleteDeckModal,
  DeckLaunchSessionModal,
} from "@/components/decks";
import { GuideModal } from "@/components/guides";
import { useDecksPage } from "./use-decks-page";

export default function DecksPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const {
    decks,
    filteredDecks,
    isLoading,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    toast,
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
    handleCreateOrUpdate,
    handleSaveCards,
    handleConfirmDelete,
    handlePlayOnTv,
    handleExportToExam,
  } = useDecksPage();

  return (
    <div className="space-y-6">
      {/* Floating Toast Feedback */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2.5 rounded-2xl border border-[#C8E6C9] bg-white/95 px-4 py-3 text-xs sm:text-sm font-bold text-[#1B4D20] shadow-xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 size={18} className="text-[#2E7D32] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Banner */}
      <DeckHeaderBanner
        onCreateNew={() => {
          setEditingDeck(null);
          setIsCreateModalOpen(true);
        }}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Search & Actions Bar */}
      <DeckQuickActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={decks.length}
      />

      {/* Grid of Decks (Card Grid vs Table serasi dengan Mode Ujian) */}
      {filteredDecks.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredDecks.map((deck) => (
              <DeckCardItem
                key={deck.id}
                deck={deck}
                onManageCards={(d) => setManagingDeck(d)}
                onEditDeck={(d) => {
                  setEditingDeck(d);
                  setIsCreateModalOpen(true);
                }}
                onDeleteDeck={(d) => setDeleteCandidate(d)}
                onPlayOnTv={handlePlayOnTv}
                onExportToExam={handleExportToExam}
              />
            ))}
          </div>
        ) : (
          <DeckTable
            decks={filteredDecks}
            onManageCards={(d) => setManagingDeck(d)}
            onEditDeck={(d) => {
              setEditingDeck(d);
              setIsCreateModalOpen(true);
            }}
            onDeleteDeck={(d) => setDeleteCandidate(d)}
            onPlayOnTv={handlePlayOnTv}
            onExportToExam={handleExportToExam}
          />
        )
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#ECD0D8] bg-[#FAF7F8] p-10 sm:p-14 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF0F3] text-[#7A283C] mb-3">
            <Layers size={28} />
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#451420]">
            {searchQuery
              ? "Tidak ada deck yang sesuai pencarian"
              : "Belum ada Deck Soal"}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#7A5661] max-w-sm">
            {searchQuery
              ? "Coba ubah kata kunci pencarian Anda."
              : "Mulai buat deck pertama Anda untuk mengelompokkan kartu soal kuis Smart TV dan Ujian."}
          </p>

          <button
            onClick={() => {
              if (searchQuery) {
                setSearchQuery("");
              } else {
                setEditingDeck(null);
                setIsCreateModalOpen(true);
              }
            }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#451420] px-4 py-2 text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer"
          >
            {searchQuery ? (
              <span>Reset Pencarian</span>
            ) : (
              <>
                <Plus size={15} />
                <span>Buat Deck Sekarang</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal Buat / Edit Deck */}
      <DeckCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingDeck(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingDeck}
      />

      {/* Modal Editor Butir Kartu Soal */}
      {managingDeck && (
        <DeckCardEditorModal
          isOpen={!!managingDeck}
          onClose={() => setManagingDeck(null)}
          deck={managingDeck}
          onSaveCards={handleSaveCards}
        />
      )}

      {/* Modal Konfirmasi Hapus Deck */}
      <DeleteDeckModal
        isOpen={!!deleteCandidate}
        deck={deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Modal Mulai Sesi Game Smart TV (PIN & Mode Selector) */}
      <DeckLaunchSessionModal
        isOpen={!!sessionDeck}
        onClose={() => setSessionDeck(null)}
        deck={sessionDeck}
      />

      {/* Modal Panduan Khusus Deck */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        type="DECKS"
      />
    </div>
  );
}
