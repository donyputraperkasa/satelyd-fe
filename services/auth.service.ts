import { apiClient } from "@/lib/api/client";
import { loginApi, registerApi } from "@/lib/api/auth";
import type { LoginPayload, RegisterPayload, LoginResponse } from "@/types";

export type { LoginPayload, RegisterPayload, LoginResponse };

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  return loginApi(payload);
}

export async function registerUser(payload: RegisterPayload): Promise<LoginResponse> {
  return registerApi(payload);
}

export async function checkGameRoom(roomCode: string) {
  return apiClient<{ id: string; roomCode: string; status: string }>(
    `/games/tv-sessions/${encodeURIComponent(roomCode)}`
  );
}

export async function checkExamShareToken(shareToken: string) {
  return apiClient<{ id: string; title: string; shareToken: string }>(
    `/teacher-exams/public/${encodeURIComponent(shareToken)}`
  );
}
