"use client";

import { BookOpen, GraduationCap, Layers, HelpCircle } from "lucide-react";

export type GuideTab = "ALL" | "EXAMS" | "DECKS" | "FAQ";

interface GuidesNavTabsProps {
  activeTab: GuideTab;
  onTabChange: (tab: GuideTab) => void;
}

const TABS: { id: GuideTab; label: string; icon: typeof BookOpen }[] = [
  { id: "ALL", label: "Semua Panduan", icon: BookOpen },
  { id: "EXAMS", label: "Mode Ujian Siswa", icon: GraduationCap },
  { id: "DECKS", label: "Bank Soal & Deck", icon: Layers },
  { id: "FAQ", label: "Tanya Jawab (FAQ)", icon: HelpCircle },
];

export function GuidesNavTabs({ activeTab, onTabChange }: GuidesNavTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
              isActive
                ? "bg-[#451420] text-white shadow-xs"
                : "bg-white border border-[#DFD0D5] text-[#7A5661] hover:bg-[#FAF7F2] hover:text-[#451420]"
            }`}
          >
            <Icon size={15} className={isActive ? "text-[#FDFBF7]" : "text-[#7A5661]"} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
