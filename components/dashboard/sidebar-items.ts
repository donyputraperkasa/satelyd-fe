import {
  LayoutDashboard,
  Tv,
  Layers,
  GraduationCap,
  Coins,
  BookOpen,
  Users,
  Receipt,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  adminOnly?: boolean;
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Game TV Kelas", href: "/dashboard/game", icon: Tv },
  { label: "Bank Soal & Deck", href: "/dashboard/decks", icon: Layers },
  { label: "Mode Ujian Siswa", href: "/dashboard/exams", icon: GraduationCap },
  { label: "Token & Saldo", href: "/dashboard/tokens", icon: Coins },
  { label: "Transaksi & Admit", href: "/dashboard/transactions", icon: Receipt, adminOnly: true },
  { label: "Panduan Guru", href: "/dashboard/guides", icon: BookOpen },
  { label: "Kelola Pengguna", href: "/dashboard/users", icon: Users, adminOnly: true },
];
