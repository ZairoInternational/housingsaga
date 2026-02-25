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
  const [formData] = useState({
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
  } as const);

  // Input handling is performed inside child components (they use the HouseStore).
  // Kept local formData state for now; remove or wire handlers if migrating to local-only form.

  // Note: array field updates are handled in child components via the HouseStore.
  // Removed local handler that was unused to avoid the 'declared but never read' warning.

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
