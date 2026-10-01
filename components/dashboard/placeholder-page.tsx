"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Coins,
  GraduationCap,
  Layers,
  Sparkles,
  Tv,
  Users,
} from "lucide-react";

import type { PlaceholderPageProps } from "@/types";

const ICON_MAP = {
  game: Tv,
  decks: Layers,
  exams: GraduationCap,
  tokens: Coins,
  guides: BookOpen,
  users: Users,
};

export function PlaceholderPage({
  title,
  description,
  iconType,
}: PlaceholderPageProps) {
  const Icon = ICON_MAP[iconType] ?? Sparkles;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#E6B85C]">
              Modul Administrasi
            </span>
            <span className="rounded-full bg-[#FFF4E5] dark:bg-[#2C2114] px-2.5 py-0.5 text-[10px] font-bold text-[#C67D00] dark:text-[#FBBF24] border border-[#FDE68A]/60 dark:border-[#4E3918]">
              Segera Hadir
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1.5 flex items-center gap-2">
            <Icon size={26} className="text-[#C67D00] dark:text-[#E6B85C]" />
            <span>{title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">{description}</p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] px-4 py-2 text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] hover:bg-[#F5EDF0] dark:hover:bg-[#282E3E] transition shadow-2xs"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Ringkasan</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-[#DFD0D5] dark:border-[#282E3E] bg-white/70 dark:bg-[#161B26]/80 p-8 sm:p-14 text-center space-y-4 shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EDF0] dark:bg-[#222838] text-[#451420] dark:text-[#E6B85C] shadow-2xs">
          <Icon size={32} />
        </div>
        <div className="max-w-md mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] dark:bg-[#281F13] px-3 py-1 text-xs font-bold text-[#C67D00] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#4E3918]">
            <Sparkles size={13} />
            <span>Dalam Tahap Pengembangan</span>
          </div>
          <h3 className="font-display text-lg font-bold text-[#451420] dark:text-[#F8FAFC]">
            Fitur {title} Segera Hadir
          </h3>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
            Modul ini sedang dalam proses integrasi backend. Anda akan dapat mengelola akun pengguna, hak akses peran, dan manajemen sekolah secara terpusat pada pembaruan mendatang.
          </p>
        </div>
      </div>
    </div>
  );
}
