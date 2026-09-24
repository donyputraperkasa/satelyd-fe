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
        <h2 className="font-display text-2xl font-bold text-[#451420]">Masuk ke Akun</h2>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-[#FBEAEB] border border-[#F2C2C6] p-3 text-xs text-[#8A1F2D]">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#451420] mb-1.5">
            Email atau Nama
          </label>
          <div className="relative">
            <UserIcon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661]" />
            <input
              type="text"
              required
              autoComplete="off"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="masukan username"
              className="w-full rounded-xl border border-[#DFD0D5] bg-white py-2.5 pl-10 pr-4 text-sm text-[#451420] placeholder-[#A48E95] transition focus:border-[#451420] focus:outline-none focus:ring-1 focus:ring-[#451420]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] mb-1.5">Kata Sandi</label>
          <div className="relative">
            <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661]" />
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="masukkan kata sandi"
              className="w-full rounded-xl border border-[#DFD0D5] bg-white py-2.5 pl-10 pr-10 text-sm text-[#451420] placeholder-[#A48E95] transition focus:border-[#451420] focus:outline-none focus:ring-1 focus:ring-[#451420]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5661] hover:text-[#451420]"
              aria-label="Tampilkan sandi"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#451420] hover:bg-[#300C15] py-3 text-sm font-semibold text-[#FDFBF7] shadow-md shadow-[#451420]/20 transition disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Memproses...</> : "Masuk Sekarang"}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 border-t border-[#E5D7DC] pt-4 text-xs text-[#7A5661]">
        <p>
          Belum memiliki akun?{" "}
          <button type="button" onClick={onSwitchToRegister} className="font-bold text-[#451420] hover:underline cursor-pointer">
            Daftar gratis
          </button>
        </p>
        <button type="button" onClick={onSwitchToPin} className="text-[#613D48] hover:text-[#451420] font-medium cursor-pointer">
          Masuk cepat via PIN Sesi →
        </button>
      </div>
    </BaseModal>
  );
}
