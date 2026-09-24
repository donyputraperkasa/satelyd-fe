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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ECD0D8] bg-white p-6 sm:p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C]">
            <Layers size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#451420]">
              {initialData ? "Edit Identitas Deck" : "Buat Deck Soal Baru"}
            </h2>
            <p className="text-xs text-[#7A5661]">
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

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5D7DC]">
            <button
              type="button"
              onClick={onClose}
              disabled={form.isSubmitting}
              className="h-10 rounded-xl border border-[#DFD0D5] bg-white px-4 text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={form.isSubmitting}
              className="h-10 inline-flex items-center gap-2 rounded-xl bg-[#451420] px-5 text-xs font-black text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer disabled:opacity-50"
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
