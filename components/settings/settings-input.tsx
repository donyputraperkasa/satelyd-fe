"use client";

import type { ComponentType, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface SettingsInputProps {
  label: string;
  icon: ComponentType<{ size: number; className?: string }>;
  type?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  showPasswordToggle?: boolean;
  isPasswordShown?: boolean;
  onTogglePassword?: () => void;
}

export function SettingsInput({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  disabled,
  readOnly,
  helperText,
  showPasswordToggle,
  isPasswordShown,
  onTogglePassword,
}: SettingsInputProps) {
  const inputType = showPasswordToggle ? (isPasswordShown ? "text" : "password") : type;

  return (
    <div>
      <label className="block text-xs font-semibold text-[#451420] dark:text-[#F8FAFC] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A5661] dark:text-[#94A3B8]" />
        <input
          type={inputType}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border border-[#DFD0D5] dark:border-[#282E3E] py-3 pl-11 text-sm font-medium text-[#451420] dark:text-[#F8FAFC] placeholder-[#A48E95] dark:placeholder-[#64748B] focus:border-[#C67D00] focus:outline-none focus:ring-1 focus:ring-[#C67D00] ${
            disabled ? "bg-[#FAF7F2] dark:bg-[#141720] opacity-80 cursor-not-allowed pr-4" : "bg-white dark:bg-[#141720] " + (showPasswordToggle ? "pr-11" : "pr-4")
          }`}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#7A5661] dark:text-[#94A3B8] hover:text-[#451420] dark:hover:text-[#F8FAFC]"
          >
            {isPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {helperText && (
        <p className="text-[11px] text-[#A48E95] dark:text-[#64748B] mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
