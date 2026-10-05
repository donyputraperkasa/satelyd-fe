import { KeyRound, X } from "lucide-react";
import type { UserResetModalProps } from "@/types";
import { UserResetConfirmStep } from "./user-reset-confirm-step";
import { UserResetSuccessStep } from "./user-reset-success-step";

export function UserResetModal({
  modalData,
  copied,
  onClose,
  onConfirmReset,
  onCopyPassword,
}: UserResetModalProps) {
  if (!modalData.isOpen || !modalData.user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/40 backdrop-blur-xs"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E5D7DC]
          dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xl space-y-4"
      >
        <div
          className="flex items-center justify-between border-b
            border-[#F2EAEC] dark:border-[#282E3E] pb-3"
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg
                bg-[#FFF7ED] dark:bg-[#281F13] text-[#C67D00] dark:text-[#FBBF24]"
            >
              <KeyRound size={16} />
            </div>
            <h3 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC]">
              Reset Kata Sandi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420]
              dark:hover:text-[#F8FAFC]"
          >
            <X size={18} />
          </button>
        </div>

        {!modalData.temporaryPassword ? (
          <UserResetConfirmStep
            user={modalData.user}
            isLoading={modalData.isLoading}
            onCancel={onClose}
            onConfirm={onConfirmReset}
          />
        ) : (
          <UserResetSuccessStep
            user={modalData.user}
            temporaryPassword={modalData.temporaryPassword}
            copied={copied}
            onCopyPassword={onCopyPassword}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
