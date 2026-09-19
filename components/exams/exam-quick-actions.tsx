"use client";

import type { ExamStatus } from "@/types";
import { ExamSearchFilter } from "./exam-search-filter";

interface ExamQuickActionsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: ExamStatus | "ALL";
  onStatusFilterChange: (status: ExamStatus | "ALL") => void;
  onCreateNew: () => void;
  onJoinRoom: (code: string) => void;
  viewMode: "card" | "table";
  onViewModeChange: (mode: "card" | "table") => void;
  counts: {
    all: number;
    published: number;
    draft: number;
    closed: number;
  };
}

export function ExamQuickActions({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  counts,
}: ExamQuickActionsProps) {
  return (
    <ExamSearchFilter
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      totalCount={counts.all}
    />
  );
}
