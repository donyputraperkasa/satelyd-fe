"use client";

import { ShieldCheck, GraduationCap, Users } from "lucide-react";
import type { ProfileRoleSelectorProps } from "./types";

export function ProfileRoleSelector({ isAdmin, role, setRole }: ProfileRoleSelectorProps) {
  if (isAdmin) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E] p-2.5 text-xs font-bold text-[#451420] dark:text-[#F8FAFC]">
        <ShieldCheck size={16} className="text-[#C67D00]" />
        <span>Administrator / Owner Sistem</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => setRole("TEACHER")}
        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
          role === "TEACHER"
            ? "bg-[#451420] dark:bg-white text-white dark:text-[#10131B] border-[#451420] dark:border-white shadow-2xs"
            : "bg-white dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] border-[#DFD0D5] dark:border-[#282E3E] hover:bg-[#FAF7F2] dark:hover:bg-[#202634]"
        }`}
      >
        <GraduationCap size={15} />
        <span>Guru / Pendidik</span>
      </button>
      <button
        type="button"
        onClick={() => setRole("USER")}
        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
          role === "USER"
            ? "bg-[#451420] dark:bg-white text-white dark:text-[#10131B] border-[#451420] dark:border-white shadow-2xs"
            : "bg-white dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] border-[#DFD0D5] dark:border-[#282E3E] hover:bg-[#FAF7F2] dark:hover:bg-[#202634]"
        }`}
      >
        <Users size={15} />
        <span>Non-Guru / Umum</span>
      </button>
    </div>
  );
}
