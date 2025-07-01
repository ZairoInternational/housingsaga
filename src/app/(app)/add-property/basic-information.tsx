"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function BasicInformation() {
  const { formData, updateField } = useHouseFormStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      updateField(name as keyof typeof formData, checked);
    } else {
      updateField(name as keyof typeof formData, value);
    }
  };

  return (
    <div className=" bg-white/10 border border-neutral-500 dark:border-none dark:bg-secondary rounded-lg p-6 text-black dark:text-white shadow-md">
      <h2 className="text-xl font-semibold  text-black dark:text-white mb-6">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black dark:text-gray-300 mb-2"
          >
            Property Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter property name"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="propertyType"
            className="block text-sm font-medium text-black dark:text-gray-300 mb-2"
          >
            Property Type *
          </label>
          <input
            type="text"
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            placeholder="e.g., Villa, Apartment, House"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-black dark:text-gray-300 mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your property..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          required
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="livingArea"
            name="livingArea"
            checked={formData.livingArea}
            onChange={handleInputChange}
            className="w-4 h-4 text-teal-700 bg-gray-700 border-gray-600 rounded focus:ring-teal-700 focus:ring-2"
          />
          <label
            htmlFor="livingArea"
            className="ml-2 text-sm font-medium text-black  dark:text-gray-300"
          >
            Has Living Area *
          </label>
        </div>
      </div>
    </div>
  );
}
