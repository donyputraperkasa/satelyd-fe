import { X, KeyRound } from "lucide-react";
import type { UserDetailModalProps } from "@/types";
import { UserDetailProfile } from "./user-detail-profile";
import { UserDetailTokens } from "./user-detail-tokens";

export function UserDetailModal({
  user,
  onClose,
  onOpenResetPassword,
  formatDate,
}: UserDetailModalProps) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#E5D7DC]
          dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 sm:p-6
          shadow-xl space-y-4"
      >
        {/* Header: Title & Close */}
        <div
          className="flex items-center justify-between border-b
            border-[#F2EAEC] dark:border-[#282E3E] pb-3"
        >
          <h3 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC]">
            Detail Pengguna
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420]
              dark:hover:text-[#F8FAFC] p-1 rounded-lg hover:bg-[#FAF7F2]
              dark:hover:bg-[#282E3E] transition cursor-pointer"
            title="Tutup detail"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Info */}
        <UserDetailProfile user={user} formatDate={formatDate} />

        {/* Token Balances Grid */}
        <UserDetailTokens user={user} />

        {/* Action buttons */}
        <div
          className="pt-2 border-t border-[#F2EAEC] dark:border-[#282E3E]
            flex flex-col gap-2"
        >
          {user.role !== "ADMIN" && (
            <button
              type="button"
              onClick={() => {
                const target = user;
                onClose();
                onOpenResetPassword(target);
              }}
              className="w-full h-10 rounded-xl border border-[#F2C2C6]
                bg-[#FBEAEB] dark:bg-[#281A1D] hover:bg-[#F8D7DA]
                dark:hover:bg-[#341F23] text-xs font-bold text-[#8A1F2D]
                dark:text-[#F87171] transition flex items-center
                justify-center gap-1.5 cursor-pointer"
            >
              <KeyRound size={14} />
              <span>Reset Kata Sandi</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-[#451420] dark:bg-white
              text-white dark:text-[#10131B] text-xs font-bold hover:bg-[#320E17]
              dark:hover:bg-[#F1F5F9] transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
