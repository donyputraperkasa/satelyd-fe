import type { LucideIcon } from "lucide-react";

export type Role =
  | "ADMIN"
  | "USER"
  | "TEACHER"
  | "STUDENT"
  | "admin"
  | "user"
  | "teacher"
  | "student";

export interface School {
  id: string;
  name: string;
  code?: string;
  address?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolName?: string | null;
  schoolId?: string | null;
  gameTokenBalance?: number;
  examCreditBalance?: number;
  isUnlimited?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "USER" | "STUDENT";
  schoolName?: string | null;
  gameTokenBalance: number;
  examCreditBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  sub: string;
  email: string;
  role: Role;
  schoolId?: string | null;
}

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
  role: Role;
  schoolId?: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
}

export interface ResetModalState {
  isOpen: boolean;
  user: RegisteredUser | null;
  temporaryPassword?: string;
  isLoading: boolean;
}

// Component Props Interfaces
export interface UsersHeaderSectionProps {
  isLoading: boolean;
  onRefresh: () => void;
}

export interface UsersStatCardItemProps {
  label: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
}

export interface UsersStatsCardsProps {
  stats: {
    total: number;
    teachers: number;
    totalGameTokens: number;
    totalExamCredits: number;
  };
}

export interface UsersSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  filteredCount: number;
}

export interface UserMobileCardItemProps {
  user: RegisteredUser;
  onSelect: (user: RegisteredUser) => void;
}

export interface UserMobileCardListProps {
  isLoading: boolean;
  users: RegisteredUser[];
  onSelectUser: (user: RegisteredUser) => void;
}

export interface UserDetailProfileProps {
  user: RegisteredUser;
  formatDate: (isoString: string) => string;
}

export interface UserDetailTokensProps {
  user: RegisteredUser;
}

export interface UserDetailModalProps {
  user: RegisteredUser | null;
  onClose: () => void;
  onOpenResetPassword: (user: RegisteredUser) => void;
  formatDate: (isoString: string) => string;
}

export interface UserTableRowProps {
  user: RegisteredUser;
  onOpenResetPassword: (user: RegisteredUser) => void;
  formatDate: (isoString: string) => string;
}

export interface UserTableViewProps {
  isLoading: boolean;
  users: RegisteredUser[];
  onOpenResetPassword: (user: RegisteredUser) => void;
  formatDate: (isoString: string) => string;
}

export interface UserResetConfirmStepProps {
  user: RegisteredUser;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface UserResetSuccessStepProps {
  user: RegisteredUser;
  temporaryPassword?: string;
  copied: boolean;
  onCopyPassword: () => void;
  onClose: () => void;
}

export interface UserResetModalProps {
  modalData: ResetModalState;
  copied: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
  onCopyPassword: () => void;
}

export interface UsersTableProps {
  onDelete?: (user: User) => void;
  onResetPassword: (user: User) => void;
  schools: School[];
  users: User[];
}

export interface CreateUserFormProps {
  onCreated: (user: User) => void;
  schools: School[];
  token: string;
}

export interface ResetPasswordModalProps {
  onClose: () => void;
  token: string;
  user: User;
}