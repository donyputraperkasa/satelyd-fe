"use client";

import { Search, X } from "lucide-react";
import type { TokenQuickActionsProps } from "@/types";

export function TokenQuickActions({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
}: TokenQuickActionsProps) {
  return (
    <section className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] focus-within:border-[#451420] dark:focus-within:border-[#C67D00] focus-within:bg-white dark:focus-within:bg-[#1C202C] rounded-xl px-3.5 py-2 flex-1 transition">
        <Search size={16} className="text-[#451420] dark:text-[#FBBF24] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari paket kuota, nominal, game, atau ujian..."
          className="w-full bg-transparent text-xs sm:text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] placeholder:font-normal focus:outline-none font-medium"
          aria-label="Cari paket token"
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

      {/* Filter Switcher & Count */}
      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <span className="text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] sm:mr-1">
          {totalCount} Paket
        </span>

        <div className="flex items-center rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-1">
          <button
            type="button"
            onClick={() => onFilterChange("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "ALL"
                ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs"
                : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("GAME")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "GAME"
                ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs"
                : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            Token Game
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("EXAM")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeFilter === "EXAM"
                ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs"
                : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
            }`}
          >
            Token Ujian
          </button>
        </div>
      </div>
    </section>
  );
}
