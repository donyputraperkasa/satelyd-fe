"use client";

import { Coins, CheckCircle2, BookOpen } from "lucide-react";
import {
  TokenBalanceCards,
  TokenPackageCard,
  TokenCustomEceranCard,
  TokenCheckoutModal,
  TokenUserHistory,
  TokenQuickActions,
} from "@/components/tokens";
import { GuideModal } from "@/components/guides";
import { useTokensPage } from "./use-tokens-page";

export default function TokensPage() {
  const {
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    selectedPkg,
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
  } = useTokensPage();

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
        <TokenQuickActions
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={filterType}
          onFilterChange={setFilterType}
          totalCount={totalItemCount}
        />

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
              className="text-xs font-bold text-[#7A5661] underline hover:text-[#451420] cursor-pointer"
            >
              Reset filter dan tampilkan semua paket
            </button>
          </div>
        )}
      </div>

      {/* User Transaction History Section */}
      <div className="space-y-4 pt-6 border-t border-[#E5D7DC]">
        <div>
          <h3 className="font-display text-lg font-black text-[#451420]">
            Riwayat Pembelian Token Anda
          </h3>
          <p className="text-xs text-[#7A5661]">
            Daftar transaksi top-up token yang pernah Anda ajukan.
          </p>
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
