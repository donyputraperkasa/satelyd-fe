"use client";

import { User as UserIcon, Mail, Building2, Save } from "lucide-react";
import { ProfileRoleSelector } from "./profile-role-selector";
import { SettingsInput } from "./settings-input";
import type { ProfileSettingsCardProps } from "./types";

export function ProfileSettingsCard({
  isAdmin,
  name,
  setName,
  email,
  role,
  setRole,
  schoolName,
  setSchoolName,
  isSaving,
  onSubmit,
}: ProfileSettingsCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-2xs space-y-5">
      <div className="flex items-center gap-3 border-b border-[#F2EAEC] dark:border-[#282E3E] pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EDF0] dark:bg-[#252B39] text-[#451420] dark:text-[#F8FAFC]">
          <UserIcon size={22} />
        </div>
        <div>
          <h2 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC]">
            Informasi Profil
          </h2>
          <p className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
            Data identitas dan institusi tempat Anda mengajar
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
            Status Profesi
          </label>
          <ProfileRoleSelector isAdmin={isAdmin} role={role} setRole={setRole} />
        </div>

        <SettingsInput
          label="Nama Lengkap"
          icon={UserIcon}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="masukkan nama lengkap"
        />

        <SettingsInput
          label="Tempat Bekerja / Asal Sekolah"
          icon={Building2}
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="misal: SMAN 1 Jakarta / Bimbel"
        />

        <SettingsInput
          label="Alamat Email"
          icon={Mail}
          type="email"
          disabled
          readOnly
          value={email}
          helperText="Email terdaftar sebagai identitas unik akun Anda."
        />

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-sm font-bold shadow-sm hover:opacity-95 transition cursor-pointer disabled:opacity-60"
        >
          <Save size={16} />
          <span>{isSaving ? "Menyimpan..." : "Simpan Profil"}</span>
        </button>
      </form>
    </div>
  );
}
