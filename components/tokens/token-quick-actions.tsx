"use client";

import { Search, X } from "lucide-react";

interface TokenQuickActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: "ALL" | "GAME" | "EXAM";
  onFilterChange: (filter: "ALL" | "GAME" | "EXAM") => void;
  totalCount: number;
}

export function TokenQuickActions({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
}: TokenQuickActionsProps) {
  return (
    <section className="rounded-2xl border border-[#E5D7DC] bg-white p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 bg-[#FAF7F2] border border-[#E5D7DC] focus-within:border-[#451420] focus-within:bg-white rounded-xl px-3.5 py-2 flex-1 transition">
        <Search size={16} className="text-[#451420] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari paket kuota, nominal, game, atau ujian..."
          className="w-full bg-transparent text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:outline-none font-medium"
          aria-label="Cari paket token"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-[#9C737F] hover:text-[#451420] transition p-1 rounded-md cursor-pointer"
            title="Hapus pencarian"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Switcher & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <span className="text-xs font-bold text-[#7A5661] sm:mr-1">
          {totalCount} Paket
        </span>

        <div className="flex items-center rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-1">
          <button
            type="button"
            onClick={() => onFilterChange("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "ALL"
                ? "bg-white text-[#451420] shadow-xs"
                : "text-[#7A5661] hover:text-[#451420]"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("GAME")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "GAME"
                ? "bg-white text-[#451420] shadow-xs"
                : "text-[#7A5661] hover:text-[#451420]"
            }`}
          >
            Token Game
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("EXAM")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "EXAM"
                ? "bg-white text-[#451420] shadow-xs"
                : "text-[#7A5661] hover:text-[#451420]"
            }`}
          >
            Token Ujian
          </button>
        </div>
      </div>
    </section>
  );
}
