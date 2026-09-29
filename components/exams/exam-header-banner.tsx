"use client";

import { GraduationCap, BookOpen, Plus } from "lucide-react";

interface ExamHeaderBannerProps {
  onCreateNew?: () => void;
  onOpenGuide: () => void;
}

export function ExamHeaderBanner({ onCreateNew, onOpenGuide }: ExamHeaderBannerProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420] dark:text-[#F8FAFC] transition-colors">
          Mode Ujian & Evaluasi Siswa
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] transition-colors">
          Kelola paket ujian berkode token, timer otomatis, monitoring pengerjaan live, dan rekap skor.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#222838] hover:border-[#451420] dark:hover:border-[#C67D00] transition cursor-pointer"
          title="Buka panduan lengkap penggunaan mode ujian"
        >
          <BookOpen size={15} className="text-[#C67D00]" />
          <span>Panduan Penggunaan</span>
        </button>
        {onCreateNew && (
          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#451420] dark:bg-[#C67D00] text-xs font-bold text-white dark:text-[#141720] hover:bg-[#5B1C2E] dark:hover:bg-[#B37000] transition shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>Buat Ujian Baru</span>
          </button>
        )}
      </div>
    </div>
  );
}
