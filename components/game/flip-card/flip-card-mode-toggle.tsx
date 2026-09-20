"use client";

import { Users, User } from "lucide-react";

interface FlipCardModeToggleProps {
  isTeamMode: boolean;
  onToggleTeamMode: (isTeam: boolean) => void;
  teamCount: number;
  onChangeTeamCount: (count: number) => void;
}

export function FlipCardModeToggle({
  isTeamMode,
  onToggleTeamMode,
  teamCount,
  onChangeTeamCount,
}: FlipCardModeToggleProps) {
  return (
    <>
      <div className="flex items-center bg-[#FAF0F3] p-1 rounded-xl border border-[#ECD0D8]">
        <button
          type="button"
          onClick={() => onToggleTeamMode(true)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            isTeamMode ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661] hover:text-[#451420]"
          }`}
        >
          <Users size={13} />
          <span>Pakai Tim</span>
        </button>
        <button
          type="button"
          onClick={() => onToggleTeamMode(false)}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            !isTeamMode ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661] hover:text-[#451420]"
          }`}
        >
          <User size={13} />
          <span>Tanpa Tim</span>
        </button>
      </div>

      {isTeamMode && (
        <div className="hidden sm:flex items-center gap-1 bg-[#FAF7F8] p-1 rounded-xl border border-[#DFD0D5]">
          {[2, 3, 4].map((cnt) => (
            <button
              key={cnt}
              type="button"
              onClick={() => onChangeTeamCount(cnt)}
              className={`px-2 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                teamCount === cnt ? "bg-[#451420] text-white shadow-2xs" : "text-[#7A5661] hover:text-[#451420]"
              }`}
              title={`Gunakan ${cnt} Tim`}
            >
              {cnt} Tim
            </button>
          ))}
        </div>
      )}
    </>
  );
}
