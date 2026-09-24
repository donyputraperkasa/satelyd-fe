import {
  Gamepad2,
  Disc,
  Swords,
  ShieldCheck,
  Activity,
  FileSpreadsheet,
  MessageCircle,
} from "lucide-react";
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
    title: "Less Matematika",
    desc: "Tanya jawab materi atau jadwal bimbingan via WhatsApp.",
    icon: MessageCircle,
    href: "https://wa.me/6282236343404?text=Halo%20Satelyd%2C%20saya%20ingin%20tanya%20program%20bimbel%20matematika",
    badge: "Chat",
  },
];
