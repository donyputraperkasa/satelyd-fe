"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  ActiveGameArena,
  GameHeaderBanner,
  GameModeCard,
  GameModalsContainer,
  GAME_CARDS,
  GameSessionError,
  useGamePage,
} from "@/components/game";

function GameLoader({ text }: { text: string }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
      <Loader2 size={32} className="animate-spin text-[#451420]" />
      <p className="text-sm font-bold text-[#451420]">{text}</p>
    </div>
  );
}

function GamePageContent() {
  const router = useRouter();
  const game = useGamePage();

  if (game.isLoading) {
    return <GameLoader text="Mempersiapkan Arena Game Smart TV..." />;
  }

  if (game.errorMsg) {
    return (
      <GameSessionError
        message={game.errorMsg}
        onReset={() => {
          game.setErrorMsg(null);
          router.push("/dashboard/game");
        }}
      />
    );
  }

  if (game.session) {
    return (
      <ActiveGameArena
        session={game.session}
        onEndSession={game.handleEndSession}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      <GameHeaderBanner
        onOpenGuide={() => {
          game.setSelectedGameForGuide(null);
          game.setIsGuideModalOpen(true);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {GAME_CARDS.map((item) => (
          <GameModeCard
            key={item.type}
            game={item}
            onOpenGuide={() => {
              game.setSelectedGameForGuide(item.type);
              game.setIsGuideModalOpen(true);
            }}
            onStartGame={() => game.setSelectedGameForModal(item.type)}
          />
        ))}
      </div>

      <GameModalsContainer
        selectedGameForModal={game.selectedGameForModal}
        onCloseSelectDeck={() => game.setSelectedGameForModal(null)}
        onStartGameFromModal={game.handleStartGameFromModal}
        isTokenModalOpen={game.isTokenModalOpen}
        onCloseTokenModal={() => game.setIsTokenModalOpen(false)}
        pendingDeck={game.pendingDeck}
        pendingGameType={game.pendingGameType}
        tokenValidation={game.tokenValidation}
        gameTokenBalance={game.gameTokenBalance}
        onConfirmUseToken={game.handleConfirmUseToken}
        isGuideModalOpen={game.isGuideModalOpen}
        onCloseGuideModal={() => game.setIsGuideModalOpen(false)}
        selectedGameForGuide={game.selectedGameForGuide}
      />
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<GameLoader text="Memuat Game..." />}>
      <GamePageContent />
    </Suspense>
  );
}
