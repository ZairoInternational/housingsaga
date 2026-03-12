import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { authOptions } from "@/lib/authConfig";

import { houseValidationSchema } from "@/schemas/property.schema";
import type { HouseFormData } from "@/store/HouseStore";
import { House } from "@/models/house";

type SessionUser = {
  id?: string;
};

type Session = {
  user?: SessionUser | null;
};

function toNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function POST(request: Request) {
  try {
    await connectDb();

    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const raw = (await request.json()) as HouseFormData;

    const latitude = toNumber(raw.latitude);
    const longitude = toNumber(raw.longitude);

    const parsed = houseValidationSchema.parse({
      name: raw.name,
      description: raw.description,
      owner: session.user.id,
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
      floors: toNumber(raw.floors) ?? 0,
      propertyOnFloor: toNumber(raw.propertyOnFloor),
      facing: raw.facing,
      ownership: raw.ownership,
      furnishing: raw.furnishing,
      flooring: raw.flooring,
      constructionYear: toNumber(raw.constructionYear) ?? 0,
      amenities: raw.amenities,
      utilities: raw.utilities,
      images: raw.images,
      video: raw.video || undefined,
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

    const created = await House.create(parsed);

    return NextResponse.json(
      {
        success: true,
        house: {
          id: created._id.toString(),
          name: created.name,
          owner: created.owner,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && "issues" in (error as never)) {
      return NextResponse.json(
        { error: "Validation failed", details: (error as unknown as { issues?: unknown }).issues },
        { status: 400 }
      );
    }

    console.error("[HOUSES][POST] error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

