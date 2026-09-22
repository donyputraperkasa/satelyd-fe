"use client";

import { useState, useEffect } from "react";
import { Coins, Sparkles, Filter, CheckCircle2, BookOpen } from "lucide-react";
import {
  TokenBalanceCards,
  TokenPackageCard,
  TokenCustomEceranCard,
  TokenCheckoutModal,
  TokenUserHistory,
  TokenQuickActions,
} from "@/components/tokens";
import { GuideModal } from "@/components/guides";
import {
  getUserTokenBalances,
  getDailyGameSessionUsage,
  getUserTokenOrders,
  TOKEN_PACKAGES,
  type TokenPackage,
} from "@/services/token.service";
import type { TransactionOrder } from "@/types";

export default function TokensPage() {
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

  const refreshData = () => {
    setBalances(getUserTokenBalances());
    setDailyUsage(getDailyGameSessionUsage());
    setUserOrders(getUserTokenOrders());
  };

  useEffect(() => {
    refreshData();
    const handleStorageChange = () => refreshData();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5D7DC] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FAF0F3] border border-[#ECD0D8] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#7A283C]">
              Billing &amp; Kuota
            </span>
            <span className="text-xs font-semibold text-[#7A5661]">
              Satelyd SaaS Platform
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#451420] mt-1 flex items-center gap-2.5">
            <Coins size={28} className="text-[#7A283C]" />
            <span>Saldo Token &amp; Toko Kuota</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5661] mt-1">
            Kelola saldo token game kelas, kredit publish ujian, dan riwayat isi ulang akun Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => setIsGuideModalOpen(true)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#DFD0D5] bg-white text-xs font-bold text-[#451420] shadow-2xs hover:bg-[#FAF7F2] hover:border-[#451420] transition cursor-pointer"
            title="Buka panduan lengkap sistem token dan kuota"
          >
            <BookOpen size={15} className="text-[#C67D00]" />
            <span>Panduan Token</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="flex items-center gap-2.5 rounded-xl bg-[#EDF7ED] border border-[#C8E6C9] p-3.5 text-xs font-bold text-[#1E4620] shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} className="text-[#2E7D32]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Balances & Daily Quota Summary Cards */}
      <TokenBalanceCards
        gameTokenBalance={balances.gameTokenBalance}
        examCreditBalance={balances.examCreditBalance}
        isUnlimited={balances.isUnlimited}
        freeSessionsRemaining={dailyUsage.remaining}
        freeSessionsMax={dailyUsage.maxLimit}
        onBuyGameTokens={() => {
          setFilterType("GAME");
          document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onBuyExamCredits={() => {
          setFilterType("EXAM");
          document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Token Packages Catalog Section */}
      <div id="catalog-section" className="space-y-5">
        {/* Search & Filter Bar (Persis Bank Soal & Ujian Siswa) */}
        <TokenQuickActions
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={filterType}
          onFilterChange={setFilterType}
          totalCount={totalItemCount}
        />

        {/* Packages Grid or Empty State */}
        {totalItemCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {showEceranCard && (
              <TokenCustomEceranCard onSelect={handleSelectPackage} />
            )}
            {filteredPackages.map((pkg) => (
              <TokenPackageCard
                key={pkg.id}
                pkg={pkg}
                onSelect={handleSelectPackage}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DFD0D5] bg-[#FAF7F2] p-8 text-center space-y-2">
            <p className="text-xs sm:text-sm font-bold text-[#451420]">
              Tidak ada paket token yang sesuai dengan pencarian &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterType("ALL");
              }}
              className="text-xs font-bold text-[#7A283C] underline hover:text-[#451420] cursor-pointer"
            >
              Reset filter dan tampilkan semua paket
            </button>
          </div>
        )}
      </div>

      {/* User Transaction History Section */}
      <div className="space-y-4 pt-6 border-t border-[#E5D7DC]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-black text-[#451420]">
              Riwayat Pembelian Token Anda
            </h3>
            <p className="text-xs text-[#7A5661]">
              Daftar transaksi top-up token yang pernah Anda ajukan.
            </p>
          </div>
        </div>

        <TokenUserHistory orders={userOrders} />
      </div>

      {/* Checkout Modal */}
      <TokenCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        pkg={selectedPkg}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Modal Panduan Token & Kuota */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        type="TOKENS"
      />
    </div>
  );
}
