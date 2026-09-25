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
  Gamepad2,
  Trophy,
  Disc,
  Swords,
  Coins,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { GuideStepCard } from "./guide-step-card";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "DECKS" | "EXAMS" | "GAMES" | "TOKENS";
  gameType?: "FLIP_CARD" | "SPIN_WHEEL" | "MATH_BATTLE_2P" | "WHEELS" | "BATTLE_2P" | null;
}

export function GuideModal({ isOpen, onClose, type, gameType }: GuideModalProps) {
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
  const isGames = type === "GAMES";
  const isTokens = type === "TOKENS";

  const getGamesHeader = () => {
    switch (gameType) {
      case "FLIP_CARD":
        return {
          title: "Petunjuk: Flip Card Interaktif (Kartu Tebak)",
          subtitle:
            "Panduan cara bermain kuis kartu nomor 3D, giliran murid/regu, timer, dan pemberian poin di Smart TV.",
        };
      case "SPIN_WHEEL":
      case "WHEELS":
        return {
          title: "Petunjuk: Roda Acak (Spin Wheel)",
          subtitle:
            "Panduan cara mengoperasikan undian roda keberuntungan interaktif untuk giliran soal atau murid di Smart TV.",
        };
      case "MATH_BATTLE_2P":
      case "BATTLE_2P":
        return {
          title: "Petunjuk: Duel 2 Tim (Battle Arena)",
          subtitle:
            "Panduan kompetisi head-to-head adu cepat dua perwakilan kelompok di layar proyektor / Smart TV.",
        };
      default:
        return {
          title: "Panduan Game Smart TV Kelas",
          subtitle:
            "Panduan ringkas memilih jenis game, draft materi, hingga menjalankan kuis di Smart TV.",
        };
    }
  };

  const gamesHeader = getGamesHeader();

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
                {isDecks
                  ? "Panduan Bank Soal & Deck"
                  : isGames
                  ? gamesHeader.title
                  : isTokens
                  ? "Panduan Saldo Token & Kuota Satelyd"
                  : "Panduan Mode Ujian & Asesmen"}
              </h2>
              <p className="text-xs sm:text-sm text-[#7A5661] mt-0.5">
                {isDecks
                  ? "Panduan ringkas menyusun soal dan meluncurkan game interaktif di Smart TV."
                  : isGames
                  ? gamesHeader.subtitle
                  : isTokens
                  ? "Penjelasan sistem pay-per-session, kuota gratis harian, serta token game & ujian."
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
          {isTokens ? (
            <>
              <GuideStepCard
                stepNumber={1}
                title="Draft & Edit Soal 100% Gratis Tanpa Batas"
                description="Guru dapat membuat, mengedit materi, dan menyimpan draft soal sebanyak mungkin tanpa biaya."
                icon={FolderPlus}
                details={[
                  "Tidak ada biaya atau pemotongan token saat Anda membuat, menyunting, atau menambah butir soal ke dalam deck.",
                  "Semua materi kuis dan bank soal tersimpan aman di akun Anda dan dapat diperbarui kapan saja.",
                  "Token hanya digunakan saat meluncurkan sesi kelas penuh (> 8 butir soal) atau menerbitkan ujian online.",
                ]}
                tip="Buat sebanyak mungkin variasi soal dan persiapkan materi ajar Anda dengan tenang."
              />

              <GuideStepCard
                stepNumber={2}
                title="Free-Tier Harian: 4 Sesi Game Gratis Setiap Hari"
                description="Nikmati kuota 4 kali sesi permainan Smart TV setiap hari tanpa memotong saldo token."
                icon={Sparkles}
                details={[
                  "Setiap hari, akun guru otomatis mendapatkan kuota 4 sesi game Smart TV gratis.",
                  "Berlaku untuk deck kuis berdurasi singkat (maksimal 8 butir kartu soal per sesi).",
                  "Kuota gratis diperbarui secara otomatis setiap hari pada pukul 00:00 WIB.",
                ]}
                tip="Sangat cocok untuk kuis apersepsi, ice breaking, atau evaluasi materi singkat di kelas."
              />

              <GuideStepCard
                stepNumber={3}
                title="Token Game: Kuis Lengkap & Sesi Tambahan"
                description="Buka sesi permainan Smart TV dengan jumlah soal tak terbatas hanya Rp 3.000 / sesi."
                icon={Tv}
                details={[
                  "Digunakan saat Anda ingin memainkan deck soal lengkap dengan lebih dari 8 butir pertanyaan.",
                  "Juga dapat digunakan saat kuota 4 sesi gratis harian Anda sudah habis terpakai.",
                  "1 Token Game hanya memotong Rp 3.000 saat sesi permainan Smart TV resmi dimulai.",
                  "Saldo token tersimpan permanen dan TIDAK PERNAH kedaluwarsa.",
                ]}
                tip="Saldo token yang Anda miliki tetap aman meski tidak langsung dipakai dalam waktu dekat."
              />

              <GuideStepCard
                stepNumber={4}
                title="Token Ujian & Top-Up Bank BCA / Mandiri"
                description="Terbitkan paket asesmen online anti-curang dan proses top-up saldo yang cepat."
                icon={Coins}
                details={[
                  "1 Token Ujian (Rp 14.900) berlaku untuk 1 paket ujian online penuh untuk seluruh siswa satu kelas.",
                  "Tersedia paket hemat semester dan tahunan untuk kebutuhan asesmen berkala sekolah.",
                  "Transfer mudah ke rekening resmi: BCA (0374555339) atau Mandiri (137-00-1694852-9) an. Albertus Magnus Dony Putra Perkasa.",
                  "Saldo token otomatis aktif di akun Anda setelah konfirmasi diverifikasi oleh admin.",
                ]}
                tip="Simpan bukti transfer untuk memudahkan verifikasi dan pencatatan riwayat transaksi."
              />
            </>
          ) : isGames ? (
            gameType === "FLIP_CARD" ? (
              <>
                <GuideStepCard
                  stepNumber={1}
                  title="Konsep Kartu Nomor 3D & Tampilan Layar TV"
                  description="Kartu soal dengan nomor besar tanpa distraksi, dirancang untuk jarak baca 5-10 meter."
                  icon={Gamepad2}
                  details={[
                    "Layar Smart TV menampilkan papan kartu bernomor raksasa (01, 02, 03...).",
                    "Muka kartu depan sengaja hanya memuat nomor tanpa bocoran poin/rumus agar murid fokus memilih nomor.",
                    "Sangat fleksibel: dapat dimainkan dengan mode 'Pakai Tim' (2–4 regu kelompok) atau mode santai 'Tanpa Tim' (bergiliran individu).",
                  ]}
                  tip="Tampilan otomatis full screen tanpa sidebar dashboard saat game dimulai."
                />

                <GuideStepCard
                  stepNumber={2}
                  title="Alur Menjawab & Animasi Flip 3D"
                  description="Sentuh atau klik nomor kartu untuk membalik kartu dan membuka pertanyaan."
                  icon={Tv}
                  details={[
                    "Murid atau perwakilan kelompok maju untuk memilih nomor kartu.",
                    "Kartu berbalik 3D memunculkan modal soal dengan teks besar dan kontras tinggi.",
                    "Timer hitung mundur berjalan otomatis saat siswa berdiskusi dan memberikan jawaban.",
                  ]}
                  tip="Dilengkapi efek suara card flip, detak timer, dan alarm waktu habis."
                />

                <GuideStepCard
                  stepNumber={3}
                  title="Buka Kunci Jawaban, Rumus, & Poin Skor"
                  description="Verifikasi jawaban kelas secara bertahap dan apresiasi regu pemenang."
                  icon={Trophy}
                  details={[
                    "Guru menekan 'Buka Kunci Jawaban & Pembahasan' untuk menampilkan opsi benar dan langkah rumus.",
                    "Berikan poin (+5 atau +10) langsung ke regu yang menjawab benar di scoreboard.",
                    "Kartu yang sudah selesai akan tetap terbuka di layar utama untuk memudahkan melihat sisa soal.",
                    "Klik tombol 'Akhiri Sesi' di pojok kanan atas untuk menyelesaikan sesi permainan.",
                  ]}
                  tip="Skor tersimpan otomatis dan nama tim otomatis mengikuti warna yang dipilih."
                />
              </>
            ) : (gameType === "SPIN_WHEEL" || gameType === "WHEELS") ? (
              <>
                <GuideStepCard
                  stepNumber={1}
                  title="Konsep Roda Keberuntungan (Spin Wheel)"
                  description="Undian roda putar interaktif yang adil, dinamis, dan membangkitkan antusiasme kelas."
                  icon={Disc}
                  details={[
                    "Kartu-kartu soal dari draft materi dipetakan ke dalam juring roda berputar di layar Smart TV.",
                    "Menciptakan suasana belajar yang meriah, tidak kaku, dan membuat seluruh murid penasaran menunggu juring yang terpilih.",
                    "Sangat efektif sebagai pemanasan materi pelajaran (ice-breaking) atau kuis kejutan.",
                  ]}
                  tip="Membuat pembelajaran lebih hidup dan tidak membosankan bagi siswa."
                />

                <GuideStepCard
                  stepNumber={2}
                  title="Alur Putaran Roda Berkecepatan Dinamis"
                  description="Tekan tombol putar roda untuk memulai pengundian nomor soal."
                  icon={Tv}
                  details={[
                    "Guru atau perwakilan siswa menekan tombol 'Putar Roda' di layar.",
                    "Roda berputar kencang disertai efek suara tick dinamis yang realistis.",
                    "Roda melambat secara bertahap dan berhenti tepat pada satu nomor kartu soal secara acak tanpa bias.",
                  ]}
                  tip="Sistem putaran mengusung algoritma acak yang adil dan transparan."
                />

                <GuideStepCard
                  stepNumber={3}
                  title="Menjawab Soal Kejutan & Apresiasi Poin"
                  description="Selesaikan pertanyaan yang didapat dari putaran roda."
                  icon={Trophy}
                  details={[
                    "Soal yang terpilih langsung memunculkan pop-up pertanyaan di layar untuk dijawab murid.",
                    "Guru dapat menerapkan mode kelompok untuk adu poin atau mode individu untuk keaktifan kelas.",
                    "Setelah selesai, guru dapat mengakhiri sesi kapan saja dengan tombol 'Akhiri Sesi'.",
                  ]}
                  tip="Dapat dikombinasikan dengan sistem poin regu di papan skor."
                />
              </>
            ) : (gameType === "MATH_BATTLE_2P" || gameType === "BATTLE_2P") ? (
              <>
                <GuideStepCard
                  stepNumber={1}
                  title="Konsep Pertarungan 2 Kubu (Head-to-Head)"
                  description="Adu cepat dua perwakilan tim dengan tampilan split-screen di depan layar TV."
                  icon={Swords}
                  details={[
                    "Format kompetisi split-screen antara Tim Kiri vs Tim Kanan di proyektor / Smart TV.",
                    "Dirancang khusus untuk babak rebutan cerdas cermat, final kompetisi kelas, atau adu cepat konsep materi.",
                    "Memicu semangat sportivitas dan kerjasama antarkelompok.",
                  ]}
                  tip="Sangat pas dijadikan babak penentuan pemenang di akhir pelajaran."
                />

                <GuideStepCard
                  stepNumber={2}
                  title="Alur Buzzer Respon & Hak Menjawab"
                  description="Siapa cepat menekan tombol berhak menjawab pertanyaan pertama kali."
                  icon={Tv}
                  details={[
                    "Dua perwakilan regu berdiri berdampingan di depan proyektor / Smart TV.",
                    "Pertanyaan kuis muncul serentak di layar TV.",
                    "Pemain yang paling cepat menekan tombol respon/buzzer berhak mengunci hak menjawab terlebih dahulu.",
                  ]}
                  tip="Menguji ketangkasan reflek dan kecepatan berpikir siswa."
                />

                <GuideStepCard
                  stepNumber={3}
                  title="Sistem Poin Rebutan & Skor Head-to-Head"
                  description="Kumpulkan poin tertinggi untuk membawa regu menjadi juara."
                  icon={Trophy}
                  details={[
                    "Jika jawaban benar, tim meraih poin maksimal di papan skor duel.",
                    "Jika salah, giliran dan kesempatan menjawab otomatis beralih ke kubu lawan untuk merebut poin.",
                    "Papan skor live menampilkan kejar-kejaran poin kedua kubu secara real-time.",
                  ]}
                  tip="Klik 'Akhiri Sesi' setelah seluruh butir duel selesai dimainkan."
                />
              </>
            ) : (
              <>
                <GuideStepCard
                  stepNumber={1}
                  title="Model 1: Flip Card Interaktif (Kartu Tebak)"
                  description="Kuis kartu 3D nomor raksasa untuk Smart TV kelas dengan timer dan pembahasan bertahap."
                  icon={Gamepad2}
                  details={[
                    "Konsep: Layar Smart TV menampilkan kartu-kartu bernomor raksasa (01, 02, 03...). Murid atau perwakilan kelompok memilih nomor kartu yang ingin dijawab.",
                    "Alur Menjawab: Saat nomor ditekan, kartu berbalik (animasi 3D) memunculkan modal soal ukuran besar yang jelas terbaca dari jarak 5–10 meter.",
                    "Timer & Pembahasan: Dilengkapi timer hitung mundur dengan efek audio detak dan alarm bel. Guru dapat membuka kunci jawaban serta pembahasan rumus langkah demi langkah.",
                    "Apresiasi Poin: Guru dapat langsung mengklik tombol +5 atau +10 untuk menghadiahkan skor ke tim yang menjawab benar. Kartu yang selesai akan tetap terbuka di layar.",
                  ]}
                  tip="Sangat ideal untuk kuis materi harian, pemanasan bab baru, maupun cerdas cermat beregu."
                />

                <GuideStepCard
                  stepNumber={2}
                  title="Model 2: Roda Acak (Spin Wheel)"
                  description="Undian putar roda keberuntungan interaktif yang dinamis, seru, dan adil tanpa bias."
                  icon={Disc}
                  details={[
                    "Konsep: Kumpulan kartu soal materi dipetakan ke dalam juring roda berputar interaktif di layar Smart TV kelas.",
                    "Alur Menjawab: Guru atau perwakilan murid menekan tombol putar roda. Roda berputar kencang disertai efek suara tick realistis, lalu melambat dan berhenti di salah satu soal kejutan.",
                    "Suasana Kelas Hidup: Menghilangkan ketegangan kuis formal dan membuat seluruh murid penasaran menunggu giliran soal yang keluar.",
                  ]}
                  tip="Sangat efektif untuk sesi ice-breaking awal jam pelajaran atau kuis kejutan tanpa rasa tegang."
                />

                <GuideStepCard
                  stepNumber={3}
                  title="Model 3: Duel 2 Tim (Battle Arena)"
                  description="Pertandingan head-to-head adu cepat dua perwakilan kelompok di depan layar kelas."
                  icon={Swords}
                  details={[
                    "Konsep: Format kompetisi adu cepat dengan tampilan split-screen antara Tim Kiri vs Tim Kanan.",
                    "Alur Menjawab: Dua peserta berdiri berdampingan di depan proyektor / TV. Ketika soal muncul serentak, pemain pertama yang menekan tombol respon/buzzer berhak menjawab terlebih dahulu.",
                    "Poin Rebutan: Jawaban benar meraih poin maksimal. Jika salah, hak menjawab langsung beralih ke kubu lawan.",
                  ]}
                  tip="Sangat seru untuk babak final penentuan pemenang cerdas cermat antarkelompok."
                />

                <GuideStepCard
                  stepNumber={4}
                  title="Pengaturan Regu Tim & Tampilan Layar TV"
                  description="Kuis layar penuh tanpa sidebar dashboard dengan pengaturan tim yang fleksibel."
                  icon={Tv}
                  details={[
                    "Fullscreen Bersih: Begitu game dimulai, tampilan langsung mengambil alih 100% layar tanpa sidebar navigasi, siap dinikmati di Smart TV / proyektor.",
                    "Pilihan Mode: Bebas memilih mode 'Pakai Tim' (2–4 regu kelompok) atau 'Tanpa Tim' (mode santai untuk giliran murid perorangan).",
                    "Warna & Nama Tim: Tersedia 6 palet warna tim. Warna yang sudah dipakai tim lain tidak bisa dipilih ganda, dan nama tim otomatis mengikuti warnanya (misal: Tim 1 (Ungu)).",
                    "Akhiri Sesi: Klik 'Akhiri Sesi' di pojok kanan atas untuk keluar dari sesi dan kembali ke menu dashboard guru.",
                  ]}
                  tip="Tekan tombol maximize di bar atas arena atau tombol F11 pada keyboard untuk mode full screen bawaan browser."
                />
              </>
            )
          ) : isDecks ? (
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
            href={`/dashboard/guides?tab=${type === "GAMES" ? "games" : type === "TOKENS" ? "faq" : type.toLowerCase()}`}
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
