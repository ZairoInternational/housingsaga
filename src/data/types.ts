interface HouseInterface {
  id: string;
  name: string;
  description: string;

  owner: string;

  // location details
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  houseNumber?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };

  // property details
  propertyType: "apartment" | "house" | "villa" | "rk" | "farmhouse";
  livingArea: boolean;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  carpetArea: number;
  builtUpArea?: number;
  floors: number;
  propertyOnFloor?: number;
  facing:
    | "east"
    | "west"
    | "north"
    | "south"
    | "north-east"
    | "north-west"
    | "south-east"
    | "south-west";
  ownership: "freehold" | "leasehold" | "co-operative" | "power-of-attorney";
  furnishing: "fully-furnished" | "semi-furnished" | "unfurnished";
  flooring:
    | "marble"
    | "concrete"
    | "polished-concrete"
    | "granite"
    | "ceramic"
    | "mosaic"
    | "cement"
    | "stone"
    | "vinyl"
    | "wood"
    | "vitrified"
    | "spartex"
    | "ipsfinish"
    | "other";
  constructionYear: number;

  // amenities
  amenities: string[];
  utilities: string[]; // water, gas, sewage, electricity

  // images
  images: string[]; // image urls
  video?: string; // video url

  // legal documents
  leaseTerm: string;
  titleDeed: boolean;
  titleDeedFromPreviousOwner: boolean;
  conversionCertificate: boolean;
  encumbranceCertificate: boolean;
  isPlotFreeOfAnyLegalIssues: boolean;

  // price
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

  tags?: string[];

  listedBy: string;

  createdAt: Date;
  updatedAt: Date;
}

interface HouseCardType {
  id: string;
  name: string;

  // location details
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  houseNumber?: number;

  // property details
  propertyType: "apartment" | "house" | "villa" | "rk" | "farmhouse";
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  carpetArea: number;
  floors: number;
  facing:
    | "east"
    | "west"
    | "north"
    | "south"
    | "north-east"
    | "north-west"
    | "south-east"
    | "south-west";
  furnishing: "fully-furnished" | "semi-furnished" | "unfurnished";
  constructionYear: number;

  // amenities
  amenities: string[];
  utilities: string[]; // water, gas, sewage, electricity

  // images
  images: string[]; // image urls
  video?: string; // video url

  // price
  price: number;

  isActive: boolean;
  isVerified: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;

  tags?: string[];

  listedBy: string;
}
