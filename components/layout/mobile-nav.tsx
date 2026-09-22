"use client";

import { ChevronRight, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import type { MobileNavProps } from "@/types";

export function MobileNav({
  isOpen,
  onClose,
  lang,
  onSelectLang,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 top-[72px] z-30 bg-[#451420]/25 backdrop-blur-xs md:hidden" onClick={onClose} aria-hidden="true" />
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-[#FDFBF7] border-b border-[#E5D7DC] p-6 shadow-xl md:hidden transition-all animate-in slide-in-from-top-2 duration-200">
        <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#6B4651]">
          {["Game Edukasi", "Mode Ujian", "Less Matematika", "Panduan"].map((item) => (
            <button key={item} type="button" onClick={onClose} className="flex items-center justify-between py-2 text-left hover:text-[#451420] transition">
              <span>{item}</span>
              <ChevronRight size={16} className="text-[#A48E95]" />
            </button>
          ))}
        </nav>

        <div className="my-4 border-t border-[#E5D7DC]" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center bg-[#EFE8EB] p-0.5 rounded-full text-xs font-semibold border border-[#DDD0D5]">
            <button type="button" onClick={() => onSelectLang("id")} className={`px-3 py-1 rounded-full transition ${lang === "id" ? "bg-[#451420] text-[#FDFBF7] shadow-xs" : "text-[#7A5661] hover:text-[#451420]"}`}>
              ID
            </button>
            <button type="button" onClick={() => onSelectLang("en")} className={`px-3 py-1 rounded-full transition ${lang === "en" ? "bg-[#451420] text-[#FDFBF7] shadow-xs" : "text-[#7A5661] hover:text-[#451420]"}`}>
              EN
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" onClick={onClose} className="px-3 py-1.5 rounded-full bg-[#451420] text-[#FDFBF7] text-xs font-bold shadow-xs hover:bg-[#300C15]">
                Dashboard
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-xs font-semibold text-[#451420]">
                <UserIcon size={13} />
                {user.name.split(" ")[0]}
              </span>
              <button type="button" onClick={() => { onLogout(); onClose(); }} className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] transition" title="Keluar">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => { onClose(); onOpenLogin(); }} className="px-4 py-2 text-xs font-bold text-[#451420] hover:opacity-75 transition">
                Login
              </button>
              <button type="button" onClick={() => { onClose(); onOpenRegister(); }} className="px-4 py-2 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] text-xs font-bold shadow-xs transition">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
