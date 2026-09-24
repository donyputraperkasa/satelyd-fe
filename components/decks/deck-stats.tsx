"use client";

import { Layers, HelpCircle, BookCheck, Tv } from "lucide-react";
import type { DeckStatsProps } from "@/types";

export function DeckStats({ decks }: DeckStatsProps) {
  const totalDecks = decks.length;
  const totalCards = decks.reduce((acc, d) => acc + (d.cards ? d.cards.length : d.cardCount), 0);
  const subjects = new Set(decks.map((d) => d.subject.trim())).size;
  const avgCards = totalDecks > 0 ? Math.round(totalCards / totalDecks) : 0;

  const statItems = [
    {
      label: "Total Deck Materi",
      value: totalDecks.toString(),
      subtext: `${totalDecks} deck materi aktif`,
      icon: Layers,
      iconColor: "text-[#451420]",
      bgColor: "bg-[#F5EFEB]",
      borderColor: "border-[#E5D7DC]",
    },
    {
      label: "Total Kartu Soal",
      value: totalCards.toString(),
      subtext: "Butir soal siap dimainkan",
      icon: HelpCircle,
      iconColor: "text-[#2E7D32]",
      bgColor: "bg-[#EDF7ED]",
      borderColor: "border-[#C8E6C9]",
      badge: "SIAP PAKAI",
      badgeColor: "bg-[#EDF7ED] text-[#2E7D32] border-[#C8E6C9]",
    },
    {
      label: "Koleksi Mapel",
      value: subjects.toString(),
      subtext: "Kategori mata pelajaran",
      icon: BookCheck,
      iconColor: "text-[#7A283C]",
      bgColor: "bg-[#FAF2F4]",
      borderColor: "border-[#ECDDE2]",
    },
    {
      label: "Rata-rata per Deck",
      value: avgCards.toString(),
      subtext: "Kartu soal per paket deck",
      icon: Tv,
      iconColor: "text-amber-700",
      bgColor: "bg-amber-50/70",
      borderColor: "border-amber-200/70",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {statItems.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div
                className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border ${stat.borderColor} ${stat.bgColor} ${stat.iconColor}`}
              >
                <Icon size={17} className="sm:hidden" />
                <Icon size={20} className="hidden sm:block" />
              </div>
              {stat.badge && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-black tracking-wider ${stat.badgeColor}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2E7D32]" />
                  {stat.badge}
                </span>
              )}
            </div>

            <div className="mt-2.5 sm:mt-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#7A5661] truncate">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xl sm:text-3xl font-black text-[#451420]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] sm:text-xs text-[#9C737F] font-medium truncate">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
