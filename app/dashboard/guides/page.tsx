"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  GuidesHeaderBanner,
  GuidesNavTabs,
  ExamGuideSection,
  DeckGuideSection,
  GuidesFaqCard,
  type GuideTab,
} from "@/components/guides";

function GuidesPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<GuideTab>("ALL");

  useEffect(() => {
    const tabParam = searchParams.get("tab")?.toUpperCase();
    const moduleParam = searchParams.get("module")?.toUpperCase();
    const target = tabParam || moduleParam;

    if (target === "EXAMS" || target === "DECKS" || target === "FAQ") {
      setActiveTab(target as GuideTab);
    }
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <GuidesHeaderBanner />

      <GuidesNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="space-y-8 pt-2">
        {(activeTab === "ALL" || activeTab === "EXAMS") && (
          <ExamGuideSection />
        )}

        {(activeTab === "ALL" || activeTab === "DECKS") && (
          <DeckGuideSection />
        )}

        {(activeTab === "ALL" || activeTab === "FAQ") && (
          <GuidesFaqCard />
        )}
      </div>
    </div>
  );
}

export default function GuidesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-[#7A5661]">Memuat Panduan...</div>}>
      <GuidesPageContent />
    </Suspense>
  );
}
