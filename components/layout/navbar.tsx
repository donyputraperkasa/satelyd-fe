"use client";

import { LogOut, Menu, User as UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuthModal } from "@/components/modals";
import { GuideModal } from "@/components/guides/guide-modal";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";
import { GAME_DROPDOWN_ITEMS, EXAM_DROPDOWN_ITEMS, MATH_DROPDOWN_ITEMS } from "./nav-menu-data";

export function Navbar() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"game" | "exam" | "math" | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { openLogin, openRegister, openPin, user, logout } = useAuthModal();

  const toggleDropdown = (key: "game" | "exam" | "math") =>
    setActiveDropdown((prev) => (prev === key ? null : key));

  return (
    <>
      <header className="w-full pt-6 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base font-extrabold tracking-tight text-[#451420]">
            satel<span className="text-[#C67D00]">y</span>d
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#6B4651]">
          <NavDropdown label="Game Edukasi" isOpen={activeDropdown === "game"} onToggle={() => toggleDropdown("game")} onClose={() => setActiveDropdown(null)} items={GAME_DROPDOWN_ITEMS} footerAction={{ label: "Punya PIN Game? Masuk Cepat", onClick: openPin }} />
          <NavDropdown label="Mode Ujian" isOpen={activeDropdown === "exam"} onToggle={() => toggleDropdown("exam")} onClose={() => setActiveDropdown(null)} items={EXAM_DROPDOWN_ITEMS} footerAction={{ label: "Punya PIN Ujian Siswa? Masuk Cepat", onClick: openPin }} />
          <NavDropdown label="Less Matematika" isOpen={activeDropdown === "math"} onToggle={() => toggleDropdown("math")} onClose={() => setActiveDropdown(null)} items={MATH_DROPDOWN_ITEMS} />
          <button type="button" onClick={() => setIsGuideOpen(true)} className="hover:text-[#451420] transition cursor-pointer font-medium">
            Panduan
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <div className="flex items-center bg-[#EFE8EB] p-0.5 rounded-full text-xs font-semibold border border-[#DDD0D5]">
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full uppercase transition cursor-pointer ${
                  lang === l ? "bg-[#451420] text-[#FDFBF7] shadow-xs" : "text-[#7A5661] hover:text-[#451420]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="px-3.5 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] text-xs font-bold shadow-xs transition hover:-translate-y-0.5">
                Dashboard
              </Link>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-xs font-semibold text-[#451420]">
                <UserIcon size={13} />
                {user.name.split(" ")[0]}
              </span>
              <button type="button" onClick={logout} className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer" title="Keluar">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <button type="button" onClick={openLogin} className="text-[13px] font-semibold text-[#451420] hover:opacity-75 transition px-2 cursor-pointer">
                Login
              </button>
              <button type="button" onClick={openRegister} className="px-4 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] text-xs font-semibold shadow-xs transition hover:-translate-y-0.5 cursor-pointer">
                Register
              </button>
            </>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button type="button" onClick={() => setIsMobileMenuOpen((prev) => !prev)} className="p-2 rounded-lg text-[#451420] hover:bg-[#F5EDF0] transition" aria-label="Menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

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

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} type="GAMES" />
    </>
  );
}
