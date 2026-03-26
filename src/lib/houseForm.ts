import type { HouseValidationSchema } from "@/schemas/property.schema";
import { houseValidationSchema } from "@/schemas/property.schema";
import type { HouseFormData } from "@/store/HouseStore";

interface HouseCoordinates {
  latitude?: number;
  longitude?: number;
}

export interface HouseForForm {
  owner: { toString(): string } | string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  houseNumber?: number;
  coordinates?: HouseCoordinates;
  name: string;
  description: string;
  summary: string;
  propertyType: string;
  livingArea: boolean;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  carpetArea: number;
  builtUpArea?: number;
  floors?: number | null;
  propertyOnFloor?: number;
  facing?: string | null;
  ownership?: string | null;
  furnishing: string;
  flooring?: string | null;
  constructionYear: number;
  amenities: string[];
  utilities: string[];
  images: string[];
  video?: string;
  videoUrl?: string;
  floorMapImage?: string;
  leaseTerm: string;
  titleDeed: boolean;
  titleDeedFromPreviousOwner: boolean;
  conversionCertificate: boolean;
  encumbranceCertificate: boolean;
  isPlotFreeOfAnyLegalIssues: boolean;
  price: number;
  depositAmount?: number;
  negotiable: boolean;
  allInclusivePrice: boolean;
  govChargesIncluded: boolean;
  isActive: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
}

function toNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function toFormNumber(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

function optionalNonEmptyString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  const s = String(value).trim();
  return s === "" ? undefined : s;
}

export function buildHousePayload(
  raw: HouseFormData,
  ownerId: string
): HouseValidationSchema {
  const latitude = toNumber(raw.latitude);
  const longitude = toNumber(raw.longitude);
  const floorsNum = toNumber(raw.floors);
  const facingVal = optionalNonEmptyString(raw.facing);
  const ownershipVal = optionalNonEmptyString(raw.ownership);
  const flooringVal = optionalNonEmptyString(raw.flooring);

  return houseValidationSchema.parse({
    name: raw.name,
    description: raw.description,
    summary: raw.summary,
    owner: ownerId,
    address: raw.address,
    city: raw.city,
    state: raw.state,
    country: raw.country,
    postalCode: toNumber(raw.postalCode) ?? 0,
    houseNumber: toNumber(raw.houseNumber),
    coordinates:
      latitude !== undefined && longitude !== undefined
        ? { latitude, longitude }
        : undefined,
    propertyType: raw.propertyType,
    livingArea: Boolean(raw.livingArea),
    bedrooms: toNumber(raw.bedrooms) ?? 1,
    bathrooms: toNumber(raw.bathrooms) ?? 1,
    balconies: toNumber(raw.balconies),
    carpetArea: toNumber(raw.carpetArea) ?? 0,
    builtUpArea: toNumber(raw.builtUpArea),
    floors: floorsNum,
    propertyOnFloor: toNumber(raw.propertyOnFloor),
    facing: facingVal,
    ownership: ownershipVal,
    furnishing: raw.furnishing,
    flooring: flooringVal,
    constructionYear: toNumber(raw.constructionYear) ?? 0,
    amenities: raw.amenities,
    utilities: raw.utilities,
    images: raw.images,
    video: raw.video || undefined,
    videoUrl: raw.videoUrl || undefined,
    floorMapImage: raw.floorMapImage || undefined,
    leaseTerm: String(raw.leaseTerm),
    titleDeed: Boolean(raw.titleDeed),
    titleDeedFromPreviousOwner: Boolean(raw.titleDeedFromPreviousOwner),
    conversionCertificate: Boolean(raw.conversionCertificate),
    encumbranceCertificate: Boolean(raw.encumbranceCertificate),
    isPlotFreeOfAnyLegalIssues: Boolean(raw.isPlotFreeOfAnyLegalIssues),
    price: toNumber(raw.price) ?? 0,
    depositAmount: toNumber(raw.depositAmount),
    negotiable: Boolean(raw.negotiable),
    allInclusivePrice: Boolean(raw.allInclusivePrice),
    govChargesIncluded: Boolean(raw.govChargesIncluded),
    isActive: Boolean(raw.isActive),
    isVerified: Boolean(raw.isVerified),
    isAvailable: Boolean(raw.isAvailable),
    isFeatured: Boolean(raw.isFeatured),
    isNew: Boolean(raw.isNew),
    listedBy: "owner",
  });
}

export function toHouseFormData(house: HouseForForm): HouseFormData {
  return {
    name: house.name,
    description: house.description,
    summary: house.summary,
    owner:
      typeof house.owner === "string" ? house.owner : house.owner.toString(),
    address: house.address,
    city: house.city,
    state: house.state,
    country: house.country,
    postalCode: toFormNumber(house.postalCode),
    houseNumber: toFormNumber(house.houseNumber),
    latitude: toFormNumber(house.coordinates?.latitude),
    longitude: toFormNumber(house.coordinates?.longitude),
    propertyType: house.propertyType,
    livingArea: house.livingArea,
    bedrooms: toFormNumber(house.bedrooms),
    bathrooms: toFormNumber(house.bathrooms),
    balconies: toFormNumber(house.balconies),
    carpetArea: toFormNumber(house.carpetArea),
    builtUpArea: toFormNumber(house.builtUpArea),
    floors: toFormNumber(
      house.floors === null || house.floors === undefined
        ? undefined
        : house.floors,
    ),
    propertyOnFloor: toFormNumber(house.propertyOnFloor),
    facing: house.facing ?? "",
    ownership: house.ownership ?? "",
    furnishing: house.furnishing,
    flooring: house.flooring ?? "",
    constructionYear: toFormNumber(house.constructionYear),
    amenities: house.amenities ?? [],
    utilities: house.utilities ?? [],
    images: house.images ?? [],
    video: house.video ?? "",
    videoUrl: house.videoUrl ?? "",
    floorMapImage: house.floorMapImage ?? "",
    leaseTerm: house.leaseTerm ?? "",
    titleDeed: house.titleDeed,
    titleDeedFromPreviousOwner: house.titleDeedFromPreviousOwner,
    conversionCertificate: house.conversionCertificate,
    encumbranceCertificate: house.encumbranceCertificate,
    isPlotFreeOfAnyLegalIssues: house.isPlotFreeOfAnyLegalIssues,
    price: toFormNumber(house.price),
    depositAmount: toFormNumber(house.depositAmount),
    negotiable: house.negotiable,
    allInclusivePrice: house.allInclusivePrice,
    govChargesIncluded: house.govChargesIncluded,
    isActive: house.isActive,
    isVerified: house.isVerified,
    isAvailable: house.isAvailable,
    isFeatured: house.isFeatured,
    isNew: house.isNew,
  };
}

