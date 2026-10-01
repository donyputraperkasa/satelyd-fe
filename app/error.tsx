"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEE2E2] dark:bg-[#3B171A] text-[#B91C1C] dark:text-[#F87171] mb-6 shadow-sm">
        <AlertTriangle size={32} />
      </div>

      <div className="max-w-md space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C] dark:text-[#F87171]">
          Terjadi Gangguan
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
          Halaman Gagal Dimuat
        </h1>
        <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
          {error.message || "Terjadi kesalahan yang tidak diharapkan saat memuat konten. Silakan coba muat ulang atau kembali ke beranda."}
        </p>
        {error.digest && (
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] font-mono mt-1">
            Kode Error: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition cursor-pointer"
        >
          <RotateCcw size={16} />
          <span>Coba Lagi</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39] transition"
        >
          <Home size={16} />
          <span>Ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
