"use client";

import { GraduationCap, X, Loader2 } from "lucide-react";
import type { ExportToExamModalProps } from "@/types";
import { ExportToExamFields } from "./export-to-exam-fields";
import { ExportToExamSummary } from "./export-to-exam-summary";
import { useExportToExam } from "./use-export-to-exam";

export function ExportToExamModal({
  isOpen,
  deck,
  onClose,
  onSuccess,
}: ExportToExamModalProps) {
  const form = useExportToExam(deck, onClose, onSuccess);

  if (!isOpen || !deck) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4
        bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-[#E5D7DC]
          dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 sm:p-7 shadow-2xl
          max-h-[92vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={form.isSubmitting}
          className="absolute right-4 top-4 flex h-8 w-8 items-center
            justify-center rounded-full text-[#7A5661] dark:text-[#94A3B8]
            hover:bg-[#FAF0F3] dark:hover:bg-[#282E3E] hover:text-[#451420]
            dark:hover:text-[#F8FAFC] transition cursor-pointer disabled:opacity-50"
          title="Tutup"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl bg-[#E8F5E9] dark:bg-emerald-950/50 border
              border-[#C8E6C9] dark:border-emerald-800/60 text-[#1B4D20]
              dark:text-emerald-400"
          >
            <GraduationCap size={26} />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#451420] dark:text-[#F8FAFC] leading-snug">
              Jadikan Paket Ujian Siswa
            </h3>
            <p className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
              Konversi kartu bank soal menjadi ujian resmi bersistem anti-curang
            </p>
          </div>
        </div>

        <ExportToExamSummary
          subject={deck.subject}
          gradeLevel={deck.gradeLevel}
          cardCount={form.cardCount}
        />

        {/* Form */}
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <ExportToExamFields
            title={form.title}
            setTitle={form.setTitle}
            durationMinutes={form.durationMinutes}
            setDurationMinutes={form.setDurationMinutes}
            customPin={form.customPin}
            setCustomPin={form.setCustomPin}
            description={form.description}
            setDescription={form.setDescription}
          />

          <div
            className="mt-6 flex items-center justify-end gap-2.5 border-t
              border-[#F0E6E9] dark:border-[#282E3E] pt-4"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={form.isSubmitting}
              className="rounded-xl border border-[#DFD0D5] dark:border-[#282E3E]
                bg-white dark:bg-[#141720] px-4 py-2.5 text-xs font-bold
                text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F8]
                dark:hover:bg-[#222838] transition cursor-pointer
                disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={form.isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B4D20]
                dark:bg-emerald-600 hover:bg-[#143B18] dark:hover:bg-emerald-700
                px-5 py-2.5 text-xs font-bold text-white shadow-xs transition
                disabled:opacity-50 cursor-pointer"
            >
              {form.isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Mengonversi Soal...</span>
                </>
              ) : (
                <>
                  <GraduationCap size={15} />
                  <span>Buat Paket Ujian</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
