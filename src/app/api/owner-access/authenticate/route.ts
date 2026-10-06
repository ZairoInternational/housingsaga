import { NextResponse } from "next/server";

import { authenticateOwnerAccess } from "@/lib/owner-access";
import {
  INCORRECT_PIN_MESSAGE,
  LOCKOUT_MESSAGE,
  OWNER_SESSION_COOKIE,
  SESSION_TTL_MS,
  isSameOriginOwnerRequest,
  isSecureOwnerRequest,
  ownerSessionCookie,
} from "@/lib/owner-access-policy";

export const runtime = "nodejs";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: Request) {
  if (!isSecureOwnerRequest(request) || !isSameOriginOwnerRequest(request)) {
    return noStore(
      NextResponse.json(
        { error: "invalid", message: INCORRECT_PIN_MESSAGE },
        { status: 401 },
      ),
    );
  }

  let body: { token?: unknown; pin?: unknown };
  try {
    body = (await request.json()) as { token?: unknown; pin?: unknown };
  } catch {
    return noStore(
      NextResponse.json(
        { error: "invalid", title: "Incorrect PIN", message: INCORRECT_PIN_MESSAGE },
        { status: 401 },
      ),
    );
  }

  try {
    const result = await authenticateOwnerAccess({
      token: typeof body.token === "string" ? body.token : "",
      pin: typeof body.pin === "string" ? body.pin : "",
      request,
    });

    if (!result.ok) {
      const locked = result.reason === "locked";
      return noStore(
        NextResponse.json(
          {
            error: locked ? "locked" : "invalid",
            title: locked ? undefined : "Incorrect PIN",
            message: locked ? LOCKOUT_MESSAGE : INCORRECT_PIN_MESSAGE,
          },
          { status: locked ? 429 : 401 },
        ),
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      OWNER_SESSION_COOKIE,
      result.sessionToken,
      ownerSessionCookie(Math.floor(SESSION_TTL_MS / 1000)),
    );
    return noStore(response);
  } catch (error) {
    console.error("[owner-access] authenticate failed");
    if (error instanceof Error && error.message === "Database unavailable") {
      return noStore(
        NextResponse.json(
          { error: "unavailable", message: "Please try again in a moment." },
          { status: 503 },
        ),
      );
    }
    return noStore(
      NextResponse.json(
        { error: "invalid", title: "Incorrect PIN", message: INCORRECT_PIN_MESSAGE },
        { status: 401 },
      ),
    );
  }
}
