export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "teacher" | "student";
}

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
