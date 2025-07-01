import mongoose, { Schema } from "mongoose";

import { HouseValidationSchema } from "@/schemas/property.schema";

const HouseSchema: Schema = new Schema<HouseValidationSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "HousingUsers",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    houseNumber: {
      type: Number,
    },
    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },

    propertyType: {
      type: String,
      required: true,
    },
    livingArea: {
      type: Boolean,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    balconies: {
      type: Number,
    },
    carpetArea: {
      type: Number,
      required: true,
    },
    builtUpArea: {
      type: Number,
    },
    floors: {
      type: Number,
      required: true,
    },
    propertyOnFloor: {
      type: Number,
    },
    facing: {
      type: String,
      required: true,
      enum: [
        "east",
        "west",
        "north",
        "south",
        "northeast",
        "northwest",
        "southeast",
        "southwest",
      ],
    },
    ownership: {
      type: String,
      required: true,
      enum: ["freehold", "leasehold", "co-operative", "power-of-attorney"],
    },
    furnishing: {
      type: String,
      required: true,
      enum: ["fully-furnished", "semi-furnished", "unfurnished"],
    },
    flooring: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    constructionYear: {
      type: Number,
      required: true,
    },

    amenities: {
      type: [String],
      required: true,
      default: [],
    },
    utilities: {
      type: [String],
      required: true,
      default: [],
    },

    images: {
      type: [String],
      required: true,
      default: [],
    },
    video: {
      type: String,
    },

    leaseTerm: {
      type: String,
      required: true,
    },
    titleDeed: {
      type: Boolean,
      required: true,
    },
    titleDeedFromPreviousOwner: {
      type: Boolean,
      required: true,
    },
    conversionCertificate: {
      type: Boolean,
      required: true,
    },
    encumbranceCertificate: {
      type: Boolean,
      required: true,
    },
    isPlotFreeOfAnyLegalIssues: {
      type: Boolean,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    depositAmount: {
      type: Number,
    },
    negotiable: {
      type: Boolean,
      required: true,
    },
    allInclusivePrice: {
      type: Boolean,
      required: true,
    },
    govChargesIncluded: {
      type: Boolean,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const House =
  mongoose.models?.House || mongoose.model<HouseValidationSchema>("House", HouseSchema);
