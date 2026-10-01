import { apiClient } from "@/lib/api/client";

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "USER" | "STUDENT";
  gameTokenBalance: number;
  examCreditBalance: number;
  createdAt: string;
  updatedAt: string;
}

export async function fetchAllUsers(): Promise<RegisteredUser[]> {
  const users = await apiClient<RegisteredUser[]>("/users");
  return Array.isArray(users) ? users : [];
}
