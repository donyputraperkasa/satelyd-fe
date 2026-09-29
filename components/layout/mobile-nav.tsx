"use client";

import { ChevronRight, LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import Link from "next/link";
import type { MobileNavProps } from "@/types";

export function MobileNav({
  isOpen,
  onClose,
  theme = "light",
  onSelectTheme,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 top-[72px] z-30 bg-[#451420]/25 dark:bg-black/60 backdrop-blur-xs md:hidden" onClick={onClose} aria-hidden="true" />
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-[#FDFBF7] dark:bg-[#141720] border-b border-[#E5D7DC] dark:border-[#282E3E] p-6 shadow-xl md:hidden transition-all animate-in slide-in-from-top-2 duration-200">
        <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#6B4651] dark:text-[#94A3B8]">
          {["Game Edukasi", "Mode Ujian", "Jasa", "Panduan"].map((item) => (
            <button key={item} type="button" onClick={onClose} className="flex items-center justify-between py-2 text-left hover:text-[#451420] dark:hover:text-[#F8FAFC] transition">
              <span>{item}</span>
              <ChevronRight size={16} className="text-[#A48E95] dark:text-[#64748B]" />
            </button>
          ))}
        </nav>

        <div className="my-4 border-t border-[#E5D7DC] dark:border-[#282E3E]" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center bg-[#EFE8EB] dark:bg-[#1C202C] p-0.5 rounded-full border border-[#DDD0D5] dark:border-[#282E3E]">
            <button
              type="button"
              onClick={() => onSelectTheme?.("light")}
              className={`p-1.5 rounded-full transition ${
                theme === "light"
                  ? "bg-[#451420] text-[#FDFBF7] shadow-xs"
                  : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
              }`}
              title="Mode Terang"
              aria-label="Mode Terang"
            >
              <Sun size={15} />
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme?.("dark")}
              className={`p-1.5 rounded-full transition ${
                theme === "dark"
                  ? "bg-[#C67D00] text-[#141720] shadow-xs"
                  : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
              }`}
              title="Mode Gelap"
              aria-label="Mode Gelap"
            >
              <Moon size={15} />
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" onClick={onClose} className="px-3 py-1.5 rounded-full bg-[#451420] text-[#FDFBF7] dark:bg-[#C67D00] dark:text-[#141720] text-xs font-bold shadow-xs hover:bg-[#300C15] dark:hover:bg-[#B37000]">
                Dashboard
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EDF0] dark:bg-[#1C202C] border border-[#E2D5D9] dark:border-[#282E3E] text-xs font-semibold text-[#451420] dark:text-[#F8FAFC]">
                <UserIcon size={13} />
                {user.name.split(" ")[0]}
              </span>
              <button type="button" onClick={() => { onLogout(); onClose(); }} className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] dark:text-[#94A3B8] dark:hover:bg-[#1C202C] dark:hover:text-[#F8FAFC] transition" title="Keluar">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { onClose(); onOpenLogin(); }} className="px-4 py-2 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:opacity-75 transition">
                Login
              </button>
              <button type="button" onClick={() => { onClose(); onOpenRegister(); }} className="px-4 py-2 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] dark:bg-[#C67D00] dark:hover:bg-[#B37000] dark:text-[#141720] text-xs font-bold shadow-xs transition">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
