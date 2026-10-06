import { NextResponse } from "next/server";

import { getAuthenticatedOwner } from "@/lib/owner-access";
import {
  isSameOriginOwnerRequest,
  isSecureOwnerRequest,
} from "@/lib/owner-access-policy";
import { markPropertySoldForOwner } from "@/lib/owner-properties";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{
    propertyId: string;
  }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isSecureOwnerRequest(request) || !isSameOriginOwnerRequest(request)) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  let body: { status?: unknown };
  try {
    body = (await request.json()) as { status?: unknown };
  } catch {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  if (body.status !== "sold") {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  try {
    const auth = await getAuthenticatedOwner();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId } = await context.params;
    const result = await markPropertySoldForOwner(auth.ownerId, propertyId);
    if (!result.ok) {
      return NextResponse.json({ error: "Property not found." }, { status: 404 });
    }

    const response = NextResponse.json({ property: result.property });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("[owner-access] mark sold failed");
    const unavailable = error instanceof Error && error.message === "Database unavailable";
    return NextResponse.json(
      {
        error: unavailable
          ? "Please try again in a moment."
          : "We couldn't update this property. Please try again.",
      },
      { status: unavailable ? 503 : 500 },
    );
  }
}
