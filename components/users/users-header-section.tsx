import { Users, RotateCcw } from "lucide-react";
import type { UsersHeaderSectionProps } from "@/types";

export function UsersHeaderSection({
  isLoading,
  onRefresh,
}: UsersHeaderSectionProps) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between
        gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6"
    >
      <div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-widest
              text-[#C67D00] dark:text-[#E6B85C]"
          >
            Administrasi Sistem
          </span>
        </div>
        <h1
          className="font-display text-2xl sm:text-3xl font-extrabold
            text-[#451420] dark:text-[#F8FAFC] mt-1.5 flex items-center gap-2.5"
        >
          <Users size={28} className="text-[#C67D00] dark:text-[#E6B85C]" />
          <span>Kelola Pengguna</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">
          Pantau akun guru dan administrator terdaftar, periksa role, asal sekolah,
          serta alokasi kuota token aktif.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex items-center gap-2 self-start sm:self-center
          h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E]
          bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420]
          dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39]
          transition cursor-pointer disabled:opacity-50"
      >
        <RotateCcw size={15} className={isLoading ? "animate-spin" : ""} />
        <span>Muat Ulang</span>
      </button>
    </div>
  );
}
