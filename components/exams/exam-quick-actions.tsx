"use client";

import { Search, X, Plus, KeyRound, ArrowRight, LayoutGrid, List, PlusCircle } from "lucide-react";
import type { ExamStatus } from "@/types";

interface ExamQuickActionsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ExamStatus | "ALL";
  onStatusFilterChange: (status: ExamStatus | "ALL") => void;
  onCreateNew: () => void;
  onJoinRoom: (code: string) => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  counts: {
    all: number;
    published: number;
    draft: number;
    closed: number;
  };
}

export function ExamQuickActions({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCreateNew,
  onJoinRoom,
  viewMode,
  onViewModeChange,
  counts,
}: ExamQuickActionsProps) {
  const tabs: { label: string; value: ExamStatus | "ALL"; count: number }[] = [
    { label: "Semua", value: "ALL", count: counts.all },
    { label: "Live", value: "PUBLISHED", count: counts.published },
    { label: "Draft", value: "DRAFT", count: counts.draft },
    { label: "Selesai", value: "CLOSED", count: counts.closed },
  ];

  return (
    <div className="space-y-3.5">
      {/* Top Banner: 2 Separate Cards Jejer Flex Seperti Mode Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Pantau Ruang Ujian Siswa */}
        <section className="rounded-2xl border border-[#E5D7DC] bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A5661]">
              <KeyRound size={13} className="text-[#7A283C]" />
              <span>Pengawasan Ujian Siswa</span>
            </div>
            <h3 className="mt-1 text-sm sm:text-base font-black text-[#451420]">
              Pantau Ruang Ujian Siswa
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("roomCode") as HTMLInputElement;
              if (input?.value) onJoinRoom(input.value.trim().toUpperCase());
            }}
            className="flex items-center gap-2 mt-auto"
          >
            <input
              type="text"
              name="roomCode"
              placeholder="Kode Token: SAT-M9K"
              maxLength={10}
              className="h-11 flex-1 min-w-0 rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] px-3 text-center font-mono text-xs sm:text-sm font-black tracking-widest text-[#451420] placeholder-[#9C737F] focus:bg-white focus:border-[#451420] focus:outline-none transition shadow-2xs"
            />
            <button
              type="submit"
              className="h-11 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#451420] px-4 text-xs font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs shrink-0"
            >
              <span>Pantau</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </section>

        {/* Card 2: Buat Paket Ujian Baru */}
        <section className="rounded-2xl border border-[#E5D7DC] bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A5661]">
              <PlusCircle size={13} className="text-[#7A283C]" />
              <span>Pusat Guru / Pembuat Soal</span>
            </div>
            <h3 className="mt-1 text-sm sm:text-base font-black text-[#451420]">
              Buat Paket Ujian Baru
            </h3>
          </div>

          <div className="mt-auto">
            <button
              type="button"
              onClick={onCreateNew}
              className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#451420] px-5 text-xs sm:text-sm font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              <Plus size={16} />
              <span>+ Buat Ujian Baru</span>
            </button>
          </div>
        </section>
      </div>

      {/* Unified Search & Filter Card (Model Sesuai TataKelolaku) */}
      <section className="rounded-2xl border border-[#E5D7DC] bg-white p-3.5 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Search Input Box */}
        <div className="flex items-center gap-2.5 bg-[#FAF7F2] border border-[#E5D7DC] focus-within:border-[#451420] focus-within:bg-white rounded-xl px-3.5 py-2 flex-1 min-w-[200px] transition">
          <Search size={17} className="text-[#451420] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama ujian, mata pelajaran, atau kode token..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#451420] placeholder-[#9C737F] focus:outline-none font-medium"
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

        {/* Filter Chips with Count Badges & View Switcher */}
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
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#E5D7DC] text-[#634852]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Card Grid vs Table List) */}
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
    </div>
  );
}
