import { NextResponse } from "next/server";

import { signOutOwnerAccess } from "@/lib/owner-access";
import {
  OWNER_SESSION_COOKIE,
  isSameOriginOwnerRequest,
  isSecureOwnerRequest,
  ownerSessionCookie,
} from "@/lib/owner-access-policy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSecureOwnerRequest(request) || !isSameOriginOwnerRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await signOutOwnerAccess();
  } catch {
    console.error("[owner-access] sign out failed");
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(OWNER_SESSION_COOKIE, "", ownerSessionCookie(0));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
