import { z } from "zod";
import { ObjectId } from "mongodb";

const houseValidationSchema = z.object({
  name: z.string(),
  description: z.string().length(30, "Description must be at least 30 characters long"),

  owner: z
    .instanceof(ObjectId)
    .or(
      z.string().refine((val) => ObjectId.isValid(val), {
        message: "Invalid ObjectId",
      })
    )
    .transform((val) => new ObjectId(val)),

  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.number(),
  houseNumber: z.number().optional(),
  coordinates: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),

  propertyType: z.enum(["apartment", "house", "villa", "rk", "farmhouse"]),
  livingArea: z.boolean(),
  bedrooms: z.number().default(1),
  bathrooms: z.number().default(1),
  balconies: z.number().optional(),
  carpetArea: z.number(),
  builtUpArea: z.number().optional(),
  floors: z.number(),
  propertyOnFloor: z.number().optional(),
  facing: z.enum([
    "east",
    "west",
    "north",
    "south",
    "northeast",
    "northwest",
    "southeast",
    "southwest",
  ]),
  ownership: z.enum(["freehold", "leasehold", "co-operative", "power-of-attorney"]),
  furnishing: z.enum(["fully-furnished", "semi-furnished", "unfurnished"]),
  flooring: z.enum([
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
  ]),
  constructionYear: z.number(),

  amenities: z.array(z.string()),
  utilities: z.array(z.string()),

  images: z.array(z.string()),
  video: z.string().optional(),

  leaseTerm: z.string(),
  titleDeed: z.boolean(),
  titleDeedFromPreviousOwner: z.boolean(),
  conversionCertificate: z.boolean(),
  encumbranceCertificate: z.boolean(),
  isPlotFreeOfAnyLegalIssues: z.boolean(),

  price: z.number(),
  depositAmount: z.number().optional(),
  negotiable: z.boolean(),
  allInclusivePrice: z.boolean(),
  govChargesIncluded: z.boolean(),

  isActive: z.boolean(),
  isVerified: z.boolean(),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
  isNew: z.boolean(),

  tags: z.array(z.string()).optional(),

  listedBy: z.string(),
});

export type HouseValidationSchema = z.infer<typeof houseValidationSchema>;
