"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { NavDropdownProps } from "@/types";
import { NavDropdownItem } from "./nav-dropdown-item";

export function NavDropdown({
  label,
  isOpen,
  onToggle,
  onClose,
  items,
  footerAction,
}: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1 transition cursor-pointer font-medium py-1.5 ${
          isOpen ? "text-[#451420] dark:text-[#F8FAFC] font-bold" : "hover:text-[#451420] dark:hover:text-[#F8FAFC]"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 opacity-70 ${isOpen ? "rotate-180 text-[#451420] dark:text-[#F8FAFC]" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 transition-colors">
          <div className="space-y-1">
            {items.map((item) => (
              <NavDropdownItem key={item.title} item={item} onClose={onClose} />
            ))}
          </div>

          {footerAction && (
            <div className="mt-2 pt-2 border-t border-[#E5D7DC] dark:border-[#282E3E]">
              <button
                type="button"
                onClick={() => {
                  footerAction.onClick();
                  onClose();
                }}
                className="w-full text-center py-2 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#F5EDF0] dark:hover:bg-[#222838] rounded-xl transition cursor-pointer"
              >
                {footerAction.label} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
