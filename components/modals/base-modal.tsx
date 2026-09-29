"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-md",
}: BaseModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className={`relative w-full ${maxWidth} transform overflow-hidden rounded-2xl border border-[#E5D7DC] dark:border-[#282E3E] bg-[#FDFBF7] dark:bg-[#1C202C] p-6 sm:p-8 text-[#451420] dark:text-[#F8FAFC] shadow-2xl transition-all z-10`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-8 w-8 items-center justify-center rounded-full text-[#7A5661] dark:text-[#94A3B8] transition hover:bg-[#F5EDF0] dark:hover:bg-[#282E3E] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          aria-label="Tutup jendela modal"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}
