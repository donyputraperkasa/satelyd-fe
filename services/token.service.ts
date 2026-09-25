import { getStoredUser, USER_KEY } from "@/lib/auth/storage";
import { apiClient } from "@/lib/api/client";
import type { User, TransactionOrder, TokenPackage } from "@/types";

export type { TokenPackage };

export const DAILY_FREE_GAME_LIMIT =
  Number(process.env.NEXT_PUBLIC_DAILY_FREE_GAME_LIMIT) || 1;
export const MAX_FREE_DECK_QUESTIONS =
  Number(process.env.NEXT_PUBLIC_MAX_FREE_DECK_QUESTIONS) || 8;
export const GAME_TOKEN_PRICE =
  Number(process.env.NEXT_PUBLIC_GAME_TOKEN_PRICE) || 2500;
export const EXAM_TOKEN_PRICE =
  Number(process.env.NEXT_PUBLIC_EXAM_TOKEN_PRICE) || 14900;

export const TOKEN_PACKAGES: TokenPackage[] = [
  // Paket Game Tokens
  {
    id: "PKG-GAME-5",
    name: "5 Sesi Game (Reguler)",
    itemType: "GAME",
    tokenAmount: 5,
    price: 12000,
    normalPrice: 12500,
    discountBadge: "Hemat Rp 500",
    description: "Pilihan pas untuk mengajar 5 sesi game di berbagai kelas.",
  },
  {
    id: "PKG-GAME-12",
    name: "12 Sesi Game (Paket Hemat)",
    itemType: "GAME",
    tokenAmount: 12,
    price: 25000,
    normalPrice: 30000,
    discountBadge: "Hemat Rp 5.000",
    description: "Paket super hemat terbaik! Cukup untuk 12 sesi game interaktif di kelas.",
    isPopular: true,
  },

  // Paket Exam Credits
  {
    id: "PKG-EXAM-1",
    name: "1 Kali Ujian (Satuan)",
    itemType: "EXAM",
    tokenAmount: 1,
    price: 14900,
    description: "Publikasikan 1 ujian online anti-curang dengan token ujian aktif.",
  },
  {
    id: "PKG-EXAM-3",
    name: "3 Kali Ujian (Semester)",
    itemType: "EXAM",
    tokenAmount: 3,
    price: 42000,
    normalPrice: 44700,
    discountBadge: "Hemat Rp 2.700",
    description: "Ideal untuk Penilaian Harian, UTS, dan UAS dalam satu semester.",
    isPopular: true,
  },
  {
    id: "PKG-EXAM-5",
    name: "5 Kali Ujian (Tahunan)",
    itemType: "EXAM",
    tokenAmount: 5,
    price: 69000,
    normalPrice: 74500,
    discountBadge: "Hemat Rp 5.500",
    description: "Paket lengkap untuk asesmen seluruh kelas sepanjang tahun.",
  },
];

const PROCESSED_ORDERS_KEY = "satelyd.credited_order_ids";
const TRANSACTIONS_KEY = "satelyd.token_transactions";

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDailyUsageStorageKey(): string {
  const user = getStoredUser();
  const uid = user?.id || "anonymous";
  return `satelyd.daily_game_sessions.${uid}`;
}

/**
 * Update user in localStorage and broadcast storage event
 */
function updateStoredUser(updater: (user: User) => User): User | null {
  const user = getStoredUser();
  if (!user) return null;
  const updated = updater(user);
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    localStorage.setItem("satelyd_user", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }
  return updated;
}

/**
 * Get current balances for the active user (synchronous from cache)
 */
export function getUserTokenBalances(): {
  gameTokenBalance: number;
  examCreditBalance: number;
  isUnlimited: boolean;
} {
  syncApprovedOrdersToUser();
  const user = getStoredUser();
  return {
    gameTokenBalance: user?.gameTokenBalance ?? 0,
    examCreditBalance: user?.examCreditBalance ?? 0,
    isUnlimited: Boolean(user?.isUnlimited || user?.role === "ADMIN"),
  };
}

/**
 * Fetch latest user token balance from backend API and update stored cache
 */
export async function fetchUserTokenBalancesFromApi(): Promise<{
  gameTokenBalance: number;
  examCreditBalance: number;
  isUnlimited: boolean;
}> {
  try {
    const user = await apiClient<User>("/users/me");
    if (user) {
      updateStoredUser((curr) => ({
        ...curr,
        gameTokenBalance: user.gameTokenBalance ?? 0,
        examCreditBalance: user.examCreditBalance ?? 0,
        role: user.role ?? curr.role,
        isUnlimited: user.isUnlimited ?? (user.role === "ADMIN"),
      }));
      return {
        gameTokenBalance: user.gameTokenBalance ?? 0,
        examCreditBalance: user.examCreditBalance ?? 0,
        isUnlimited: Boolean(user.isUnlimited || user.role === "ADMIN"),
      };
    }
  } catch (err) {
    console.warn("fetchUserTokenBalancesFromApi failed, fallback to local:", err);
  }
  return getUserTokenBalances();
}

/**
 * Get daily game session usage for the active user
 */
export function getDailyGameSessionUsage(): {
  usedToday: number;
  maxLimit: number;
  remaining: number;
} {
  if (typeof window === "undefined") {
    return { usedToday: 0, maxLimit: DAILY_FREE_GAME_LIMIT, remaining: DAILY_FREE_GAME_LIMIT };
  }

  const key = getDailyUsageStorageKey();
  const today = getTodayString();

  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return { usedToday: 0, maxLimit: DAILY_FREE_GAME_LIMIT, remaining: DAILY_FREE_GAME_LIMIT };
    }
    const parsed = JSON.parse(raw);
    if (parsed.date !== today) {
      localStorage.setItem(key, JSON.stringify({ date: today, count: 0 }));
      return { usedToday: 0, maxLimit: DAILY_FREE_GAME_LIMIT, remaining: DAILY_FREE_GAME_LIMIT };
    }
    const used = Number(parsed.count) || 0;
    return {
      usedToday: used,
      maxLimit: DAILY_FREE_GAME_LIMIT,
      remaining: Math.max(0, DAILY_FREE_GAME_LIMIT - used),
    };
  } catch {
    return { usedToday: 0, maxLimit: DAILY_FREE_GAME_LIMIT, remaining: DAILY_FREE_GAME_LIMIT };
  }
}

/**
 * Increment daily session usage
 */
export function recordGameSessionUsage(): void {
  if (typeof window === "undefined") return;
  const key = getDailyUsageStorageKey();
  const today = getTodayString();
  const { usedToday } = getDailyGameSessionUsage();
  localStorage.setItem(key, JSON.stringify({ date: today, count: usedToday + 1 }));
  window.dispatchEvent(new Event("storage"));
}

/**
 * Check if user can start a game session based on deck size and daily limits
 */
export function validateGameSessionStart(deckCardCount: number): {
  allowed: boolean;
  requiresToken: boolean;
  reason?: "DAILY_LIMIT_EXCEEDED" | "NEEDS_TOKEN_FOR_DECK";
  tokenCost: number;
} {
  const { gameTokenBalance, isUnlimited } = getUserTokenBalances();
  if (isUnlimited) {
    return { allowed: true, requiresToken: false, tokenCost: 0 };
  }

  const isLargeDeck = deckCardCount > MAX_FREE_DECK_QUESTIONS;

  if (isLargeDeck) {
    if (gameTokenBalance >= 1) {
      return { allowed: true, requiresToken: true, tokenCost: 1 };
    }
    return {
      allowed: false,
      requiresToken: true,
      reason: "NEEDS_TOKEN_FOR_DECK",
      tokenCost: 1,
    };
  }

  const { remaining } = getDailyGameSessionUsage();
  if (remaining > 0) {
    return { allowed: true, requiresToken: false, tokenCost: 0 };
  }

  if (gameTokenBalance >= 1) {
    return { allowed: true, requiresToken: true, tokenCost: 1 };
  }

  return {
    allowed: false,
    requiresToken: true,
    reason: "DAILY_LIMIT_EXCEEDED",
    tokenCost: 1,
  };
}

/**
 * Deduct 1 Game Token from user's balance
 */
export function deductGameToken(): boolean {
  const { isUnlimited, gameTokenBalance } = getUserTokenBalances();
  if (isUnlimited) return true;
  if (gameTokenBalance < 1) return false;

  updateStoredUser((user) => ({
    ...user,
    gameTokenBalance: Math.max(0, (user.gameTokenBalance ?? 0) - 1),
  }));
  return true;
}

/**
 * Validate and deduct 1 Exam Credit when publishing an exam
 */
export function validateExamPublish(): {
  allowed: boolean;
  requiresToken: boolean;
  tokenCost: number;
} {
  const { examCreditBalance, isUnlimited } = getUserTokenBalances();
  if (isUnlimited) {
    return { allowed: true, requiresToken: false, tokenCost: 0 };
  }

  if (examCreditBalance >= 1) {
    return { allowed: true, requiresToken: true, tokenCost: 1 };
  }

  return { allowed: false, requiresToken: true, tokenCost: 1 };
}

/**
 * Deduct 1 Exam Credit from user's balance
 */
export function deductExamCredit(): boolean {
  const { isUnlimited, examCreditBalance } = getUserTokenBalances();
  if (isUnlimited) return true;
  if (examCreditBalance < 1) return false;

  updateStoredUser((user) => ({
    ...user,
    examCreditBalance: Math.max(0, (user.examCreditBalance ?? 0) - 1),
  }));
  return true;
}

/**
 * Sync approved transactions with user balance
 */
export function syncApprovedOrdersToUser(): void {
  if (typeof window === "undefined") return;
  const user = getStoredUser();
  if (!user) return;

  try {
    const rawOrders = localStorage.getItem(TRANSACTIONS_KEY);
    if (!rawOrders) return;
    const orders: TransactionOrder[] = JSON.parse(rawOrders);

    const rawProcessed = localStorage.getItem(PROCESSED_ORDERS_KEY);
    const processedIds: string[] = rawProcessed ? JSON.parse(rawProcessed) : [];

    let additionalGame = 0;
    let additionalExam = 0;
    const newProcessedIds = [...processedIds];

    for (const order of orders) {
      const isThisUser = order.userEmail === user.email || order.userName === user.name;
      const isApproved = order.status === "APPROVED" || order.status === "PAID";
      if (isThisUser && isApproved && !processedIds.includes(order.id)) {
        if (order.itemType === "GAME") {
          additionalGame += order.tokenAmount;
        } else if (order.itemType === "EXAM") {
          additionalExam += order.tokenAmount;
        } else if (order.itemType === "COMBO") {
          additionalGame += order.tokenAmount;
          additionalExam += order.tokenAmount;
        }
        newProcessedIds.push(order.id);
      }
    }

    if (additionalGame > 0 || additionalExam > 0) {
      updateStoredUser((curr) => ({
        ...curr,
        gameTokenBalance: (curr.gameTokenBalance ?? 0) + additionalGame,
        examCreditBalance: (curr.examCreditBalance ?? 0) + additionalExam,
      }));
      localStorage.setItem(PROCESSED_ORDERS_KEY, JSON.stringify(newProcessedIds));
    }
  } catch (err) {
    console.warn("Failed to sync approved orders:", err);
  }
}

/**
 * Submit a token purchase order (Stores in DB and syncs cache)
 */
export async function submitTokenOrder(payload: {
  pkg: TokenPackage;
  senderAccount: string;
  referenceNumber?: string;
  paymentMethod: string;
  proofImageUrl?: string;
}): Promise<TransactionOrder> {
  const user = getStoredUser();
  const prodType = payload.pkg.itemType === "GAME" ? "GAME_TOKEN" : "EXAM_CREDIT";
  let createdOrderId = `TRX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

  try {
    const res = await apiClient<{ order: { id: string } }>("/tokens/buy", {
      method: "POST",
      body: JSON.stringify({
        productType: prodType,
        quantity: payload.pkg.tokenAmount,
        price: payload.pkg.price,
        paymentMethod: payload.paymentMethod || "Transfer Bank / QRIS",
        proofImageUrl: payload.proofImageUrl || "",
        packageName: payload.pkg.name,
        senderAccount: payload.senderAccount.trim(),
        referenceNumber: payload.referenceNumber?.trim() || `REF-${Date.now().toString(36).toUpperCase()}`,
      }),
    });
    if (res?.order?.id) {
      createdOrderId = res.order.id;
    }
  } catch (err) {
    console.warn("Backend buy order failed, saved locally:", err);
  }

  const newOrder: TransactionOrder = {
    id: createdOrderId,
    userName: user?.name || "Guru Satelyd",
    userEmail: user?.email || "guru@satelyd.id",
    schoolName: "Sekolah Pengajar",
    packageName: payload.pkg.name,
    itemType: payload.pkg.itemType,
    productType: prodType,
    tokenAmount: payload.pkg.tokenAmount,
    price: payload.pkg.price,
    paymentMethod: payload.paymentMethod || "Transfer Bank / QRIS",
    senderAccount: payload.senderAccount.trim(),
    referenceNumber: payload.referenceNumber?.trim() || `REF-${Date.now().toString(36).toUpperCase()}`,
    proofImageUrl: payload.proofImageUrl || "",
    createdAt: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
    status: "PENDING",
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(TRANSACTIONS_KEY);
      const existing: TransactionOrder[] = raw ? JSON.parse(raw) : [];
      const updated = [newOrder, ...existing.filter((o) => o.id !== createdOrderId)];
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.warn("Failed to store transaction order:", err);
    }
  }

  return newOrder;
}

/**
 * Get token orders for current user (cached)
 */
export function getUserTokenOrders(): TransactionOrder[] {
  if (typeof window === "undefined") return [];
  const user = getStoredUser();
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY);
    if (!raw) return [];
    const all: TransactionOrder[] = JSON.parse(raw);
    if (!user) return all;
    return all.filter((o) => o.userEmail === user.email || o.userName === user.name);
  } catch {
    return [];
  }
}

/**
 * Fetch token orders for current user from API
 */
export async function fetchUserTokenOrdersFromApi(): Promise<TransactionOrder[]> {
  try {
    const apiOrders = await apiClient<Array<{
      id: string;
      userId: string;
      productType: string;
      quantity: number;
      price: number;
      status: string;
      paymentMethod: string;
      proofImageUrl?: string;
      adminNote?: string;
      paidAt?: string;
      createdAt: string;
      user?: { name: string; email: string };
    }>>("/tokens/orders");

    if (Array.isArray(apiOrders)) {
      const mapped: TransactionOrder[] = apiOrders.map((o) => ({
        id: o.id,
        userId: o.userId,
        userName: o.user?.name || getStoredUser()?.name || "Guru",
        userEmail: o.user?.email || getStoredUser()?.email || "",
        schoolName: "Sekolah Pengajar",
        packageName:
          o.adminNote?.replace(/^Paket:\s*/, "") ||
          (o.productType === "GAME_TOKEN"
            ? `${o.quantity} Token Game`
            : `${o.quantity} Kredit Ujian`),
        itemType: o.productType === "GAME_TOKEN" ? "GAME" : "EXAM",
        productType: o.productType as any,
        tokenAmount: o.quantity,
        quantity: o.quantity,
        price: o.price,
        paymentMethod: o.paymentMethod || "Transfer Bank / QRIS",
        senderAccount: "-",
        referenceNumber: o.id,
        proofImageUrl: o.proofImageUrl || "",
        adminNote: o.adminNote,
        paidAt: o.paidAt,
        createdAt: new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(o.createdAt)),
        status: (o.status === "PAID" ? "PAID" : o.status) as any,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(mapped));
        window.dispatchEvent(new Event("storage"));
      }
      return mapped;
    }
  } catch (err) {
    console.warn("fetchUserTokenOrdersFromApi failed, fallback to local:", err);
  }
  return getUserTokenOrders();
}

/**
 * Admin: Fetch all purchase orders across all users
 */
export async function fetchAdminOrdersFromApi(): Promise<TransactionOrder[]> {
  try {
    const apiOrders = await apiClient<Array<{
      id: string;
      userId: string;
      productType: string;
      quantity: number;
      price: number;
      status: string;
      paymentMethod: string;
      proofImageUrl?: string;
      adminNote?: string;
      paidAt?: string;
      createdAt: string;
      user?: { name: string; email: string };
    }>>("/tokens/admin/orders");

    if (Array.isArray(apiOrders)) {
      return apiOrders.map((o) => ({
        id: o.id,
        userId: o.userId,
        userName: o.user?.name || "Pengguna",
        userEmail: o.user?.email || "-",
        schoolName: "Sekolah Pengajar",
        packageName:
          o.adminNote?.replace(/^Paket:\s*/, "") ||
          (o.productType === "GAME_TOKEN"
            ? `${o.quantity} Token Game`
            : `${o.quantity} Kredit Ujian`),
        itemType: o.productType === "GAME_TOKEN" ? "GAME" : "EXAM",
        productType: o.productType as any,
        tokenAmount: o.quantity,
        quantity: o.quantity,
        price: o.price,
        paymentMethod: o.paymentMethod || "Transfer Bank / QRIS",
        senderAccount: "-",
        referenceNumber: o.id,
        proofImageUrl: o.proofImageUrl || "",
        adminNote: o.adminNote,
        paidAt: o.paidAt,
        createdAt: new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(o.createdAt)),
        status: (o.status === "PAID" ? "PAID" : o.status) as any,
      }));
    }
  } catch (err) {
    console.warn("fetchAdminOrdersFromApi failed:", err);
  }

  // Fallback to local
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(TRANSACTIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Admin: Approve a payment order
 */
export async function approveOrderApi(orderId: string): Promise<void> {
  await apiClient(`/tokens/orders/${encodeURIComponent(orderId)}/approve`, {
    method: "PATCH",
  });
}

/**
 * Admin: Reject a payment order
 */
export async function rejectOrderApi(orderId: string, adminNote?: string): Promise<void> {
  await apiClient(`/tokens/orders/${encodeURIComponent(orderId)}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ adminNote }),
  });
}
