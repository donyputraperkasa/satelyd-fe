"use client";

import { Settings } from "lucide-react";
import { ProfileSettingsCard, PasswordSettingsCard } from "@/components/settings";
import { useSettingsPage } from "./use-settings-page";

export default function SettingsPage() {
  const {
    isAdmin,
    name,
    setName,
    email,
    role,
    setRole,
    schoolName,
    setSchoolName,
    isSavingProfile,
    handleSaveProfile,
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
    handleChangePassword,
  } = useSettingsPage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header Section */}
      <div className="border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#E6B85C]">
            Akun &amp; Preferensi
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1.5 flex items-center gap-2.5">
          <Settings size={28} className="text-[#C67D00] dark:text-[#E6B85C]" />
          <span>Pengaturan Akun</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">
          Kelola profil identitas Anda, status pekerjaan, asal sekolah, dan keamanan kata sandi.
        </p>
      </div>

      {/* Two Column Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <ProfileSettingsCard
          isAdmin={isAdmin}
          name={name}
          setName={setName}
          email={email}
          role={role}
          setRole={setRole}
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          isSaving={isSavingProfile}
          onSubmit={handleSaveProfile}
        />

        <PasswordSettingsCard
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showCurrentPass={showCurrentPass}
          setShowCurrentPass={setShowCurrentPass}
          showNewPass={showNewPass}
          setShowNewPass={setShowNewPass}
          isChangingPass={isChangingPass}
          onSubmit={handleChangePassword}
        />
      </div>
    </div>
  );
}
