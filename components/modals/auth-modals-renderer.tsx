"use client";

import type { User, ModalType } from "@/types";
import { LoginModal } from "./login-modal";
import { RegisterModal } from "./register-modal";
import { PinModal } from "./pin-modal";
import { GlobalAuthOverlay, type GlobalAuthOverlayProps } from "./global-auth-overlay";

interface AuthModalsRendererProps {
  activeModal: ModalType;
  authOverlay: GlobalAuthOverlayProps;
  closeModal: () => void;
  openLogin: () => void;
  openRegister: () => void;
  openPin: () => void;
  onLoginSuccess: (user: User) => void;
  onRegisterSuccess: (user: User) => void;
}

export function AuthModalsRenderer({
  activeModal,
  authOverlay,
  closeModal,
  openLogin,
  openRegister,
  openPin,
  onLoginSuccess,
  onRegisterSuccess,
}: AuthModalsRendererProps) {
  return (
    <>
      <GlobalAuthOverlay {...authOverlay} />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={openRegister}
        onSwitchToPin={openPin}
        onSuccess={onLoginSuccess}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={openLogin}
        onSwitchToPin={openPin}
        onSuccess={onRegisterSuccess}
      />
      <PinModal
        isOpen={activeModal === "pin"}
        onClose={closeModal}
        onSwitchToLogin={openLogin}
        onSwitchToRegister={openRegister}
      />
    </>
  );
}
