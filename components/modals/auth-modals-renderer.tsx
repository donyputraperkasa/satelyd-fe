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
      {activeModal === "login" && (
        <LoginModal
          isOpen={true}
          onClose={closeModal}
          onSwitchToRegister={openRegister}
          onSwitchToPin={openPin}
          onSuccess={onLoginSuccess}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          isOpen={true}
          onClose={closeModal}
          onSwitchToLogin={openLogin}
          onSwitchToPin={openPin}
          onSuccess={onRegisterSuccess}
        />
      )}
      {activeModal === "pin" && (
        <PinModal
          isOpen={true}
          onClose={closeModal}
          onSwitchToLogin={openLogin}
          onSwitchToRegister={openRegister}
        />
      )}
    </>
  );
}
