"use client";

import {
  BookOpen,
  X,
  FolderPlus,
  FileQuestion,
  Tv,
  PlusCircle,
  ListTodo,
  Send,
  Eye,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { GuideStepCard } from "./guide-step-card";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "DECKS" | "EXAMS";
}

export function GuideModal({ isOpen, onClose, type }: GuideModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDecks = type === "DECKS";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FDFBF7] rounded-2xl sm:rounded-3xl border border-[#DFD0D5] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-[#E5D7DC] bg-[#FAF7F2] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
              <BookOpen size={20} className="text-[#451420]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-black text-[#451420] leading-tight">
                {isDecks ? "Panduan Bank Soal & Deck" : "Panduan Mode Ujian & Asesmen"}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A5661] mt-0.5">
                {isDecks
                  ? "Panduan ringkas menyusun soal dan meluncurkan game interaktif di Smart TV."
                  : "Panduan ringkas pembuatan ujian, rilis token sesi, hingga unduh rekap nilai."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1 -mt-1 rounded-xl text-[#7A5661] hover:text-[#451420] hover:bg-[#F0E6E9] transition cursor-pointer"
            aria-label="Tutup panduan"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Scrollable Step Guides */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isDecks ? (
            <>
              <GuideStepCard
                stepNumber={1}
                title="Membuat & Mengelompokkan Deck Baru"
                description="Satukan soal berdasarkan mata pelajaran, topik materi kurikulum, atau bab ajar tertentu."
                icon={FolderPlus}
                details={[
                  "Buka menu 'Bank Soal & Deck' lalu klik tombol '+ Buat Deck Baru'.",
                  "Beri judul deck yang jelas, misalnya 'Operasi Aljabar & Pemfaktoran'.",
                  "Tentukan mata pelajaran, tingkat kelas, dan estimasi tingkat kesulitan materi.",
                ]}
                tip="Kelompokkan setiap deck per topik bahasan kecil agar mudah dipilih saat pembelajaran harian."
              />

              <GuideStepCard
                stepNumber={2}
                title="Menyusun Butir Soal (Pilihan Ganda & Essay)"
                description="Bangun butir pertanyaan berkualitas lengkap dengan kunci jawaban dan lampiran gambar."
                icon={FileQuestion}
                details={[
                  "Klik 'Kelola Soal' pada kartu deck untuk membuka editor soal.",
                  "Pilih format soal: 'Pilihan Ganda' (opsi A-B-C-D) atau 'Essay / Uraian'.",
                  "Tandai salah satu radio button sebagai kunci jawaban benar, dan sisipkan gambar bila diperlukan.",
                  "Tuliskan penjelasan pembahasan rumus yang dapat ditinjau saat pembahasan kelas.",
                ]}
                tip="Guru bebas menentukan berapa jumlah soal dalam satu deck sesuai kebutuhan jam ajar."
              />

              <GuideStepCard
                stepNumber={3}
                title="Memulai Sesi di Smart TV via PIN Sesi"
                description="Hubungkan game ke layar Smart TV kelas dengan aman tanpa perlu login di TV."
                icon={Tv}
                details={[
                  "Di laptop/HP guru: Klik tombol 'Mulai Sesi TV' pada kartu deck yang dipilih.",
                  "Pilih salah satu dari 3 jenis game: Flip Card Game, Wheels Question, atau Duel 2 Player.",
                  "Gunakan 6-digit Kode PIN Sesi unik untuk membuka arena game di Smart TV kelas tanpa perlu mengetikkan password akun.",
                ]}
                tip="Dengan Kode PIN Sesi, guru tidak perlu repot mengetik password akun di Smart TV kelas yang disaksikan murid."
              />
            </>
          ) : (
            <>
              <GuideStepCard
                stepNumber={1}
                title="Membuat Draft Paket Ujian Baru"
                description="Langkah awal untuk menyusun identitas asesmen sebelum memasukkan butir soal."
                icon={PlusCircle}
                details={[
                  "Buka menu 'Mode Ujian Siswa' lalu klik tombol '+ Buat Ujian Baru'.",
                  "Tentukan judul ujian, mata pelajaran, target jenjang/kelas, dan durasi pengerjaan.",
                  "Ujian yang baru dibuat otomatis berstatus Draft dan belum memotong token publish.",
                ]}
                tip="Ujian yang berstatus Draft dapat Anda sunting dan periksa kembali butir soalnya kapan saja."
              />

              <GuideStepCard
                stepNumber={2}
                title="Mengelola Butir Soal & Kunci Jawaban"
                description="Masukkan pertanyaan pilihan ganda terstruktur lengkap dengan opsi A-E dan media."
                icon={ListTodo}
                details={[
                  "Klik 'Kelola Soal' pada kartu ujian untuk menambah atau mengedit butir soal.",
                  "Tandai salah satu opsi sebagai kunci jawaban benar dan tentukan bobot poinnya.",
                  "Sisipkan gambar diagram bila diperlukan.",
                ]}
              />

              <GuideStepCard
                stepNumber={3}
                title="Mempublikasikan Ujian & Token Siswa"
                description="Aktifkan paket ujian agar siap dikerjakan oleh siswa di ruang kelas."
                icon={Send}
                details={[
                  "Pada baris/kartu ujian, klik tombol 'Publikasikan' (memotong 1 Token Publish).",
                  "Sistem otomatis membuatkan Kode Token Sesi unik (contoh: SAT-69U).",
                  "Bagikan kode token kepada siswa untuk mulai mengerjakan.",
                ]}
                tip="Token Publish hanya dipotong 1 kali saat paket ujian resmi diterbitkan."
              />

              <GuideStepCard
                stepNumber={4}
                title="Pengawasan Real-Time & Rekap Nilai"
                description="Pantau siswa yang sedang aktif mengerjakan dan unduh rekap nilai PDF."
                icon={Eye}
                details={[
                  "Klik 'Pantau Ruang Ujian' untuk melihat daftar siswa dan progres pengerjaan secara langsung.",
                  "Setelah waktu habis, tutup sesi ujian dan klik 'Rekap Nilai' untuk mencetak dokumen asesmen resmi format A4.",
                ]}
                tip="Dokumen Rekap Nilai siap dicetak atau disimpan ke format PDF untuk arsip sekolah."
              />
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-t border-[#E5D7DC] bg-[#FAF7F2] shrink-0">
          <Link
            href={`/dashboard/guides?tab=${type}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A283C] hover:text-[#451420] hover:underline"
          >
            <span>Buka Halaman Panduan Lengkap & FAQ</span>
            <ExternalLink size={13} />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#451420] text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
}
