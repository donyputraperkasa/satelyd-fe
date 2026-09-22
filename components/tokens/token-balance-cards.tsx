"use client";

import { Gamepad2, GraduationCap } from "lucide-react";
import { TokenBalanceCardItem } from "./token-balance-card-item";
import { TokenFreeTierCard } from "./token-free-tier-card";

interface TokenBalanceCardsProps {
  gameTokenBalance: number;
  examCreditBalance: number;
  isUnlimited: boolean;
  freeSessionsRemaining: number;
  freeSessionsMax: number;
  onBuyGameTokens: () => void;
  onBuyExamCredits: () => void;
}

export function TokenBalanceCards({
  gameTokenBalance,
  examCreditBalance,
  isUnlimited,
  freeSessionsRemaining,
  freeSessionsMax,
  onBuyGameTokens,
  onBuyExamCredits,
}: TokenBalanceCardsProps) {
  const freeUsagePercent = Math.min(
    100,
    Math.round(((freeSessionsMax - freeSessionsRemaining) / freeSessionsMax) * 100)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. Saldo Token Game */}
      <TokenBalanceCardItem
        title="Token Game"
        icon={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF0F3] border border-[#ECD0D8] text-[#7A283C] shrink-0">
            <Gamepad2 size={18} />
          </div>
        }
        balance={gameTokenBalance}
        label="Token Tersedia"
        isUnlimited={isUnlimited}
        buttonLabel="Top Up Token"
        onTopUp={onBuyGameTokens}
      />

      {/* 2. Saldo Token Ujian */}
      <TokenBalanceCardItem
        title="Token"
        icon={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF8E6] border border-[#F2DEB0] text-[#9A6200] shrink-0">
            <GraduationCap size={18} />
          </div>
        }
        balance={examCreditBalance}
        label="Token"
        isUnlimited={isUnlimited}
        buttonLabel="Top Up Token"
        onTopUp={onBuyExamCredits}
      />

      {/* 3. Sesi Gratis Harian */}
      <TokenFreeTierCard
        freeSessionsRemaining={freeSessionsRemaining}
        freeSessionsMax={freeSessionsMax}
        freeUsagePercent={freeUsagePercent}
      />
    </div>
  );
}
