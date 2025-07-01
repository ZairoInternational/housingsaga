"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function FormActions() {
  const { submitForm, resetForm } = useHouseFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleReset = () => {
    if (
      confirm("Are you sure you want to reset the form? All data will be lost.")
    ) {
      resetForm();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <button
        type="button"
        onClick={handleReset}
        className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
      >
        Reset Form
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
      >
        Submit Property
      </button>
    </div>
  );
}
