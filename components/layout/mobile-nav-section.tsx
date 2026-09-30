"use client";

import { ChevronDown } from "lucide-react";
import type { NavDropdownItem as NavDropdownItemType } from "@/types";
import { NavDropdownItem } from "./nav-dropdown-item";

export interface MobileNavSectionData {
  id: "game" | "exam" | "math";
  label: string;
  items: NavDropdownItemType[];
  footerAction?: {
    label: string;
    onClick: () => void;
  };
}

interface MobileNavSectionProps {
  section: MobileNavSectionData;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function MobileNavSection({
  section,
  isExpanded,
  onToggle,
  onClose,
}: MobileNavSectionProps) {
  return (
    <div className="border-b border-[#F0E6E9] dark:border-[#1E2330] pb-2 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center justify-between w-full py-2 text-left transition cursor-pointer ${
          isExpanded
            ? "text-[#451420] dark:text-[#F8FAFC] font-bold"
            : "hover:text-[#451420] dark:hover:text-[#F8FAFC]"
        }`}
      >
        <span>{section.label}</span>
        <ChevronDown
          size={16}
          className={`text-[#A48E95] dark:text-[#64748B] transition-transform duration-200 ${
            isExpanded ? "rotate-180 text-[#451420] dark:text-[#F8FAFC]" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-1 space-y-1.5 pl-1 pr-1 pb-2 animate-in fade-in slide-in-from-top-1 duration-150">
          {section.items.map((item) => (
            <NavDropdownItem key={item.title} item={item} onClose={onClose} compact />
          ))}

          {section.footerAction && (
            <button
              type="button"
              onClick={section.footerAction.onClick}
              className="w-full mt-2 py-2 px-3 text-center text-xs font-bold text-[#451420] dark:text-[#F8FAFC] bg-[#FAF0F3] dark:bg-[#1C202C] border border-[#ECD0D8] dark:border-[#282E3E] rounded-xl hover:bg-[#451420] hover:text-white dark:hover:bg-[#C67D00] dark:hover:text-[#141720] transition cursor-pointer"
            >
              {section.footerAction.label} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
