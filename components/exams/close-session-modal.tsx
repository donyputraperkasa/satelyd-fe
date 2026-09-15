"use client";

import { PowerOff, AlertCircle, X } from "lucide-react";
import type { Exam } from "@/types";

interface CloseSessionModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onConfirm: (exam: Exam) => void;
}

export function CloseSessionModal({
  isOpen,
  exam,
  onClose,
  onConfirm,
}: CloseSessionModalProps) {
  if (!isOpen || !exam) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#451420]/60 backdrop-blur-xs animate-fade-in"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] p-6 text-[#451420] shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5D7DC]">
          <div className="flex items-center gap-2 text-amber-700">
            <PowerOff size={18} />
            <h3 className="text-base font-black text-[#451420]">Hentikan Sesi Ujian</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#7A5661] hover:bg-[#FAF2F4] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="my-5 text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
            <AlertCircle size={28} />
          </div>

          <h4 className="text-base font-black text-[#451420]">
            Akhiri Sesi &ldquo;{exam.title}&rdquo;?
          </h4>

          <p className="text-xs text-[#7A5661] leading-relaxed">
            Ruang ujian berkode <strong className="text-[#451420] font-mono">{exam.tokenCode}</strong> akan ditutup. Siswa yang sedang mengerjakan tidak dapat lagi mengirimkan jawaban baru. Anda dapat melihat rekap skor setelah sesi dihentikan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(exam);
              onClose();
            }}
            className="h-11 flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-700 text-xs font-black text-white hover:bg-amber-800 transition shadow-xs cursor-pointer"
          >
            <PowerOff size={14} />
            <span>Ya, Tutup Sesi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
