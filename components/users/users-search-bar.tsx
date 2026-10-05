import { Search, X } from "lucide-react";
import type { UsersSearchBarProps } from "@/types";

export function UsersSearchBar({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  filteredCount,
}: UsersSearchBarProps) {
  const roleTabs = [
    { id: "ALL", label: "Semua" },
    { id: "TEACHER", label: "Guru" },
    { id: "USER", label: "Non-Guru" },
  ];

  return (
    <section
      className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E]
        bg-white dark:bg-[#1C202C] p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row
        items-stretch sm:items-center justify-between gap-3 transition-colors overflow-hidden"
    >
      {/* Search Input Box */}
      <div
        className="flex items-center gap-2.5 bg-[#FAF7F2] dark:bg-[#141720]
          border border-[#E5D7DC] dark:border-[#282E3E] focus-within:border-[#451420]
          dark:focus-within:border-[#C67D00] focus-within:bg-white
          dark:focus-within:bg-[#141720] rounded-xl px-4 py-2.5 flex-1
          transition min-w-0"
      >
        <Search
          size={18}
          className="text-[#451420] dark:text-[#94A3B8] shrink-0"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari berdasarkan nama, email, atau asal sekolah..."
          className="w-full min-w-0 bg-transparent text-xs sm:text-sm
            text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2]
            dark:placeholder-[#64748B] placeholder:font-normal
            focus:outline-none font-medium"
          aria-label="Cari pengguna"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="text-[#9C737F] dark:text-[#94A3B8] hover:text-[#451420]
              dark:hover:text-[#F8FAFC] transition p-1 rounded-md cursor-pointer shrink-0"
            title="Hapus pencarian"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Counter & Role Filter Tabs (Hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-3 shrink-0 justify-end">
        <span className="text-xs font-bold text-[#7A5661] dark:text-[#94A3B8] shrink-0">
          {filteredCount} Pengguna
        </span>

        <div
          className="flex items-center rounded-xl border border-[#E5D7DC]
            dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-1
            overflow-x-auto max-w-full no-scrollbar"
        >
          {roleTabs.map((tab) => {
            const isActive = roleFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onRoleFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition
                  cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs"
                      : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
