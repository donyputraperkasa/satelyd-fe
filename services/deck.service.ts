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
    if (Array.isArray(backendData)) {
      const formatted = backendData.map((d) => ({
        ...d,
        cardCount: d.cardCount ?? (Array.isArray(d.cards) ? d.cards.length : 0),
        cards: d.cards || [],
      }));
      saveStoredDecks(formatted);
      return formatted;
    }
  } catch (err) {
    console.warn("fetchDecks: Backend unreachable, using cached decks:", err);
  }
  return getStoredDecks();
}

export async function fetchDeckById(id: string): Promise<Deck | null> {
  try {
    const backendData = await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`);
    if (backendData?.id) {
      const formatted: Deck = {
        ...backendData,
        cardCount: backendData.cardCount ?? (Array.isArray(backendData.cards) ? backendData.cards.length : 0),
        cards: backendData.cards || [],
      };
      // Update in cache
      const current = getStoredDecks();
      const idx = current.findIndex((d) => d.id === id);
      if (idx !== -1) {
        current[idx] = formatted;
        saveStoredDecks(current);
      }
      return formatted;
    }
  } catch (err) {
    console.warn(`fetchDeckById: Failed to fetch deck ${id} from backend, using cache:`, err);
  }

  const localDecks = getStoredDecks();
  return localDecks.find((d) => d.id === id) || null;
}

export async function createDeck(payload: CreateDeckPayload): Promise<Deck> {
  const fromApi = await apiClient<Deck>("/decks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!fromApi?.id) {
    throw new Error("Gagal membuat deck di server backend.");
  }

  const createdDeck: Deck = {
    ...fromApi,
    cards: fromApi.cards || [],
    cardCount: fromApi.cardCount ?? (Array.isArray(fromApi.cards) ? fromApi.cards.length : 0),
  };

  const current = getStoredDecks();
  saveStoredDecks([createdDeck, ...current.filter((d) => d.id !== createdDeck.id)]);
  return createdDeck;
}

export function sanitizeDeckCardsForApi(deckId: string, cards: DeckCard[]) {
  return cards.map((c, idx) => ({
    deckId,
    orderIndex: idx + 1,
    order: idx + 1,
    frontQuestion: c.frontQuestion ?? "",
    question: c.frontQuestion ?? "",
    backAnswer: c.backAnswer ?? "",
    answer: c.backAnswer ?? "",
    explanation: c.explanation ?? "",
    hint: c.explanation ?? "",
    questionType: c.questionType ?? "MULTIPLE_CHOICE",
    options: Array.isArray(c.options)
      ? c.options.map((opt) => ({
          key: opt.key ?? "",
          text: opt.text ?? "",
        }))
      : [],
    points: typeof c.points === "number" ? c.points : 10,
    timerSeconds: typeof c.timerSeconds === "number" ? c.timerSeconds : 30,
    durationSeconds: typeof c.timerSeconds === "number" ? c.timerSeconds : 30,
    ...(c.imageUrl ? { imageUrl: c.imageUrl } : {}),
    ...(c.answerImageUrl ? { answerImageUrl: c.answerImageUrl } : {}),
  }));
}

export async function updateDeck(id: string, payload: UpdateDeckPayload): Promise<Deck> {
  const sanitizedPayload: any = { ...payload };
  if (Array.isArray(payload.cards)) {
    sanitizedPayload.cards = sanitizeDeckCardsForApi(id, payload.cards);
  }

  const fromApi = await apiClient<Deck>(`/decks/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(sanitizedPayload),
  });

  if (!fromApi?.id) {
    throw new Error(`Gagal memperbarui deck "${id}" di server backend.`);
  }

  const updatedDeck: Deck = {
    ...fromApi,
    cards: fromApi.cards || payload.cards || [],
    cardCount: fromApi.cardCount ?? (payload.cards ? payload.cards.length : fromApi.cards?.length || 0),
  };

  const current = getStoredDecks();
  const idx = current.findIndex((d) => d.id === id);
  if (idx !== -1) {
    current[idx] = updatedDeck;
  } else {
    current.push(updatedDeck);
  }
  saveStoredDecks(current);

  return updatedDeck;
}

export async function saveDeckCards(deckId: string, cards: DeckCard[]): Promise<Deck> {
  return updateDeck(deckId, { cards });
}

export async function deleteDeck(id: string): Promise<boolean> {
  await apiClient(`/decks/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  const current = getStoredDecks();
  const filtered = current.filter((d) => d.id !== id);
  saveStoredDecks(filtered);
  return true;
}
