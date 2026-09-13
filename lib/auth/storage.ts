import type { LoginResponse, User } from "@/types";

export const ACCESS_TOKEN_KEY = "satelyd.access-token";
export const USER_KEY = "satelyd.user";
export const COOKIE_SESSION_MARKER = "cookie-session";

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
  window.dispatchEvent(new Event("storage"));
}

export function getAccessToken(): string | null {
  if (!canUseStorage()) {
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
  localStorage.removeItem("database-yayasan.access-token");
  localStorage.removeItem("database-yayasan.user");
  window.dispatchEvent(new Event("storage"));
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}
