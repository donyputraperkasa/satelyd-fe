"use client";

import { useUsersPage } from "./use-users-page";
import {
  UsersHeaderSection,
  UsersStatsCards,
  UsersSearchBar,
  UserMobileCardList,
  UserDetailModal,
  UserTableView,
  UserResetModal,
} from "@/components/users";

export default function UsersPage() {
  const {
    isLoading,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    errorMessage,
    selectedUserDetail,
    setSelectedUserDetail,
    resetModalData,
    copied,
    loadUsers,
    filteredUsers,
    stats,
    formatDate,
    handleOpenResetModal,
    handleCloseResetModal,
    handleConfirmReset,
    handleCopyPassword,
  } = useUsersPage();

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <UsersHeaderSection isLoading={isLoading} onRefresh={loadUsers} />

      {/* Summary Stat Cards */}
      <UsersStatsCards stats={stats} />

      {/* Filter and Search Bar Container */}
      <UsersSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        filteredCount={filteredUsers.length}
      />

      {/* Error alert */}
      {errorMessage && (
        <div
          className="rounded-xl border border-red-200 dark:border-red-900
            bg-red-50 dark:bg-red-950/40 p-4 text-xs font-bold
            text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </div>
      )}

      {/* Mobile User List View (Compact name-only with tap for detail) */}
      <UserMobileCardList
        isLoading={isLoading}
        users={filteredUsers}
        onSelectUser={setSelectedUserDetail}
      />

      {/* Modal Detail Pengguna (Mobile Mode) */}
      <UserDetailModal
        user={selectedUserDetail}
        onClose={() => setSelectedUserDetail(null)}
        onOpenResetPassword={handleOpenResetModal}
        formatDate={formatDate}
      />

      {/* Desktop Table View */}
      <UserTableView
        isLoading={isLoading}
        users={filteredUsers}
        onOpenResetPassword={handleOpenResetModal}
        formatDate={formatDate}
      />

      {/* Modal Dialog Reset Password Admin */}
      <UserResetModal
        modalData={resetModalData}
        copied={copied}
        onClose={handleCloseResetModal}
        onConfirmReset={handleConfirmReset}
        onCopyPassword={handleCopyPassword}
      />
    </div>
  );
}
