import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.max(Number(searchParams.get("limit")) || 10, 1);

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      House.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      House.countDocuments(),
    ]);

    return NextResponse.json({
      data: projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching houses:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
