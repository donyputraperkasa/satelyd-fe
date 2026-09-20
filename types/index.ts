import type { User } from "./user";
import type { Role } from "./role";

export * from "./user";
export * from "./role";
export * from "./school";
export * from "./transaction";
export * from "./exam";
export * from "./deck";
export * from "./game";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export type AuthResponse = LoginResponse;

export interface ExamInfo {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
}

export interface FlipCardDeck {
  id: string;
  title: string;
  cardCount: number;
}
