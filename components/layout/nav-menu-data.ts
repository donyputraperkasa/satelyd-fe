import {
  Gamepad2,
  Disc,
  Swords,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
  BookOpen,
  Code2,
} from "lucide-react";
import {
  webDevWhatsappUrl,
  mathTutoringWhatsappUrl,
} from "@/lib/constants/contact";
import type { NavDropdownItem } from "@/types";

export const GAME_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Flip Card Interaktif",
    desc: "Kuis kartu tebak cepat dengan timer dan penilaian otomatis.",
    icon: Gamepad2,
    badge: "Populer",
  },
  {
    title: "Roda Acak (Spin Wheel)",
    desc: "Putar roda undian interaktif untuk tunjuk soal atau siswa.",
    icon: Disc,
  },
  {
    title: "Duel 2 Tim (Battle Arena)",
    desc: "Tarik tambang cerdas antar kelompok di proyektor kelas.",
    icon: Swords,
  },
];

export const EXAM_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Ujian CBT Anti-Curang",
    desc: "Deteksi pindah tab dan proteksi layar ujian siswa otomatis.",
    icon: ShieldCheck,
    badge: "Aman",
  },
  {
    title: "Pemantau Live (Real-Time)",
    desc: "Pantau siswa aktif, progres, dan sisa waktu pengerjaan.",
    icon: Activity,
  },
  {
    title: "Rekap & Cetak Nilai PDF",
    desc: "Hasil ujian keluar instan dengan format cetak siap pakai.",
    icon: FileSpreadsheet,
  },
];

export const MATH_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Jasa Les Matematika",
    desc: "Bimbingan belajar matematika intensif untuk jenjang SD, SMP, hingga SMA.",
    icon: BookOpen,
    href: mathTutoringWhatsappUrl,
    badge: "Bimbel",
  },
  {
    title: "Jasa Buat Website & App",
    desc: "Pembuatan website profesional, landing page sekolah, dan aplikasi custom.",
    icon: Code2,
    href: webDevWhatsappUrl,
    badge: "Order",
  },
];

/** Alias semantik untuk menu dropdown 'Jasa' di navbar */
export const SERVICES_DROPDOWN_ITEMS = MATH_DROPDOWN_ITEMS;
