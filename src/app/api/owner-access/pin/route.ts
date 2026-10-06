import { NextResponse } from "next/server";

import { setOwnerAccessPin } from "@/lib/owner-access";
import { isSameOriginOwnerRequest, isSecureOwnerRequest } from "@/lib/owner-access-policy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSecureOwnerRequest(request) || !isSameOriginOwnerRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { pin?: unknown };
  try {
    body = (await request.json()) as { pin?: unknown };
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const result = await setOwnerAccessPin(typeof body.pin === "string" ? body.pin.trim() : "");
    if (result === "ok") {
      const response = NextResponse.json({ ok: true });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
    if (result === "same") {
      return NextResponse.json(
        { error: "same", message: "Choose a different PIN from the one in your email." },
        { status: 400 },
      );
    }
    if (result === "invalid") {
      return NextResponse.json(
        { error: "invalid", message: "Enter a 4-digit PIN." },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  } catch {
    console.error("[owner-access] set pin failed");
    return NextResponse.json(
      { error: "unavailable", message: "Please try again in a moment." },
      { status: 503 },
    );
  }
}
