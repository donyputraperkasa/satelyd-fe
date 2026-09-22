import { apiClient } from "@/lib/api/client";
import { getStoredUser } from "@/lib/auth/storage";
import type { Deck, DeckCard, CreateDeckPayload, UpdateDeckPayload } from "@/types";

const LOCAL_STORAGE_KEY = "satelyd.decks.v1";

const INITIAL_DECKS: Deck[] = [];

function getDeckStorageKey(): string {
  const user = getStoredUser();
  if (user?.id) {
    return `satelyd.decks.${user.id}`;
  }
  return "satelyd.decks.public";
}

function getStoredDecks(): Deck[] {
  if (typeof window === "undefined") return INITIAL_DECKS;
  const key = getDeckStorageKey();
  const user = getStoredUser();

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      // If user is Admin or in public/demo view, migrate or initialize with INITIAL_DECKS
      if (user?.role === "ADMIN" || !user) {
        const legacy = localStorage.getItem("satelyd.decks.v1");
        if (legacy) {
          localStorage.setItem(key, legacy);
          return JSON.parse(legacy);
        }
        localStorage.setItem(key, JSON.stringify(INITIAL_DECKS));
        return INITIAL_DECKS;
      }
      // For standard teachers (new users), initialize empty deck list
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return user?.role === "ADMIN" || !user ? INITIAL_DECKS : [];
  }
}

function saveStoredDecks(decks: Deck[]) {
  if (typeof window === "undefined") return;
  const key = getDeckStorageKey();
  try {
    localStorage.setItem(key, JSON.stringify(decks));
  } catch (err) {
    console.warn("Failed to persist decks locally:", err);
  }
}

export async function fetchDecks(): Promise<Deck[]> {
  try {
    const backendData = await apiClient<Deck[]>("/decks");
    if (Array.isArray(backendData) && backendData.length > 0) {
      saveStoredDecks(backendData);
      return backendData;
    }
  } catch {
    // Graceful fallback to local storage
  }
  return getStoredDecks();
}

export async function fetchDeckById(id: string): Promise<Deck | null> {
  try {
    const backendData = await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`);
    if (backendData?.id) return backendData;
  } catch {
    // Fallback
  }
  const decks = getStoredDecks();
  return decks.find((d) => d.id === id) || null;
}

export async function createDeck(payload: CreateDeckPayload): Promise<Deck> {
  const customPin = payload.pinCode?.trim()
    ? payload.pinCode.trim().toUpperCase()
    : `TV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const newDeck: Deck = {
    id: `DECK-${Date.now().toString(36).toUpperCase()}`,
    title: payload.title.trim(),
    subject: payload.subject.trim(),
    gradeLevel: payload.gradeLevel.trim(),
    description: payload.description?.trim() || "",
    cardCount: 0,
    difficulty: payload.difficulty || "SEDANG",
    pinCode: customPin,
    createdAt: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date()),
    cards: [],
  };

  try {
    const fromApi = await apiClient<Deck>("/decks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (fromApi?.id) {
      const decks = getStoredDecks();
      saveStoredDecks([fromApi, ...decks]);
      return fromApi;
    }
  } catch {
    // Store locally
  }

  const current = getStoredDecks();
  const updated = [newDeck, ...current];
  saveStoredDecks(updated);
  return newDeck;
}

export async function updateDeck(id: string, payload: UpdateDeckPayload): Promise<Deck> {
  const current = getStoredDecks();
  const index = current.findIndex((d) => d.id === id);

  if (index === -1) {
    throw new Error(`Deck dengan ID "${id}" tidak ditemukan.`);
  }

  const updatedDeck: Deck = {
    ...current[index],
    ...payload,
    cardCount: payload.cards ? payload.cards.length : current[index].cardCount,
    updatedAt: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date()),
  };

  try {
    await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  } catch {
    // Fallback
  }

  current[index] = updatedDeck;
  saveStoredDecks(current);
  return updatedDeck;
}

export async function saveDeckCards(deckId: string, cards: DeckCard[]): Promise<Deck> {
  return updateDeck(deckId, { cards });
}

export async function deleteDeck(id: string): Promise<boolean> {
  try {
    await apiClient(`/decks/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  } catch {
    // Fallback
  }

  const current = getStoredDecks();
  const filtered = current.filter((d) => d.id !== id);
  saveStoredDecks(filtered);
  return true;
}
