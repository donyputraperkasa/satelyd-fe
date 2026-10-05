import { useState, useEffect, useMemo } from "react";
import { fetchAllUsers } from "@/services/user.service";
import type { RegisteredUser } from "@/types";
import { useUserResetPassword } from "./use-user-reset-password";

export function useUsersPage() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected user for mobile detail modal
  const [selectedUserDetail, setSelectedUserDetail] =
    useState<RegisteredUser | null>(null);

  const resetPassword = useUserResetPassword();

  const loadUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Gagal memuat daftar pengguna dari server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        Boolean(u.schoolName && u.schoolName.toLowerCase().includes(q));

      const matchesRole =
        roleFilter === "ALL" ||
        u.role.toUpperCase() === roleFilter.toUpperCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const stats = useMemo(() => {
    const total = users.length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const teachers = users.filter((u) => u.role === "TEACHER").length;
    const totalGameTokens = users.reduce(
      (sum, u) => sum + (u.gameTokenBalance || 0),
      0
    );
    const totalExamCredits = users.reduce(
      (sum, u) => sum + (u.examCreditBalance || 0),
      0
    );

    return { total, admins, teachers, totalGameTokens, totalExamCredits };
  }, [users]);

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  return {
    users,
    isLoading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    errorMessage,
    selectedUserDetail,
    setSelectedUserDetail,
    resetModalData: resetPassword.resetModalData,
    copied: resetPassword.copied,
    loadUsers,
    filteredUsers,
    stats,
    formatDate,
    handleOpenResetModal: resetPassword.handleOpenResetModal,
    handleCloseResetModal: resetPassword.handleCloseResetModal,
    handleConfirmReset: resetPassword.handleConfirmReset,
    handleCopyPassword: resetPassword.handleCopyPassword,
  };
}
