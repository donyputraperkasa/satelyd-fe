import { apiClient } from "@/lib/api/client";
import { fetchDeckById } from "./deck.service";
import type { GameSession, GameType, GameTeam, Deck } from "@/types";

const LOCAL_STORAGE_SESSIONS_KEY = "satelyd.game-sessions.v1";

const DEFAULT_TEAMS: GameTeam[] = [
  { id: "team-1", name: "Tim 1 (Merah)", color: "red", score: 0 },
  { id: "team-2", name: "Tim 2 (Biru)", color: "blue", score: 0 },
  { id: "team-3", name: "Tim 3 (Hijau)", color: "green", score: 0 },
  { id: "team-4", name: "Tim 4 (Kuning)", color: "amber", score: 0 },
];

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getStoredGameSessions(): GameSession[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY);
    return raw ? (JSON.parse(raw) as GameSession[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredGameSessions(sessions: GameSession[]) {
  if (!canUseStorage()) return;
  localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
}

/**
 * Creates or retrieves an active game session for a given deck and game type
 */
export async function createOrGetGameSession(
  deckId: string,
  gameType: GameType = "FLIP_CARD",
  customPin?: string
): Promise<GameSession> {
  const deck = await fetchDeckById(deckId);
  if (!deck) {
    throw new Error(`Deck dengan ID "${deckId}" tidak ditemukan.`);
  }

  const pinCode =
    customPin ||
    deck.pinCode ||
    `TV-${deck.id.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() || "8821"}`;

  const currentSessions = getStoredGameSessions();
  const existing = currentSessions.find(
    (s) => s.pinCode === pinCode && s.status === "ACTIVE" && s.gameType === gameType
  );

  if (existing) {
    // Update deck if cards changed
    existing.deck = deck;
    saveStoredGameSessions(currentSessions);
    return existing;
  }

  const newSession: GameSession = {
    id: `GS-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    pinCode,
    deckId: deck.id,
    deck,
    gameType,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    teams: JSON.parse(JSON.stringify(DEFAULT_TEAMS)),
    openedCardIds: [],
  };

  // Try saving to backend
  try {
    await apiClient("/games/tv-sessions", {
      method: "POST",
      body: JSON.stringify({
        pinCode: newSession.pinCode,
        deckId: newSession.deckId,
        gameType: newSession.gameType,
        selectedMode: newSession.gameType,
      }),
    });
  } catch {
    // Fallback to offline / localStorage
  }

  const updated = [newSession, ...currentSessions.filter((s) => s.pinCode !== pinCode)];
  saveStoredGameSessions(updated);
  return newSession;
}

/**
 * Fetches an active game session by PIN code (for Smart TV or direct join)
 */
export async function fetchGameSessionByPin(pinCode: string): Promise<GameSession | null> {
  const cleanPin = pinCode.trim().toUpperCase();

  // Try backend API first
  try {
    const apiSession = await apiClient<{
      id: string;
      roomCode?: string;
      pinCode?: string;
      deckId: string;
      selectedMode?: GameType;
      gameType?: GameType;
      deck?: Deck;
    }>(`/games/tv-sessions/${encodeURIComponent(cleanPin)}`);

    if (apiSession && apiSession.deck) {
      return {
        id: apiSession.id,
        pinCode: apiSession.roomCode || apiSession.pinCode || cleanPin,
        deckId: apiSession.deckId,
        deck: apiSession.deck,
        gameType: apiSession.selectedMode || apiSession.gameType || "FLIP_CARD",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        teams: JSON.parse(JSON.stringify(DEFAULT_TEAMS)),
        openedCardIds: [],
      };
    }
  } catch {
    // Fallback to local storage
  }

  const current = getStoredGameSessions();
  const found = current.find(
    (s) => s.pinCode.toUpperCase() === cleanPin && s.status === "ACTIVE"
  );
  if (found) return found;

  // If not found in stored sessions, check if there is a deck with this pin
  const deck = await fetchDeckById(cleanPin);
  if (deck) {
    return createOrGetGameSession(deck.id, "FLIP_CARD", cleanPin);
  }

  return null;
}

/**
 * Marks a card as opened/completed in the current session
 */
export async function markCardOpened(
  sessionId: string,
  cardId: string
): Promise<GameSession> {
  const sessions = getStoredGameSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) throw new Error("Sesi game tidak ditemukan.");

  if (!sessions[idx].openedCardIds.includes(cardId)) {
    sessions[idx].openedCardIds.push(cardId);
    saveStoredGameSessions(sessions);
  }
  return sessions[idx];
}

/**
 * Updates a team's score in the current session
 */
export async function updateTeamScore(
  sessionId: string,
  teamId: string,
  deltaPoints: number
): Promise<GameSession> {
  const sessions = getStoredGameSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx === -1) throw new Error("Sesi game tidak ditemukan.");

  const team = sessions[idx].teams.find((t) => t.id === teamId);
  if (team) {
    team.score = Math.max(0, team.score + deltaPoints);
    saveStoredGameSessions(sessions);
  }
  return sessions[idx];
}

/**
 * Ends a game session
 */
export async function endGameSession(sessionId: string): Promise<void> {
  const sessions = getStoredGameSessions();
  const idx = sessions.findIndex((s) => s.id === sessionId);
  if (idx !== -1) {
    sessions[idx].status = "ENDED";
    saveStoredGameSessions(sessions);
  }

  try {
    await apiClient(`/games/tv-sessions/${encodeURIComponent(sessionId)}/end`, {
      method: "POST",
    });
  } catch {
    // Fallback
  }
}
