import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

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
