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
  badge = "Halaman Uji Aktif",
  iconType,
}: PlaceholderPageProps) {
  const Icon = ICON_MAP[iconType] ?? Sparkles;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00]">
            Modul Pembelajaran
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] mt-1 flex items-center gap-2">
            <Icon size={26} className="text-[#C67D00]" />
            <span>{title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] mt-1">{description}</p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#DFD0D5] bg-white px-4 py-2 text-xs font-semibold text-[#451420] hover:bg-[#F5EDF0] transition shadow-2xs"
        >
          <ArrowLeft size={14} />
          <span>Kembali ke Ringkasan</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-dashed border-[#DFD0D5] bg-white/70 p-8 sm:p-12 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5EDF0] text-[#451420]">
          <Icon size={28} />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF8E6] border border-[#F2DEB0] px-3 py-0.5 text-xs font-bold text-[#9A6200]">
            <Sparkles size={12} />
            <span>{badge}</span>
          </span>
          <h3 className="font-display text-lg font-bold text-[#451420]">Halaman {title}</h3>
          <p className="text-xs sm:text-sm text-[#7A5661]">
            Halaman ini disiapkan sementara untuk pengujian navigasi sidebar aktif. Fitur lengkap modul ini akan dikembangkan pada tahap selanjutnya.
          </p>
        </div>
      </div>
    </div>
  );
}
