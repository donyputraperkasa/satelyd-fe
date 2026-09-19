"use client";

import { useState } from "react";
import {
  Layers,
  Clock,
  Award,
  Tv,
  Settings2,
  ChevronRight,
  MoreVertical,
  Edit2,
  Trash2,
  GraduationCap,
  Copy,
  Check,
} from "lucide-react";
import type { Deck } from "@/types";

interface DeckCardItemProps {
  deck: Deck;
  onManageCards: (deck: Deck) => void;
  onEditDeck: (deck: Deck) => void;
  onDeleteDeck: (deck: Deck) => void;
  onPlayOnTv: (deck: Deck) => void;
  onExportToExam: (deck: Deck) => void;
}

export function DeckCardItem({
  deck,
  onManageCards,
  onEditDeck,
  onDeleteDeck,
  onPlayOnTv,
  onExportToExam,
}: DeckCardItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const sessionPin = deck.pinCode || `TV-${deck.id.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() || "8821"}`;

  const handleCopyPin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(sessionPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardCount = deck.cards ? deck.cards.length : deck.cardCount;
  const totalPoints = deck.cards
    ? deck.cards.reduce((sum, c) => sum + (c.points || 10), 0)
    : cardCount * 10;
  const estimatedSeconds = deck.cards
    ? deck.cards.reduce((sum, c) => sum + (c.timerSeconds || 30), 0)
    : cardCount * 30;

  const difficultyBadges = {
    MUDAH: "bg-[#EDF7ED] border-[#C8E6C9] text-[#2E7D32]",
    SEDANG: "bg-amber-50 border-amber-200 text-amber-800",
    SULIT: "bg-rose-50 border-rose-200 text-rose-800",
    CAMPURAN: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs hover:border-[#C5A5B0] hover:shadow-md transition-all duration-200">
      <div>
        {/* Top Badges & Menu */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-1 text-xs font-bold text-[#7A283C]">
              {deck.subject}
            </span>
            <span className="rounded-lg bg-[#F5EFEB] border border-[#E5D7DC] px-2.5 py-1 text-xs font-semibold text-[#573E47]">
              {deck.gradeLevel}
            </span>
            {deck.difficulty && (
              <span
                className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold ${
                  difficultyBadges[deck.difficulty] || difficultyBadges.SEDANG
                }`}
              >
                {deck.difficulty}
              </span>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="h-7 w-7 inline-flex items-center justify-center rounded-lg text-[#9C737F] hover:text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-8 z-30 w-48 rounded-2xl border border-[#E5D7DC] bg-white py-1.5 shadow-xl">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEditDeck(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Edit Informasi Deck</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onExportToExam(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#1B4D20] hover:bg-[#F0FDF4] transition cursor-pointer"
                  >
                    <GraduationCap size={13} />
                    <span>Jadikan Ujian Siswa</span>
                  </button>
                  <div className="my-1 border-t border-[#F0E6E9]" />
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDeleteDeck(deck);
                    }}
                    className="flex w-full items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#8A1F2D] hover:bg-[#FBEAEB] transition cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Hapus Deck</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <h3 className="text-lg sm:text-xl font-black text-[#451420] group-hover:text-[#6E1F33] transition-colors leading-snug">
            {deck.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#7A5661] line-clamp-2 leading-relaxed">
            {deck.description || "Kumpulan kartu pertanyaan kuis interaktif untuk latihan harian dan evaluasi kelas."}
          </p>
        </div>

        {/* Middle Metrics Strip (Identical to ExamCard) */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#ECDDE2]/80 text-xs">
          <div className="flex items-center gap-2 text-[#634852]">
            <Layers size={15} className="text-[#7A283C] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Soal</p>
              <p className="font-bold text-[#451420]">{cardCount} Kartu</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <Clock size={15} className="text-[#7A283C] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Est. Waktu</p>
              <p className="font-bold text-[#451420]">~{Math.round(estimatedSeconds / 60) || 2} Menit</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <Award size={15} className="text-amber-700 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Total Poin</p>
              <p className="font-bold text-[#451420]">{totalPoints} Pts</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#634852]">
            <Tv size={15} className="text-[#2E7D32] shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-[#9C737F]">Smart TV</p>
              <p className="font-bold text-[#2E7D32]">Siap Main</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area with PIN Sesi TV & Buttons (h-10) */}
      <div className="mt-6 pt-4 border-t border-[#E5D7DC] space-y-2.5">
        {/* PIN Sesi Smart TV (Persis Kode Token di Mode Ujian) */}
        <div className="flex items-center justify-between rounded-xl border border-[#ECDDE2] bg-[#FAF7F2] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#7A5661]">
              PIN SESI TV:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#451420]">
              {sessionPin}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#8F6672] bg-white px-2 py-0.5 rounded border border-[#DFD0D5]">
              {deck.createdAt}
            </span>
            <button
              type="button"
              onClick={handleCopyPin}
              className="h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-xs font-bold text-[#7A283C] bg-white border border-[#E5D7DC] hover:border-[#7A283C] hover:bg-[#FAF0F3] transition cursor-pointer shadow-2xs"
              title="Salin PIN Sesi TV"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#2E7D32]" />
                  <span className="text-[#2E7D32]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Buttons matching ExamCardFooter */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPlayOnTv(deck)}
            className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FAF2F4] border border-[#ECDDE2] px-3 text-xs font-bold text-[#7A283C] hover:bg-[#F3E2E7] transition cursor-pointer shadow-2xs"
          >
            <Tv size={14} />
            <span>Mulai Sesi TV</span>
            <ChevronRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => onManageCards(deck)}
            className="h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DFD0D5] bg-white px-3 text-xs font-bold text-[#451420] hover:bg-[#FAF7F2] transition cursor-pointer shadow-2xs"
          >
            <Settings2 size={14} />
            <span>Kelola Soal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
