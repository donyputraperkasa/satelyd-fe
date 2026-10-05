"use client";

import { Gamepad2, GraduationCap } from "lucide-react";
import type { StatsCardsProps } from "@/types";
import { StatCardItem } from "./stat-card-item";

export function StatsCards({ user }: StatsCardsProps) {
  const isAdmin = user.role === "ADMIN" || user.role === "admin";
  const gameTokens = user.gameTokenBalance ?? 0;
  const examCredits = user.examCreditBalance ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full">
      <StatCardItem
        title="Token Game TV"
        icon={Gamepad2}
        value={isAdmin ? "Tak Terbatas" : gameTokens.toLocaleString("id-ID")}
        subtitle="Digunakan untuk unlock limit kartu game & sesi battle TV kelas."
        priceText="Rp 2.500 / token"
        topUpHref="/dashboard/tokens?type=GAME#catalog-section"
        isAdmin={isAdmin}
      />

      <StatCardItem
        title="Token Mode Ujian"
        icon={GraduationCap}
        value={isAdmin ? "Tak Terbatas" : examCredits.toLocaleString("id-ID")}
        subtitle="Digunakan untuk menerbitkan paket ujian online anti-curang 7 hari."
        priceText="Rp 14.900 / token"
        topUpHref="/dashboard/tokens?type=EXAM#catalog-section"
        isAdmin={isAdmin}
      />
    </div>
  );
}
