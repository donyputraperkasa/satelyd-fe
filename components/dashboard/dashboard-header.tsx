"use client";

import { Crown, Gamepad2, GraduationCap, Home, LogOut, Menu, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth";
import type { User } from "@/types";
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs";

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
    <header className="w-full h-16 bg-[#FDFBF7] border-b border-[#E5D7DC] px-4 sm:px-6 md:px-8 sticky top-0 z-30">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand / Desktop Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
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

          {/* Logo brand only on mobile (sidebar handles desktop) */}
          <div className="flex items-center gap-1.5 md:hidden shrink-0">
            <span className="font-display text-lg font-black tracking-tight text-[#451420]">
              satel<span className="text-[#C67D00]">y</span>d
            </span>
          </div>

          {/* Desktop Breadcrumbs seamlessly inside topbar */}
          <div className="hidden md:flex items-center min-w-0">
            <DashboardBreadcrumbs />
          </div>
        </div>

        {/* Right Section: Role badge, Tokens & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Role badge */}
          <span
            className={`hidden lg:inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-bold border shrink-0 ${
              isAdmin
                ? "bg-[#FFF8E6] text-[#9A6200] border-[#F2DEB0]"
                : "bg-[#F5EDF0] text-[#5C323E] border-[#E2D5D9]"
            }`}
          >
            {isAdmin ? <Crown size={14} className="text-[#C67D00]" /> : <UserIcon size={14} />}
            <span>{isAdmin ? "Super Admin" : "Pengguna"}</span>
          </span>
          {/* Game Tokens Pill */}
          <Link
            href="/dashboard/tokens"
            className="h-9 inline-flex items-center gap-2 px-3 sm:px-3.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] hover:bg-[#FAF7F2] transition shrink-0"
            title="Sisa Saldo Token Game: Klik untuk isi ulang atau kelola"
          >
            <Gamepad2 size={15} className="text-[#C67D00] shrink-0" />
            <span className="text-xs font-medium text-[#7A5661]">
              <span className="hidden sm:inline">Token </span>Game:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm text-[#451420]">
              {(user.gameTokenBalance ?? 50).toLocaleString("id-ID")}
            </span>
          </Link>

          {/* Exam / Publish Credit Pill */}
          <Link
            href="/dashboard/tokens"
            className="h-9 inline-flex items-center gap-2 px-3 sm:px-3.5 rounded-full bg-white border border-[#DFD0D5] text-xs font-semibold text-[#451420] shadow-2xs hover:border-[#451420] hover:bg-[#FAF7F2] transition shrink-0"
            title="Sisa Saldo Token Publish Ujian: Klik untuk isi ulang atau kelola"
          >
            <GraduationCap size={15} className="text-[#7A283C] shrink-0" />
            <span className="text-xs font-medium text-[#7A5661]">
              <span className="hidden sm:inline">Token </span>Publish:
            </span>
            <span className="font-mono font-black text-xs sm:text-sm text-[#451420]">
              {(user.examCreditBalance ?? 100).toLocaleString("id-ID")}
            </span>
          </Link>

          <div className="h-5 w-[1px] bg-[#E5D7DC] self-center" />

          {/* Back to Home & Logout */}
          <Link
            href="/"
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] border border-transparent hover:border-[#E5D7DC] transition shrink-0"
            title="Ke Halaman Utama"
          >
            <Home size={16} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-[#7A5661] hover:text-[#451420] hover:bg-[#F5EDF0] border border-transparent hover:border-[#E5D7DC] transition cursor-pointer shrink-0"
            title="Keluar Akun"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
