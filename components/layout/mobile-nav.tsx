"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { MobileNavProps } from "@/types";
import { GAME_DROPDOWN_ITEMS, EXAM_DROPDOWN_ITEMS, MATH_DROPDOWN_ITEMS } from "./nav-menu-data";
import { MobileNavSection, type MobileNavSectionData } from "./mobile-nav-section";
import { MobileNavFooter } from "./mobile-nav-footer";

export function MobileNav({
  isOpen,
  onClose,
  theme = "light",
  onSelectTheme,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onOpenGuide,
  onOpenPin,
}: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<"game" | "exam" | "math" | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: "game" | "exam" | "math") => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const navSections: MobileNavSectionData[] = [
    {
      id: "game",
      label: "Game Edukasi",
      items: GAME_DROPDOWN_ITEMS,
      footerAction: onOpenPin
        ? {
            label: "Punya PIN Game? Masuk Cepat",
            onClick: () => {
              onClose();
              onOpenPin();
            },
          }
        : undefined,
    },
    {
      id: "exam",
      label: "Mode Ujian",
      items: EXAM_DROPDOWN_ITEMS,
      footerAction: onOpenPin
        ? {
            label: "Punya PIN Ujian Siswa? Masuk Cepat",
            onClick: () => {
              onClose();
              onOpenPin();
            },
          }
        : undefined,
    },
    {
      id: "math",
      label: "Jasa",
      items: MATH_DROPDOWN_ITEMS,
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 top-[72px] z-30 bg-[#451420]/25 dark:bg-black/60 backdrop-blur-xs md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-[#FDFBF7] dark:bg-[#141720] border-b border-[#E5D7DC] dark:border-[#282E3E] p-5 shadow-xl md:hidden transition-all animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-72px)] overflow-y-auto">
        <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#6B4651] dark:text-[#94A3B8]">
          {navSections.map((section) => (
            <MobileNavSection
              key={section.id}
              section={section}
              isExpanded={expandedSection === section.id}
              onToggle={() => toggleSection(section.id)}
              onClose={onClose}
            />
          ))}

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenGuide?.();
            }}
            className="flex items-center justify-between w-full py-2 text-left hover:text-[#451420] dark:hover:text-[#F8FAFC] transition cursor-pointer"
          >
            <span>Panduan</span>
            <ChevronRight size={16} className="text-[#A48E95] dark:text-[#64748B]" />
          </button>
        </nav>

        <div className="my-4 border-t border-[#E5D7DC] dark:border-[#282E3E]" />

        <MobileNavFooter
          theme={theme}
          onSelectTheme={onSelectTheme}
          user={user}
          onOpenLogin={onOpenLogin}
          onOpenRegister={onOpenRegister}
          onLogout={onLogout}
          onClose={onClose}
        />
      </div>
    </>
  );
}
