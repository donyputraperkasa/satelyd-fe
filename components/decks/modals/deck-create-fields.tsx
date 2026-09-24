"use client";

import type { DeckCreateFieldsProps } from "@/types";
import { DeckDifficultySelector } from "./deck-difficulty-selector";

export function DeckCreateFields({
  title,
  setTitle,
  subject,
  setSubject,
  gradeLevel,
  setGradeLevel,
  difficulty,
  setDifficulty,
  description,
  setDescription,
  pinCode,
  setPinCode,
}: DeckCreateFieldsProps) {
  return (
    <>
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

      <DeckDifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
          Deskripsi Deck (Opsional)
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ringkasan isi deck soal atau catatan untuk guru..."
          className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5661] mb-1.5">
          Kustom PIN Sesi Smart TV (Opsional)
        </label>
        <input
          type="text"
          maxLength={8}
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value.toUpperCase())}
          placeholder="Kosongkan untuk PIN acak (contoh: TV-8821)"
          className="w-full rounded-xl border border-[#E2D5D9] bg-[#FAF7F8] py-2.5 px-3.5 text-xs sm:text-sm font-mono text-[#451420] placeholder-[#A08890] transition focus:border-[#451420] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#451420]/15"
        />
      </div>
    </>
  );
}
