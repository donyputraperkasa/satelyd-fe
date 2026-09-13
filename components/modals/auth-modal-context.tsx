"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { clearAuthSession, getStoredUser } from "@/lib/auth";
import type { User } from "@/types";
import { LoginModal } from "./login-modal";
import { RegisterModal } from "./register-modal";
import { PinModal } from "./pin-modal";

type ModalType = "login" | "register" | "pin" | null;

interface AuthModalContextValue {
  activeModal: ModalType;
  openLogin: () => void;
  openRegister: () => void;
  openPin: () => void;
  closeModal: () => void;
  user: User | null;
  logout: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined
);

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getClientSnapshot = () => {
  if (typeof window === "undefined") return null;
  return JSON.stringify(getStoredUser());
};

const getServerSnapshot = () => null;

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const storedUserRaw = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const [localUser, setLocalUser] = useState<User | null>(null);

  const user = useMemo<User | null>(() => {
    if (localUser) return localUser;
    if (!storedUserRaw) return null;
    try {
      return JSON.parse(storedUserRaw);
    } catch {
      return null;
    }
  }, [localUser, storedUserRaw]);

  const openLogin = useCallback(() => setActiveModal("login"), []);
  const openRegister = useCallback(() => setActiveModal("register"), []);
  const openPin = useCallback(() => setActiveModal("pin"), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const logout = useCallback(() => {
    clearAuthSession();
    setLocalUser(null);
  }, []);

  const handleAuthSuccess = useCallback(() => {
    setLocalUser(getStoredUser());
  }, []);

  const value = useMemo(
    () => ({
      activeModal,
      openLogin,
      openRegister,
      openPin,
      closeModal,
      user,
      logout,
    }),
    [activeModal, openLogin, openRegister, openPin, closeModal, user, logout]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={openRegister}
        onSwitchToPin={openPin}
        onSuccess={handleAuthSuccess}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={openLogin}
        onSwitchToPin={openPin}
        onSuccess={handleAuthSuccess}
      />
      <PinModal
        isOpen={activeModal === "pin"}
        onClose={closeModal}
        onSwitchToLogin={openLogin}
        onSwitchToRegister={openRegister}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
