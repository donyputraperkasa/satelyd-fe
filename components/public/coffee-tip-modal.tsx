"use client";

import { useState, useEffect } from "react";
import { Coffee, Copy, Check, X, Heart, MessageCircle } from "lucide-react";
import type { CoffeeTipModalProps } from "@/types";
import { BANK_ACCOUNTS } from "@/components/tokens/checkout-bank-destination";

export function CoffeeTipModal({ isOpen, onClose }: CoffeeTipModalProps) {
  const [selectedBank, setSelectedBank] = useState<"BCA" | "MANDIRI">("BCA");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const current = BANK_ACCOUNTS[selectedBank];
  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(current.accountNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    "Halo masdon, saya sudah mengirimkan apresiasi traktir kopi untuk mendukung Satelyd! Terima kasih atas platformnya."
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 text-gray-900 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer transition"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFDD00] text-black shadow-xs mb-3">
            <Coffee size={24} className="stroke-[2.5]" />
          </div>
          <h3 className="font-display text-xl font-bold text-gray-900 flex items-center justify-center gap-1.5">
            Buy me caramel matchiato <Heart size={16} className="text-rose-500 fill-rose-500" />
          </h3>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            Bantu developer dengan memberi support dan dukungan melalui tip dan apresiasi untuk biaya server dan pengembangan berkelanjutan.
          </p>
        </div>

        {/* Bank Selection Tabs */}
        <div className="grid grid-cols-2 gap-2.5 mb-3.5">
          {(["BCA", "MANDIRI"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => { setSelectedBank(b); setIsCopied(false); }}
              className={`h-11 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                selectedBank === b
                  ? "border-gray-900 bg-gray-900 text-white shadow-xs font-extrabold"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Bank Details Box */}
        <div className="rounded-2xl border border-gray-200/90 bg-gray-50/90 p-4 space-y-2 mb-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">{current.bankName}</span>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md">Atas Nama</span>
          </div>
          <p className="text-xs font-bold text-gray-900">{current.accountHolder}</p>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200">
            <span className="font-mono text-base font-black tracking-wider text-gray-900">
              {current.accountNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-lg bg-white border border-gray-200 px-3.5 py-1.5 text-xs font-bold text-gray-800 hover:bg-gray-100 transition cursor-pointer shadow-2xs"
            >
              {isCopied ? <><Check size={13} className="text-green-600" /> Tersalin</> : <><Copy size={13} /> Salin</>}
            </button>
          </div>
        </div>

        {/* Action Button: Konfirmasi via WA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="h-11 w-full flex items-center justify-center gap-2 rounded-xl bg-[#128C7E] hover:bg-[#0E6C61] text-white px-4 text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer active:scale-98"
        >
          <MessageCircle size={16} />
          <span>Konfirmasi Apresiasi via WA</span>
        </a>
      </div>
    </div>
  );
}
