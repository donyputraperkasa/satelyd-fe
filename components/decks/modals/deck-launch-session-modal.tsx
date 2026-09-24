"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Tv, ChevronRight, MonitorPlay } from "lucide-react";
import type { DeckLaunchSessionModalProps } from "@/types";
import { createOrGetGameSession } from "@/services";
import { DeckLaunchPinSection } from "./deck-launch-pin-section";
import { DeckLaunchModeSelector, type GameType } from "./deck-launch-mode-selector";

export type { GameType };

export function DeckLaunchSessionModal({
  isOpen,
  onClose,
  deck,
}: DeckLaunchSessionModalProps) {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<GameType>("FLIP_CARD");
  const [copied, setCopied] = useState(false);

  const sessionPin = deck?.pinCode || `TV-${deck?.id ? deck.id.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() : "8821"}`;

  useEffect(() => {
    if (isOpen && deck) {
      createOrGetGameSession(deck.id, selectedGame, sessionPin).catch(() => {});
    }
  }, [isOpen, deck, selectedGame, sessionPin]);

  if (!isOpen || !deck) return null;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(sessionPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePlayDirect = async () => {
    try {
      await createOrGetGameSession(deck.id, selectedGame, sessionPin);
    } catch {
      // safe
    }
    router.push(`/dashboard/game?deckId=${encodeURIComponent(deck.id)}&mode=${selectedGame}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ECD0D8] bg-white p-6 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-[#F0E6E9] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C]">
            <Tv size={20} />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#451420]">
              Mulai Sesi Game di Smart TV
            </h2>
            <p className="text-xs text-[#7A5661]">
              Deck: <strong className="text-[#451420]">{deck.title}</strong> ({deck.cards?.length || deck.cardCount} Kartu Soal)
            </p>
          </div>
        </div>

        <DeckLaunchModeSelector selectedGame={selectedGame} onSelectGame={setSelectedGame} />

        <DeckLaunchPinSection sessionPin={sessionPin} copied={copied} onCopy={handleCopy} />

        <div className="mt-5 pt-4 border-t border-[#F0E6E9] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePlayDirect}
            className="h-10 inline-flex items-center gap-2 rounded-xl bg-[#451420] px-5 text-xs font-black text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer"
          >
            <MonitorPlay size={14} />
            <span>Mulai Bermain</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
