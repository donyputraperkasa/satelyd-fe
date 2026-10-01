import type { FormEvent } from "react";

export interface ProfileSettingsCardProps {
  isAdmin: boolean;
  name: string;
  setName: (v: string) => void;
  email: string;
  role: "TEACHER" | "USER";
  setRole: (v: "TEACHER" | "USER") => void;
  schoolName: string;
  setSchoolName: (v: string) => void;
  isSaving: boolean;
  onSubmit: (e: FormEvent) => void;
}

export interface PasswordSettingsCardProps {
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showCurrentPass: boolean;
  setShowCurrentPass: (v: boolean) => void;
  showNewPass: boolean;
  setShowNewPass: (v: boolean) => void;
  isChangingPass: boolean;
  onSubmit: (e: FormEvent) => void;
}

export interface ProfileRoleSelectorProps {
  isAdmin: boolean;
  role: "TEACHER" | "USER";
  setRole: (v: "TEACHER" | "USER") => void;
}
