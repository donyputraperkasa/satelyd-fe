"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, LayoutDashboard } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Route Error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <div className="rounded-2xl border border-[#F2C2C6] dark:border-[#4B1E25] bg-[#FBEAEB]/70 dark:bg-[#201416]/70 p-8 sm:p-12 shadow-xs space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEE2E2] dark:bg-[#3B171A] text-[#B91C1C] dark:text-[#F87171] shadow-2xs">
          <AlertCircle size={28} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C] dark:text-[#F87171]">
            Gagal Memuat Modul
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#451420] dark:text-[#F8FAFC]">
            Terjadi Kesalahan di Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
            {error.message || "Data untuk halaman ini tidak dapat dimuat dari server. Silakan coba kembali beberapa saat lagi."}
          </p>
          {error.digest && (
            <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] font-mono">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-xs font-bold shadow-sm hover:opacity-95 transition cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Coba Muat Ulang</span>
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39] transition"
          >
            <LayoutDashboard size={15} />
            <span>Ringkasan Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
