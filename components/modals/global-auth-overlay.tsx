"use client";

import { Loader2, ShieldCheck, LogOut, Sparkles } from "lucide-react";

export interface GlobalAuthOverlayProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  type?: "login" | "logout" | "register";
}

export function GlobalAuthOverlay({
  isOpen,
  title,
  subtitle,
  type = "login",
}: GlobalAuthOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1C202C] rounded-3xl p-7 text-center shadow-2xl border-2 border-[#ECD0D8] dark:border-[#282E3E] space-y-4 animate-in zoom-in-95 duration-150">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#FAF0F3] dark:bg-[#141720] border border-[#ECD0D8] dark:border-[#282E3E] flex items-center justify-center text-[#7A283C] dark:text-[#FBBF24] shadow-xs">
          {type === "logout" ? (
            <LogOut size={26} className="text-[#7A283C] dark:text-[#FBBF24] animate-pulse" />
          ) : type === "register" ? (
            <Sparkles size={26} className="text-[#7A283C] dark:text-[#FBBF24] animate-bounce" />
          ) : (
            <ShieldCheck size={26} className="text-[#7A283C] dark:text-[#FBBF24] animate-pulse" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-display font-extrabold text-base sm:text-lg text-[#451420] dark:text-[#F8FAFC]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="pt-2">
          <div className="w-full h-1.5 rounded-full bg-[#FAF0F3] dark:bg-[#282E3E] overflow-hidden">
            <div className="h-full bg-[#7A283C] dark:bg-[#C67D00] rounded-full animate-pulse w-full" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] font-bold text-[#7A5661] dark:text-[#94A3B8]">
            <Loader2 size={13} className="animate-spin text-[#7A283C] dark:text-[#FBBF24]" />
            <span>Mohon tunggu sebentar...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
