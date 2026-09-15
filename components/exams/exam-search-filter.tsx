"use client";

import { Search, X, LayoutGrid, List } from "lucide-react";
import type { ExamStatus } from "@/types";

interface ExamSearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ExamStatus | "ALL";
  onStatusFilterChange: (status: ExamStatus | "ALL") => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  counts: {
    all: number;
    published: number;
    draft: number;
    closed: number;
  };
}

export function ExamSearchFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  counts,
}: ExamSearchFilterProps) {
  const tabs: { label: string; value: ExamStatus | "ALL"; count: number }[] = [
    { label: "Semua", value: "ALL", count: counts.all },
    { label: "Live", value: "PUBLISHED", count: counts.published },
    { label: "Draft", value: "DRAFT", count: counts.draft },
    { label: "Selesai", value: "CLOSED", count: counts.closed },
  ];

  return (
    <section className="rounded-2xl border border-[#E5D7DC] bg-white p-3.5 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
      {/* Search Input Box */}
      <div className="flex items-center gap-2.5 bg-[#FAF7F2] border border-[#E5D7DC] focus-within:border-[#451420] focus-within:bg-white rounded-xl px-3.5 py-2 flex-1 min-w-[200px] transition">
        <Search size={17} className="text-[#451420] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama ujian, mata pelajaran, atau kode token..."
          className="w-full bg-transparent text-xs sm:text-sm text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal focus:outline-none font-medium"
          aria-label="Cari ujian"
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

      {/* Filter Chips & View Switcher */}
      <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter status ujian">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onStatusFilterChange(tab.value)}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer select-none ${
                  isActive
                    ? "bg-[#451420] text-white border border-[#451420] shadow-xs"
                    : "bg-[#FAF7F2] border border-[#E5D7DC] text-[#7A5661] hover:bg-[#F5EFEB] hover:text-[#451420]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] sm:text-[11px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-[#E5D7DC] text-[#634852]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] p-1 ml-auto">
          <button
            type="button"
            onClick={() => onViewModeChange("card")}
            title="Tampilan Kartu"
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
            title="Tampilan Tabel Kolom"
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
