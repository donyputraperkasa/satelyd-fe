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
import type { NavItem } from "@/types";

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Game TV", href: "/dashboard/game", icon: Tv },
  { label: "Bank Soal", href: "/dashboard/decks", icon: Layers },
  { label: "Ujian Siswa", href: "/dashboard/exams", icon: GraduationCap },
  { label: "Saldo Token", href: "/dashboard/tokens", icon: Coins },
  { label: "Transaksi", href: "/dashboard/transactions", icon: Receipt, adminOnly: true },
  { label: "Panduan", href: "/dashboard/guides", icon: BookOpen },
  { label: "Pengguna", href: "/dashboard/users", icon: Users, adminOnly: true },
];
