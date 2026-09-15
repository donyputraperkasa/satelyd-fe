"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DashboardHeader, DashboardSidebar, DashboardBreadcrumbs } from "@/components/dashboard";
import { Footer } from "@/components/public/Footer";
import { useAuthModal } from "@/components/modals";
import { getStoredUser } from "@/lib/auth";
import { getMeApi } from "@/lib/api/auth";
import type { User } from "@/types";

const emptySubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getClientSnapshot = () => {
  if (typeof window === "undefined") return null;
  return JSON.stringify(getStoredUser());
};

const getServerSnapshot = () => null;

export function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { openLogin } = useAuthModal();
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const storedUserRaw = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const user = useMemo<User | null>(() => {
    if (liveUser) return liveUser;
    if (!storedUserRaw) return null;
    try {
      return JSON.parse(storedUserRaw);
    } catch {
      return null;
    }
  }, [liveUser, storedUserRaw]);

  useEffect(() => {
    if (!getStoredUser()) {
      router.replace("/");
      openLogin();
      return;
    }

    getMeApi()
      .then((data) => {
        setLiveUser(data);
        if (typeof window !== "undefined") {
          localStorage.setItem("satelyd.user", JSON.stringify(data));
          localStorage.setItem("satelyd_user", JSON.stringify(data));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [router, openLogin]);

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-[#451420]">
        <Loader2 size={32} className="animate-spin text-[#451420] mb-3" />
        <p className="text-sm font-semibold text-[#7A5661]">Memuat Dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-[#FDFBF7] text-[#451420]">
      <DashboardSidebar
        user={user}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 md:pl-72">
        <DashboardHeader
          user={user}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Dynamic Breadcrumbs placed below the header line with clear spacing & divider */}
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pt-6 pb-2">
          <div className="border-b border-[#E5D7DC]/70 pb-3.5">
            <DashboardBreadcrumbs />
          </div>
        </div>

        <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-6 md:px-8 pt-4 pb-12">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
