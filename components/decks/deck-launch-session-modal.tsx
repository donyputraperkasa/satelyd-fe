"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Tv,
  Copy,
  Check,
  ChevronRight,
  MonitorPlay,
} from "lucide-react";
import type { Deck } from "@/types";
import { createOrGetGameSession } from "@/services";

interface DeckLaunchSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck | null;
}

export type GameType = "FLIP_CARD" | "WHEELS" | "BATTLE_2P";

export function DeckLaunchSessionModal({
  isOpen,
  onClose,
  deck,
}: DeckLaunchSessionModalProps) {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<GameType>("FLIP_CARD");
  const [copied, setCopied] = useState(false);

  // Session pin based on deck pinCode or deck id
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
    router.push(
      `/dashboard/game?deckId=${encodeURIComponent(deck.id)}&mode=${selectedGame}`
    );
    onClose();
  };

  const GAME_OPTIONS: { id: GameType; label: string }[] = [
    { id: "FLIP_CARD", label: "Flip Card Game" },
    { id: "WHEELS", label: "Wheels Question" },
    { id: "BATTLE_2P", label: "Duel 2 Player" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ECD0D8] bg-white p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
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

        {/* Langkah 1: Pilih Jenis Game (Polosan Nama Saja) */}
        <div className="space-y-2 mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            1. Pilih Jenis Permainan:
          </label>

          <div className="grid grid-cols-3 gap-2">
            {GAME_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedGame(item.id)}
                className={`h-11 rounded-xl border text-center text-xs font-bold transition cursor-pointer ${
                  selectedGame === item.id
                    ? "border-[#451420] bg-[#451420] text-white shadow-xs"
                    : "border-[#E5D7DC] bg-[#FAF7F8] text-[#7A5661] hover:bg-white hover:text-[#451420] hover:border-[#451420]/30"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Langkah 2: Hubungkan ke Smart TV */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661]">
            2. Hubungkan ke Smart TV:
          </label>

          {/* Card PIN Sesi TV */}
          <div className="rounded-2xl border border-[#ECD0D8] bg-[#FAF7F2] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#7A283C] uppercase tracking-wider">
                KODE PIN SESI:
              </span>
              <span className="rounded-full bg-[#FAF0F3] border border-[#ECD0D8] px-2 py-0.5 text-[10px] font-bold text-[#7A283C]">
                Tanpa Login di TV
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DFD0D5] bg-white p-2">
              <span className="font-mono font-black text-2xl tracking-[0.2em] text-[#451420] pl-2">
                {sessionPin}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="h-8 inline-flex items-center gap-1.5 rounded-lg border border-[#DFD0D5] bg-[#FAF7F8] hover:bg-[#F5EDF0] px-3 text-xs font-bold text-[#451420] transition cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-[#1D6C31]" />
                    <span className="text-[#1D6C31]">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Salin PIN</span>
                  </>
                )}
              </button>
            </div>

            {/* Petunjuk Pemakaian di TV (Bersih & Rapi) */}
            <div className="text-[11px] text-[#7A5661] space-y-1 pt-1">
              <p className="font-bold text-[#451420]">Cara Membuka di Smart TV:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-[#542B37]">
                <li>Buka browser Smart TV → kunjungi website Satelyd.</li>
                <li>Di beranda TV, klik tombol <strong>&quot;Masukkan PIN&quot;</strong> → pilih tab <strong>&quot;Game TV Kelas&quot;</strong>.</li>
                <li>Ketik kode PIN <strong>{sessionPin}</strong> untuk memulai game di TV.</li>
              </ol>
            </div>
          </div>

          {/* Opsi Alternatif: Buka Langsung di Laptop / HDMI */}
          <div className="flex items-center justify-between rounded-xl border border-[#E5D7DC] bg-white p-3 text-xs text-[#7A5661]">
            <div className="flex items-center gap-2">
              <MonitorPlay size={15} className="text-[#451420] shrink-0" />
              <span>Pakai kabel HDMI / Proyektor?</span>
            </div>

            <button
              type="button"
              onClick={handlePlayDirect}
              className="inline-flex items-center gap-1 font-bold text-[#451420] hover:underline cursor-pointer shrink-0"
            >
              <span>Buka di Layar Ini</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-[#F0E6E9] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-[#DFD0D5] bg-white px-4 text-xs font-bold text-[#451420] hover:bg-[#FAF7F8] transition cursor-pointer shadow-2xs"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePlayDirect}
            className="h-10 inline-flex items-center gap-2 rounded-xl bg-[#451420] hover:bg-[#5B1C2E] px-5 text-xs font-bold text-white shadow-xs transition hover:shadow-md cursor-pointer"
          >
            <Tv size={14} />
            <span>Mulai Game di Layar Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
}
