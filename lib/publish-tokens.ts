import { getStoredUser, USER_KEY } from "./auth/storage";

export function getPublishTokenBalance(): number {
  if (typeof window === "undefined") return 0;
  const user = getStoredUser();
  if (user?.isUnlimited || user?.role === "ADMIN") {
    return 999;
  }
  if (user && typeof user.examCreditBalance === "number") {
    return user.examCreditBalance;
  }
  const localVal = localStorage.getItem("satelyd.publishTokens");
  if (localVal !== null) {
    const parsed = Number(localVal);
    if (!Number.isNaN(parsed)) return parsed;
  }
  // Default for free tier users is 0
  return user ? (user.examCreditBalance ?? 0) : 0;
}

export function deductPublishToken(): { success: boolean; newBalance: number } {
  if (typeof window === "undefined") return { success: false, newBalance: 0 };
  const user = getStoredUser();
  if (user?.isUnlimited || user?.role === "ADMIN") {
    return { success: true, newBalance: 999 };
  }

  const current = getPublishTokenBalance();
  if (current <= 0) {
    return { success: false, newBalance: 0 };
  }

  const next = Math.max(0, current - 1);
  if (user) {
    const updated = { ...user, examCreditBalance: next };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    localStorage.setItem("satelyd_user", JSON.stringify(updated));
  }
  localStorage.setItem("satelyd.publishTokens", String(next));
  window.dispatchEvent(new Event("storage"));

  return { success: true, newBalance: next };
}
