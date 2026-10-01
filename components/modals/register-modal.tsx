"use client";

import { Building2, Eye, EyeOff, GraduationCap, Loader2, Lock, Mail, User as UserIcon, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { saveAuthSession } from "@/lib/auth";
import { registerUser } from "@/services";
import type { RegisterModalProps, Role } from "@/types";
import { BaseModal } from "./base-modal";

export function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSwitchToPin,
  onSuccess,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"TEACHER" | "USER">("TEACHER");
  const [schoolName, setSchoolName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (password.length < 6) return setErrorMsg("Kata sandi minimal 6 karakter");
    setIsLoading(true);
    try {
      const data = await registerUser({
        name,
        email,
        password,
        role: role as Role,
        schoolName: schoolName.trim() || undefined,
      });
      saveAuthSession(data);
      onSuccess?.(data.user);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Pendaftaran gagal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="mb-5 text-center">
        <h2 className="font-display text-2xl font-bold text-[#451420] dark:text-[#F8FAFC]">Buat Akun Baru</h2>
        <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] mt-1">
          Daftar akun untuk mengakses kuis interaktif TV dan ujian siswa
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-[#FBEAEB] dark:bg-rose-950/40 border border-[#F2C2C6] dark:border-rose-900/60 p-3 text-xs text-[#8A1F2D] dark:text-rose-300">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Pilihan Status Peran */}
        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
            Status Pengguna
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("TEACHER")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                role === "TEACHER"
                  ? "bg-[#451420] dark:bg-white text-white dark:text-[#10131B] border-[#451420] dark:border-white shadow-2xs"
                  : "bg-white dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] border-[#DFD0D5] dark:border-[#282E3E] hover:bg-[#FAF7F2] dark:hover:bg-[#202634]"
              }`}
            >
              <GraduationCap size={15} />
              <span>Guru / Pendidik</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                role === "USER"
                  ? "bg-[#451420] dark:bg-white text-white dark:text-[#10131B] border-[#451420] dark:border-white shadow-2xs"
                  : "bg-white dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] border-[#DFD0D5] dark:border-[#282E3E] hover:bg-[#FAF7F2] dark:hover:bg-[#202634]"
              }`}
            >
              <Users size={15} />
              <span>Non-Guru / Umum</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1">Nama Lengkap</label>
          <div className="relative">
            <UserIcon size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="masukkan namamu"
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2 pl-10 pr-4 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1">
            Tempat Bekerja / Asal Sekolah
          </label>
          <div className="relative">
            <Building2 size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
              placeholder={role === "TEACHER" ? "misal: SMAN 1 Jakarta / Bimbel" : "nama instansi / mandiri"}
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2 pl-10 pr-4 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1">Email</label>
          <div className="relative">
            <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2 pl-10 pr-4 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1">Kata Sandi</label>
          <div className="relative">
            <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
            <input
              type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="minimal 6 karakter"
              className="w-full rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#141720] py-2 pl-10 pr-10 text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] transition focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00]"
            />
            <button
              type="button" onClick={() => setShowPassword((prev) => !prev)}
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
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#451420] dark:bg-white hover:bg-[#300C15] dark:hover:bg-[#F1F5F9] py-3 text-sm font-semibold text-[#FDFBF7] dark:text-[#10131B] shadow-md shadow-[#451420]/20 dark:shadow-none transition disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? <><Loader2 size={16} className="animate-spin" /> Mendaftarkan...</> : "Daftar Sekarang"}
        </button>
      </form>

      <div className="mt-5 flex flex-col items-center gap-2 border-t border-[#E5D7DC] dark:border-[#282E3E] pt-3.5 text-xs text-[#7A5661] dark:text-[#94A3B8]">
        <p>
          Sudah memiliki akun?{" "}
          <button type="button" onClick={onSwitchToLogin} className="font-bold text-[#451420] dark:text-[#FBBF24] hover:underline cursor-pointer">
            Masuk di sini
          </button>
        </p>
        <button type="button" onClick={onSwitchToPin} className="text-[#613D48] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC] font-medium cursor-pointer">
          Masuk cepat via PIN Sesi →
        </button>
      </div>
    </BaseModal>
  );
}
