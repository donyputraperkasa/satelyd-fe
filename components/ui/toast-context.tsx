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
    (message: string, type: ToastType = "success", duration = 2800) => {
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

      {/* Global Center Toast with Backdrop Blur */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          role="status"
          onClick={() => setToasts([])}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-[#451420]/30 backdrop-blur-xs transition-all duration-200 animate-in fade-in"
        >
          <div
            className="flex flex-col items-center gap-3 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {toasts.map((t) => {
              const isDelete = t.type === "delete";
              const isError = t.type === "error";
              const isSuccess = t.type === "success";

              return (
                <div
                  key={t.id}
                  className={`w-full flex items-center justify-between gap-3.5 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl border transition-all animate-in zoom-in-95 fade-in duration-200 ${
                    isDelete
                      ? "bg-white/95 border-[#F2C2C6] text-[#631422]"
                      : isError
                      ? "bg-white/95 border-[#FCA5A5] text-[#7F1D1D]"
                      : isSuccess
                      ? "bg-white/95 border-[#C8E6C9] text-[#1B4D20]"
                      : "bg-white/95 border-[#ECD0D8] text-[#451420]"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        isDelete
                          ? "bg-[#FBEAEB] border border-[#F2C2C6] text-[#8A1F2D]"
                          : isError
                          ? "bg-red-100 border border-red-200 text-red-600"
                          : isSuccess
                          ? "bg-[#EDF7ED] border border-[#C8E6C9] text-[#2E7D32]"
                          : "bg-[#F0F4FA] border border-[#D0DEF2] text-[#1F4F8F]"
                      }`}
                    >
                      {isDelete && <Trash2 size={20} />}
                      {isError && <AlertCircle size={20} />}
                      {isSuccess && <CheckCircle2 size={20} />}
                      {t.type === "info" && <Info size={20} />}
                    </div>

                    <div className="min-w-0">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-[#7A5661]/80 mb-0.5">
                        {isSuccess
                          ? "Pemberitahuan Berhasil"
                          : isDelete
                          ? "Data Dihapus"
                          : isError
                          ? "Peringatan"
                          : "Informasi"}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-[#451420] leading-snug break-words">
                        {t.message}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeToast(t.id)}
                    className="p-1.5 rounded-xl text-[#7A5661] hover:text-[#451420] hover:bg-[#FAF0F3] transition cursor-pointer shrink-0"
                    title="Tutup pemberitahuan"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
