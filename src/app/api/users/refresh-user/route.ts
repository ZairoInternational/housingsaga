import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { generateAccessToken } from "@/lib/token";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET!) as any;
    const newAccessToken = generateAccessToken(decoded.userId);

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
