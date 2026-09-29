"use client";

import { AlertCircle } from "lucide-react";

export function ExamEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFEB] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8]">
        <AlertCircle size={24} />
      </div>
      <h4 className="mt-4 text-base font-black text-[#451420] dark:text-[#F8FAFC]">
        Tidak ada ujian yang cocok
      </h4>
      <p className="mt-1 text-xs text-[#7A5661] dark:text-[#94A3B8] max-w-sm">
        Tidak ditemukan paket ujian dengan filter atau pencarian saat ini. Coba ganti kata kunci atau buat ujian baru.
      </p>
    </div>
  );
}
