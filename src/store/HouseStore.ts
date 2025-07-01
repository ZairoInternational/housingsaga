import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HouseFormData {
  name: string;
  description: string;
  owner: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  houseNumber: number;
  latitude: string;
  longitude: string;
  propertyType: string;
  livingArea: boolean;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetArea: number;
  builtUpArea: number;
  floors: number;
  propertyOnFloor: number;
  facing: string;
  ownership: string;
  furnishing: string;
  flooring: string;
  constructionYear: number;
  amenities: string[];
  utilities: string[];
  images: string[];
  video: string;
  leaseTerm: number;
  titleDeed: boolean;
  titleDeedFromPreviousOwner: boolean;
  conversionCertificate: boolean;
  encumbranceCertificate: boolean;
  isPlotFreeOfAnyLegalIssues: boolean;
  price: number;
  depositAmount: number;
  negotiable: boolean;
  allInclusivePrice: boolean;
  govChargesIncluded: boolean;
  isActive: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
}

interface HouseFormStore {
  formData: HouseFormData;
  updateField: (field: keyof HouseFormData, value: any) => void;
  updateArrayField: (
    field: "amenities" | "utilities" | "images",
    value: string
  ) => void;
  resetForm: () => void;
  submitForm: () => void;
}

const initialFormData: HouseFormData = {
  name: "",
  description: "",
  owner: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: 0,
  houseNumber: 0,
  latitude: "",
  longitude: "",
  propertyType: "",
  livingArea: false,
  bedrooms: 0,
  bathrooms: 0,
  balconies: 0,
  carpetArea: 0,
  builtUpArea: 0,
  floors: 0,
  propertyOnFloor: 0,
  facing: "",
  ownership: "",
  furnishing: "",
  flooring: "",
  constructionYear: 0,
  amenities: [],
  utilities: [],
  images: [],
  video: "",
  leaseTerm: 0,
  titleDeed: false,
  titleDeedFromPreviousOwner: false,
  conversionCertificate: false,
  encumbranceCertificate: false,
  isPlotFreeOfAnyLegalIssues: false,
  price: 0,
  depositAmount: 0,
  negotiable: false,
  allInclusivePrice: false,
  govChargesIncluded: false,
  isActive: false,
  isVerified: false,
  isAvailable: false,
  isFeatured: false,
  isNew: false,
};

export const useHouseFormStore = create<HouseFormStore>()(
  persist(
    (set, get) => ({
      formData: initialFormData,

      updateField: (field, value) => {
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        }));
      },

      updateArrayField: (field, value) => {
        set((state) => {
          const currentArray = state.formData[field] as string[];
          const newArray = currentArray.includes(value)
            ? currentArray.filter((item) => item !== value)
            : [...currentArray, value];

          return {
            formData: {
              ...state.formData,
              [field]: newArray,
            },
          };
        });
      },

      resetForm: () => {
        set({ formData: initialFormData });
      },

      submitForm: () => {
        const { formData } = get();
        console.log("Form submitted:", formData);
        // Here you would typically send the data to your API
      },
    }),
    {
      name: "house-form-storage",
      partialize: (state) => ({ formData: state.formData }),
    }
  )
);
