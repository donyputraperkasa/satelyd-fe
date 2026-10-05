import { BattleArena } from "../battle";
import { WheelsArena } from "../wheels";
import { FlipCardArena } from "../flip-card";
import type { GameSession } from "@/types";

interface ActiveGameArenaProps {
  session: GameSession;
  onEndSession: () => void;
}

export function ActiveGameArena({
  session,
  onEndSession,
}: ActiveGameArenaProps) {
  const isBattle =
    session.gameType === "MATH_BATTLE_2P" ||
    (session.gameType as string) === "BATTLE_2P";

  if (isBattle) {
    return <BattleArena session={session} onEndSession={onEndSession} />;
  }

  const isWheel =
    session.gameType === "SPIN_WHEEL" ||
    (session.gameType as string) === "WHEELS";

  if (isWheel) {
    return <WheelsArena session={session} onEndSession={onEndSession} />;
  }

  return <FlipCardArena session={session} onEndSession={onEndSession} />;
}
