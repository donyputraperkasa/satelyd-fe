import { apiClient } from "@/lib/api/client";

export async function getSystemHealth() {
  return apiClient<{ status: string }>("/health");
}

export async function getPublicCourses() {
  return apiClient<Array<{ id: string; title: string; category: string }>>(
    "/courses"
  );
}
