"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function PropertySpecifications() {
  const { formData, updateField } = useHouseFormStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  const facingOptions = [
    "east",
    "west",
    "north",
    "south",
    "northeast",
    "northwest",
    "southeast",
    "southwest",
  ];
  const ownershipOptions = [
    "freehold",
    "leasehold",
    "co-operative",
    "power-of-attorney",
  ];
  const furnishingOptions = [
    "fully-furnished",
    "semi-furnished",
    "unfurnished",
  ];
  const flooringOptions = [
    "marble",
    "concrete",
    "polished-concrete",
    "granite",
    "ceramic",
    "mosaic",
    "cement",
    "stone",
    "vinyl",
    "wood",
    "vitrified",
    "spartex",
    "ipsfinish",
    "other",
  ];

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary rounded-lg p-6 dark:text-white shadow-md">
      <h2 className="text-xl font-semibold mb-6">Property Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium mb-2">
            Bedrooms *
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
            placeholder="Number of bedrooms"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium mb-2">
            Bathrooms *
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
            placeholder="Number of bathrooms"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="balconies" className="block text-sm font-medium mb-2">
            Balconies
          </label>
          <input
            type="number"
            id="balconies"
            name="balconies"
            value={formData.balconies}
            onChange={handleInputChange}
            placeholder="Number of balconies"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="carpetArea"
            className="block text-sm font-medium mb-2"
          >
            Carpet Area (sq ft) *
          </label>
          <input
            type="number"
            id="carpetArea"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleInputChange}
            placeholder="Carpet area in sq ft"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="builtUpArea"
            className="block text-sm font-medium mb-2"
          >
            Built-up Area (sq ft)
          </label>
          <input
            type="number"
            id="builtUpArea"
            name="builtUpArea"
            value={formData.builtUpArea}
            onChange={handleInputChange}
            placeholder="Built-up area in sq ft"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="floors" className="block text-sm font-medium mb-2">
            Total Floors *
          </label>
          <input
            type="number"
            id="floors"
            name="floors"
            value={formData.floors}
            onChange={handleInputChange}
            placeholder="Total floors"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="propertyOnFloor"
            className="block text-sm font-medium mb-2"
          >
            Property on Floor
          </label>
          <input
            type="number"
            id="propertyOnFloor"
            name="propertyOnFloor"
            value={formData.propertyOnFloor}
            onChange={handleInputChange}
            placeholder="Which floor"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="constructionYear"
            className="block text-sm font-medium mb-2"
          >
            Construction Year *
          </label>
          <input
            type="number"
            id="constructionYear"
            name="constructionYear"
            value={formData.constructionYear}
            onChange={handleInputChange}
            placeholder="Year of construction"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label htmlFor="facing" className="block text-sm font-medium mb-2">
            Facing Direction *
          </label>
          <select
            id="facing"
            name="facing"
            value={formData.facing}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          >
            <option value="" className=" bg-secondary">
              Select facing direction
            </option>
            {facingOptions.map((option) => (
              <option
                key={option}
                value={option}
                className=" dark:bg-secondary"
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ownership" className="block text-sm font-medium mb-2">
            Ownership Type *
          </label>
          <select
            id="ownership"
            name="ownership"
            value={formData.ownership}
            onChange={handleInputChange}
            className="w-full px-4 py-3  border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          >
            <option value="" className=" bg-secondary">
              Select ownership type
            </option>
            {ownershipOptions.map((option) => (
              <option
                key={option}
                value={option}
                className=" dark:bg-secondary"
              >
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="furnishing"
            className="block text-sm font-medium mb-2"
          >
            Furnishing Status *
          </label>
          <select
            id="furnishing"
            name="furnishing"
            value={formData.furnishing}
            onChange={handleInputChange}
            className="w-full px-4 py-3  border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          >
            <option value="" className=" bg-secondary">
              Select furnishing status
            </option>
            {furnishingOptions.map((option) => (
              <option
                key={option}
                value={option}
                className=" dark:bg-secondary"
              >
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="flooring" className="block text-sm font-medium mb-2">
            Flooring Type *
          </label>
          <select
            id="flooring"
            name="flooring"
            value={formData.flooring}
            onChange={handleInputChange}
            className="w-full px-4 py-3  border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          >
            <option value="" className=" bg-secondary">
              Select flooring type
            </option>
            {flooringOptions.map((option) => (
              <option
                key={option}
                value={option}
                className=" dark:bg-secondary"
              >
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
