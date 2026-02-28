"use client";


import { formatPhoneNumber, validatePhoneNumber } from "@/lib/phoneUtils";
import { useState, useEffect } from "react";

type PhoneNumberInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function PhoneNumberInput({
  value,
  onChange,
  error,
}: PhoneNumberInputProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove all non-digit characters for storage
    const digitsOnly = inputValue.replace(/\D/g, "");
    // Format for display
    const formatted = formatPhoneNumber(digitsOnly);
    setDisplayValue(formatted);
    onChange(digitsOnly);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isValid = !touched || (value && validatePhoneNumber(value));

  return (
    <div className="w-full">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Phone Number *
      </label>
      <input
        id="phone"
        type="tel"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="+1 (555) 000-0000"
        className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-50 ${
          error || (!isValid && touched)
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
        }`}
        required
      />
      {(error || (!isValid && touched)) && (
        <p className="text-red-500 text-sm mt-2">
          {error || "Please enter a valid phone number (at least 10 digits)"}
        </p>
      )}
      {isValid && touched && value && (
        <p className="text-green-600 dark:text-green-400 text-sm mt-2">
          ✓ Phone number is valid
        </p>
      )}
    </div>
  );
}
