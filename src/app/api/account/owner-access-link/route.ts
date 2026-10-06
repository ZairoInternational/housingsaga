import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authConfig";
import { createOwnerAccessLink } from "@/lib/owner-access";
import { isSameOriginOwnerRequest, isSecureOwnerRequest } from "@/lib/owner-access-policy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSecureOwnerRequest(request) || !isSameOriginOwnerRequest(request)) {
    return NextResponse.json({ error: "Sign in as a property owner." }, { status: 401 });
  }

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Sign in as a property owner." }, { status: 401 });
  }

  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const configuredOrigin = process.env.NEXTAUTH_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL?.trim();
  const origin = configuredOrigin
    ? configuredOrigin.replace(/\/$/, "")
    : forwardedHost
      ? `${forwardedProto || "http"}://${forwardedHost}`
      : new URL(request.url).origin;

  try {
    const issued = await createOwnerAccessLink(userId, origin);
    const response = NextResponse.json({ ok: true, emailedTo: issued.emailedTo });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "Owner not found") {
      return NextResponse.json({ error: "Sign in as a property owner." }, { status: 403 });
    }
    if (error instanceof Error && error.message === "Email could not be sent") {
      return NextResponse.json(
        { error: "We couldn't email your private link. Please try again." },
        { status: 502 },
      );
    }
    console.error("[owner-access] could not create link");
    return NextResponse.json(
      { error: "We couldn't create your private link. Please try again." },
      { status: 500 },
    );
  }
}
