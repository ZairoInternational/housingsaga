"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function OwnerInformation() {
  const { formData, updateField } = useHouseFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary dark:text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Owner Information</h2>
      <div>
        <label htmlFor="owner" className="block text-sm font-medium mb-2">
          Owner ID *
        </label>
        <input
          type="text"
          id="owner"
          name="owner"
          value={formData.owner}
          onChange={handleInputChange}
          placeholder="Enter owner ID"
          className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
}
