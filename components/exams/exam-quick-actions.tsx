"use client";

import { KeyRound, ArrowRight, PlusCircle, Plus } from "lucide-react";
import type { ExamStatus } from "@/types";
import { ExamSearchFilter } from "./exam-search-filter";

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
  return (
    <div className="space-y-3.5">
      {/* Top Banner: 2 Separate Cards Jejer Flex */}
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
              className="h-11 flex-1 min-w-0 rounded-xl border border-[#E5D7DC] bg-[#FAF7F2] px-3 text-center font-mono text-xs sm:text-sm font-black tracking-widest text-[#451420] placeholder-[#BFAAB2] placeholder:font-normal placeholder:tracking-normal focus:bg-white focus:border-[#451420] focus:outline-none transition shadow-2xs"
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
              Buat Draft Ujian Baru
            </h3>
          </div>

          <div className="mt-auto">
            <button
              type="button"
              onClick={onCreateNew}
              className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#451420] px-5 text-xs sm:text-sm font-bold text-white hover:bg-[#5B1C2E] transition cursor-pointer shadow-xs"
            >
              <Plus size={16} />
              <span>Buat Ujian Baru</span>
            </button>
          </div>
        </section>
      </div>

      {/* Search & Filter Toolbar */}
      <ExamSearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        counts={counts}
      />
    </div>
  );
}
