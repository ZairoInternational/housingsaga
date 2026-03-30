import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { computeAddressKey } from "@/lib/address-key";
import { toHouseFormData, type HouseForForm } from "@/lib/houseForm";
import { House } from "@/models/houseModel";
import type { HouseFormData } from "@/store/HouseStore";
import HouseFormClient from "./HouseFormClient";
import type { ExistingAddressOption } from "./address-reuse-types";

interface AddPropertyPageProps {
  searchParams?: Promise<{
    id?: string;
    edit?: string;
  }>;
}

export default async function AddPropertyPage({
  searchParams,
}: AddPropertyPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user) || !session.user.id) {
    redirect("/sign-in?redirect=/add-property");
  }

  const params = searchParams ? await searchParams : undefined;
  const propertyId = typeof params?.id === "string" ? params.id : undefined;
  const isEditMode = Boolean(params?.edit) && Boolean(propertyId);

  let initialFormData: HouseFormData | undefined;
  let existingAddressOptions: ExistingAddressOption[] | undefined;

  if (isEditMode && propertyId) {
    await connectDb();

    const house = await House.findOne({
      _id: propertyId,
      owner: session.user.id,
    }).lean<HouseForForm | null>();

    if (!house) {
      redirect("/profile");
    }

    initialFormData = toHouseFormData(house);
  } else if (!isEditMode) {
    // For new listings, let the owner reuse an existing (already-paid) address.
    await connectDb();

    type HouseForAddress = {
      _id: { toString(): string };
      address: string;
      city: string;
      state: string;
      country: string;
      postalCode: number;
      houseNumber?: number;
      coordinates?: { latitude?: number; longitude?: number };
    };

    const houses = await House.find({ owner: session.user.id })
      .sort({ createdAt: -1 })
      .select({
        address: 1,
        city: 1,
        state: 1,
        country: 1,
        postalCode: 1,
        houseNumber: 1,
        coordinates: 1,
      })
      .lean<HouseForAddress[]>();

    // Deduplicate by addressKey (multiple listings can share the same address).
    const dedupByKey = new Map<string, ExistingAddressOption>();

    for (const house of houses) {
      const addressKey = computeAddressKey({
        address: house.address,
        city: house.city,
        state: house.state,
        country: house.country,
        postalCode: house.postalCode,
        houseNumber: house.houseNumber ?? "",
      });

      if (dedupByKey.has(addressKey)) continue;

      dedupByKey.set(addressKey, {
        id: house._id.toString(),
        address: house.address,
        city: house.city,
        state: house.state,
        country: house.country,
        postalCode: String(house.postalCode),
        houseNumber:
          house.houseNumber === null || house.houseNumber === undefined
            ? ""
            : String(house.houseNumber),
        latitude:
          house.coordinates?.latitude === null || house.coordinates?.latitude === undefined
            ? ""
            : String(house.coordinates.latitude),
        longitude:
          house.coordinates?.longitude === null || house.coordinates?.longitude === undefined
            ? ""
            : String(house.coordinates.longitude),
        addressKey,
      });
    }

    existingAddressOptions = Array.from(dedupByKey.values());
  }

  return (
    <HouseFormClient
      initialFormData={initialFormData}
      propertyId={propertyId}
      isEditMode={isEditMode}
      existingAddressOptions={existingAddressOptions}
    />
  );
}
