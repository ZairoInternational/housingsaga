import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FormNumberValue = string | number;

export interface HouseFormData {
  name: string;
  description: string;
  summary: string;
  owner: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: FormNumberValue;
  houseNumber: FormNumberValue;
  latitude: string;
  longitude: string;
  propertyType: string;
  livingArea: boolean;
  bedrooms: FormNumberValue;
  bathrooms: FormNumberValue;
  balconies: FormNumberValue;
  carpetArea: FormNumberValue;
  builtUpArea: FormNumberValue;
  floors: FormNumberValue;
  propertyOnFloor: FormNumberValue;
  facing: string;
  ownership: string;
  furnishing: string;
  flooring: string;
  constructionYear: FormNumberValue;
  amenities: string[];
  utilities: string[];
  images: string[];
  video: string;
  videoUrl: string;
  floorMapImage: string;
  leaseTerm: FormNumberValue;
  titleDeed: boolean;
  titleDeedFromPreviousOwner: boolean;
  conversionCertificate: boolean;
  encumbranceCertificate: boolean;
  isPlotFreeOfAnyLegalIssues: boolean;
  price: FormNumberValue;
  depositAmount: FormNumberValue;
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
  updateField: <K extends keyof HouseFormData>(field: K, value: HouseFormData[K]) => void;
  updateArrayField: (
    field: "amenities" | "utilities" | "images",
    value: string
  ) => void;
  setFormData: (data: HouseFormData) => void;
  resetForm: () => void;
  submitForm: (options?: { propertyId?: string; isEditMode?: boolean }) => Promise<unknown>;
}

export const initialHouseFormData: HouseFormData = {
  name: "",
  description: "",
  summary: "",
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
  videoUrl: "",
  floorMapImage: "",
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
      formData: initialHouseFormData,

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

      setFormData: (data) => {
        set({ formData: data });
      },

      resetForm: () => {
        set({ formData: initialHouseFormData });
      },

      submitForm: async (options) => {
        const { formData } = get();
        console.log("Form submitted:", formData);
        const response =
          options?.isEditMode && options.propertyId
            ? await axios.patch(`/api/houses/${options.propertyId}`, formData)
            : await axios.post("/api/houses", formData);
        console.log("Response:", response.data);
        return response.data;
      },
    }),
    {
      name: "house-form-storage",
      partialize: (state) => ({ formData: state.formData }),
    }
  )
);
