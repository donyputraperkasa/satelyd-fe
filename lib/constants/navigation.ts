export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Game Edukasi", href: "#game", hasDropdown: true },
  { label: "Mode Ujian", href: "#ujian", hasDropdown: true },
  { label: "Akses Gratis", href: "#gratis" },
];

export const TARGET_ROLES = [
  { id: "siswa", label: "Siswa" },
  { id: "guru", label: "Guru" },
] as const;
