"use client";

import { Eye, EyeOff, Loader2, Lock, User as UserIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { saveAuthSession } from "@/lib/auth";
import { loginUser } from "@/services";
import type { User, LoginModalProps } from "@/types";
import { BaseModal } from "./base-modal";

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSwitchToPin,
  onSuccess,
}: LoginModalProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    try {
      const data = await loginUser({ email: identifier.trim(), password });
      saveAuthSession(data);
      onSuccess?.(data.user);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Gagal masuk ke akun");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6 text-center">
        <h2 className="font-display text-2xl font-bold text-[#451420] dark:text-[#F8FAFC]">Masuk ke Akun</h2>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-[#FBEAEB] dark:bg-rose-950/40 border border-[#F2C2C6] dark:border-rose-900/60 p-3 text-xs text-[#8A1F2D] dark:text-rose-300">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
            Email atau Nama
          </label>
          <div className="relative">
            <UserIcon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type="text"
              required
              autoComplete="off"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="masukan username"
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2.5 pl-10 pr-4 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1.5">Kata Sandi</label>
          <div className="relative">
            <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="masukkan kata sandi"
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2.5 pl-10 pr-10 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
              aria-label="Tampilkan sandi"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#451420] dark:bg-[#C67D00] hover:bg-[#300C15] dark:hover:bg-[#B37000] py-3 text-sm font-semibold text-[#FDFBF7] dark:text-[#141720] shadow-md shadow-[#451420]/20 dark:shadow-[#C67D00]/20 transition disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Memproses...</> : "Masuk Sekarang"}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-[#E5D7DC] dark:border-[#282E3E] pt-4 text-xs text-[#7A5661] dark:text-[#94A3B8]">
        <p>
          Belum memiliki akun?{" "}
          <button type="button" onClick={onSwitchToRegister} className="font-bold text-[#451420] dark:text-[#FBBF24] hover:underline cursor-pointer">
            Daftar gratis
          </button>
        </p>
        <button type="button" onClick={onSwitchToPin} className="text-[#613D48] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC] font-medium cursor-pointer">
          Masuk cepat via PIN Sesi →
        </button>
      </div>
    </BaseModal>
  );
}
