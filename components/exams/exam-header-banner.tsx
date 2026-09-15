"use client";

import { GraduationCap } from "lucide-react";

export function ExamHeaderBanner() {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold text-[#7A283C]">
        <GraduationCap size={13} />
        Asesmen Berstandar Kurikulum
      </div>
      <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420]">
        Mode Ujian & Evaluasi Siswa
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
        Kelola paket ujian berkode token, timer otomatis, monitoring pengerjaan live, dan rekap skor.
      </p>
    </div>
  );
}
