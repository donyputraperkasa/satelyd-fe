"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Satellite, LogOut, X, Sparkles } from "lucide-react";
import { useAuthModal } from "@/components/modals";
import type { DashboardSidebarProps } from "@/types";
import { DASHBOARD_NAV_ITEMS } from "./sidebar-items";

export function DashboardSidebar({ user, isOpenMobile = false, onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthModal();
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const navList = DASHBOARD_NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {isOpenMobile && (
        <div onClick={onCloseMobile} aria-hidden="true" className="fixed inset-0 z-40 bg-[#451420]/40 backdrop-blur-xs md:hidden" />
      )}

      <aside
        aria-label="Sidebar Navigasi"
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#10131B] transition-all duration-300 ease-in-out md:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex h-16 items-center justify-between border-b border-[#E5D7DC] dark:border-[#282E3E] px-6">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#451420] text-[#FDFBF7] shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Satellite size={20} className="text-[#FDFBF7]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-extrabold tracking-tight text-[#451420] dark:text-[#F8FAFC]">
                  satel<span className="text-[#C67D00]">y</span>d
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#7A5661] dark:text-[#94A3B8]">Edu Platform</span>
              </div>
            </Link>

            <button type="button" onClick={onCloseMobile} className="rounded-lg p-1.5 text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#EFE6E9] dark:hover:bg-[#1C202C] hover:text-[#451420] dark:hover:text-[#F8FAFC] md:hidden cursor-pointer" aria-label="Tutup menu">
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1.5 px-4 py-5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#A48E95] dark:text-[#64748B] mb-2">Menu Utama</p>
            {navList.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    isActive ? "bg-[#451420] dark:bg-[#C67D00] text-[#FDFBF7] dark:text-[#10131B] shadow-sm" : "text-[#613D48] dark:text-[#94A3B8] hover:bg-[#F2EAE7] dark:hover:bg-[#1C202C] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-white dark:text-[#10131B]" : "text-[#7A5661] dark:text-[#94A3B8] group-hover:text-[#451420] dark:group-hover:text-[#F8FAFC]"} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isActive ? "bg-[#C67D00] dark:bg-[#10131B] text-white dark:text-[#C67D00]" : "bg-[#F5EDF0] dark:bg-[#1C202C] text-[#C67D00] border border-[#F2DEB0] dark:border-[#382E1E]"}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-[#E5D7DC] dark:border-[#282E3E] p-4 bg-[#F5EFEA] dark:bg-[#141720] space-y-2.5 transition-colors">
          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-[#1C202C] p-3 border border-[#E8DFE3] dark:border-[#282E3E] shadow-2xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#451420] text-xs font-bold text-[#FDFBF7]">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#451420] dark:text-[#F8FAFC] capitalize">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {isAdmin}
                <span className="text-[10px] font-semibold text-[#7A5661] dark:text-[#94A3B8]">
                  {isAdmin ? "CEO" : "Pengguna"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-4 text-xs sm:text-sm font-bold text-[#8A1F2D] dark:text-[#F87171] hover:bg-[#FBEAEB] dark:hover:bg-[#281A1D] hover:border-[#F2C2C6] dark:hover:border-[#4B1E25] transition cursor-pointer shadow-2xs"
          >
            <LogOut size={16} />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>
    </>
  );
}
