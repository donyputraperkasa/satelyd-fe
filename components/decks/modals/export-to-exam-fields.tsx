"use client";

import { Clock, KeyRound, BookOpen } from "lucide-react";
import type { ExportToExamFieldsProps } from "@/types";

export function ExportToExamFields({
  title,
  setTitle,
  durationMinutes,
  setDurationMinutes,
  customPin,
  setCustomPin,
  description,
  setDescription,
}: ExportToExamFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-xs font-bold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
          Judul Paket Ujian <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <BookOpen
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C737F] dark:text-[#94A3B8]"
          />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Penilaian Harian - Aljabar Bab 1"
            className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E]
              bg-[#FAF7F8] dark:bg-[#141720] pl-10 pr-3.5 py-2.5 text-xs sm:text-sm
              font-semibold text-[#451420] dark:text-[#F8FAFC] placeholder-[#9C737F]
              dark:placeholder-[#64748B] focus:border-[#1B4D20]
              dark:focus:border-emerald-500 focus:outline-hidden transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-bold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
            Durasi Ujian (Menit)
          </label>
          <div className="relative">
            <Clock
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C737F] dark:text-[#94A3B8]"
            />
            <input
              type="number"
              min={5}
              max={300}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value) || 30)}
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E]
                bg-[#FAF7F8] dark:bg-[#141720] pl-10 pr-3.5 py-2.5 text-xs sm:text-sm
                font-semibold text-[#451420] dark:text-[#F8FAFC] focus:border-[#1B4D20]
                dark:focus:border-emerald-500 focus:outline-hidden transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
            Kode PIN Masuk (Opsional)
          </label>
          <div className="relative">
            <KeyRound
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C737F] dark:text-[#94A3B8]"
            />
            <input
              type="text"
              maxLength={8}
              value={customPin}
              onChange={(e) => setCustomPin(e.target.value.toUpperCase())}
              placeholder="Auto (6 Digit)"
              className="w-full uppercase rounded-xl border border-[#DFD0D5]
                dark:border-[#282E3E] bg-[#FAF7F8] dark:bg-[#141720] pl-10 pr-3.5
                py-2.5 text-xs sm:text-sm font-semibold text-[#451420] dark:text-[#F8FAFC]
                placeholder-[#9C737F] dark:placeholder-[#64748B] focus:border-[#1B4D20]
                dark:focus:border-emerald-500 focus:outline-hidden transition"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
          Deskripsi / Petunjuk Ujian (Opsional)
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Contoh: Kerjakan dengan teliti. Dilarang berpindah tab browser saat ujian berlangsung."
          className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E]
            bg-[#FAF7F8] dark:bg-[#141720] p-3 text-xs sm:text-sm text-[#451420]
            dark:text-[#F8FAFC] placeholder-[#9C737F] dark:placeholder-[#64748B]
            focus:border-[#1B4D20] dark:focus:border-emerald-500 focus:outline-hidden
            transition resize-none"
        />
      </div>
    </>
  );
}
