"use client";

import { LogOut, Menu, Moon, Sun, User as UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/components/modals";
import { GuideModal } from "@/components/guides/guide-modal";
import { MobileNav } from "./mobile-nav";
import { NavDropdown } from "./nav-dropdown";
import { GAME_DROPDOWN_ITEMS, EXAM_DROPDOWN_ITEMS, MATH_DROPDOWN_ITEMS } from "./nav-menu-data";

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"game" | "exam" | "math" | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const { openLogin, openRegister, openPin, user, logout } = useAuthModal();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDropdown = (key: "game" | "exam" | "math") =>
    setActiveDropdown((prev) => (prev === key ? null : key));

  return (
    <>
      <header className="w-full pt-6 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base font-extrabold tracking-tight text-[#451420] dark:text-[#F8FAFC] transition-colors">
            satel<span className="text-[#C67D00]">y</span>d
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#6B4651] dark:text-[#94A3B8]">
          <NavDropdown 
            label="Game Edukasi" 
            isOpen={activeDropdown === "game"} 
            onToggle={() => toggleDropdown("game")} 
            onClose={() => setActiveDropdown(null)} 
            items={GAME_DROPDOWN_ITEMS} 
            footerAction={{ label: "Punya PIN Game? Masuk Cepat", onClick: openPin }} 
          />

          <NavDropdown 
            label="Mode Ujian" 
            isOpen={activeDropdown === "exam"} 
            onToggle={() => toggleDropdown("exam")} 
            onClose={() => setActiveDropdown(null)} 
            items={EXAM_DROPDOWN_ITEMS} 
            footerAction={{ label: "Punya PIN Ujian Siswa? Masuk Cepat", onClick: openPin }} 
          />

          <NavDropdown 
            label="Jasa" 
            isOpen={activeDropdown === "math"} 
            onToggle={() => toggleDropdown("math")} 
            onClose={() => setActiveDropdown(null)} 
            items={MATH_DROPDOWN_ITEMS} 
          />
        
          <button type="button" onClick={() => setIsGuideOpen(true)} className="hover:text-[#451420] dark:hover:text-[#F8FAFC] transition cursor-pointer font-medium">
            Panduan
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-0.5 bg-[#EFE8EB] dark:bg-[#1C202C] p-1 rounded-full border border-[#DDD0D5] dark:border-[#282E3E] transition-colors">
            <button
              type="button"
              onClick={() => handleThemeChange("light")}
              className={`flex items-center justify-center shrink-0 p-1.5 rounded-full transition cursor-pointer ${
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
              onClick={() => handleThemeChange("dark")}
              className={`flex items-center justify-center shrink-0 p-1.5 rounded-full transition cursor-pointer ${
                theme === "dark"
                  ? "bg-white text-[#10131B] shadow-xs"
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
              <Link 
                href="/dashboard" 
                className="px-3.5 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] dark:bg-white dark:hover:bg-[#F1F5F9] dark:text-[#10131B] text-xs font-bold shadow-xs transition hover:-translate-y-0.5">
                Dashboard
              </Link>
              
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] dark:bg-[#1C202C] border border-[#E2D5D9] dark:border-[#282E3E] text-xs font-semibold text-[#451420] dark:text-[#F8FAFC]">
                <UserIcon size={13} />
                {user.name.split(" ")[0]}
              </span>

              <button 
                type="button" 
                onClick={logout} 
                className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] dark:text-[#94A3B8] dark:hover:bg-[#1C202C] dark:hover:text-[#F8FAFC] transition cursor-pointer" 
                title="Keluar"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <>
              <button type="button" onClick={openLogin} className="text-[13px] font-semibold text-[#451420] dark:text-[#F8FAFC] hover:opacity-75 transition px-2 cursor-pointer">
                Login
              </button>
              <button type="button" onClick={openRegister} className="px-4 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] dark:bg-white dark:hover:bg-[#F1F5F9] dark:text-[#10131B] text-xs font-semibold shadow-xs transition hover:-translate-y-0.5 cursor-pointer">
                Register
              </button>
            </>
          )}
        </div>

        <div className="flex items-center md:hidden">
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen((prev) => !prev)} 
            className="p-2 rounded-lg text-[#451420] dark:text-[#F8FAFC] hover:bg-[#F5EDF0] dark:hover:bg-[#1C202C] transition cursor-pointer" 
            aria-label="Menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        theme={theme}
        onSelectTheme={(t) => {
          setTheme(t);
          if (t === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }}
        user={user}
        onOpenLogin={openLogin}
        onOpenRegister={openRegister}
        onLogout={logout}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPin={openPin}
      />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} type="GAMES" />
    </>
  );
}
