import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { House } from "@/models/houseModel";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    await connectDb();
    const { id } = await context.params;
    const project = await House.findOne({ _id: id });
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}   