import type { PropertyCardData } from "@/components/ui/propertyCard";

import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

const FALLBACK_PROPERTY_IMAGE = "/property.jpeg";

export type ProjectsPaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProjectsListFilters = {
  minPrice?: number;
  maxPrice?: number;
  locationQuery?: string;
  roomsMin?: number;
  bathroomsMin?: number;
};

/**
 * Shared listing query for the projects grid (used by the Projects page SSR and GET /api/projects/getProjects).
 * Avoids server-side HTTP self-fetch, which breaks in production when base URL env vars are missing.
 */
export async function getProjectsPageData(
  page: number,
  limit: number,
  filters: ProjectsListFilters = {},
): Promise<{
  data: unknown[];
  pagination: ProjectsPaginationMeta;
}> {
  await connectDb();

  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const andFilters: Record<string, unknown>[] = [{ isSold: { $ne: true } }];

  if (filters.locationQuery?.trim()) {
    const q = filters.locationQuery.trim();
    andFilters.push({
      $or: [
        { city: { $regex: q, $options: "i" } },
        { state: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ],
    });
  }

  if (typeof filters.roomsMin === "number") {
    andFilters.push({ bedrooms: { $gte: filters.roomsMin } });
  }

  if (typeof filters.bathroomsMin === "number") {
    andFilters.push({ bathrooms: { $gte: filters.bathroomsMin } });
  }

  if (
    typeof filters.minPrice === "number" ||
    typeof filters.maxPrice === "number"
  ) {
    const priceFilter: Record<string, number> = {};
    if (typeof filters.minPrice === "number") priceFilter.$gte = filters.minPrice;
    if (typeof filters.maxPrice === "number") priceFilter.$lte = filters.maxPrice;
    andFilters.push({ price: priceFilter });
  }

  const mongoFilter =
    andFilters.length > 0 ? { $and: andFilters } : ({} as Record<string, unknown>);

  const [projects, total] = await Promise.all([
    House.find(mongoFilter)
      .skip(skip)
      .limit(safeLimit)
      .sort({ createdAt: -1 })
      .lean(),
    House.countDocuments(mongoFilter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  return {
    data: projects,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
    },
  };
}

type HouseCardLean = {
  _id: unknown;
  name: string;
  city: string;
  state: string;
  carpetArea: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  price?: number;
  images?: string[];
  goldenVisaEligible?: boolean;
};

/**
 * Up to `limit` houses for homepage / marketing sections (featured first, then newest).
 */
export async function getHighlightedProjectCards(
  limit: number,
): Promise<PropertyCardData[]> {
  await connectDb();

  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 20);

  const docs = await House.find({ isSold: { $ne: true } })
    .sort({ isFeatured: -1, createdAt: -1 })
    .limit(safeLimit)
    .lean<HouseCardLean[]>();

  return docs.map((doc) => ({
    id: String(doc._id),
    img: doc.images?.[0]?.trim() || FALLBACK_PROPERTY_IMAGE,
    title: doc.name,
    tag: [doc.city, doc.state].filter(Boolean).join(", "),
    area: doc.carpetArea.toLocaleString("en-US"),
    beds: doc.bedrooms,
    baths: doc.bathrooms,
    cars: doc.balconies ?? 0,
    price: typeof doc.price === "number" ? doc.price : undefined,
    goldenVisaEligible: doc.goldenVisaEligible,
  }));
}
