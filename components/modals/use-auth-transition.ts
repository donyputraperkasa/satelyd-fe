"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth";
import type { AuthTransitionOptions } from "@/types";
import type { GlobalAuthOverlayProps } from "./global-auth-overlay";

export function useAuthTransition(onLogoutSession: () => void) {
  const router = useRouter();
  const [authOverlay, setAuthOverlay] = useState<GlobalAuthOverlayProps>({
    isOpen: false,
    title: "",
  });

  const showAuthTransition = useCallback(
    async ({ title, subtitle, type = "login", redirectTo }: AuthTransitionOptions) => {
      setAuthOverlay({ isOpen: true, title, subtitle, type });
      await new Promise((res) => setTimeout(res, 800));
      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      }
      setTimeout(() => setAuthOverlay((prev) => ({ ...prev, isOpen: false })), 350);
    },
    [router]
  );

  const logout = useCallback(async () => {
    setAuthOverlay({
      isOpen: true,
      title: "Mengakhiri Sesi Akun...",
      subtitle: "Menyimpan data dan mengamankan akun Anda",
      type: "logout",
    });
    await new Promise((res) => setTimeout(res, 850));
    clearAuthSession();
    onLogoutSession();
    router.push("/");
    router.refresh();
    setTimeout(() => setAuthOverlay((prev) => ({ ...prev, isOpen: false })), 350);
  }, [router, onLogoutSession]);

  return { authOverlay, showAuthTransition, logout };
}
