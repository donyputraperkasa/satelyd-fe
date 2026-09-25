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
      const local = getStoredDecks();
      const localMap = new Map(local.map((d) => [d.id, d]));

      const merged = backendData.map((bDeck) => {
        const lDeck = localMap.get(bDeck.id);
        const cards =
          Array.isArray(bDeck.cards) && bDeck.cards.length > 0
            ? bDeck.cards
            : lDeck?.cards && lDeck.cards.length > 0
            ? lDeck.cards
            : bDeck.cards || [];

        return {
          ...bDeck,
          cardCount: cards.length,
          cards,
        };
      });

      saveStoredDecks(merged);
      return merged;
    }
  } catch {
    // Graceful fallback to local storage
  }
  return getStoredDecks();
}

export async function fetchDeckById(id: string): Promise<Deck | null> {
  const localDecks = getStoredDecks();
  const localDeck = localDecks.find((d) => d.id === id) || null;

  try {
    const backendData = await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`);
    if (backendData?.id) {
      const cards =
        Array.isArray(backendData.cards) && backendData.cards.length > 0
          ? backendData.cards
          : localDeck?.cards && localDeck.cards.length > 0
          ? localDeck.cards
          : backendData.cards || [];

      const merged: Deck = {
        ...backendData,
        cardCount: cards.length,
        cards,
      };
      return merged;
    }
  } catch {
    // Fallback
  }
  return localDeck;
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
      const createdDeck: Deck = {
        ...fromApi,
        cards: fromApi.cards || [],
        cardCount: fromApi.cards?.length || 0,
      };
      saveStoredDecks([createdDeck, ...decks]);
      return createdDeck;
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

  // Immediate local save
  current[index] = updatedDeck;
  saveStoredDecks(current);

  try {
    const fromApi = await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (fromApi?.id) {
      const cards =
        Array.isArray(fromApi.cards) && fromApi.cards.length > 0
          ? fromApi.cards
          : updatedDeck.cards;

      const merged: Deck = {
        ...fromApi,
        cards,
        cardCount: cards?.length || 0,
      };
      current[index] = merged;
      saveStoredDecks(current);
      return merged;
    }
  } catch (err) {
    console.warn("Backend update failed, kept local state:", err);
  }

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
