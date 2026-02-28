import { getServerSession } from "next-auth";

import { connectDb } from "@/lib/db";
import { HousingUsers } from "@/models/housingUser";
import { authOptions } from "@/lib/authConfig";

export async function POST(request: Request) {
  try {
    await connectDb();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, phone } = await request.json();

    // Validation
    if (!role || !phone) {
      return Response.json(
        { error: "Role and phone are required" },
        { status: 400 },
      );
    }

    const normalizedRole = role.toLowerCase();

    if (!["buyer", "owner"].includes(normalizedRole)) {
      return Response.json({ error: "Invalid role" }, { status: 400 });
    }

    if (typeof phone !== "string" || phone.trim().length < 6) {
      return Response.json(
        { error: "Valid phone number is required" },
        { status: 400 },
      );
    }

    // Find user using email from session
    const user = await HousingUsers.findOne({ email: session.user.email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Update onboarding fields
    user.role = normalizedRole;
    user.phone = phone.trim();
    user.onboarded = true;

    await user.save();

    console.log(
      "[Onboarding] User onboarded:",
      user._id.toString(),
      "role:",
      normalizedRole,
    );

    return Response.json({
      success: true,
      message: "Onboarding completed successfully",
      user: {
        id: user._id.toString(),
        role: user.role,
        phone: user.phone,
        onboarded: user.onboarded,
      },
    });
  } catch (error) {
    console.error("[Onboarding] Error:", error);

    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
