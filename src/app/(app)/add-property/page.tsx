import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/lib/db";
import { toHouseFormData, type HouseForForm } from "@/lib/houseForm";
import { House } from "@/models/houseModel";
import type { HouseFormData } from "@/store/HouseStore";
import HouseFormClient from "./HouseFormClient";

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
  }

  return (
    <HouseFormClient
      initialFormData={initialFormData}
      propertyId={propertyId}
      isEditMode={isEditMode}
    />
  );
}
