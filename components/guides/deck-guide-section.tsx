"use client";

import Link from "next/link";
import { Layers, FolderPlus, FileQuestion, PlaySquare, ArrowRight } from "lucide-react";
import { GuideStepCard } from "./guide-step-card";

export function DeckGuideSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D7DC] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold text-[#7A283C]">
            <Layers size={13} />
            Modul 2: Bank Soal & Deck
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-[#451420]">
            Panduan Mengelola Bank Soal & Deck
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
            Kumpulkan dan kelola pustaka pertanyaan kuis Anda ke dalam kumpulan deck tematik yang dapat digunakan berulang kali.
          </p>
        </div>

        <Link
          href="/dashboard/decks"
          className="inline-flex items-center gap-2 rounded-xl bg-[#451420] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs self-start sm:self-center shrink-0"
        >
          <span>Buka Bank Soal</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <GuideStepCard
          stepNumber={1}
          title="Membuat & Mengelompokkan Deck Baru"
          description="Satukan soal berdasarkan materi kurikulum atau bab ajar tertentu."
          icon={FolderPlus}
          details={[
            "Buka menu 'Bank Soal & Deck' di sidebar lalu klik '+ Buat Deck Baru'.",
            "Beri judul deck yang jelas, misalnya 'Fisika Kelas 10 - Gerak Lurus Beraturan'.",
            "Tentukan mata pelajaran, tingkat kelas, serta deskripsi ruang lingkup kompetensi dasar.",
            "Tentukan pengaturan akses (pribadi atau publik untuk rekan guru lainnya).",
          ]}
          tip="Kelompokkan setiap deck per topik bahasan kecil agar mudah dipilih saat pembelajaran harian."
        />

        <GuideStepCard
          stepNumber={2}
          title="Menyusun Kartu Soal di Dalam Deck"
          description="Bangun bank pertanyaan berkualitas dengan kunci jawaban dan variasi tingkat kesulitan."
          icon={FileQuestion}
          details={[
            "Klik deck yang ingin Anda isi, kemudian klik 'Tambah Soal Baru'.",
            "Tuliskan pertanyaan, opsi pilihan ganda, dan tetapkan kunci jawaban yang benar.",
            "Tambahkan gambar penjelas (diagram rumus, peta, atau grafik) untuk mempermudah pemahaman siswa.",
            "Berikan tingkat kesulitan (Mudah, Sedang, Sulit) sebagai acuan saat menyusun asesmen.",
          ]}
          tip="Semakin banyak soal yang tersimpan di deck, semakin bervariasi soal yang bisa diacak saat kuis kelas."
        />

        <GuideStepCard
          stepNumber={3}
          title="Menggunakan Deck untuk Game TV & Ujian"
          description="Satu bank soal untuk berbagai metode interaksi pembelajaran di kelas."
          icon={PlaySquare}
          details={[
            "Game TV Kelas: Pilih deck langsung di menu 'Game TV' untuk memulai kuis live interaktif dengan papan skor di layar proyektor.",
            "Mode Ujian Siswa: Muat butir soal dari deck ke dalam paket ujian resmi tanpa perlu mengetik ulang dari nol.",
            "Perbarui isi deck kapan pun; perubahan pada deck induk tidak merusak ujian yang sudah dipublikasikan sebelumnya.",
          ]}
          tip="Gunakan deck yang sama untuk pre-test (kuis cepat di TV) dan post-test (evaluasi mandiri di Mode Ujian)."
        />
      </div>
    </section>
  );
}
