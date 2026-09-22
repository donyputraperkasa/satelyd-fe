import type { ComponentType } from "react";
import type { User } from "./user";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "id" | "en";
  onSelectLang: (lang: "id" | "en") => void;
  user: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}

export interface NavDropdownItem {
  title: string;
  desc: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  href?: string;
  badge?: string;
  onClick?: () => void;
}

export interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  items: NavDropdownItem[];
  footerAction?: {
    label: string;
    onClick: () => void;
  };
}
