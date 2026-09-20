import { apiClient } from "@/lib/api/client";

export * from "./auth.service";
export * from "./student-exam.service";
export * from "./deck.service";
export * from "./game.service";

export async function getSystemHealth() {
  return apiClient<{ status: string }>("/health");
}

export async function getPublicCourses() {
  return apiClient<Array<{ id: string; title: string; category: string }>>(
    "/courses"
  );
}
