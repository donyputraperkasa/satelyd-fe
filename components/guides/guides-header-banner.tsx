"use client";

import { BookOpen } from "lucide-react";

export function GuidesHeaderBanner() {
  return (
    <div>
      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold text-[#7A283C]">
        <BookOpen size={13} />
        Pusat Bantuan & Tutorial
      </div>
      <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#451420]">
        Panduan Penggunaan Guru
      </h1>
      <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
        Pelajari langkah demi langkah pengoperasian fitur asesmen, pembuatan bank soal, dan pelaksanaan kuis kelas.
      </p>
    </div>
  );
}
