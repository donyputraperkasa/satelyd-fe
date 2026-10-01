"use client";

import { KeyRound, Lock } from "lucide-react";
import { SettingsInput } from "./settings-input";
import type { PasswordSettingsCardProps } from "./types";

export function PasswordSettingsCard({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  showCurrentPass,
  setShowCurrentPass,
  showNewPass,
  setShowNewPass,
  isChangingPass,
  onSubmit,
}: PasswordSettingsCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-2xs space-y-5">
      <div className="flex items-center gap-3 border-b border-[#F2EAEC] dark:border-[#282E3E] pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] dark:bg-[#281F13] text-[#C67D00] dark:text-[#FBBF24]">
          <KeyRound size={22} />
        </div>
        <div>
          <h2 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC]">
            Ganti Kata Sandi
          </h2>
          <p className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
            Perbarui kata sandi untuk mengamankan akses akun Anda
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <SettingsInput
          label="Kata Sandi Saat Ini"
          icon={Lock}
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="masukkan kata sandi saat ini"
          showPasswordToggle
          isPasswordShown={showCurrentPass}
          onTogglePassword={() => setShowCurrentPass(!showCurrentPass)}
        />

        <SettingsInput
          label="Kata Sandi Baru"
          icon={Lock}
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="minimal 6 karakter"
          showPasswordToggle
          isPasswordShown={showNewPass}
          onTogglePassword={() => setShowNewPass(!showNewPass)}
        />

        <SettingsInput
          label="Konfirmasi Kata Sandi Baru"
          icon={Lock}
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="ulangi kata sandi baru"
        />

        <button
          type="submit"
          disabled={isChangingPass}
          className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-sm font-bold shadow-sm hover:opacity-95 transition cursor-pointer disabled:opacity-60"
        >
          <KeyRound size={16} />
          <span>{isChangingPass ? "Menyimpan Sandi..." : "Perbarui Kata Sandi"}</span>
        </button>
      </form>
    </div>
  );
}
