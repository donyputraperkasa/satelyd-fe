import { apiClient } from "@/lib/api/client";
import type { Deck, DeckCard, CreateDeckPayload, UpdateDeckPayload } from "@/types";

const LOCAL_STORAGE_KEY = "satelyd.decks.v1";

const INITIAL_DECKS: Deck[] = [
  {
    id: "DECK-001",
    title: "Operasi Aljabar & Pemfaktoran",
    subject: "Matematika",
    gradeLevel: "Kelas 8 SMP",
    description: "Kumpulan kartu rumus aljabar, penyederhanaan suku sejenis, dan pemfaktoran bentuk kuadrat.",
    cardCount: 5,
    difficulty: "SEDANG",
    pinCode: "TV-K001",
    createdAt: "12 Sep 2026",
    cards: [
      {
        id: "CRD-101",
        deckId: "DECK-001",
        orderIndex: 1,
        frontQuestion: "Sederhanakan bentuk aljabar berikut: 3(2x - 4) + 5(x + 2) = ...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "11x - 2" },
          { key: "B", text: "11x + 2" },
          { key: "C", text: "9x - 2" },
          { key: "D", text: "6x + 2" },
        ],
        backAnswer: "A. 11x - 2",
        explanation: "3(2x - 4) + 5(x + 2) = 6x - 12 + 5x + 10 = (6x + 5x) + (-12 + 10) = 11x - 2.",
        points: 10,
        timerSeconds: 30,
      },
      {
        id: "CRD-102",
        deckId: "DECK-001",
        orderIndex: 2,
        frontQuestion: "Faktor dari bentuk persamaan kuadrat x² - 9 adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "(x - 3)(x - 3)" },
          { key: "B", text: "(x + 3)(x - 3)" },
          { key: "C", text: "(x + 9)(x - 1)" },
          { key: "D", text: "(x - 9)(x + 1)" },
        ],
        backAnswer: "B. (x + 3)(x - 3)",
        explanation: "Bentuk selisih dua kuadrat: a² - b² = (a + b)(a - b). Maka x² - 3² = (x + 3)(x - 3).",
        points: 10,
        timerSeconds: 25,
      },
      {
        id: "CRD-103",
        deckId: "DECK-001",
        orderIndex: 3,
        frontQuestion: "Jika x = 4 dan y = -2, maka nilai dari 2x² - 3y adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "26" },
          { key: "B", text: "38" },
          { key: "C", text: "32" },
          { key: "D", text: "20" },
        ],
        backAnswer: "B. 38",
        explanation: "Substitusi nilai: 2(4)² - 3(-2) = 2(16) - (-6) = 32 + 6 = 38.",
        points: 15,
        timerSeconds: 30,
      },
      {
        id: "CRD-104",
        deckId: "DECK-001",
        orderIndex: 4,
        frontQuestion: "Hasil perkalian dari (2x + 3)(x - 5) adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "2x² - 7x - 15" },
          { key: "B", text: "2x² + 7x - 15" },
          { key: "C", text: "2x² - 10x - 15" },
          { key: "D", text: "2x² - 13x - 15" },
        ],
        backAnswer: "A. 2x² - 7x - 15",
        explanation: "Perkalian distributif: 2x(x - 5) + 3(x - 5) = 2x² - 10x + 3x - 15 = 2x² - 7x - 15.",
        points: 10,
        timerSeconds: 35,
      },
      {
        id: "CRD-105",
        deckId: "DECK-001",
        orderIndex: 5,
        frontQuestion: "Selesaikan persamaan: 4x - 7 = 2x + 9. Berapakah nilai x?",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "x = 6" },
          { key: "B", text: "x = 7" },
          { key: "C", text: "x = 8" },
          { key: "D", text: "x = 9" },
        ],
        backAnswer: "C. x = 8",
        explanation: "4x - 2x = 9 + 7 => 2x = 16 => x = 8.",
        points: 10,
        timerSeconds: 30,
      },
    ],
  },
  {
    id: "DECK-002",
    title: "Fisika: Gerak Lurus & Hukum Newton",
    subject: "Fisika",
    gradeLevel: "Kelas 10 SMA",
    description: "Kartu latihan GLB, GLBB, dan penerapan Hukum I, II, III Newton dalam kehidupan sehari-hari.",
    cardCount: 4,
    difficulty: "SEDANG",
    pinCode: "TV-K002",
    createdAt: "15 Sep 2026",
    cards: [
      {
        id: "CRD-201",
        deckId: "DECK-002",
        orderIndex: 1,
        frontQuestion: "Sebuah mobil bergerak dengan kecepatan tetap 72 km/jam. Berapa jarak yang ditempuh dalam 10 detik?",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "150 meter" },
          { key: "B", text: "200 meter" },
          { key: "C", text: "250 meter" },
          { key: "D", text: "720 meter" },
        ],
        backAnswer: "B. 200 meter",
        explanation: "Konversi ke m/s: 72 km/jam = (72 * 1000) / 3600 = 20 m/s. Jarak s = v * t = 20 * 10 = 200 m.",
        points: 10,
        timerSeconds: 30,
      },
      {
        id: "CRD-202",
        deckId: "DECK-002",
        orderIndex: 2,
        frontQuestion: "Suatu benda bermassa 5 kg ditarik dengan gaya 20 N pada lantai licin. Berapakah percepatan benda?",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "2 m/s²" },
          { key: "B", text: "4 m/s²" },
          { key: "C", text: "10 m/s²" },
          { key: "D", text: "100 m/s²" },
        ],
        backAnswer: "B. 4 m/s²",
        explanation: "Hukum II Newton: F = m * a => a = F / m = 20 N / 5 kg = 4 m/s².",
        points: 10,
        timerSeconds: 20,
      },
      {
        id: "CRD-203",
        deckId: "DECK-002",
        orderIndex: 3,
        frontQuestion: "Peristiwa penumpang terdorong ke depan saat bus direm mendadak merupakan contoh penerapan...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Hukum I Newton (Kelembaman)" },
          { key: "B", text: "Hukum II Newton (F = ma)" },
          { key: "C", text: "Hukum III Newton (Aksi-Reaksi)" },
          { key: "D", text: "Hukum Gravitasi Universal" },
        ],
        backAnswer: "A. Hukum I Newton (Kelembaman)",
        explanation: "Hukum I Newton menyatakan bahwa setiap benda mempertahankan keadaan diam atau gerak lurus beraturannya (inersia/kelembaman).",
        points: 10,
        timerSeconds: 25,
      },
      {
        id: "CRD-204",
        deckId: "DECK-002",
        orderIndex: 4,
        frontQuestion: "Ketika mendayung perahu ke belakang, perahu justru bergerak maju ke depan. Hal ini sesuai dengan...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Hukum I Newton" },
          { key: "B", text: "Hukum II Newton" },
          { key: "C", text: "Hukum III Newton (Aksi-Reaksi)" },
          { key: "D", text: "Hukum Pascal" },
        ],
        backAnswer: "C. Hukum III Newton (Aksi-Reaksi)",
        explanation: "Gaya aksi dorongan dayung ke air ke belakang menghasilkan gaya reaksi air mendorong perahu maju ke depan (F_aksi = -F_reaksi).",
        points: 10,
        timerSeconds: 25,
      },
    ],
  },
  {
    id: "DECK-003",
    title: "Biologi: Sistem Peredaran Darah Manusia",
    subject: "Biologi",
    gradeLevel: "Kelas 8 SMP",
    description: "Struktur jantung, jenis pembuluh darah, komponen sel darah, dan mekanisme transfusi.",
    cardCount: 4,
    difficulty: "MUDAH",
    pinCode: "TV-K003",
    createdAt: "16 Sep 2026",
    cards: [
      {
        id: "CRD-301",
        deckId: "DECK-003",
        orderIndex: 1,
        frontQuestion: "Komponen darah yang berfungsi utama dalam proses pembekuan darah saat terjadi luka adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Eritrosit (Sel Darah Merah)" },
          { key: "B", text: "Leukosit (Sel Darah Putih)" },
          { key: "C", text: "Trombosit (Keping Darah)" },
          { key: "D", text: "Plasma Darah" },
        ],
        backAnswer: "C. Trombosit (Keping Darah)",
        explanation: "Trombosit melepaskan trombokinase untuk mengubah protrombin menjadi trombin dengan bantuan ion Ca²⁺ dan Vitamin K.",
        points: 10,
        timerSeconds: 25,
      },
      {
        id: "CRD-302",
        deckId: "DECK-003",
        orderIndex: 2,
        frontQuestion: "Ruang jantung yang bertugas memompa darah kaya oksigen (O₂) ke seluruh tubuh adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Serambi Kanan" },
          { key: "B", text: "Bilik Kanan" },
          { key: "C", text: "Serambi Kiri" },
          { key: "D", text: "Bilik Kiri (Ventrikel Kiri)" },
        ],
        backAnswer: "D. Bilik Kiri (Ventrikel Kiri)",
        explanation: "Bilik kiri memiliki dinding otot paling tebal karena memompa darah bertekanan tinggi ke seluruh tubuh melalui aorta.",
        points: 10,
        timerSeconds: 30,
      },
      {
        id: "CRD-303",
        deckId: "DECK-003",
        orderIndex: 3,
        frontQuestion: "Golongan darah yang dikenal sebagai 'Resipien Universal' adalah...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Golongan Darah O" },
          { key: "B", text: "Golongan Darah AB" },
          { key: "C", text: "Golongan Darah A" },
          { key: "D", text: "Golongan Darah B" },
        ],
        backAnswer: "B. Golongan Darah AB",
        explanation: "Golongan darah AB memiliki antigen A dan B pada eritrosit tetapi tidak memiliki antibodi (aglutinin) anti-A maupun anti-B di plasmanya.",
        points: 10,
        timerSeconds: 20,
      },
      {
        id: "CRD-304",
        deckId: "DECK-003",
        orderIndex: 4,
        frontQuestion: "Pembuluh darah yang membawa darah kaya karbon dioksida dari seluruh tubuh kembali ke jantung disebut...",
        questionType: "MULTIPLE_CHOICE",
        options: [
          { key: "A", text: "Arteri Aorta" },
          { key: "B", text: "Vena Cava" },
          { key: "C", text: "Vena Pulmonalis" },
          { key: "D", text: "Arteri Pulmonalis" },
        ],
        backAnswer: "B. Vena Cava",
        explanation: "Vena cava superior dan inferior membawa darah deoksigenasi dari tubuh menuju serambi kanan jantung.",
        points: 10,
        timerSeconds: 25,
      },
    ],
  },
];

function getStoredDecks(): Deck[] {
  if (typeof window === "undefined") return INITIAL_DECKS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DECKS));
      return INITIAL_DECKS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DECKS;
  }
}

function saveStoredDecks(decks: Deck[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(decks));
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
