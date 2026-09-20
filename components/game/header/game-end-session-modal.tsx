"use client";

import { LogOut } from "lucide-react";

interface GameEndSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function GameEndSessionModal({
  isOpen,
  onClose,
  onConfirm,
}: GameEndSessionModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-md bg-[#FDFBF7] rounded-3xl
          border border-[#DFD0D5] p-6 shadow-2xl space-y-4"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center
              rounded-2xl bg-[#FBEAEB] text-[#B3261E] border border-[#F2C2C6]"
          >
            <LogOut size={20} />
          </div>
          <div>
            <h3 className="text-base font-black text-[#451420]">
              Akhiri Sesi Permainan?
            </h3>
            <p className="text-xs text-[#7A5661]">
              Sesi game ini akan ditutup dan Anda akan dialihkan kembali ke
              daftar Deck.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[140px] py-2.5 px-4 rounded-xl border border-[#DFD0D5] bg-white
              text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer text-center justify-center flex items-center"
          >
            Lanjutkan Bermain
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="min-w-[140px] py-2.5 px-4 rounded-xl bg-[#B3261E] hover:bg-[#8F1D17]
              text-xs font-bold text-white transition shadow-xs cursor-pointer text-center justify-center flex items-center"
          >
            Ya, Akhiri Sesi
          </button>
        </div>
      </div>
    </div>
  );
}
