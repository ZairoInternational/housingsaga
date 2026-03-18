"use client";

import { useMemo } from "react";
import PhoneInput from "react-phone-input-2";

export type PhoneNumberInputProps = {
  value: string;
  onChange: (digitsOnly: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultCountry?: "auto" | string;
};

function toDigitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function detectCountryFromLocale(): string {
  if (typeof navigator === "undefined") return "in";
  const locale = navigator.language || "";
  const parts = locale.split(/[-_]/);
  const region = parts.length >= 2 ? parts[1].toLowerCase() : "";
  return region || "in";
}

export function PhoneNumberInput({
  value,
  onChange,
  label = "Phone",
  required,
  error,
  placeholder,
  disabled,
  defaultCountry = "auto",
}: PhoneNumberInputProps) {
  const country = useMemo(() => {
    if (defaultCountry === "auto") return detectCountryFromLocale();
    return defaultCountry || "in";
  }, [defaultCountry]);

  return (
    <div className="w-full">
      {label ? (
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </label>
      ) : null}

      <div className={label ? "mt-2 relative" : "relative"}>
        <PhoneInput
          country={country}
          value={value}
          onChange={(nextValue: string) => onChange(toDigitsOnly(nextValue))}
          disabled={disabled}
          placeholder={placeholder}
          containerClass="!w-full"
          inputClass={`
            !w-full
            !h-[48px]
            !pl-[52px]
            !pr-4
            !rounded-xl
            !border
            !border-gray-200
            dark:!border-white/10
            !bg-white
            dark:!bg-white/5
            !text-sm
            !text-gray-900
            dark:!text-white
            !placeholder:text-gray-400
            dark:!placeholder:text-gray-500
            focus:!outline-none
            focus:!ring-2
            focus:!ring-lime-500/30
            ${error ? "!border-red-400/70 focus:!ring-red-500/25" : ""}
          `}
          buttonClass={`
            !absolute
            !left-0
            !top-0
            !h-[48px]
            !w-[48px]
            !bg-transparent
            !border-0
            hover:!bg-gray-100/70
            dark:hover:!bg-white/10
            ${disabled ? "!cursor-not-allowed" : ""}
          `}
          dropdownClass="!rounded-xl !shadow-lg !border !border-gray-200 dark:!border-white/10 dark:!bg-[#13161f]"
          searchClass="!rounded-lg !border !border-gray-200 dark:!border-white/10 dark:!bg-white/5"
        />

        {error ? (
          <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
        ) : null}
      </div>
    </div>
  );
}

