"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { NavDropdownProps } from "@/types";

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
          isOpen ? "text-[#451420] font-bold" : "hover:text-[#451420]"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 opacity-70 ${isOpen ? "rotate-180 text-[#451420]" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-[#E5D7DC] bg-[#FDFBF7] p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {items.map((it) => {
              const Icon = it.icon;
              const content = (
                <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F5EDF0] transition group text-left cursor-pointer">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF0F3] text-[#451420] border border-[#ECD0D8] group-hover:bg-[#451420] group-hover:text-white transition">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#451420] group-hover:text-[#300C15]">{it.title}</span>
                      {it.badge && (
                        <span className="rounded-full bg-[#FAF0F3] border border-[#ECD0D8] px-1.5 py-0.2 text-[9px] font-bold text-[#7A283C]">
                          {it.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7A5661] mt-0.5 line-clamp-2 leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              );

              if (it.href) {
                return (
                  <Link key={it.title} href={it.href} onClick={onClose} className="block">
                    {content}
                  </Link>
                );
              }
              return (
                <button
                  key={it.title}
                  type="button"
                  onClick={() => {
                    it.onClick?.();
                    onClose();
                  }}
                  className="w-full"
                >
                  {content}
                </button>
              );
            })}
          </div>

          {footerAction && (
            <div className="mt-2 pt-2 border-t border-[#E5D7DC]">
              <button
                type="button"
                onClick={() => {
                  footerAction.onClick();
                  onClose();
                }}
                className="w-full text-center py-2 text-xs font-bold text-[#451420] hover:bg-[#F5EDF0] rounded-xl transition cursor-pointer"
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
