"use client";

import { ArrowRight, Coins, Layers, ShieldCheck, Tv } from "lucide-react";
import Link from "next/link";
import type { ActionItem } from "@/types";

const ACTION_ITEMS: ActionItem[] = [
  {
    title: "Game TV Kelas (Tarik Tambang)",
    description:
      "Tampilkan game interaktif battle 2 tim di layar proyektor atau TV kelas. Siswa gabung via PIN.",
    icon: Tv,
    href: "/dashboard/game",
    actionText: "Mulai Sesi TV",
    accentColor: "bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]",
  },
  {
    title: "Koleksi Deck Kartu Pintar",
    description:
      "Buat, susun, dan kelola set kartu pertanyaan materi pelajaran yang akan dimainkan di kelas.",
    icon: Layers,
    href: "/dashboard/decks",
    actionText: "Kelola Kartu",
    accentColor: "bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]",
  },
  {
    title: "Mode Ujian Anti-Curang",
    description:
      "Terbitkan ujian sekolah dengan sensor otomatis deteksi keluar tab dan timer pengerjaan.",
    icon: ShieldCheck,
    href: "/dashboard/exams",
    actionText: "Kelola Ujian",
    accentColor: "bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]",
  },
  {
    title: "Beli Token & Riwayat Mutasi",
    description:
      "Isi ulang saldo Token Game TV dan Kredit Ujian dengan konfirmasi transfer pembayaran mudah.",
    icon: Coins,
    href: "/dashboard/tokens",
    actionText: "Lihat Saldo",
    accentColor: "bg-[#F5EDF0] dark:bg-[#141720] text-[#451420] dark:text-[#FBBF24]",
  },
];

export function ActionGrid() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-[#451420] dark:text-[#F8FAFC]">
          Fitur Utama Platform
        </h3>
        <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">Pilih modul untuk memulai</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACTION_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.accentColor}`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
                <h4 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC] group-hover:text-[#C67D00] dark:group-hover:text-[#FBBF24] transition">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#F2EAEC] dark:border-[#282E3E] pt-4">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#451420] dark:text-[#F8FAFC] group-hover:text-[#C67D00] dark:group-hover:text-[#FBBF24] transition"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
