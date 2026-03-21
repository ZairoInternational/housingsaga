import { getProjectsPageData } from "@/lib/get-projects-page-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.max(Number(searchParams.get("limit")) || 10, 1);

    const { data, pagination } = await getProjectsPageData(page, limit);

    return NextResponse.json({
      data,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching houses:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
