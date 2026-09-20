"use client";

import { useState } from "react";
import type { GameTeam } from "@/types";
import { gameAudio } from "../game-audio";
import { FlipCardTeamCard } from "./flip-card-team-card";
import { FlipCardScoreboardHeader } from "./flip-card-scoreboard-header";
export { COLOR_OPTIONS, TEAM_COLOR_STYLES } from "./flip-card-scoreboard-constants";

interface FlipCardScoreboardProps {
  teams: GameTeam[];
  isTeamMode: boolean;
  onToggleTeamMode: (isTeam: boolean) => void;
  teamCount: number;
  onChangeTeamCount: (count: number) => void;
  onUpdateScore: (teamId: string, delta: number) => void;
  onChangeTeamColor?: (teamId: string, color: string) => void;
  onResetScores: () => void;
}

export function FlipCardScoreboard({
  teams,
  isTeamMode,
  onToggleTeamMode,
  teamCount,
  onChangeTeamCount,
  onUpdateScore,
  onChangeTeamColor,
  onResetScores,
}: FlipCardScoreboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePickerTeamId, setActivePickerTeamId] = useState<string | null>(null);

  const handleScore = (teamId: string, delta: number) => {
    if (delta > 0) {
      gameAudio.playCorrectFanfare();
    } else {
      gameAudio.playClick();
    }
    onUpdateScore(teamId, delta);
  };

  const visibleTeams = teams.slice(0, teamCount);

  return (
    <div className="w-full bg-white border border-[#DFD0D5] rounded-3xl p-4 sm:p-5 shadow-xs transition-all">
      <FlipCardScoreboardHeader
        isTeamMode={isTeamMode}
        onToggleTeamMode={onToggleTeamMode}
        teamCount={teamCount}
        onChangeTeamCount={onChangeTeamCount}
        onResetScores={onResetScores}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Team score cards */}
      {!isCollapsed && isTeamMode && (
        <div
          className={`grid gap-3 pt-3 ${
            teamCount === 2
              ? "grid-cols-2"
              : teamCount === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-2 sm:grid-cols-4"
          }`}
        >
          {visibleTeams.map((team, idx) => (
            <FlipCardTeamCard
              key={team.id}
              team={team}
              idx={idx}
              visibleTeams={visibleTeams}
              activeColorPickerTeamId={activePickerTeamId}
              onToggleColorPicker={(id) =>
                setActivePickerTeamId(activePickerTeamId === id ? null : id)
              }
              onChangeTeamColor={onChangeTeamColor}
              onHandleScore={handleScore}
            />
          ))}
        </div>
      )}

      {/* Info when Team Mode is turned OFF */}
      {!isCollapsed && !isTeamMode && (
        <div className="pt-3 text-center py-2 text-xs text-[#7A5661]">
          <span>
            Papan skor dinonaktifkan. Anda dapat memanggil siswa maju bergiliran
            untuk memilih nomor kartu dan menjawab soal secara langsung di layar TV.
          </span>
        </div>
      )}
    </div>
  );
}
