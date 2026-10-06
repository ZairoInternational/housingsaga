import mongoose from "mongoose";

import type { OwnerPortalProperty } from "@/lib/owner-access-policy";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

const PROPERTY_FIELDS = "name city country propertyType images isSold price";

type PropertyRecord = {
  _id: unknown;
  name?: string;
  city?: string;
  country?: string;
  propertyType?: string;
  images?: string[];
  isSold?: boolean;
  price?: number;
};

export function toOwnerPortalProperty(doc: PropertyRecord): OwnerPortalProperty {
  const image =
    doc.images?.find((item) => typeof item === "string" && item.trim().length > 0)?.trim() ??
    null;
  const location = [doc.city, doc.country]
    .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
    .join(", ");

  return {
    id: String(doc._id),
    name: doc.name?.trim() || "Property",
    location,
    propertyType: doc.propertyType?.trim() || "",
    image,
    price: typeof doc.price === "number" && doc.price > 0 ? doc.price : null,
    status: doc.isSold === true ? "sold" : "available",
  };
}

async function ensureDatabase(): Promise<void> {
  await connectDb();
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database unavailable");
  }
}

export async function listPropertiesForOwner(ownerId: string): Promise<OwnerPortalProperty[]> {
  if (!mongoose.Types.ObjectId.isValid(ownerId)) return [];
  await ensureDatabase();

  const docs = await House.find({ owner: ownerId })
    .select(PROPERTY_FIELDS)
    .sort({ createdAt: -1 })
    .lean<PropertyRecord[]>();

  return docs.map((doc) => toOwnerPortalProperty(doc));
}

/**
 * Marks a listing sold only when it belongs to `ownerId`.
 * A property id from the client is never enough on its own.
 */
export async function markPropertySoldForOwner(
  ownerId: string,
  propertyId: string,
): Promise<{ ok: true; property: OwnerPortalProperty } | { ok: false }> {
  if (
    !mongoose.Types.ObjectId.isValid(ownerId) ||
    !mongoose.Types.ObjectId.isValid(propertyId)
  ) {
    return { ok: false };
  }

  await ensureDatabase();
  const updated = await House.findOneAndUpdate(
    { _id: propertyId, owner: ownerId },
    { $set: { isSold: true, isAvailable: false, isActive: false } },
    { new: true, projection: PROPERTY_FIELDS },
  ).lean<PropertyRecord | null>();

  if (!updated) return { ok: false };
  return { ok: true, property: toOwnerPortalProperty(updated) };
}
