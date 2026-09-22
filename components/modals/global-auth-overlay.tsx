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
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-7 text-center shadow-2xl border-2 border-[#ECD0D8] space-y-4 animate-in zoom-in-95 duration-150">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#FAF0F3] border border-[#ECD0D8] flex items-center justify-center text-[#7A283C] shadow-xs">
          {type === "logout" ? (
            <LogOut size={26} className="text-[#7A283C] animate-pulse" />
          ) : type === "register" ? (
            <Sparkles size={26} className="text-[#7A283C] animate-bounce" />
          ) : (
            <ShieldCheck size={26} className="text-[#7A283C]" />
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-display font-extrabold text-base sm:text-lg text-[#451420]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#7A5661] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="pt-2">
          <div className="w-full h-1.5 rounded-full bg-[#FAF0F3] overflow-hidden">
            <div className="h-full bg-[#7A283C] rounded-full animate-pulse w-full" />
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] font-bold text-[#7A5661]">
            <Loader2 size={13} className="animate-spin text-[#7A283C]" />
            <span>Mohon tunggu sebentar...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
