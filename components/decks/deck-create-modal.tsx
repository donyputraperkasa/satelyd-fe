"use client";

import { useState, useEffect, type FormEvent } from "react";
import { X, Layers, Sparkles } from "lucide-react";
import type { Deck, CreateDeckPayload } from "@/types";

interface DeckCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateDeckPayload) => Promise<void>;
  initialData?: Deck | null;
}

export function DeckCreateModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DeckCreateModalProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Matematika");
  const [gradeLevel, setGradeLevel] = useState("Kelas 8 SMP");
  const [difficulty, setDifficulty] = useState<"MUDAH" | "SEDANG" | "SULIT" | "CAMPURAN">("SEDANG");
  const [description, setDescription] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSubject(initialData.subject);
      setGradeLevel(initialData.gradeLevel);
      setDifficulty(initialData.difficulty || "SEDANG");
      setDescription(initialData.description || "");
      setPinCode(initialData.pinCode || "");
    } else {
      setTitle("");
      setSubject("Matematika");
      setGradeLevel("Kelas 8 SMP");
      setDifficulty("SEDANG");
      setDescription("");
      setPinCode("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        subject: subject.trim(),
        gradeLevel: gradeLevel.trim(),
        difficulty,
        description: description.trim(),
        pinCode: pinCode.trim().toUpperCase() || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#ECD0D8] bg-white p-6 sm:p-7 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] hover:bg-[#FAF0F3] hover:text-[#451420] transition cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
              Judul Deck Soal *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Operasi Aljabar & Persamaan Linear"
              className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
                Mata Pelajaran *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Matematika, Fisika, dll"
                className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
                Jenjang / Tingkat Kelas *
              </label>
              <input
                type="text"
                required
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder="Kelas 8 SMP, Kelas 10 SMA"
                className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
              Tingkat Kesulitan Materi
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["MUDAH", "SEDANG", "SULIT", "CAMPURAN"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`rounded-xl border py-2 text-center text-xs font-bold transition cursor-pointer ${
                    difficulty === lvl
                      ? "border-[#451420] bg-[#451420] text-white shadow-xs"
                      : "border-[#E2D5D9] bg-[#FAF7F8] text-[#7A5661] hover:border-[#451420]/40"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
              Kode PIN Sesi Smart TV (Opsional / Kustom)
            </label>
            <input
              type="text"
              maxLength={12}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value.toUpperCase())}
              placeholder="Kosongkan untuk otomatis (cth: TV-K001) atau ketik kustom (cth: MAT-01 atau 123456)"
              className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm font-mono font-bold text-[#451420] placeholder-[#A08890] placeholder:font-normal placeholder:font-sans transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15 uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan ringkasan materi, cakupan indikator, atau tujuan latihan..."
              className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
            />
          </div>

          {/* Footer Buttons */}
          <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-[#F0E6E9] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DFD0D5] bg-white px-4 py-2.5 text-xs font-bold text-[#7A5661] hover:bg-[#FAF7F8] transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#451420] hover:bg-[#5B1C2E] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Menyimpan..." : initialData ? "Simpan Perubahan" : "Buat Deck Baru"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
