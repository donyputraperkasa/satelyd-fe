import { apiClient } from "@/lib/api/client";
import { fetchDeckById, fetchDeckByPinOrId } from "./deck.service";
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
  if (!cleanPin) return null;

  // Normalizer helper
  const norm = (s: string) => s.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  const fuzzy = (s: string) =>
    norm(s).replace(/^TV/, "").replace(/U/g, "V").replace(/O/g, "0").replace(/I/g, "1").replace(/L/g, "1");

  const cleanNorm = norm(cleanPin);
  const cleanFuzzy = fuzzy(cleanPin);

  // 1. Coba ambil dari Backend API
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
    // Jika tidak ada prefix TV-, coba dengan TV-
    if (!cleanPin.startsWith("TV-")) {
      try {
        const withPrefix = `TV-${cleanPin.replace(/^TV/, "")}`;
        const apiSession = await apiClient<{
          id: string;
          roomCode?: string;
          pinCode?: string;
          deckId: string;
          selectedMode?: GameType;
          gameType?: GameType;
          deck?: Deck;
        }>(`/games/tv-sessions/${encodeURIComponent(withPrefix)}`);
        if (apiSession && apiSession.deck) {
          return {
            id: apiSession.id,
            pinCode: apiSession.roomCode || apiSession.pinCode || withPrefix,
            deckId: apiSession.deckId,
            deck: apiSession.deck,
            gameType: apiSession.selectedMode || apiSession.gameType || "FLIP_CARD",
            status: "ACTIVE",
            createdAt: new Date().toISOString(),
            teams: JSON.parse(JSON.stringify(DEFAULT_TEAMS)),
            openedCardIds: [],
          };
        }
      } catch {}
    }
  }

  // 2. Cari di sesi aktif lokal (localStorage)
  const current = getStoredGameSessions();
  const found = current.find(
    (s) =>
      s.status === "ACTIVE" &&
      (s.pinCode.toUpperCase() === cleanPin ||
        norm(s.pinCode) === cleanNorm ||
        fuzzy(s.pinCode) === cleanFuzzy)
  );
  if (found) return found;

  // 3. Jika sesi belum dibuat tapi deck ada, buat / aktifkan otomatis
  const deck = await fetchDeckByPinOrId(cleanPin);
  if (deck) {
    const sessionPin =
      deck.pinCode ||
      `TV-${deck.id.replace(/[^0-9A-Z]/gi, "").slice(-4).toUpperCase() || "8821"}`;
    return createOrGetGameSession(deck.id, "FLIP_CARD", sessionPin);
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
