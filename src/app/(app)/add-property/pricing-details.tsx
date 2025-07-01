"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function PricingDetails() {
  const { formData, updateField } = useHouseFormStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      updateField(name as keyof typeof formData, checked);
    } else {
      updateField(name as keyof typeof formData, value);
    }
  };

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary dark:text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold  mb-6">Pricing Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium  mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price in rupees"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label
            htmlFor="depositAmount"
            className="block text-sm font-medium  mb-2"
          >
            Deposit Amount (₹)
          </label>
          <input
            type="number"
            id="depositAmount"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleInputChange}
            placeholder="Enter deposit amount"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="leaseTerm"
            className="block text-sm font-medium  mb-2"
          >
            Lease Term *
          </label>
          <input
            type="text"
            id="leaseTerm"
            name="leaseTerm"
            value={formData.leaseTerm}
            onChange={handleInputChange}
            placeholder="e.g., 11 months (enters in months)"
            className="w-full px-4 py-3  border border-gray-600 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="negotiable"
            name="negotiable"
            checked={formData.negotiable}
            onChange={handleInputChange}
            className="w-4 h-4 text-teal-600  border-gray-600 rounded focus:ring-teal-700 focus:ring-2"
          />
          <label htmlFor="negotiable" className="ml-2 text-sm font-medium ">
            Price Negotiable *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allInclusivePrice"
            name="allInclusivePrice"
            checked={formData.allInclusivePrice}
            onChange={handleInputChange}
            className="w-4 h-4 text-teal-600  border-gray-600 rounded focus:ring-teal-700 focus:ring-2"
          />
          <label
            htmlFor="allInclusivePrice"
            className="ml-2 text-sm font-medium "
          >
            All Inclusive Price *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="govChargesIncluded"
            name="govChargesIncluded"
            checked={formData.govChargesIncluded}
            onChange={handleInputChange}
            className="w-4 h-4 text-teal-600  border-gray-600 rounded focus:ring-teal-700 focus:ring-2"
          />
          <label
            htmlFor="govChargesIncluded"
            className="ml-2 text-sm font-medium "
          >
            Government Charges Included *
          </label>
        </div>
      </div>
    </div>
  );
}
