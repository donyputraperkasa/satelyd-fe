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
        <div className="flex items-center gap-3 min-w-0">
          {onOpenSidebar && (
            <button
              type="button"
              onClick={onOpenSidebar}
              className="p-2 -ml-1 rounded-lg text-[#451420] hover:bg-[#F5EDF0] md:hidden cursor-pointer shrink-0"
              aria-label="Buka menu navigasi"
            >
              <Menu size={20} />
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <span className="font-display text-lg sm:text-xl font-black tracking-tight text-[#451420]">
              satel<span className="text-[#C67D00]">y</span>d
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${
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
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Game Tokens Pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs"
            title="Saldo Token Game TV"
          >
            <Gamepad2 size={14} className="text-[#C67D00]" />
            <span className="hidden sm:inline text-[#7A5661]">Game:</span>
            <span>{user.isUnlimited || isAdmin ? "∞" : (user.gameTokenBalance ?? 0).toLocaleString("id-ID")}</span>
          </div>

          {/* Exam Credit Pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs"
            title="Saldo Kredit Ujian Guru"
          >
            <GraduationCap size={14} className="text-[#451420]" />
            <span className="hidden sm:inline text-[#7A5661]">Ujian:</span>
            <span>{user.isUnlimited || isAdmin ? "∞" : (user.examCreditBalance ?? 0).toLocaleString("id-ID")}</span>
          </div>

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
