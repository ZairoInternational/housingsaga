import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/lib/db";
import { UserInterface } from "@/lib/types";
import { HousingUsers } from "@/models/housingUser";

interface reqBodyType extends UserInterface {
  confirmPassword: string;
}

connectDb();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { name, phone, email, password, confirmPassword } =
    reqBody as reqBodyType;

  try {
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 400 }
      );
    }

    const isUserAlreadyPresent = await HousingUsers.findOne({ email });
    if (isUserAlreadyPresent) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await HousingUsers.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
