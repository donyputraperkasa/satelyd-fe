"use client";

import { useEffect } from "react";
import { recordUserActivity, isSessionExpired, clearAuthSession } from "@/lib/auth";
import type { User } from "@/types";

export function useUserInactivity(user: User | null, onTimeout: () => void) {
  useEffect(() => {
    if (!user) return;

    recordUserActivity();
    let lastRecorded = Date.now();

    const handleActivity = () => {
      const now = Date.now();
      if (now - lastRecorded > 30000) {
        lastRecorded = now;
        recordUserActivity();
      }
    };

    const events = ["mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));

    const interval = setInterval(() => {
      if (isSessionExpired()) {
        clearAuthSession();
        onTimeout();
      }
    }, 60000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleActivity));
      clearInterval(interval);
    };
  }, [user, onTimeout]);
}
