import type { ComponentType } from "react";
import type { User } from "./user";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  adminOnly?: boolean;
}

export interface TokenOrder {
  id: string;
  userName: string;
  userEmail: string;
  packageName: string;
  tokenAmount: number;
  price: number;
  paymentMethod: string;
  createdAt: string;
  status: "PENDING" | "APPROVED";
}

export interface DashboardSidebarProps {
  user: User;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export interface DashboardHeaderProps {
  user: User;
  onOpenSidebar?: () => void;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isLast: boolean;
}

export interface ActionItem {
  title: string;
  badge: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  href: string;
  actionText: string;
  accentColor: string;
}

export interface StatsCardsProps {
  user: User;
}

export type PlaceholderIconKey =
  | "game"
  | "decks"
  | "exams"
  | "tokens"
  | "guides"
  | "users";

export interface PlaceholderPageProps {
  title: string;
  description: string;
  badge?: string;
  iconType: PlaceholderIconKey;
}

