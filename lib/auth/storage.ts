import type { LoginResponse, User } from "@/types";

export const ACCESS_TOKEN_KEY = "satelyd.access-token";
export const USER_KEY = "satelyd.user";
export const COOKIE_SESSION_MARKER = "cookie-session";
export const LAST_ACTIVE_KEY = "satelyd.last-active";
export const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export function recordUserActivity() {
  if (!canUseStorage()) return;
  localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
}

export function isSessionExpired(): boolean {
  if (!canUseStorage()) return false;
  const lastActiveStr =
    localStorage.getItem(LAST_ACTIVE_KEY) ??
    localStorage.getItem("satelyd_last_active");
  if (!lastActiveStr) {
    return false;
  }
  const lastActive = parseInt(lastActiveStr, 10);
  if (isNaN(lastActive)) return false;
  return Date.now() - lastActive > INACTIVITY_TIMEOUT_MS;
}

export function saveAuthSession(session: LoginResponse) {
  if (!canUseStorage()) {
    return;
  }

  if (session.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
    localStorage.setItem("satelyd_token", session.accessToken);
  }
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  localStorage.setItem("satelyd_user", JSON.stringify(session.user));
  recordUserActivity();
  window.dispatchEvent(new Event("storage"));
}

export function getAccessToken(): string | null {
  if (!canUseStorage()) {
    return null;
  }

  if (isSessionExpired()) {
    clearAuthSession();
    return null;
  }

  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ??
    localStorage.getItem("satelyd_token") ??
    (getStoredUser() ? COOKIE_SESSION_MARKER : null)
  );
}

export function getStoredUser(): User | null {
  if (!canUseStorage()) {
    return null;
  }

  if (isSessionExpired()) {
    clearAuthSession();
    return null;
  }

  const rawUser =
    localStorage.getItem(USER_KEY) ??
    localStorage.getItem("satelyd_user") ??
    localStorage.getItem("database-yayasan.user");

  try {
    return rawUser ? (JSON.parse(rawUser) as User) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("satelyd_user");
    return null;
  }
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("satelyd_token");
  localStorage.removeItem("satelyd_user");
  localStorage.removeItem(LAST_ACTIVE_KEY);
  localStorage.removeItem("satelyd_last_active");
  localStorage.removeItem("database-yayasan.access-token");
  localStorage.removeItem("database-yayasan.user");

  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }
  }

  window.dispatchEvent(new Event("storage"));
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}
