"use client";

import { useMemo, useSyncExternalStore } from "react";
import { StatsCards, ActionGrid, OwnerRevenueWidget } from "@/components/dashboard";
import { getStoredUser } from "@/lib/auth";
import type { User } from "@/types";

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getClientSnapshot = () => {
  if (typeof window === "undefined") return null;
  return JSON.stringify(getStoredUser());
};

const getServerSnapshot = () => null;

export default function DashboardOverviewPage() {
  const storedUserRaw = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const user = useMemo<User | null>(() => {
    if (!storedUserRaw) return null;
    try {
      return JSON.parse(storedUserRaw);
    } catch {
      return null;
    }
  }, [storedUserRaw]);

  if (!user) return null;

  const isAdmin = user.role === "ADMIN" || user.role === "admin";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#FBBF24]">
            Ruang Kerja
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1 capitalize">
            Selamat datang, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">
            {user.email} • Terdaftar sebagai {isAdmin ? "CEO" : "Pengguna Aktif"}
          </p>
        </div>
      </section>

      {/* Stats & Balances */}
      <section>
        <StatsCards user={user} />
      </section>

      {/* Quick Actions Grid */}
      <section>
        <ActionGrid />
      </section>
    </div>
  );
}
