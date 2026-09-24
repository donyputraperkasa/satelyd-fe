"use client";

import { Search, X, LayoutGrid, List } from "lucide-react";
import type { DeckQuickActionsProps } from "@/types";

export function DeckQuickActions({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCount,
}: DeckQuickActionsProps) {
  return (
    <section className="rounded-2xl border border-[#E5D7DC] bg-white p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3">
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 bg-[#FAF7F2] border border-[#E5D7DC] focus-within:border-[#451420] focus-within:bg-white rounded-xl px-3.5 py-2 flex-1 transition">
        <Search size={16} className="text-[#451420] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama deck materi, topik, atau kata kunci..."
          className="w-full bg-transparent text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:outline-none font-medium"
          aria-label="Cari deck materi"
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

      {/* View Mode Switcher: Card vs Table (Persis Mode Ujian) */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden sm:inline-block text-xs font-bold text-[#7A5661] mr-1">
          {totalCount} Deck
        </span>

        <div className="flex items-center rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("card")}
            title="Tampilan Kartu (Grid)"
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              viewMode === "card"
                ? "bg-white text-[#451420] shadow-xs font-bold"
                : "text-[#7A5661] hover:text-[#451420]"
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
                ? "bg-white text-[#451420] shadow-xs font-bold"
                : "text-[#7A5661] hover:text-[#451420]"
            }`}
          >
            <List size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

