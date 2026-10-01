"use client";

import { AlertCircle, Coins, ArrowRight, X } from "lucide-react";
import Link from "next/link";

interface TokenInsufficientModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenBalance: number;
}

export function TokenInsufficientModal({
  isOpen,
  onClose,
  tokenBalance,
}: TokenInsufficientModalProps) {
  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FDFBF7] dark:bg-[#1C202C] p-6 text-[#451420] dark:text-[#F8FAFC] shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5D7DC] dark:border-[#282E3E]">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <Coins size={20} />
            <h3 className="text-base font-black text-[#451420] dark:text-[#F8FAFC]">Token Publish Habis</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF2F4] dark:hover:bg-[#282E3E] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="my-5 text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400">
            <AlertCircle size={28} />
          </div>

          <h4 className="text-lg font-black text-[#451420] dark:text-[#F8FAFC]">
            Sisa Saldo: {tokenBalance.toLocaleString("id-ID")} Token Publish
          </h4>

          <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
            Untuk mengaktifkan dan mempublikasikan ruang ujian ini kepada siswa, Anda memerlukan minimal{" "}
            <strong className="text-[#451420] dark:text-[#F8FAFC]">1 Token Publish</strong>. Silakan isi ulang kuota token Anda terlebih dahulu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E] transition cursor-pointer"
          >
            Nanti Saja
          </button>
          <Link
            href="/dashboard/tokens"
            onClick={onClose}
            className="h-11 flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] dark:bg-white text-xs font-black text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition shadow-xs cursor-pointer"
          >
            <span>Beli Token Sekarang</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
