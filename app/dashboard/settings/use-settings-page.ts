"use client";

import { useState, useEffect, type FormEvent } from "react";
import { getStoredUser } from "@/lib/auth/storage";
import { updateUserProfile, changeUserPassword } from "@/services/user.service";
import { useToast } from "@/components/ui";
import type { User } from "@/types";

export function useSettingsPage() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"TEACHER" | "USER">("TEACHER");
  const [schoolName, setSchoolName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    if (u) {
      setCurrentUser(u);
      setName(u.name || "");
      setEmail(u.email || "");
      setRole(u.role === "USER" ? "USER" : "TEACHER");
      setSchoolName(u.schoolName || "");
    }
  }, []);

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error("Nama lengkap tidak boleh kosong");
    }

    setIsSavingProfile(true);
    try {
      const updated = await updateUserProfile({
        name: name.trim(),
        schoolName: schoolName.trim() || undefined,
        role: currentUser?.role === "ADMIN" ? undefined : role,
      });
      setCurrentUser(updated);
      toast.success("Profil Anda berhasil diperbarui!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui profil.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      return toast.error("Masukkan kata sandi saat ini");
    }
    if (newPassword.length < 6) {
      return toast.error("Kata sandi baru minimal 6 karakter");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Konfirmasi kata sandi baru tidak cocok");
    }

    setIsChangingPass(true);
    try {
      const res = await changeUserPassword({
        currentPassword,
        newPassword,
      });
      toast.success(res.message || "Kata sandi berhasil diperbarui!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengganti kata sandi.");
    } finally {
      setIsChangingPass(false);
    }
  };

  return {
    currentUser,
    isAdmin: currentUser?.role === "ADMIN",
    // Profile
    name,
    setName,
    email,
    role,
    setRole,
    schoolName,
    setSchoolName,
    isSavingProfile,
    handleSaveProfile,
    // Password
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
  };
}
