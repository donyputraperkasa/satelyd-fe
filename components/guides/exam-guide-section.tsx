"use client";

import Link from "next/link";
import { PlusCircle, ListTodo, Send, Eye, FileSpreadsheet, ArrowRight, GraduationCap } from "lucide-react";
import { GuideStepCard } from "./guide-step-card";

export function ExamGuideSection() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5D7DC] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ECD0D8] bg-[#FAF0F3] px-3 py-1 text-xs font-bold text-[#7A283C]">
            <GraduationCap size={13} />
            Modul 1: Mode Ujian Siswa
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-black text-[#451420]">
            Panduan Lengkap Mode Ujian & Asesmen
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
            Pelajari alur pembuatan paket soal, penerbitan token sesi, monitoring real-time, hingga unduh rekap PDF.
          </p>
        </div>

        <Link
          href="/dashboard/exams"
          className="inline-flex items-center gap-2 rounded-xl bg-[#451420] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#5B1C2E] transition shadow-xs self-start sm:self-center shrink-0"
        >
          <span>Buka Mode Ujian</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <GuideStepCard
          stepNumber={1}
          title="Membuat Draft Paket Ujian Baru"
          description="Langkah awal untuk menyusun identitas asesmen sebelum memasukkan butir soal."
          icon={PlusCircle}
          details={[
            "Buka menu 'Mode Ujian Siswa' lalu klik tombol '+ Buat Ujian Baru'.",
            "Tentukan judul ujian, mata pelajaran, target jenjang/kelas, dan durasi pengerjaan dalam menit.",
            "Tuliskan petunjuk umum atau peraturan khusus (misal: penggunaan kalkulator atau kamus).",
            "Klik 'Simpan & Lanjut Buat Soal' untuk beralih ke editor butir soal.",
          ]}
          tip="Ujian yang baru dibuat otomatis berstatus Draft dan belum mengonsumsi saldo token publish."
        />

        <GuideStepCard
          stepNumber={2}
          title="Mengelola Butir Soal & Kunci Jawaban"
          description="Masukkan pertanyaan pilihan ganda secara terstruktur lengkap dengan media dan pembahasan."
          icon={ListTodo}
          details={[
            "Pilih opsi template pilihan ganda A hingga E (opsi tidak harus diisi semua, sesuaikan jenjang).",
            "Tandai salah satu radio button sebagai 'Kunci Jawaban Benar'.",
            "Sisipkan gambar atau diagram pendukung melalui tombol upload berkas (maks 2MB) atau tempel tautan URL.",
            "Tentukan bobot poin pada setiap soal dan tuliskan pembahasan atau tautan video referensi jika diperlukan.",
          ]}
          tip="Soal dapat ditambah, diubah, atau dihapus kapan saja selama status paket ujian masih Draft."
        />

        <GuideStepCard
          stepNumber={3}
          title="Mempublikasikan Ujian & Mendapatkan Token Sesi"
          description="Aktifkan paket ujian agar siap dikerjakan oleh siswa di ruang kelas atau daring."
          icon={Send}
          details={[
            "Pada kartu ujian di tabel, klik tombol 'Publikasikan'.",
            "Sistem akan memotong 1 Token Publish dari saldo akun Anda.",
            "Sistem otomatis membuatkan Kode Token Sesi unik (misalnya: SAT-M9K).",
            "Bagikan kode token ini dan tautan aplikasi kepada seluruh siswa peserta ujian.",
          ]}
          tip="Jika saldo token habis, klik menu 'Token & Saldo' untuk melakukan klaim admit atau isi ulang kuota."
        />

        <GuideStepCard
          stepNumber={4}
          title="Pengawasan Real-Time & Menutup Sesi"
          description="Pantau kehadiran peserta yang sedang mengerjakan dan akhiri sesi saat waktu habis."
          icon={Eye}
          details={[
            "Gunakan kolom 'Pantau Ruang Ujian' dengan memasukkan kode token sesi untuk melihat progres peserta.",
            "Status 'Live' menunjukkan siswa sedang aktif mengerjakan dengan sisa timer otomatis.",
            "Ketika batas waktu ujian berakhir, klik tombol 'Tutup Sesi' untuk menghentikan penerimaan jawaban.",
            "Setelah sesi ditutup, status ujian berubah menjadi 'Selesai' (Closed).",
          ]}
          tip="Pastikan menutup sesi ujian setelah waktu habis agar nilai seluruh peserta terkunci secara akurat."
        />

        <GuideStepCard
          stepNumber={5}
          title="Rekap Nilai & Cetak Laporan PDF Resmi"
          description="Evaluasi capaian belajar siswa dan unduh dokumen nilai terstandar."
          icon={FileSpreadsheet}
          details={[
            "Klik tombol 'Rekap Nilai' pada ujian yang telah berstatus 'Selesai'.",
            "Tinjau ringkasan statistik kelas: nilai tertinggi, terendah, rata-rata kelas, dan persentase ketuntasan.",
            "Klik 'Unduh Laporan PDF' untuk mencetak dokumen asesmen resmi format A4 bertanda tangan guru & kepala sekolah.",
          ]}
          tip="Gunakan opsi 'Save as PDF' pada dialog cetak browser untuk menyimpan file PDF di komputer Anda."
        />
      </div>
    </section>
  );
}
