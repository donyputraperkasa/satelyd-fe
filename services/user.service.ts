import { apiClient } from "@/lib/api/client";
import { getStoredUser, USER_KEY } from "@/lib/auth/storage";
import type { User, RegisteredUser } from "@/types";

export type { RegisteredUser };


export async function fetchAllUsers(): Promise<RegisteredUser[]> {
  const users = await apiClient<RegisteredUser[]>("/users");
  return Array.isArray(users) ? users : [];
}

export async function updateUserProfile(payload: {
  name?: string;
  schoolName?: string;
  role?: "TEACHER" | "USER";
}): Promise<User> {
  const updated = await apiClient<User>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (typeof window !== "undefined" && updated) {
    const current = getStoredUser();
    const merged = { ...current, ...updated };
    localStorage.setItem(USER_KEY, JSON.stringify(merged));
    localStorage.setItem("satelyd_user", JSON.stringify(merged));
    window.dispatchEvent(new Event("storage"));
  }

  return updated;
}

export async function changeUserPassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> {
  return apiClient<{ message: string }>("/users/me/password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function adminResetUserPassword(
  userId: string,
  customNewPassword?: string
): Promise<{
  message: string;
  userId: string;
  userName: string;
  userEmail: string;
  temporaryPassword: string;
}> {
  return apiClient(`/users/admin/reset-password/${encodeURIComponent(userId)}`, {
    method: "POST",
    body: JSON.stringify({ newPassword: customNewPassword }),
  });
}
