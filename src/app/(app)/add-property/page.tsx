import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/authConfig";
import HouseFormClient from "./HouseFormClient";

export default async function AddPropertyPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user) || !session.user.id) {
    redirect("/sign-in?redirect=/add-property");
  }

  return <HouseFormClient />;
}
