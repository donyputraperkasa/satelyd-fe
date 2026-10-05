import { GameSelectDeckModal } from "../select-deck";
import { GameTokenModal } from "./game-token-modal";
import { GuideModal } from "@/components/guides";
import type { Deck, GameType } from "@/types";

interface GameModalsContainerProps {
  selectedGameForModal: GameType | null;
  onCloseSelectDeck: () => void;
  onStartGameFromModal: (deck: Deck, gameType: GameType) => void | Promise<void>;
  isTokenModalOpen: boolean;
  onCloseTokenModal: () => void;
  pendingDeck: Deck | null;
  pendingGameType: GameType | null;
  tokenValidation: {
    allowed?: boolean;
    requiresToken?: boolean;
    reason?: "DAILY_LIMIT_EXCEEDED" | "NEEDS_TOKEN_FOR_DECK";
    tokenCost?: number;
  } | null;
  gameTokenBalance: number;
  onConfirmUseToken: () => void;
  isGuideModalOpen: boolean;
  onCloseGuideModal: () => void;
  selectedGameForGuide: GameType | null;
}

export function GameModalsContainer({
  selectedGameForModal,
  onCloseSelectDeck,
  onStartGameFromModal,
  isTokenModalOpen,
  onCloseTokenModal,
  pendingDeck,
  pendingGameType,
  tokenValidation,
  gameTokenBalance,
  onConfirmUseToken,
  isGuideModalOpen,
  onCloseGuideModal,
  selectedGameForGuide,
}: GameModalsContainerProps) {
  return (
    <>
      {selectedGameForModal && (
        <GameSelectDeckModal
          isOpen={Boolean(selectedGameForModal)}
          onClose={onCloseSelectDeck}
          gameType={selectedGameForModal}
          onStartGame={onStartGameFromModal}
        />
      )}

      {isTokenModalOpen && (
        <GameTokenModal
          isOpen={isTokenModalOpen}
          onClose={onCloseTokenModal}
          deck={pendingDeck}
          gameType={pendingGameType}
          reason={tokenValidation?.reason}
          tokenCost={tokenValidation?.tokenCost || 1}
          currentBalance={gameTokenBalance}
          onConfirmUseToken={onConfirmUseToken}
        />
      )}

      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={onCloseGuideModal}
        type="GAMES"
        gameType={selectedGameForGuide}
      />
    </>
  );
}
