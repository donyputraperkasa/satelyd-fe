"use client";

import { Search, X, LayoutGrid, List } from "lucide-react";

interface ExamSearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  totalCount: number;
}

export function ExamSearchFilter({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: ExamSearchFilterProps) {
  return (
    <section className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] focus-within:border-[#451420] dark:focus-within:border-[#C67D00] focus-within:bg-white dark:focus-within:bg-[#1C202C] rounded-xl px-3.5 py-2 flex-1 transition">
        <Search size={16} className="text-[#451420] dark:text-[#FBBF24] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama paket ujian atau kode token..."
          className="w-full bg-transparent text-xs sm:text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] placeholder:font-normal focus:outline-none font-medium"
          aria-label="Cari ujian"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-[#9C737F] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition p-1 rounded-md cursor-pointer"
            title="Hapus pencarian"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* View Mode Switcher (Card vs Table) */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-block text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] mr-1">
          {totalCount} Ujian
        </span>

        <div className="flex items-center rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("card")}
            title="Tampilan Kartu (Grid)"
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === "card"
                ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs font-bold"
                : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("table")}
            title="Tampilan Tabel"
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === "table"
                ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs font-bold"
                : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            <List size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

