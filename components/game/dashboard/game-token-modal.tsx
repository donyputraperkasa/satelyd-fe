"use client";

import { Coins, AlertTriangle, ArrowRight, X, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Deck, GameType } from "@/types";

interface GameTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Deck | null;
  gameType: GameType | null;
  reason?: "DAILY_LIMIT_EXCEEDED" | "NEEDS_TOKEN_FOR_DECK";
  tokenCost: number;
  currentBalance: number;
  onConfirmUseToken: () => void;
}

export function GameTokenModal({
  isOpen,
  onClose,
  deck,
  reason,
  currentBalance,
  onConfirmUseToken,
}: GameTokenModalProps) {
  if (!isOpen || !deck) return null;

  const cardCount = deck.cards?.length || deck.cardCount || 0;
  const hasEnoughBalance = currentBalance >= 1;

  const isDailyLimit = reason === "DAILY_LIMIT_EXCEEDED";

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#DFD0D5] flex flex-col items-center text-center space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Icon Header */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${
            hasEnoughBalance
              ? "bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C]"
              : "bg-[#FFF8E6] border border-[#F2DEB0] text-[#9A6200]"
          }`}
        >
          {hasEnoughBalance ? (
            <Coins className="w-8 h-8 text-[#7A283C] animate-pulse" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-[#9A6200]" />
          )}
        </div>

        {/* Title & Info */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#7A283C]">
            {hasEnoughBalance ? "Konfirmasi Sesi Game" : "Token Game Diperlukan"}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#451420]">
            {hasEnoughBalance
              ? "Gunakan 1 Token Game?"
              : isDailyLimit
              ? "Kuota Sesi Gratis Habis"
              : "Deck Soal Lengkap (> 8 Soal)"}
          </h2>
          <p className="text-xs text-[#7A5661] leading-relaxed max-w-sm mx-auto">
            {isDailyLimit ? (
              <>
                Batas <strong>4 sesi gratis hari ini</strong> telah tercapai.
                {hasEnoughBalance
                  ? " Gunakan 1 Token Game dari saldo Anda untuk memainkan sesi tambahan sekarang."
                  : " Isi ulang Token Game untuk memainkan sesi tambahan hari ini atau tunggu reset besok."}
              </>
            ) : (
              <>
                Deck <strong>&ldquo;{deck.title}&rdquo;</strong> memiliki{" "}
                <strong>{cardCount} soal</strong> (melebihi batas gratis 8 soal).
                {hasEnoughBalance
                  ? " Buka sesi Smart TV untuk deck lengkap ini menggunakan 1 Token Game."
                  : " Membuka sesi game untuk deck lengkap memerlukan 1 Token Game (Rp 3.000)."}
              </>
            )}
          </p>
        </div>

        {/* Token Balance Pill */}
        <div className="w-full bg-[#FAF7F2] border border-[#ECD0D8] rounded-2xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#7A5661] font-medium">
            <Coins size={16} className="text-[#7A283C]" />
            <span>Saldo Token Game Anda:</span>
          </div>
          <span className="font-display font-black text-base text-[#451420]">
            {currentBalance} <span className="text-xs font-bold text-[#7A5661]">Token</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          {hasEnoughBalance ? (
            <button
              type="button"
              onClick={onConfirmUseToken}
              className="w-full py-3.5 px-5 rounded-xl bg-[#451420] text-white hover:bg-[#320E17] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles size={16} />
              <span>Gunakan 1 Token & Mulai Sesi</span>
            </button>
          ) : (
            <Link
              href="/dashboard/tokens"
              className="w-full py-3.5 px-5 rounded-xl bg-[#451420] text-white hover:bg-[#320E17] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Beli Token Game (Rp 3.000)</span>
              <ArrowRight size={16} />
            </Link>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
