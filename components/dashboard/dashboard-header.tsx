"use client";

import { Crown, Gamepad2, GraduationCap, Home, LogOut, Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth";
import type { User } from "@/types";

interface DashboardHeaderProps {
  user: User;
  onOpenSidebar?: () => void;
}

export function DashboardHeader({ user, onOpenSidebar }: DashboardHeaderProps) {
  const router = useRouter();
  const isAdmin = user.role === "ADMIN" || user.role === "admin";

  const handleLogout = () => {
    clearAuthSession();
    router.push("/");
  };

  return (
    <header className="w-full bg-[#FDFBF7] border-b border-[#E5D7DC] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand / Role */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenSidebar && (
            <button
              type="button"
              onClick={onOpenSidebar}
              className="p-1.5 sm:p-2 -ml-1 rounded-lg text-[#451420] hover:bg-[#F5EDF0] md:hidden cursor-pointer shrink-0"
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-display text-lg sm:text-xl font-black tracking-tight text-[#451420]">
              satel<span className="text-[#C67D00]">y</span>d
            </span>
          </div>

          {/* Role badge shown only on wide xl screens to prevent covering tokens on tablet/laptop */}
          <span
            className={`hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${
              isAdmin
                ? "bg-[#FFF8E6] text-[#9A6200] border-[#F2DEB0]"
                : "bg-[#F5EDF0] text-[#5C323E] border-[#E2D5D9]"
            }`}
          >
            {isAdmin ? <Crown size={12} className="text-[#C67D00]" /> : <UserIcon size={12} />}
            <span>{isAdmin ? "Super Admin" : "Pengguna"}</span>
          </span>
        </div>

        {/* Right Section: Tokens & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Game Tokens Pill */}
          <Link
            href="/dashboard/tokens"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] hover:bg-[#FAF7F2] transition shrink-0"
            title="Sisa Saldo Token Game: Klik untuk isi ulang atau kelola"
          >
            <Gamepad2 size={15} className="text-[#C67D00] shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#7A5661]">
              <span className="hidden sm:inline">Token </span>Game:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm text-[#451420]">
              {(user.gameTokenBalance ?? 50).toLocaleString("id-ID")}
            </span>
          </Link>

          {/* Exam / Publish Credit Pill */}
          <Link
            href="/dashboard/tokens"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] hover:bg-[#FAF7F2] transition shrink-0"
            title="Sisa Saldo Token Publish Ujian: Klik untuk isi ulang atau kelola"
          >
            <GraduationCap size={15} className="text-[#7A283C] shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#7A5661]">
              <span className="hidden sm:inline">Token </span>Publish:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm text-[#451420]">
              {(user.examCreditBalance ?? 100).toLocaleString("id-ID")}
            </span>
          </Link>

          <div className="h-5 w-[1px] bg-[#E5D7DC]" />

          {/* Back to Home & Logout */}
          <Link
            href="/"
            className="p-2 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] transition"
            title="Ke Halaman Utama"
          >
            <Home size={17} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] transition cursor-pointer"
            title="Keluar Akun"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
