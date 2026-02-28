"use client";

import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import { AlertCircle, Check } from "lucide-react";

// ── Shared input classes ──────────────────────────────────────────────
const baseInput = `
  w-full px-4 py-2.5 rounded-xl text-sm
  bg-gray-50 dark:bg-[#0f1117]
  border transition-all duration-200 outline-none
  text-gray-900 dark:text-white
  placeholder:text-gray-400 dark:placeholder:text-gray-500
  focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500
  disabled:opacity-50
`;

const errorBorder = "border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/10";
const defaultBorder = "border-gray-200 dark:border-gray-700";

// ── Field wrapper ──────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  error?: FieldError;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, error, required, hint, children, className = "" }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        {label}
        {required && <span className="text-emerald-500 ml-1">*</span>}
      </label>
      {children}
      {error ? (
        <span className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={11} className="flex-shrink-0" />
          {error.message}
        </span>
      ) : hint ? (
        <span className="text-xs text-gray-400">{hint}</span>
      ) : null}
    </div>
  );
}

// ── Input ──────────────────────────────────────────────────────────────
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`${baseInput} ${error ? errorBorder : defaultBorder} ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

// ── Textarea ───────────────────────────────────────────────────────────
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`${baseInput} ${error ? errorBorder : defaultBorder} resize-none ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ── Select ─────────────────────────────────────────────────────────────
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, options, placeholder, className = "", ...props }, ref) => (
    <select
      ref={ref}
      className={`${baseInput} ${error ? errorBorder : defaultBorder} ${className} cursor-pointer`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value} className="bg-white dark:bg-[#1a1f2e]">
          {o.label}
        </option>
      ))}
    </select>
  )
);
Select.displayName = "Select";

// ── Toggle Checkbox ────────────────────────────────────────────────────
interface ToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}

export function Toggle({ id, label, checked, onChange, hint }: ToggleProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`
          w-10 h-5.5 rounded-full transition-all duration-200 relative
          ${checked ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"}
        `}
          style={{ height: "22px" }}
        >
          <div className={`
            absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${checked ? "translate-x-[18px]" : "translate-x-0"}
          `} />
        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {label}
        </span>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
    </label>
  );
}

// ── Checkbox Chip ──────────────────────────────────────────────────────
interface ChipProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function CheckChip({ label, checked, onChange }: ChipProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
        ${checked
          ? "bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
          : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
        }
      `}
    >
      <div className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all ${checked ? "bg-emerald-500 border-emerald-500" : "border-gray-300 dark:border-gray-600"}`}>
        {checked && <Check size={9} className="text-white" strokeWidth={3} />}
      </div>
      <span className="capitalize">{label}</span>
    </button>
  );
}

// ── Section heading ────────────────────────────────────────────────────
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
      {children}
    </h3>
  );
}
