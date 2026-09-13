import { apiClient } from "./client";
import type { LoginPayload, RegisterPayload, LoginResponse, User } from "@/types";

export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerApi(payload: RegisterPayload): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMeApi(token?: string): Promise<User> {
  return apiClient<User>("/users/me", {
    method: "GET",
    token,
  });
}
