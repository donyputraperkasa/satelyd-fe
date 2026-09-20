"use client";

interface FlipCardModalFooterProps {
  onFinish: () => void;
}

export function FlipCardModalFooter({ onFinish }: FlipCardModalFooterProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#FAF7F2] border-t border-[#E5D7DC] shrink-0">
      <span className="text-xs text-[#7A5661]">
        Tekan tombol <strong>Selesai</strong> untuk kembali ke papan nomor kartu.
      </span>
      <button
        type="button"
        onClick={onFinish}
        className="px-6 py-2.5 rounded-xl bg-[#451420] hover:bg-[#5B1C2E] text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
      >
        Tandai Selesai & Kembali
      </button>
    </div>
  );
}
