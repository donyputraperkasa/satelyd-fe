"use client";

import Link from "next/link";
import { GraduationCap, BookOpen } from "lucide-react";

export function ExamHeaderBanner() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

      <Link
        href="/dashboard/guides?module=exams"
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] shadow-2xs hover:bg-[#FAF7F2] hover:border-[#451420] transition self-start sm:self-center shrink-0 cursor-pointer"
        title="Buka panduan lengkap penggunaan mode ujian"
      >
        <BookOpen size={15} className="text-[#C67D00]" />
        <span>Panduan Penggunaan</span>
      </Link>
    </div>
  );
}
