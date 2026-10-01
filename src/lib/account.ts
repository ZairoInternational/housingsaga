import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import { HousingUsers } from "@/models/housingUser";

export type AccountRole = "owner" | "buyer" | "admin" | null;

export type AccountUser = {
  userId: string;
  name: string;
  email: string;
  role: AccountRole;
  savedPropertyIds: string[];
};

export type OwnerListingItem = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image?: string;
  isActive: boolean;
  isVerified: boolean;
  isSold?: boolean;
  goldenVisaEligible?: boolean;
};

type DbUser = {
  name: string;
  email: string;
  role?: AccountRole;
  savedPropertyIds?: string[];
};

type ListingDoc = {
  _id: { toString(): string };
  name: string;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  images?: string[];
  isActive: boolean;
  isVerified: boolean;
  isSold?: boolean;
  goldenVisaEligible?: boolean;
};

export async function requireAccount(redirectPath: string): Promise<AccountUser> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
  }

  await connectDb();
  const dbUser = await HousingUsers.findById(userId).lean<DbUser | null>();
  if (!dbUser) {
    redirect(`/sign-in?redirect=${encodeURIComponent(redirectPath)}`);
  }

  const sessionRole = (session as { role?: AccountRole } | null)?.role ?? null;

  return {
    userId,
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role ?? sessionRole,
    savedPropertyIds: dbUser.savedPropertyIds ?? [],
  };
}

export async function loadOwnerListings(userId: string): Promise<OwnerListingItem[]> {
  await connectDb();
  const docs = await House.find({ owner: userId })
    .sort({ createdAt: -1 })
    .select({
      name: 1,
      address: 1,
      city: 1,
      state: 1,
      propertyType: 1,
      price: 1,
      bedrooms: 1,
      bathrooms: 1,
      images: 1,
      isActive: 1,
      isVerified: 1,
      isSold: 1,
      goldenVisaEligible: 1,
    })
    .lean<ListingDoc[]>();

  return docs.map((listing) => ({
    id: listing._id.toString(),
    name: listing.name,
    address: listing.address,
    city: listing.city,
    state: listing.state,
    propertyType: listing.propertyType,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    image: listing.images?.[0],
    isActive: listing.isActive,
    isVerified: listing.isVerified,
    isSold: listing.isSold === true,
    goldenVisaEligible: listing.goldenVisaEligible,
  }));
}

export type WishlistHome = {
  id: string;
  title: string;
  city: string;
  state: string;
  price?: number;
  image?: string;
  bedrooms: number;
  bathrooms: number;
};

export async function loadWishlistHomes(ids: string[]): Promise<WishlistHome[]> {
  if (ids.length === 0) return [];
  await connectDb();
  const docs = await House.find({ _id: { $in: ids } })
    .select({
      name: 1,
      city: 1,
      state: 1,
      price: 1,
      images: 1,
      bedrooms: 1,
      bathrooms: 1,
    })
    .lean<
      Array<{
        _id: { toString(): string };
        name: string;
        city: string;
        state: string;
        price?: number;
        images?: string[];
        bedrooms: number;
        bathrooms: number;
      }>
    >();

  const byId = new Map(docs.map((doc) => [doc._id.toString(), doc]));
  return ids.flatMap((id) => {
    const doc = byId.get(id);
    if (!doc) return [];
    return [
      {
        id,
        title: doc.name,
        city: doc.city,
        state: doc.state,
        price: doc.price,
        image: doc.images?.[0],
        bedrooms: doc.bedrooms,
        bathrooms: doc.bathrooms,
      },
    ];
  });
}
