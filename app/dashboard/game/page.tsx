"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  FlipCardArena,
  WheelsArena,
  BattleArena,
  GameSelectDeckModal,
  GameTokenModal,
  GameHeaderBanner,
  GameModeCard,
  GAME_CARDS,
  GameSessionError,
  useGamePage,
} from "@/components/game";
import { GuideModal } from "@/components/guides";

function GamePageContent() {
  const router = useRouter();
  const {
    session,
    isLoading,
    errorMsg,
    setErrorMsg,
    isGuideModalOpen,
    setIsGuideModalOpen,
    selectedGameForGuide,
    setSelectedGameForGuide,
    selectedGameForModal,
    setSelectedGameForModal,
    isTokenModalOpen,
    setIsTokenModalOpen,
    pendingDeck,
    pendingGameType,
    tokenValidation,
    gameTokenBalance,
    handleStartGameFromModal,
    handleConfirmUseToken,
    handleEndSession,
  } = useGamePage();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 size={32} className="animate-spin text-[#451420]" />
        <p className="text-sm font-bold text-[#451420]">
          Mempersiapkan Arena Game Smart TV...
        </p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <GameSessionError
        message={errorMsg}
        onReset={() => {
          setErrorMsg(null);
          router.push("/dashboard/game");
        }}
      />
    );
  }

  if (session) {
    if (session.gameType === "MATH_BATTLE_2P" || (session.gameType as string) === "BATTLE_2P") {
      return (
        <BattleArena session={session} onEndSession={handleEndSession} />
      );
    }
    if (session.gameType === "SPIN_WHEEL" || (session.gameType as string) === "WHEELS") {
      return (
        <WheelsArena session={session} onEndSession={handleEndSession} />
      );
    }
    return (
      <FlipCardArena session={session} onEndSession={handleEndSession} />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      <GameHeaderBanner
        onOpenGuide={() => {
          setSelectedGameForGuide(null);
          setIsGuideModalOpen(true);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {GAME_CARDS.map((game) => (
          <GameModeCard
            key={game.type}
            game={game}
            onOpenGuide={() => {
              setSelectedGameForGuide(game.type);
              setIsGuideModalOpen(true);
            }}
            onStartGame={() => setSelectedGameForModal(game.type)}
          />
        ))}
      </div>

      {selectedGameForModal && (
        <GameSelectDeckModal
          isOpen={!!selectedGameForModal}
          onClose={() => setSelectedGameForModal(null)}
          gameType={selectedGameForModal}
          onStartGame={handleStartGameFromModal}
        />
      )}

      {isTokenModalOpen && (
        <GameTokenModal
          isOpen={isTokenModalOpen}
          onClose={() => setIsTokenModalOpen(false)}
          deck={pendingDeck}
          gameType={pendingGameType}
          reason={tokenValidation?.reason}
          tokenCost={tokenValidation?.tokenCost || 1}
          currentBalance={gameTokenBalance}
          onConfirmUseToken={handleConfirmUseToken}
        />
      )}

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        type="GAMES"
        gameType={selectedGameForGuide}
      />
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
          <Loader2 size={32} className="animate-spin text-[#451420]" />
          <p className="text-sm font-bold text-[#451420]">Memuat Game...</p>
        </div>
      }
    >
      <GamePageContent />
    </Suspense>
  );
}
