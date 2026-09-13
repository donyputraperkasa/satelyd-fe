"use client";

import { ChevronDown, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthModal } from "@/components/modals";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openLogin, openRegister, user, logout } = useAuthModal();

  return (
    <>
      <header className="w-full pt-6 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base font-extrabold tracking-tight text-[#451420]">
            satel<span className="text-[#C67D00]">y</span>d
          </span>
        </Link>

        {/* Center Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#6B4651]">
          <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition cursor-pointer">
            Game Edukasi <ChevronDown size={14} className="opacity-70" />
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition cursor-pointer">
            Mode Ujian <ChevronDown size={14} className="opacity-70" />
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition cursor-pointer">
            Less Matematika <ChevronDown size={14} className="opacity-70" />
          </button>
          <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition cursor-pointer">
            Panduan
          </button>
        </nav>

        {/* Right Controls (Desktop) */}
        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <div className="flex items-center bg-[#EFE8EB] p-0.5 rounded-full text-xs font-semibold border border-[#DDD0D5]">
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                lang === "id"
                  ? "bg-[#451420] text-[#FDFBF7] shadow-xs"
                  : "text-[#7A5661] hover:text-[#451420]"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                lang === "en"
                  ? "bg-[#451420] text-[#FDFBF7] shadow-xs"
                  : "text-[#7A5661] hover:text-[#451420]"
              }`}
            >
              EN
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-xs font-semibold text-[#451420]">
                <UserIcon size={13} />
                {user.name.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer"
                title="Keluar"
                aria-label="Keluar"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={openLogin}
                className="text-[13px] font-semibold text-[#451420] hover:opacity-75 transition px-2 cursor-pointer"
              >
                Login
              </button>
              <button
                type="button"
                onClick={openRegister}
                className="px-4 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] text-xs font-semibold shadow-xs transition hover:-translate-y-0.5 cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-[#451420] hover:bg-[#F5EDF0] transition"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        lang={lang}
        onSelectLang={setLang}
        user={user}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onLogout={logout}
      />
    </>
  );
}
