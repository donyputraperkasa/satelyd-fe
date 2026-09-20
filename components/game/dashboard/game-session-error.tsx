"use client";

import { AlertCircle, ArrowRight } from "lucide-react";

interface GameSessionErrorProps {
  message: string;
  onReset: () => void;
}

export function GameSessionError({ message, onReset }: GameSessionErrorProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBEAEB] text-[#B3261E] border border-[#F2C2C6]">
        <AlertCircle size={28} />
      </div>
      <div>
        <h2 className="text-lg font-black text-[#451420]">Sesi Tidak Ditemukan</h2>
        <p className="text-xs text-[#7A5661] mt-1">{message}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#451420] text-white text-xs font-bold shadow-xs hover:bg-[#5B1C2E] transition cursor-pointer"
      >
        <span>Kembali ke Pilihan Game TV</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
