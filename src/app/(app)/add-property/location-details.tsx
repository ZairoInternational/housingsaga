"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function LocationDetails() {
  const { formData, updateField } = useHouseFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  return (
    <div className=" border border-neutral-500 dark:border-none dark:bg-secondary shadow-md rounded-lg p-6 dark:text-white">
      <h2 className="text-xl font-semibold mb-6">Location Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter full address"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-2">
            State *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Enter state"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-2">
            Country *
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter country"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium mb-2"
          >
            Postal Code *
          </label>
          <input
            type="number"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            placeholder="Enter postal code"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="houseNumber"
            className="block text-sm font-medium mb-2"
          >
            House Number
          </label>
          <input
            type="number"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            placeholder="Enter house number"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Coordinates (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium mb-2"
            >
              Latitude
            </label>
            <input
              type="number"
              step="any"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              placeholder="Enter latitude"
              className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium mb-2"
            >
              Longitude
            </label>
            <input
              type="number"
              step="any"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              placeholder="Enter longitude"
              className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
