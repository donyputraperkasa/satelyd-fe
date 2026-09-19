"use client";

import { Gamepad2, GraduationCap, Menu } from "lucide-react";
import Link from "next/link";
import type { User } from "@/types";
import { DashboardBreadcrumbs } from "./dashboard-breadcrumbs";

interface DashboardHeaderProps {
  user: User;
  onOpenSidebar?: () => void;
}

function formatCompactTokens(val: number): string {
  if (val >= 1_000_000) {
    const formatted = (val / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}M`;
  }
  if (val >= 100_000) {
    return `${Math.floor(val / 1_000)}k`;
  }
  if (val >= 1_000) {
    const formatted = (val / 1_000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}k`;
  }
  return val.toLocaleString("id-ID");
}

export function DashboardHeader({ user, onOpenSidebar }: DashboardHeaderProps) {
  const gameTokens = user.gameTokenBalance ?? 50;
  const examTokens = user.examCreditBalance ?? 100;

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

        {/* Right Section: Only the clean dual-segment token pill */}
        <div className="flex items-center shrink-0">
          <Link
            href="/dashboard/tokens"
            className="h-8 sm:h-9 inline-flex items-center rounded-full bg-white border border-[#DFD0D5] text-[#451420] shadow-2xs hover:border-[#451420] hover:bg-[#FAF7F2] transition shrink-0 px-1.5 sm:px-2"
            title={`Kelola Token: Game (${gameTokens.toLocaleString("id-ID")}), Publish Ujian (${examTokens.toLocaleString("id-ID")})`}
          >
            {/* Game Token Section */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5">
              <Gamepad2 size={15} className="text-[#C67D00] shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold text-[#7A5661]">Game</span>
              <span className="font-extrabold text-xs sm:text-[13px] text-[#451420] tracking-normal">
                {formatCompactTokens(gameTokens)}
              </span>
            </span>

            {/* Separator */}
            <span className="h-3.5 w-[1px] bg-[#E5D7DC]" />

            {/* Exam / Publish Token Section */}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5">
              <GraduationCap size={15} className="text-[#7A283C] shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold text-[#7A5661]">Ujian</span>
              <span className="font-extrabold text-xs sm:text-[13px] text-[#451420] tracking-normal">
                {formatCompactTokens(examTokens)}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
