import type { User } from "./user";

export type ModalType = "login" | "register" | "pin" | null;

export interface AuthTransitionOptions {
  title: string;
  subtitle?: string;
  type?: "login" | "logout" | "register";
  redirectTo?: string;
}

export interface AuthModalContextValue {
  activeModal: ModalType;
  openLogin: () => void;
  openRegister: () => void;
  openPin: () => void;
  closeModal: () => void;
  user: User | null;
  logout: () => void;
  showAuthTransition: (options: AuthTransitionOptions) => Promise<void>;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToPin: () => void;
  onSuccess?: (user: User) => void;
}

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToPin: () => void;
  onSuccess?: (user: User) => void;
}

export interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}
