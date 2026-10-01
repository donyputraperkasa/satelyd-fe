"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  RotateCcw,
  ShieldCheck,
  GraduationCap,
  Gamepad2,
  Calendar,
  Mail,
  UserCheck,
  Building2,
  KeyRound,
  Copy,
  Check,
  X,
  MessageCircle,
} from "lucide-react";
import {
  fetchAllUsers,
  adminResetUserPassword,
  type RegisteredUser,
} from "@/services/user.service";
import { useToast } from "@/components/ui";

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset Password Modal State
  const [resetModalData, setResetModalData] = useState<{
    isOpen: boolean;
    user: RegisteredUser | null;
    temporaryPassword?: string;
    isLoading: boolean;
  }>({
    isOpen: false,
    user: null,
    isLoading: false,
  });
  const [copied, setCopied] = useState(false);

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

  // Statistics
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

  const handleOpenResetModal = (user: RegisteredUser) => {
    setResetModalData({
      isOpen: true,
      user,
      temporaryPassword: undefined,
      isLoading: false,
    });
    setCopied(false);
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
      toast.success(`Kata sandi untuk ${resetModalData.user.name} berhasil direset!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mereset kata sandi.");
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

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] dark:border-[#282E3E] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C67D00] dark:text-[#E6B85C]">
              Administrasi Sistem
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1.5 flex items-center gap-2.5">
            <Users size={28} className="text-[#C67D00] dark:text-[#E6B85C]" />
            <span>Kelola Pengguna</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] dark:text-[#94A3B8] mt-1">
            Pantau akun guru dan administrator terdaftar, periksa role, asal sekolah, serta alokasi kuota token aktif.
          </p>
        </div>

        <button
          type="button"
          onClick={loadUsers}
          disabled={isLoading}
          className="inline-flex items-center gap-2 self-start sm:self-center h-10 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-xs font-bold text-[#451420] dark:text-[#F8FAFC] shadow-2xs hover:bg-[#FAF7F2] dark:hover:bg-[#252B39] transition cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={15} className={isLoading ? "animate-spin" : ""} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Total Terdaftar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.total.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5EDF0] dark:bg-[#252B39] text-[#451420] dark:text-[#F8FAFC]">
              <Users size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Akun pengguna aktif</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Akun Guru / Pendidik</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.teachers.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] dark:bg-[#281F13] text-[#C67D00] dark:text-[#FBBF24]">
              <UserCheck size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Guru pembuat kuis &amp; materi</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Token Game Beredar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.totalGameTokens.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] dark:bg-[#172554] text-[#2563EB] dark:text-[#60A5FA]">
              <Gamepad2 size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Total saldo di akun guru</p>
        </div>

        <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8]">Kredit Ujian Beredar</p>
              <h3 className="font-display text-2xl font-extrabold text-[#451420] dark:text-[#F8FAFC] mt-1">
                {stats.totalExamCredits.toLocaleString("id-ID")}
              </h3>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF5FF] dark:bg-[#2E1065] text-[#9333EA] dark:text-[#C084FC]">
              <GraduationCap size={20} />
            </div>
          </div>
          <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-3">Total kuota ujian aktif</p>
        </div>
      </div>

      {/* Filter and Search Bar Container (Sama persis model Bank Soal) */}
      <section className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-colors">
        {/* Search Input Box */}
        <div className="flex items-center gap-2.5 bg-[#FAF7F2] dark:bg-[#141720] border border-[#E5D7DC] dark:border-[#282E3E] focus-within:border-[#451420] dark:focus-within:border-[#C67D00] focus-within:bg-white dark:focus-within:bg-[#141720] rounded-xl px-4 py-2.5 flex-1 transition">
          <Search size={18} className="text-[#451420] dark:text-[#94A3B8] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, email, atau asal sekolah..."
            className="w-full bg-transparent text-xs sm:text-sm text-[#451420] dark:text-[#F8FAFC] placeholder-[#BFAAB2] dark:placeholder-[#64748B] placeholder:font-normal focus:outline-none font-medium"
            aria-label="Cari pengguna"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-[#9C737F] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC] transition p-1 rounded-md cursor-pointer"
              title="Hapus pencarian"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Counter & 2-Role Filter Switcher (Semua, Guru, Non-Guru) */}
        <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
          <span className="text-xs font-bold text-[#7A5661] dark:text-[#94A3B8]">
            {filteredUsers.length} Pengguna
          </span>

          <div className="flex items-center rounded-xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] p-1">
            {[
              { id: "ALL", label: "Semua" },
              { id: "TEACHER", label: "Guru" },
              { id: "USER", label: "Non-Guru" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  roleFilter === tab.id
                    ? "bg-white dark:bg-[#282E3E] text-[#451420] dark:text-[#F8FAFC] shadow-xs font-bold"
                    : "text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Error alert */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-xs font-bold text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E5D7DC] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-[#7A5661] dark:text-[#94A3B8] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th scope="col" className="px-5 py-3.5">Pengguna</th>
                <th scope="col" className="px-4 py-3.5">Instansi / Sekolah</th>
                <th scope="col" className="px-4 py-3.5">Status</th>
                <th scope="col" className="px-4 py-3.5 text-center">Token Game</th>
                <th scope="col" className="px-4 py-3.5 text-center">Kredit Ujian</th>
                <th scope="col" className="px-4 py-3.5">Bergabung</th>
                <th scope="col" className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EAEC] dark:divide-[#282E3E]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-7 w-7 animate-spin rounded-full border-3 border-[#C67D00] border-t-transparent" />
                      <span className="text-xs text-[#7A5661] dark:text-[#94A3B8]">
                        Memuat data pengguna dari server...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isAdmin = user.role === "ADMIN";
                  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-[#FAF7F2]/60 dark:hover:bg-[#202634]/60 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#451420] text-sm font-bold text-[#FDFBF7] shadow-2xs">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#451420] dark:text-[#F8FAFC] truncate">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#7A5661] dark:text-[#94A3B8] truncate mt-0.5">
                              <Mail size={12} className="shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#451420] dark:text-[#F8FAFC]">
                          <Building2 size={13} className="shrink-0 text-[#7A5661] dark:text-[#94A3B8]" />
                          <span className="truncate max-w-[140px] font-medium">
                            {user.schoolName || "-"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#451420] text-white px-2.5 py-0.5 text-[10px] font-bold">
                            <ShieldCheck size={12} />
                            ADMIN
                          </span>
                        ) : user.role === "TEACHER" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4E5] dark:bg-[#2C2114] text-[#C67D00] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#4E3918] px-2.5 py-0.5 text-[10px] font-bold">
                            <GraduationCap size={12} />
                            GURU
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EDF0] dark:bg-[#252B39] text-[#7A5661] dark:text-[#94A3B8] px-2.5 py-0.5 text-[10px] font-bold">
                            NON-GURU
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
                          {isAdmin ? "∞" : user.gameTokenBalance ?? 0}
                        </span>
                        {!isAdmin && (
                          <span className="block text-[10px] text-[#A48E95] dark:text-[#64748B]">
                            token
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="font-bold text-[#451420] dark:text-[#F8FAFC]">
                          {isAdmin ? "∞" : user.examCreditBalance ?? 0}
                        </span>
                        {!isAdmin && (
                          <span className="block text-[10px] text-[#A48E95] dark:text-[#64748B]">
                            kredit
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-[#7A5661] dark:text-[#94A3B8]">
                          <Calendar size={13} className="shrink-0" />
                          <span className="text-[11px] font-medium">{formatDate(user.createdAt)}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        {!isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleOpenResetModal(user)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#DFD0D5] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] text-[11px] font-semibold text-[#8A1F2D] dark:text-[#F87171] hover:bg-[#FBEAEB] dark:hover:bg-[#281A1D] hover:border-[#F2C2C6] transition shadow-2xs cursor-pointer"
                            title="Reset kata sandi pengguna"
                          >
                            <KeyRound size={12} />
                            <span>Reset Sandi</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center">
                    <p className="text-xs sm:text-sm font-bold text-[#451420] dark:text-[#F8FAFC]">
                      Tidak ada pengguna yang sesuai dengan filter
                    </p>
                    <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] mt-1">
                      Coba ganti kata kunci pencarian atau reset filter status.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog Reset Password Admin */}
      {resetModalData.isOpen && resetModalData.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-white dark:bg-[#1C202C] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2EAEC] dark:border-[#282E3E] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF7ED] dark:bg-[#281F13] text-[#C67D00] dark:text-[#FBBF24]">
                  <KeyRound size={16} />
                </div>
                <h3 className="font-display text-base font-bold text-[#451420] dark:text-[#F8FAFC]">
                  Reset Kata Sandi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setResetModalData({ isOpen: false, user: null, isLoading: false })}
                className="text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
              >
                <X size={18} />
              </button>
            </div>

            {!resetModalData.temporaryPassword ? (
              <div className="space-y-3">
                <p className="text-xs text-[#7A5661] dark:text-[#94A3B8] leading-relaxed">
                  Apakah Anda yakin ingin mereset kata sandi akun untuk:
                </p>
                <div className="rounded-xl bg-[#FAF7F2] dark:bg-[#141720] border border-[#DFD0D5] dark:border-[#282E3E] p-3 text-xs">
                  <p className="font-bold text-[#451420] dark:text-[#F8FAFC]">
                    {resetModalData.user.name}
                  </p>
                  <p className="text-[11px] text-[#7A5661] dark:text-[#94A3B8]">
                    {resetModalData.user.email}
                  </p>
                </div>
                <p className="text-[11px] text-[#A48E95] dark:text-[#64748B]">
                  Sistem akan membuat kata sandi sementara otomatis yang bisa Anda bagikan kepada pengguna.
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetModalData({ isOpen: false, user: null, isLoading: false })}
                    className="h-9 px-4 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#252B39]"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    disabled={resetModalData.isLoading}
                    className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#8A1F2D] text-white text-xs font-bold shadow-2xs hover:bg-[#6E1622] transition disabled:opacity-60"
                  >
                    <KeyRound size={13} />
                    <span>{resetModalData.isLoading ? "Mereset..." : "Ya, Reset Sandi"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl bg-[#EDF7ED] dark:bg-[#132A18] border border-[#C8E6C9] dark:border-[#1D4A27] p-3 text-xs text-[#2E7D32] dark:text-[#86EFAC] flex items-center gap-2">
                  <Check size={16} />
                  <span>Kata sandi berhasil direset!</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#7A5661] dark:text-[#94A3B8]">
                    Kata Sandi Sementara:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={resetModalData.temporaryPassword}
                      className="flex-1 h-10 px-3 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] bg-[#FAF7F2] dark:bg-[#141720] text-sm font-mono font-bold text-[#451420] dark:text-[#F8FAFC]"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-[#451420] dark:bg-white text-white dark:text-[#10131B] text-xs font-bold hover:opacity-95 transition"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? "Disalin" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Halo ${resetModalData.user.name}, kata sandi akun Satelyd Anda telah direset oleh Admin.\n\nKata sandi sementara Anda: ${resetModalData.temporaryPassword}\n\nSilakan login di web Satelyd dan perbarui kata sandi Anda melalui menu Pengaturan Akun.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition shadow-xs"
                  >
                    <MessageCircle size={15} />
                    <span>Bagikan ke WhatsApp Pengguna</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setResetModalData({ isOpen: false, user: null, isLoading: false })}
                    className="w-full h-9 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] text-xs font-semibold text-[#7A5661] dark:text-[#94A3B8] hover:bg-[#FAF7F2] dark:hover:bg-[#252B39]"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
