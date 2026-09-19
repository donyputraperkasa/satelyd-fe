"use client";

import Link from "next/link";
import { Layers, FolderPlus, FileQuestion, Tv, ArrowRight } from "lucide-react";
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
            Kumpulkan dan kelola pustaka pertanyaan kuis Anda ke dalam kumpulan deck tematik untuk dimainkan di Smart TV dan Ujian Sekolah.
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
          description="Satukan soal berdasarkan mata pelajaran, topik materi kurikulum, atau bab ajar tertentu."
          icon={FolderPlus}
          details={[
            "Buka menu 'Bank Soal & Deck' di sidebar lalu klik '+ Buat Deck Baru'.",
            "Beri judul deck yang jelas, misalnya 'Operasi Aljabar & Pemfaktoran'.",
            "Tentukan mata pelajaran dan tingkat kelas (misal: Matematika - Kelas 8 SMP).",
            "Pilih estimasi tingkat kesulitan materi (Mudah, Sedang, Sulit, atau Campuran).",
          ]}
          tip="Kelompokkan setiap deck per topik bahasan kecil agar mudah dipilih saat pembelajaran harian."
        />

        <GuideStepCard
          stepNumber={2}
          title="Menyusun Kartu Soal (Pilihan Ganda & Essay)"
          description="Bangun bank pertanyaan berkualitas lengkap dengan kunci jawaban, timer, dan lampiran gambar."
          icon={FileQuestion}
          details={[
            "Klik 'Kelola Soal' pada kartu deck yang ingin Anda atur butir pertanyaannya.",
            "Pilih format soal: 'Pilihan Ganda' (opsi A-B-C-D dengan radio button kunci benar) atau 'Essay / Uraian' (kunci jawaban kata kunci).",
            "Lampirkan gambar file diagram, grafik rumus, atau ilustrasi soal dengan tombol 'Upload File Gambar'.",
            "Tuliskan pembahasan rumus yang akan otomatis terbuka saat tombol 'Lihat Jawaban' ditekan.",
            "Gunakan simulator Pratinjau Kartu di sisi kanan untuk menguji nomor besar dan efek membalik kartu.",
          ]}
          tip="Sisi depan kartu kuis di Smart TV hanya menampilkan nomor soal besar agar tampak bersih dan tidak membocorkan petunjuk."
        />

        <GuideStepCard
          stepNumber={3}
          title="Memulai Sesi di Smart TV via PIN Sesi & Kabel HDMI"
          description="Hubungkan sesi game ke layar Smart TV kelas dengan aman tanpa perlu login akun guru di TV sekolah."
          icon={Tv}
          details={[
            "Di laptop/HP guru: Klik tombol 'Mulai Sesi TV' pada deck materi yang dipilih.",
            "Pilih salah satu dari 3 jenis game: 🃏 Flip Card Game, 🎡 Wheels Question (Spin Wheel), atau ⚔️ Duel 2 Player.",
            "Cara 1 (Smart TV via PIN - Rekomendasi Aman): Dapatkan 6-digit Kode PIN Sesi. Buka website Satelyd di Smart TV kelas, klik 'Masukkan PIN' > 'Game TV Kelas', ketikkan PIN tersebut. Layar Smart TV langsung memuat game tanpa login!",
            "Cara 2 (Laptop HDMI / Proyektor): Jika laptop guru tersambung kabel HDMI/proyektor, langsung klik 'Luncurkan Game di Layar Ini'.",
            "Mode Ujian Siswa: Anda juga dapat mengekspor butir soal deck ke paket ujian mandiri siswa berkode token anti-curang.",
          ]}
          tip="Dengan Kode PIN Sesi, guru tidak perlu repot mengetik password akun di Smart TV kelas yang disaksikan murid."
        />
      </div>
    </section>
  );
}
