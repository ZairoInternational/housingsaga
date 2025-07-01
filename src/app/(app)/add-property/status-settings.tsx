"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function StatusSettings() {
  const { formData, updateField } = useHouseFormStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateField(name as keyof typeof formData, checked);
  };

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary dark:text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Status Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isActive"
            className="ml-2 text-sm font-medium"
          >
            Active Listing *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isVerified"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isVerified"
            className="ml-2 text-sm font-medium"
          >
            Verified Property *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isAvailable"
            className="ml-2 text-sm font-medium"
          >
            Available for Rent *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isFeatured"
            className="ml-2 text-sm font-medium"
          >
            Featured Property *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isNew"
            name="isNew"
            checked={formData.isNew}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isNew"
            className="ml-2 text-sm font-medium "
          >
            New Property *
          </label>
        </div>
      </div>
    </div>
  );
}
