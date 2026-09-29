"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { BcaLogo, MandiriLogo } from "./bank-logos";

export const BANK_ACCOUNTS = {
  BCA: {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "0374555339",
    accountHolder: "Albertus Magnus Dony Putra Perkasa",
  },
  MANDIRI: {
    bankName: "Bank Mandiri",
    accountNumber: "1370016948529",
    accountHolder: "Albertus Magnus Dony Putra Perkasa",
  },
};

interface CheckoutBankDestinationProps {
  selectedBank: "BCA" | "MANDIRI";
  onSelectBank: (bank: "BCA" | "MANDIRI") => void;
}

export function CheckoutBankDestination({
  selectedBank,
  onSelectBank,
}: CheckoutBankDestinationProps) {
  const [isCopied, setIsCopied] = useState(false);
  const currentBank = BANK_ACCOUNTS[selectedBank];

  const handleCopyRekening = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentBank.accountNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2.5">
      <span className="text-xs font-bold text-[#451420] dark:text-[#F8FAFC]">
        Pilih Bank Tujuan Transfer:
      </span>

      {/* Bank Selector Tabs */}
      <div className="grid grid-cols-2 gap-3">
        {(["BCA", "MANDIRI"] as const).map((bankKey) => {
          const isSelected = selectedBank === bankKey;
          const Logo = bankKey === "BCA" ? BcaLogo : MandiriLogo;
          return (
            <button
              key={bankKey}
              type="button"
              onClick={() => {
                onSelectBank(bankKey);
                setIsCopied(false);
              }}
              className={`h-11 px-3 rounded-xl border-2 flex items-center justify-center gap-2.5 transition cursor-pointer text-xs font-bold ${
                isSelected
                  ? "border-[#451420] dark:border-[#C67D00] bg-[#FAF0F3] dark:bg-[#C67D00]/15 text-[#451420] dark:text-[#F8FAFC]"
                  : "border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#282E3E]"
              }`}
            >
              <Logo className="h-5 w-auto shrink-0" />
              <span>{bankKey === "BCA" ? "Bank BCA" : "Bank Mandiri"}</span>
            </button>
          );
        })}
      </div>

      {/* Account Info Box */}
      <div className="p-4 rounded-2xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedBank === "BCA" ? (
              <BcaLogo className="h-5 w-auto" />
            ) : (
              <MandiriLogo className="h-5 w-auto" />
            )}
            <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">{currentBank.bankName}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF0F3] dark:bg-[#C67D00]/15 border border-[#ECD0D8] dark:border-[#C67D00]/30 text-[#7A283C] dark:text-[#FBBF24]">
            Rekening Resmi
          </span>
        </div>

        <div className="flex items-center justify-between bg-[#FAF7F2] dark:bg-[#141720] p-3 rounded-xl border border-[#E5D7DC] dark:border-[#282E3E]">
          <div>
            <span className="text-[10px] text-[#7A5661] dark:text-[#94A3B8] block font-semibold">Nomor Rekening:</span>
            <span className="font-mono font-black text-base text-[#451420] dark:text-[#F8FAFC] tracking-wider">
              {currentBank.accountNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyRekening}
            className="h-9 px-3 rounded-lg border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] flex items-center gap-1.5 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#FAF0F3] dark:hover:bg-[#282E3E] hover:border-[#451420] dark:hover:border-[#C67D00] transition cursor-pointer shadow-2xs"
          >
            {isCopied ? <Check size={14} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={14} />}
            <span>{isCopied ? "Tersalin!" : "Salin No. Rek"}</span>
          </button>
        </div>

        <div className="pt-0.5">
          <span className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
            Atas Nama: <strong className="text-[#451420] dark:text-[#F8FAFC]">{currentBank.accountHolder}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
