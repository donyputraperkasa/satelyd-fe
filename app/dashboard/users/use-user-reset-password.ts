import { useState } from "react";
import { adminResetUserPassword } from "@/services/user.service";
import type { RegisteredUser, ResetModalState } from "@/types";
import { useToast } from "@/components/ui";

export function useUserResetPassword() {
  const { toast } = useToast();
  const [resetModalData, setResetModalData] = useState<ResetModalState>({
    isOpen: false,
    user: null,
    isLoading: false,
  });
  const [copied, setCopied] = useState(false);

  const handleOpenResetModal = (user: RegisteredUser) => {
    setResetModalData({
      isOpen: true,
      user,
      temporaryPassword: undefined,
      isLoading: false,
    });
    setCopied(false);
  };

  const handleCloseResetModal = () => {
    setResetModalData({
      isOpen: false,
      user: null,
      isLoading: false,
    });
  };

  const handleConfirmReset = async () => {
    if (!resetModalData.user) return;
    setResetModalData((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await adminResetUserPassword(resetModalData.user.id);
      setResetModalData((prev) => ({
        ...prev,
        isLoading: false,
        temporaryPassword: res.temporaryPassword,
      }));
      toast.success(
        `Kata sandi untuk ${resetModalData.user.name} berhasil direset!`
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Gagal mereset kata sandi."
      );
      setResetModalData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleCopyPassword = () => {
    if (!resetModalData.temporaryPassword) return;
    navigator.clipboard.writeText(resetModalData.temporaryPassword);
    setCopied(true);
    toast.success("Kata sandi berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return {
    resetModalData,
    copied,
    handleOpenResetModal,
    handleCloseResetModal,
    handleConfirmReset,
    handleCopyPassword,
  };
}
