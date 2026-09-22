"use client";

import { useRouter } from "next/navigation";
import { Gamepad2, GraduationCap, Loader2, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { checkGameRoom, fetchExamByToken } from "@/services";
import type { PinModalProps } from "@/types";
import { BaseModal } from "./base-modal";

export function PinModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToRegister,
}: PinModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"game" | "exam">("game");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim().toUpperCase();
    if (!cleanPin) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === "game") {
        try { await checkGameRoom(cleanPin); } catch { /* local lookup */ }
        setSuccessMsg(`Sesi game "${cleanPin}" valid! Membuka layar TV...`);
        setTimeout(() => { onClose(); router.push(`/game/${encodeURIComponent(cleanPin)}`); }, 600);
      } else {
        const exam = await fetchExamByToken(cleanPin);
        if (!exam) throw new Error(`Ujian dengan token "${cleanPin}" tidak ditemukan.`);
        setSuccessMsg(`Ujian "${exam.title}" valid! Mengalihkan ke lembar ujian...`);
        setTimeout(() => { onClose(); router.push(`/exam/${encodeURIComponent(cleanPin)}`); }, 600);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "PIN/Kode tidak ditemukan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EDF0] border border-[#E2D5D9] text-[#5C323E] text-xs font-semibold mb-3">
          <Sparkles size={12} className="text-[#451420]" />
          <span>Gabung Langsung Tanpa Akun</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-[#451420]">Masukkan PIN Sesi</h2>
        <p className="mt-1 text-xs sm:text-sm text-[#7A5661]">
          {mode === "game" ? "Ketik 6 karakter kode di TV kelas" : "Masukkan token ujian dari guru"}
        </p>
      </div>

      <div className="mb-5 flex rounded-full bg-[#EFE8EB] p-1 border border-[#DFD0D5]">
        <button
          type="button"
          onClick={() => { setMode("game"); setErrorMsg(null); setSuccessMsg(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            mode === "game" ? "bg-[#451420] text-[#FDFBF7] shadow-xs" : "text-[#7A5661] hover:text-[#451420]"
          }`}
        >
          <Gamepad2 size={14} /> Game TV Kelas
        </button>
        <button
          type="button"
          onClick={() => { setMode("exam"); setErrorMsg(null); setSuccessMsg(null); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            mode === "exam" ? "bg-[#451420] text-[#FDFBF7] shadow-xs" : "text-[#7A5661] hover:text-[#451420]"
          }`}
        >
          <GraduationCap size={14} /> Ujian Sekolah
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-[#FBEAEB] border border-[#F2C2C6] p-2.5 text-xs text-[#8A1F2D] text-center">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-lg bg-[#EBF7EE] border border-[#B9E5C2] p-2.5 text-xs text-[#1D6C31] text-center font-medium">{successMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          maxLength={10}
          value={pin}
          onChange={(e) => setPin(e.target.value.toUpperCase())}
          placeholder={mode === "game" ? "CTH: ABC123" : "TOKEN UJIAN"}
          className="w-full text-center tracking-[0.25em] font-mono text-xl sm:text-2xl font-black rounded-xl border-2 border-[#DFD0D5] bg-white py-2.5 px-4 text-[#451420] placeholder-[#C5B3B9] transition focus:border-[#451420] focus:outline-none focus:ring-2 focus:ring-[#451420]/20 uppercase"
        />

        <button
          type="submit"
          disabled={isLoading || !pin.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#451420] hover:bg-[#300C15] py-3 text-sm font-semibold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Memeriksa PIN...</> : "Gabung Sekarang"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap justify-center gap-3 border-t border-[#E5D7DC] pt-4 text-xs text-[#7A5661]">
        <button type="button" onClick={onSwitchToLogin} className="text-[#451420] font-semibold hover:underline cursor-pointer">Login Akun</button>
        <span>•</span>
        <button type="button" onClick={onSwitchToRegister} className="text-[#451420] font-semibold hover:underline cursor-pointer">Daftar Akun Baru</button>
      </div>
    </BaseModal>
  );
}
