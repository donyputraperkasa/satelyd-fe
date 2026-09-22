import {
  Gamepad2,
  Disc,
  Swords,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
  BookOpen,
  Calculator,
  MessageCircle,
} from "lucide-react";
import type { NavDropdownItem } from "@/types";

export const GAME_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Flip Card Interaktif",
    desc: "Kuis kartu tebak cepat dengan timer dan penilaian otomatis.",
    icon: Gamepad2,
    href: "/dashboard/game?mode=FLIP_CARD",
    badge: "Populer",
  },
  {
    title: "Roda Acak (Spin Wheel)",
    desc: "Putar roda undian interaktif untuk tunjuk soal atau siswa.",
    icon: Disc,
    href: "/dashboard/game?mode=WHEELS",
  },
  {
    title: "Duel 2 Tim (Battle Arena)",
    desc: "Tarik tambang cerdas antar kelompok di proyektor kelas.",
    icon: Swords,
    href: "/dashboard/game?mode=BATTLE_2P",
  },
];

export const EXAM_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Ujian CBT Anti-Curang",
    desc: "Deteksi pindah tab dan proteksi layar ujian siswa otomatis.",
    icon: ShieldCheck,
    href: "/dashboard/exams",
    badge: "Aman",
  },
  {
    title: "Pemantau Live (Real-Time)",
    desc: "Pantau siswa aktif, progres, dan sisa waktu pengerjaan.",
    icon: Activity,
    href: "/dashboard/exams",
  },
  {
    title: "Rekap & Cetak Nilai PDF",
    desc: "Hasil ujian keluar instan dengan format cetak siap pakai.",
    icon: FileSpreadsheet,
    href: "/dashboard/exams",
  },
];

export const MATH_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    title: "Bank Soal & Latihan",
    desc: "Materi aljabar, geometri, dan logika hitung terstruktur.",
    icon: BookOpen,
    href: "/dashboard/decks",
  },
  {
    title: "Tantangan Matematika Seru",
    desc: "Gunakan deck kartu untuk latihan berhitung interaktif.",
    icon: Calculator,
    href: "/dashboard/game",
  },
  {
    title: "Konsultasi Pengajar",
    desc: "Tanya jawab materi atau jadwal bimbingan via WhatsApp.",
    icon: MessageCircle,
    href: "https://wa.me/6281234567890?text=Halo%20Satelyd%2C%20saya%20ingin%20tanya%20program%20bimbel%20matematika",
    badge: "Chat",
  },
];
