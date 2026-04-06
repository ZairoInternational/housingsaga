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

/**
 * Shared listing query for the projects grid (used by the Projects page SSR and GET /api/projects/getProjects).
 * Avoids server-side HTTP self-fetch, which breaks in production when base URL env vars are missing.
 */
export async function getProjectsPageData(
  page: number,
  limit: number,
): Promise<{
  data: unknown[];
  pagination: ProjectsPaginationMeta;
}> {
  await connectDb();

  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.max(Number(limit) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const [projects, total] = await Promise.all([
    House.find({})
      .skip(skip)
      .limit(safeLimit)
      .sort({ createdAt: -1 })
      .lean(),
    House.countDocuments({}),
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
  images?: string[];
};

/**
 * Up to `limit` houses for homepage / marketing sections (featured first, then newest).
 */
export async function getHighlightedProjectCards(
  limit: number,
): Promise<PropertyCardData[]> {
  await connectDb();

  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 20);

  const docs = await House.find({})
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
  }));
}
