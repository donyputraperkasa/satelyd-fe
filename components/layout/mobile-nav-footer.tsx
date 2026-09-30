"use client";

import { LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import Link from "next/link";
import type { User } from "@/types";

interface MobileNavFooterProps {
  theme?: "light" | "dark";
  onSelectTheme?: (theme: "light" | "dark") => void;
  user: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileNavFooter({
  theme = "light",
  onSelectTheme,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onClose,
}: MobileNavFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* Theme Toggle Pill */}
      <div className="flex items-center gap-1 bg-[#EFE8EB] dark:bg-[#1C202C] p-1 rounded-full border border-[#DDD0D5] dark:border-[#282E3E]">
        <button
          type="button"
          onClick={() => onSelectTheme?.("light")}
          className={`p-2 rounded-full transition cursor-pointer ${
            theme === "light"
              ? "bg-[#451420] text-[#FDFBF7] shadow-sm"
              : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          }`}
          title="Mode Terang"
          aria-label="Mode Terang"
        >
          <Sun size={17} />
        </button>
        <button
          type="button"
          onClick={() => onSelectTheme?.("dark")}
          className={`p-2 rounded-full transition cursor-pointer ${
            theme === "dark"
              ? "bg-[#C67D00] text-[#141720] shadow-sm"
              : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          }`}
          title="Mode Gelap"
          aria-label="Mode Gelap"
        >
          <Moon size={17} />
        </button>
      </div>

      {/* Auth Actions */}
      {user ? (
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-[#451420] text-[#FDFBF7] dark:bg-[#C67D00] dark:text-[#141720] text-xs font-bold shadow-xs hover:bg-[#300C15] dark:hover:bg-[#B37000]"
          >
            Dashboard
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EDF0] dark:bg-[#1C202C] border border-[#E2D5D9] dark:border-[#282E3E] text-xs font-semibold text-[#451420] dark:text-[#F8FAFC]">
            <UserIcon size={13} />
            {user.name.split(" ")[0]}
          </span>
          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="p-1.5 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] dark:text-[#94A3B8] dark:hover:bg-[#1C202C] dark:hover:text-[#F8FAFC] transition cursor-pointer"
            title="Keluar"
          >
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="px-4 py-2 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] hover:opacity-75 transition cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="px-4 py-2 rounded-full bg-[#451420] hover:bg-[#300C15] text-[#FDFBF7] dark:bg-[#C67D00] dark:hover:bg-[#B37000] dark:text-[#141720] text-xs font-bold shadow-xs transition cursor-pointer"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}
