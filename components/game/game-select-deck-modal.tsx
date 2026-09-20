"use client";

import type { Deck, GameType } from "@/types";
import { useGameSelectDeck } from "./use-game-select-deck";
import { GameSelectDeckHeader } from "./game-select-deck-header";
import { GameSelectDeckList } from "./game-select-deck-list";
import { GameSelectDeckFooter } from "./game-select-deck-footer";

interface GameSelectDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: GameType;
  onStartGame: (deck: Deck, gameType: GameType) => void;
}

export function GameSelectDeckModal({
  isOpen,
  onClose,
  gameType,
  onStartGame,
}: GameSelectDeckModalProps) {
  const {
    decks,
    filteredDecks,
    selectedDeck,
    selectedDeckId,
    setSelectedDeckId,
    isLoading,
    searchQuery,
    setSearchQuery,
    handleConfirmStart,
  } = useGameSelectDeck(isOpen, onClose, gameType, onStartGame);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-[#451420]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-2xl transform overflow-hidden
          rounded-3xl border border-[#DFD0D5] bg-[#FDFBF7] p-6 sm:p-7
          text-[#451420] shadow-2xl transition-all z-10 space-y-5"
      >
        <GameSelectDeckHeader gameType={gameType} onClose={onClose} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#7A5661]">
              Daftar Deck Materi Tersedia ({decks.length})
            </span>
            {decks.length > 3 && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi / kelas..."
                className="text-xs px-3 py-1.5 rounded-xl border border-[#DFD0D5]
                  bg-white text-[#451420] focus:outline-none focus:border-[#451420] w-44"
              />
            )}
          </div>

          <GameSelectDeckList
            isLoading={isLoading}
            decks={filteredDecks}
            selectedDeckId={selectedDeckId}
            onSelectDeck={setSelectedDeckId}
          />
        </div>

        <GameSelectDeckFooter
          selectedDeck={selectedDeck}
          onClose={onClose}
          onConfirm={handleConfirmStart}
        />
      </div>
    </div>
  );
}
