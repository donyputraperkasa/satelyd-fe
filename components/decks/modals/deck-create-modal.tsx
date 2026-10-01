"use client";

import { X, Layers, Sparkles } from "lucide-react";
import type { DeckCreateModalProps } from "@/types";
import { DeckCreateFields } from "./deck-create-fields";
import { useDeckCreateForm } from "./use-deck-create-form";

export function DeckCreateModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DeckCreateModalProps) {
  const form = useDeckCreateForm(isOpen, initialData, onSubmit, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ECD0D8] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF0F3] dark:hover:bg-[#282E3E] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] text-[#7A283C] dark:text-[#F8FAFC]">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#451420] dark:text-[#F8FAFC]">
              {initialData ? "Edit Identitas Deck" : "Buat Deck Soal Baru"}
            </h2>
            <p className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
              Kelompokkan kartu pertanyaan berdasarkan mata pelajaran atau bab ajar
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit} className="space-y-4">
          <DeckCreateFields
            title={form.title}
            setTitle={form.setTitle}
            subject={form.subject}
            setSubject={form.setSubject}
            gradeLevel={form.gradeLevel}
            setGradeLevel={form.setGradeLevel}
            difficulty={form.difficulty}
            setDifficulty={form.setDifficulty}
            description={form.description}
            setDescription={form.setDescription}
            pinCode={form.pinCode}
            setPinCode={form.setPinCode}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5D7DC] dark:border-[#282E3E]">
            <button
              type="button"
              onClick={onClose}
              disabled={form.isSubmitting}
              className="h-10 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] px-4 text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#222838] transition cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={form.isSubmitting}
              className="h-10 inline-flex items-center gap-2 rounded-xl bg-[#451420] dark:bg-white px-5 text-xs font-black text-white dark:text-[#10131B] hover:bg-[#5B1C2E] dark:hover:bg-[#F1F5F9] transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={14} />
              <span>{form.isSubmitting ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Buat Deck"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
