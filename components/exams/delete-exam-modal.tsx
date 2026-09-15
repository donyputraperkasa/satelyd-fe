"use client";

import { Trash2, AlertTriangle, X } from "lucide-react";
import type { Exam } from "@/types";

interface DeleteExamModalProps {
  isOpen: boolean;
  exam: Exam | null;
  onClose: () => void;
  onConfirm: (exam: Exam) => void;
}

export function DeleteExamModal({
  isOpen,
  exam,
  onClose,
  onConfirm,
}: DeleteExamModalProps) {
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
          <div className="flex items-center gap-2 text-red-700">
            <Trash2 size={20} />
            <h3 className="text-base font-black text-[#451420]">Hapus Paket Ujian</h3>
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 border border-red-200 text-red-700">
            <AlertTriangle size={28} />
          </div>

          <h4 className="text-base font-black text-[#451420]">
            Hapus &ldquo;{exam.title}&rdquo;?
          </h4>

          <p className="text-xs text-[#7A5661] leading-relaxed">
            Paket ujian berkode <strong className="text-[#451420] font-mono">{exam.tokenCode}</strong> dan seluruh butir soal di dalamnya akan dihapus secara permanen.
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
            className="h-11 flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-700 text-xs font-black text-white hover:bg-red-800 transition shadow-xs cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Ya, Hapus Ujian</span>
          </button>
        </div>
      </div>
    </div>
  );
}
