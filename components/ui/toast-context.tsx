"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Trash2, Info, X } from "lucide-react";

export type ToastType = "success" | "delete" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  toast: {
    success: (message: string, duration?: number) => void;
    delete: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", duration = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const toastMethods = {
    success: (msg: string, duration?: number) => showToast(msg, "success", duration),
    delete: (msg: string, duration?: number) => showToast(msg, "delete", duration),
    error: (msg: string, duration?: number) => showToast(msg, "error", duration),
    info: (msg: string, duration?: number) => showToast(msg, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ showToast, toast: toastMethods }}>
      {children}

      {/* Global Floating Toast Container */}
      <div
        aria-live="polite"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4"
      >
        {toasts.map((t) => {
          const isDelete = t.type === "delete";
          const isError = t.type === "error";
          const isSuccess = t.type === "success";

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 w-full rounded-2xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-300 border ${
                isDelete
                  ? "bg-[#FFF5F6]/95 border-[#F2C2C6] text-[#631422]"
                  : isError
                  ? "bg-[#FEF2F2]/95 border-[#FCA5A5] text-[#7F1D1D]"
                  : isSuccess
                  ? "bg-[#F3FAF4]/95 border-[#C8E6C9] text-[#1B4D20]"
                  : "bg-white/95 border-[#E5D7DC] text-[#451420]"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    isDelete
                      ? "bg-[#FBEAEB] border border-[#F2C2C6] text-[#8A1F2D]"
                      : isError
                      ? "bg-red-100 text-red-600"
                      : isSuccess
                      ? "bg-[#EDF7ED] border border-[#C8E6C9] text-[#2E7D32]"
                      : "bg-[#F0F4FA] border border-[#D0DEF2] text-[#1F4F8F]"
                  }`}
                >
                  {isDelete && <Trash2 size={18} />}
                  {isError && <AlertCircle size={18} />}
                  {isSuccess && <CheckCircle2 size={18} />}
                  {t.type === "info" && <Info size={18} />}
                </div>

                <p className="text-xs sm:text-sm font-bold leading-snug break-words">
                  {t.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="p-1 rounded-lg text-current/60 hover:text-current hover:bg-black/5 transition cursor-pointer shrink-0"
                title="Tutup pemberitahuan"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
