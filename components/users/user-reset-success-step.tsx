import { Check, Copy, MessageCircle } from "lucide-react";
import type { UserResetSuccessStepProps } from "@/types";

export function UserResetSuccessStep({
  user,
  temporaryPassword,
  copied,
  onCopyPassword,
  onClose,
}: UserResetSuccessStepProps) {
  const waMessage = [
    `Halo ${user.name}, kata sandi akun Satelyd Anda telah direset oleh Admin.`,
    ``,
    `Kata sandi sementara Anda: ${temporaryPassword}`,
    ``,
    `Silakan login di web Satelyd dan perbarui kata sandi Anda melalui menu Pengaturan Akun.`,
  ].join("\n");

  const waUrl = `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl bg-[#EDF7ED] dark:bg-[#132A18] border
          border-[#C8E6C9] dark:border-[#1D4A27] p-3 text-xs
          text-[#2E7D32] dark:text-[#86EFAC] flex items-center gap-2"
      >
        <Check size={16} />
        <span>Kata sandi berhasil direset!</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-[#7A5661] dark:text-[#94A3B8]">
          Kata Sandi Sementara:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={temporaryPassword || ""}
            className="flex-1 h-10 px-3 rounded-xl border border-[#DFD0D5]
              dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720]
              text-sm font-mono font-bold text-[#451420] dark:text-[#F8FAFC]"
          />
          <button
            type="button"
            onClick={onCopyPassword}
            className="inline-flex items-center gap-1.5 h-10 px-3.5
              rounded-xl bg-[#451420] dark:bg-white text-white
              dark:text-[#10131B] text-xs font-bold hover:opacity-95 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Disalin" : "Salin"}</span>
          </button>
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2
            w-full h-10 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D]
            text-white text-xs font-bold transition shadow-xs"
        >
          <MessageCircle size={15} />
          <span>Bagikan ke WhatsApp Pengguna</span>
        </a>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-9 rounded-xl border border-[#DFD0D5]
            dark:border-[#282E3E] text-xs font-semibold text-[#7A5661]
            dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#252B39]"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
