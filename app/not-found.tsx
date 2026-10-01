import Link from "next/link";
import { Compass, Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF4E5] dark:bg-[#2A2012] text-[#C67D00] dark:text-[#FBBF24] mb-6 shadow-sm">
        <Compass size={32} className="animate-spin [animation-duration:12s]" />
      </div>

      <div className="max-w-md space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#FBBF24]">
          Status 404
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC]">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
          Tautan yang Anda tuju mungkin sudah dipindahkan, dihapus, atau alamat URL yang Anda masukkan salah.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition"
        >
          <Home size={16} />
          <span>Kembali ke Beranda</span>
        </Link>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39] transition"
        >
          <LayoutDashboard size={16} />
          <span>Masuk ke Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
