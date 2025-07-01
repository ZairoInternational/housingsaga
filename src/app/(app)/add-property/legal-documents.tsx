"use client";

import type React from "react";

import { useHouseFormStore } from "@/store/HouseStore";

export default function LegalDocuments() {
  const { formData, updateField } = useHouseFormStore();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateField(name as keyof typeof formData, checked);
  };

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary dark:text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Legal Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="titleDeed"
            name="titleDeed"
            checked={formData.titleDeed}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label htmlFor="titleDeed" className="ml-2 text-sm font-medium ">
            Title Deed Available *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="titleDeedFromPreviousOwner"
            name="titleDeedFromPreviousOwner"
            checked={formData.titleDeedFromPreviousOwner}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="titleDeedFromPreviousOwner"
            className="ml-2 text-sm font-medium"
          >
            Title Deed from Previous Owner *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="conversionCertificate"
            name="conversionCertificate"
            checked={formData.conversionCertificate}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="conversionCertificate"
            className="ml-2 text-sm font-medium "
          >
            Conversion Certificate *
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="encumbranceCertificate"
            name="encumbranceCertificate"
            checked={formData.encumbranceCertificate}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="encumbranceCertificate"
            className="ml-2 text-sm font-medium "
          >
            Encumbrance Certificate *
          </label>
        </div>
        <div className="flex items-center md:col-span-2">
          <input
            type="checkbox"
            id="isPlotFreeOfAnyLegalIssues"
            name="isPlotFreeOfAnyLegalIssues"
            checked={formData.isPlotFreeOfAnyLegalIssues}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2"
          />
          <label
            htmlFor="isPlotFreeOfAnyLegalIssues"
            className="ml-2 text-sm font-medium "
          >
            Plot is Free of Any Legal Issues *
          </label>
        </div>
      </div>
    </div>
  );
}
