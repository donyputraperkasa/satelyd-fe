"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getUserTokenBalances,
  fetchUserTokenBalancesFromApi,
  getDailyGameSessionUsage,
  getUserTokenOrders,
  fetchUserTokenOrdersFromApi,
  TOKEN_PACKAGES,
  type TokenPackage,
} from "@/services/token.service";
import type { TransactionOrder } from "@/types";

export function useTokensPage() {
  const [filterType, setFilterType] = useState<"ALL" | "GAME" | "EXAM">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<TokenPackage | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Balances state
  const [balances, setBalances] = useState(() => getUserTokenBalances());
  const [dailyUsage, setDailyUsage] = useState(() => getDailyGameSessionUsage());
  const [userOrders, setUserOrders] = useState<TransactionOrder[]>(() => getUserTokenOrders());

  const refreshData = useCallback(async () => {
    setBalances(getUserTokenBalances());
    setDailyUsage(getDailyGameSessionUsage());
    setUserOrders(getUserTokenOrders());

    try {
      const [freshBalances, freshOrders] = await Promise.all([
        fetchUserTokenBalancesFromApi(),
        fetchUserTokenOrdersFromApi(),
      ]);
      setBalances(freshBalances);
      setUserOrders(freshOrders);
    } catch {
      // Fallback already rendered
    }
  }, []);

  useEffect(() => {
    refreshData();
    const handleStorageChange = () => refreshData();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refreshData]);

  const filteredPackages = TOKEN_PACKAGES.filter((p) => {
    if (filterType !== "ALL" && p.itemType !== filterType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchAmount = `${p.tokenAmount}`.includes(q);
      const matchPrice = `${p.price}`.includes(q);
      return matchName || matchDesc || matchAmount || matchPrice;
    }
    return true;
  });

  const isSearchMatchingEceran =
    !searchQuery.trim() ||
    "eceran satuan game kustom 2500".includes(searchQuery.toLowerCase().trim());
  const showEceranCard =
    (filterType === "ALL" || filterType === "GAME") && isSearchMatchingEceran;
  const totalItemCount = filteredPackages.length + (showEceranCard ? 1 : 0);

  const handleSelectPackage = (pkg: TokenPackage) => {
    setSelectedPkg(pkg);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    refreshData();
    setToastMessage("Pesanan token berhasil dikirim! Silakan tunggu konfirmasi admit dari admin.");
    setTimeout(() => setToastMessage(null), 5000);
  };

  return {
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedPkg,
    setSelectedPkg,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isGuideModalOpen,
    setIsGuideModalOpen,
    toastMessage,
    balances,
    dailyUsage,
    userOrders,
    filteredPackages,
    showEceranCard,
    totalItemCount,
    handleSelectPackage,
    handleOrderSuccess,
  };
}
