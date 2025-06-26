import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";
import { generateAccessToken, generateRefreshToken } from "@/lib/token";

connectDb();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { email, password } = reqBody;

  try {
    const user = await HousingUsers.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    console.log("core");

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    const res = NextResponse.json({ accessToken });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
