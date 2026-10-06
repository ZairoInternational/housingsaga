import type { Metadata } from "next";

import OwnerDashboard from "@/components/owner-access/OwnerDashboard";
import OwnerLinkExpired from "@/components/owner-access/OwnerLinkExpired";
import OwnerPinGate from "@/components/owner-access/OwnerPinGate";
import OwnerSetPin from "@/components/owner-access/OwnerSetPin";
import { resolveOwnerPortal } from "@/lib/owner-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Your Properties",
  robots: { index: false, follow: false },
};

export default async function OwnerAccessPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  try {
    const portal = await resolveOwnerPortal(token);
    if (portal.view === "expired") {
      return <OwnerLinkExpired />;
    }
    if (portal.view === "set-pin") {
      return <OwnerSetPin />;
    }
    if (portal.view === "dashboard") {
      return <OwnerDashboard initialProperties={portal.properties} />;
    }
  } catch {
    console.error("[owner-access] portal unavailable");
  }

  return <OwnerPinGate token={token} />;
}
