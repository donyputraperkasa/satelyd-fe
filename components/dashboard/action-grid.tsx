"use client";

import { ArrowRight, Coins, Layers, ShieldCheck, Tv } from "lucide-react";
import Link from "next/link";

interface ActionItem {
  title: string;
  badge: string;
  description: string;
  icon: typeof Tv;
  href: string;
  actionText: string;
  accentColor: string;
}

const ACTION_ITEMS: ActionItem[] = [
  {
    title: "Game TV Kelas (Tarik Tambang)",
    badge: "Populer",
    description:
      "Tampilkan game interaktif battle 2 tim di layar proyektor atau TV kelas. Siswa gabung via PIN.",
    icon: Tv,
    href: "#tv-session",
    actionText: "Mulai Sesi TV",
    accentColor: "bg-[#FFF8E6] text-[#C67D00]",
  },
  {
    title: "Koleksi Deck Kartu Pintar",
    badge: "Bank Soal",
    description:
      "Buat, susun, dan kelola set kartu pertanyaan materi pelajaran yang akan dimainkan di kelas.",
    icon: Layers,
    href: "#cards",
    actionText: "Kelola Kartu",
    accentColor: "bg-[#F5EDF0] text-[#451420]",
  },
  {
    title: "Mode Ujian Anti-Curang",
    badge: "Keamanan Tinggi",
    description:
      "Terbitkan ujian sekolah dengan sensor otomatis deteksi keluar tab dan timer pengerjaan.",
    icon: ShieldCheck,
    href: "#exams",
    actionText: "Kelola Ujian",
    accentColor: "bg-[#EBF7EE] text-[#1D6C31]",
  },
  {
    title: "Beli Token & Riwayat Mutasi",
    badge: "Top Up",
    description:
      "Isi ulang saldo Token Game TV dan Kredit Ujian dengan konfirmasi transfer pembayaran mudah.",
    icon: Coins,
    href: "#tokens",
    actionText: "Lihat Saldo",
    accentColor: "bg-[#F0F4FA] text-[#1F4F8F]",
  },
];

export function ActionGrid() {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-[#451420]">
          Fitur Utama Platform
        </h3>
        <span className="text-xs text-[#7A5661]">Pilih modul untuk memulai</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {ACTION_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-[#E5D7DC] bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.accentColor}`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full bg-[#F5EDF0] px-2.5 py-0.5 text-2xs font-semibold text-[#7A5661]">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-[#451420] group-hover:text-[#C67D00] transition">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-[#7A5661] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#F2EAEC] pt-4">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#451420] group-hover:text-[#C67D00] transition"
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
