"use client";

import { ShieldAlert, AlertTriangle, Lock } from "lucide-react";

interface StudentAntiCheatAlertProps {
  isOpen: boolean;
  violationCount: number;
  maxViolations?: number;
  isBlocked?: boolean;
  onDismiss: () => void;
  onRefreshStatus?: () => void;
}

export function StudentAntiCheatAlert({
  isOpen,
  violationCount,
  maxViolations = 3,
  isBlocked = false,
  onDismiss,
  onRefreshStatus,
}: StudentAntiCheatAlertProps) {
  if (!isOpen) return null;

  const remainingChances = Math.max(0, maxViolations - violationCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#451420]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-[#DFD0D5] bg-[#FDFBF7] p-6 sm:p-7 shadow-2xl">
        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EDF0] border border-[#ECD0D8] text-[#451420] flex items-center justify-center shrink-0">
            {isBlocked ? <Lock size={24} className="text-[#8A1F2D]" /> : <ShieldAlert size={26} className="text-[#8A1F2D]" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-[#451420] tracking-tight">
              {isBlocked ? "Lembar Ujian Terkunci!" : "Peringatan Integritas Ujian"}
            </h3>
            <p className="text-xs font-semibold text-[#8A1F2D]">
              {isBlocked
                ? "Batas Maksimal Pelanggaran Tercapai"
                : `Pelanggaran Ke-${violationCount} dari ${maxViolations} Toleransi`}
            </p>
          </div>
        </div>

        {/* Status Dots Indicator */}
        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white border border-[#ECE0E4] mb-4">
          {Array.from({ length: maxViolations }).map((_, idx) => {
            const isHit = idx < violationCount;
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full transition-colors ${
                    isHit ? "bg-[#8A1F2D] ring-2 ring-[#8A1F2D]/20" : "bg-[#DFD0D5]"
                  }`}
                />
                <span className="text-[10px] font-bold text-[#7A5661]">
                  {idx + 1}
                </span>
                {idx < maxViolations - 1 && <span className="text-[#DFD0D5] text-[10px]">•</span>}
              </div>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="my-4 rounded-2xl bg-[#F8EFF2] border border-[#ECD0D8] p-4 text-xs text-[#5C323E] space-y-2">
          {isBlocked ? (
            <p className="leading-relaxed font-medium">
              Sistem telah mengunci lembar ujian Anda karena berpindah tab sebanyak <strong>{maxViolations} kali</strong>. Silakan hubungi guru atau pengawas ujian di kelas untuk membuka kunci (unblock) lembar soal Anda.
            </p>
          ) : (
            <>
              <div className="flex items-start gap-2 text-[#8A1F2D]">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-[#C67D00]" />
                <p className="leading-relaxed font-medium">
                  Anda terdeteksi meninggalkan halaman ujian atau berpindah tab browser.
                </p>
              </div>
              <p className="text-[11px] text-[#7A5661] leading-relaxed">
                Tersisa <strong>{remainingChances} kesempatan</strong> lagi sebelum lembar jawaban Anda terkunci secara otomatis oleh sistem pengawasan guru.
              </p>
            </>
          )}
        </div>

        {/* Action Button */}
        {isBlocked ? (
          <button
            type="button"
            onClick={onRefreshStatus || onDismiss}
            className="w-full py-3 rounded-xl bg-[#451420] hover:bg-[#300C15] text-sm font-bold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition cursor-pointer"
          >
            Cek Status Buka Kunci dari Guru
          </button>
        ) : (
          <button
            type="button"
            onClick={onDismiss}
            className="w-full py-3 rounded-xl bg-[#451420] hover:bg-[#300C15] text-sm font-bold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition cursor-pointer"
          >
            Saya Mengerti, Lanjutkan Ujian
          </button>
        )}
      </div>
    </div>
  );
}
