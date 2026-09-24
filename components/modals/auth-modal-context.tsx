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
import { getStoredUser } from "@/lib/auth";
import type { User, ModalType, AuthModalContextValue } from "@/types";
import { AuthModalsRenderer } from "./auth-modals-renderer";
import { useUserInactivity } from "./use-user-inactivity";
import { useAuthTransition } from "./use-auth-transition";
import { useToast } from "@/components/ui";

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

const emptySubscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const getClientSnapshot = () => {
  if (typeof window === "undefined") return null;
  return JSON.stringify(getStoredUser());
};

const getServerSnapshot = () => null;

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const storedUserRaw = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  const [localUser, setLocalUser] = useState<User | null>(null);

  const user = useMemo<User | null>(() => {
    if (!storedUserRaw) return null;
    if (localUser) return localUser;
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

  const { toast } = useToast();
  const { authOverlay, showAuthTransition, logout } = useAuthTransition(() => setLocalUser(null));

  const handleLoginSuccess = useCallback(
    async (loggedInUser: User) => {
      closeModal();
      setLocalUser(loggedInUser);
      toast.success(`Selamat datang kembali, ${loggedInUser.name}!`);
      await showAuthTransition({
        title: "Menyiapkan Ruang Belajar...",
        subtitle: `Selamat datang kembali, ${loggedInUser.name}!`,
        type: "login",
        redirectTo: "/dashboard",
      });
    },
    [closeModal, showAuthTransition, toast]
  );

  const handleRegisterSuccess = useCallback(
    async (registeredUser: User) => {
      closeModal();
      setLocalUser(registeredUser);
      toast.success(`Akun berhasil dibuat! Selamat datang, ${registeredUser.name}!`);
      await showAuthTransition({
        title: "Membuat Akun Baru...",
        subtitle: `Selamat datang di Satelyd, ${registeredUser.name}!`,
        type: "register",
        redirectTo: "/dashboard",
      });
    },
    [closeModal, showAuthTransition, toast]
  );

  useUserInactivity(user, () => setLocalUser(null));

  const value = useMemo(
    () => ({ activeModal, openLogin, openRegister, openPin, closeModal, user, logout, showAuthTransition }),
    [activeModal, openLogin, openRegister, openPin, closeModal, user, logout, showAuthTransition]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModalsRenderer
        activeModal={activeModal}
        authOverlay={authOverlay}
        closeModal={closeModal}
        openLogin={openLogin}
        openRegister={openRegister}
        openPin={openPin}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within an AuthModalProvider");
  return context;
}
