"use client";

import { useHouseFormStore } from "@/store/HouseStore";

export default function AmenitiesUtilities() {
  const { formData, updateArrayField } = useHouseFormStore();

  const amenitiesOptions = [
    "gym",
    "parking",
    "garden",
    "clubhouse",
    "basement",
    "security",
    "mandir",
    "staff room",
    "swimming pool",
    "elevator",
    "power backup",
  ];

  const utilitiesOptions = [
    "electricity",
    "water",
    "gas",
    "internet",
    "cable tv",
    "waste management",
  ];

  return (
    <div className=" border border-neutral-500 dark:border-none dark:bg-secondary rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        Amenities & Utilities
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenitiesOptions.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${amenity}`}
                checked={formData.amenities.includes(amenity)}
                onChange={() => updateArrayField("amenities", amenity)}
                className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
              />
              <label
                htmlFor={`amenity-${amenity}`}
                className="ml-2 text-sm capitalize"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium  mb-4">Utilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {utilitiesOptions.map((utility) => (
            <div key={utility} className="flex items-center">
              <input
                type="checkbox"
                id={`utility-${utility}`}
                checked={formData.utilities.includes(utility)}
                onChange={() => updateArrayField("utilities", utility)}
                className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
              />
              <label
                htmlFor={`utility-${utility}`}
                className="ml-2 text-sm capitalize"
              >
                {utility}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
