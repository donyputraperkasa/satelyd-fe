"use client";

import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Apakah siswa perlu mengunduh aplikasi untuk mengerjakan ujian?",
    a: "Tidak perlu. Siswa cukup membuka peramban web (Chrome, Safari, dsb.) di ponsel atau laptop mereka, lalu memasukkan Kode Token Ujian yang diberikan guru.",
  },
  {
    q: "Berapa banyak token publish yang dibutuhkan untuk satu sesi ujian?",
    a: "Setiap paket ujian hanya memerlukan 1 Token Publish saat dipublikasikan. Jumlah siswa yang masuk dalam sesi tersebut tidak dibatasi oleh token.",
  },
  {
    q: "Bagaimana jika ada siswa yang terputus koneksi saat ujian berlangsung?",
    a: "Jawaban siswa tersimpan otomatis secara berkala. Siswa dapat menyegarkan peramban dan melanjutkan pengerjaan selama sesi ujian masih aktif (Live).",
  },
  {
    q: "Apakah saya bisa mencetak lembar soal dan nilai ke format PDF?",
    a: "Bisa. Pada kartu ujian yang telah selesai, klik 'Rekap Nilai' lalu tekan tombol 'Unduh Laporan PDF' untuk mencetak dokumen format A4 berstandar sekolah.",
  },
];

export function GuidesFaqCard() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="rounded-2xl border border-[#E5D7DC] bg-[#FAF7F2] p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} className="text-[#7A283C]" />
        <h3 className="text-base sm:text-lg font-black text-[#451420]">
          Pertanyaan Sering Diajukan (FAQ)
        </h3>
      </div>

      <div className="space-y-2.5">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={item.q}
              className="rounded-xl border border-[#E5D7DC] bg-white transition overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-[#451420] hover:text-[#7A283C] cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-[#7A5661] transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#5C323E] leading-relaxed border-t border-[#F5EDF0]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
