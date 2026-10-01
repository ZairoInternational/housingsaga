import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

const searchSchema = z.object({
  locationQuery: z.string().trim().min(1).optional(),
  roomsMin: z.number().int().min(1).optional(),
  bathroomsMin: z.number().int().min(1).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(50).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = (await request.json()) as unknown;
    const parsed = searchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const {
      locationQuery,
      roomsMin,
      bathroomsMin,
      minPrice,
      maxPrice,
      page = 1,
      limit = 9,
    } = parsed.data;

    const andFilters: Record<string, unknown>[] = [{ isSold: { $ne: true } }];

    if (locationQuery) {
      andFilters.push({
        $or: [
          { city: { $regex: locationQuery, $options: "i" } },
          { state: { $regex: locationQuery, $options: "i" } },
          { country: { $regex: locationQuery, $options: "i" } },
          { address: { $regex: locationQuery, $options: "i" } },
        ],
      });
    }

    if (typeof roomsMin === "number") {
      andFilters.push({ bedrooms: { $gte: roomsMin } });
    }

    if (typeof bathroomsMin === "number") {
      andFilters.push({ bathrooms: { $gte: bathroomsMin } });
    }

    if (typeof minPrice === "number" || typeof maxPrice === "number") {
      const priceFilter: Record<string, number> = {};
      if (typeof minPrice === "number") priceFilter.$gte = minPrice;
      if (typeof maxPrice === "number") priceFilter.$lte = maxPrice;
      andFilters.push({ price: priceFilter });
    }

    const mongoFilter =
      andFilters.length > 0 ? { $and: andFilters } : ({} as Record<string, unknown>);

    const skip = (page - 1) * limit;

    const [houses, total] = await Promise.all([
      House.find(mongoFilter).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      House.countDocuments(mongoFilter),
    ]);

    return NextResponse.json({
      data: houses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[PROPERTIES][SEARCH] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

