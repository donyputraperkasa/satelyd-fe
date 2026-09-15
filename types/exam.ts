export type ExamStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

export interface ExamQuestion {
  id: string;
  examId?: string;
  number: number;
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "ESSAY";
  options?: { key: string; text: string }[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  durationMinutes: number;
  totalQuestions: number;
  totalParticipants: number;
  activeParticipants: number;
  status: ExamStatus;
  tokenCode: string;
  passingScore: number;
  createdAt: string;
  description?: string;
  scheduledAt?: string;
  questions?: ExamQuestion[];
}

export interface ExamSummaryMetrics {
  totalExams: number;
  activeExams: number;
  totalParticipants: number;
  averageScore: number;
}

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: "EXM-0901",
    title: "Penilaian Harian: Grafik Fungsi Kuadrat & Operasi Akar",
    subject: "Matematika",
    gradeLevel: "Kelas 9 SMP",
    durationMinutes: 60,
    totalQuestions: 25,
    totalParticipants: 32,
    activeParticipants: 28,
    status: "PUBLISHED",
    tokenCode: "SAT-M9K",
    passingScore: 75,
    createdAt: "15 Sep 2026",
    description: "Evaluasi pemahaman sketsa parabola, titik potong, puncak, serta penjumlahan & perkalian akar.",
  },
  {
    id: "EXM-0902",
    title: "Asesmen Sumatif: Operasi Bentuk Aljabar & Pemfaktoran",
    subject: "Matematika",
    gradeLevel: "Kelas 8 SMP",
    durationMinutes: 45,
    totalQuestions: 20,
    totalParticipants: 36,
    activeParticipants: 0,
    status: "CLOSED",
    tokenCode: "ALJ-8B1",
    passingScore: 70,
    createdAt: "12 Sep 2026",
    description: "Ujian pemahaman operasi suku sejenis, perkalian binomial, dan faktorisasi bentuk kuadrat.",
  },
  {
    id: "EXM-0903",
    title: "Simulasi Ujian Sekolah: Geometri, Sudut & Teorema Pythagoras",
    subject: "Matematika",
    gradeLevel: "Kelas 9 SMP",
    durationMinutes: 90,
    totalQuestions: 35,
    totalParticipants: 0,
    activeParticipants: 0,
    status: "DRAFT",
    tokenCode: "GEO-9PY",
    passingScore: 78,
    createdAt: "14 Sep 2026",
    description: "Paket soal komprehensif persiapan ujian akhir semester materi geometri dan bidang datar.",
  },
  {
    id: "EXM-0904",
    title: "Kuis Cepat: Hukum Newton & Gerak Lurus Beraturan (GLB/GLBB)",
    subject: "Fisika / IPA",
    gradeLevel: "Kelas 8 SMP",
    durationMinutes: 30,
    totalQuestions: 15,
    totalParticipants: 30,
    activeParticipants: 24,
    status: "PUBLISHED",
    tokenCode: "IPA-8GL",
    passingScore: 72,
    createdAt: "15 Sep 2026",
    description: "Kuis pemahaman konsep gaya gesek, percepatan, dan grafik kecepatan terhadap waktu.",
  },
  {
    id: "EXM-0905",
    title: "Tryout Mandiri: Persiapan Asesmen Standar Nasional (ASPD)",
    subject: "Matematika & Literasi Numerasi",
    gradeLevel: "Kelas 9 SMP",
    durationMinutes: 80,
    totalQuestions: 30,
    totalParticipants: 54,
    activeParticipants: 0,
    status: "CLOSED",
    tokenCode: "NUM-9AS",
    passingScore: 80,
    createdAt: "08 Sep 2026",
    description: "Ujian uji coba bernalar numerasi berbasis konteks kontekstual dan data saintifik.",
  },
];
