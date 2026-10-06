import { NextResponse } from "next/server";

import { getAuthenticatedOwner } from "@/lib/owner-access";
import { isSecureOwnerRequest } from "@/lib/owner-access-policy";
import { listPropertiesForOwner } from "@/lib/owner-properties";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isSecureOwnerRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auth = await getAuthenticatedOwner();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const properties = await listPropertiesForOwner(auth.ownerId);
    const response = NextResponse.json({ properties });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("[owner-access] properties failed");
    const unavailable = error instanceof Error && error.message === "Database unavailable";
    return NextResponse.json(
      { error: unavailable ? "Please try again in a moment." : "Unauthorized" },
      { status: unavailable ? 503 : 401 },
    );
  }
}
