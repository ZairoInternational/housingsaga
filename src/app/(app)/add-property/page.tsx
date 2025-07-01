"use client";

import type React from "react";
import { useState } from "react";

import FormActions from "./form-actions";
import MediaSection from "./media-section";
import StatusSettings from "./status-settings";
import LegalDocuments from "./legal-documents";
import PricingDetails from "./pricing-details";
import LocationDetails from "./location-details";
import OwnerInformation from "./owner-information";
import BasicInformation from "./basic-information";
import AmenitiesUtilities from "./amenities-utilities";
import PropertySpecifications from "./property-specifications";

export default function HouseForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    houseNumber: "",
    latitude: "",
    longitude: "",
    propertyType: "",
    livingArea: false,
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    carpetArea: "",
    builtUpArea: "",
    floors: "",
    propertyOnFloor: "",
    facing: "",
    ownership: "",
    furnishing: "",
    flooring: "",
    constructionYear: "",
    amenities: [],
    utilities: [],
    images: [],
    video: "",
    leaseTerm: "",
    titleDeed: false,
    titleDeedFromPreviousOwner: false,
    conversionCertificate: false,
    encumbranceCertificate: false,
    isPlotFreeOfAnyLegalIssues: false,
    price: "",
    depositAmount: "",
    negotiable: false,
    allInclusivePrice: false,
    govChargesIncluded: false,
    isActive: false,
    isVerified: false,
    isAvailable: false,
    isFeatured: false,
    isNew: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (name: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[name as keyof typeof prev] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [name]: newArray };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen text-black dark:text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Add New Property
          </h1>
          <p className="text-gray-400">
            Fill in the details to list your property. Your progress is
            automatically saved.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <BasicInformation />
          <LocationDetails />
          <PropertySpecifications />
          <AmenitiesUtilities />
          <LegalDocuments />
          <PricingDetails />
          <MediaSection />
          <StatusSettings />
          <OwnerInformation />
          <FormActions />
        </form>
      </div>
    </div>
  );
}
