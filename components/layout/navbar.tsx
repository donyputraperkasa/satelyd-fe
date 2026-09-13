"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <header className="w-full pt-6 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between z-10 relative">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <span className="text-base font-extrabold tracking-tight text-[#451420]">
          satel<span className="text-[#C67D00]">y</span>d
        </span>
      </Link>

      {/* Center Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#6B4651]">
        <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition">
          Game Edukasi <ChevronDown size={14} className="opacity-70" />
        </button>
        <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition">
          Mode Ujian <ChevronDown size={14} className="opacity-70" />
        </button>
        <button type="button" className="flex items-center gap-1 hover:text-[#451420] transition">
          Less Matematika <ChevronDown size={14} className="opacity-70" />
        </button>
        <a
          href="https://portofolio-ku-gold.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-[#451420] transition"
        >
          Portofolio
        </a>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Language Pill Switcher [ ID | EN ] */}
        <div className="flex items-center bg-[#EFE8EB] p-0.5 rounded-full text-xs font-semibold border border-[#DDD0D5]">
          <button
            type="button"
            onClick={() => setLang("id")}
            className={`px-2.5 py-1 rounded-full transition ${
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
            className={`px-2.5 py-1 rounded-full transition ${
              lang === "en"
                ? "bg-[#451420] text-[#FDFBF7] shadow-xs"
                : "text-[#7A5661] hover:text-[#451420]"
            }`}
          >
            EN
          </button>
        </div>

        {/* Auth Buttons: Login & Register */}
        <Link
          href="#login"
          className="text-[13px] font-semibold text-[#451420] hover:opacity-75 transition px-2"
        >
          Login
        </Link>

        <Link
          href="#register"
          className="px-4 py-1.5 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] text-xs font-semibold shadow-xs transition hover:-translate-y-0.5"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
