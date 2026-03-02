import { NextResponse } from "next/server";
import { getUsersWithPosts } from "@/lib/postJoinQueries";

export async function GET() {
  try {
    const data = await getUsersWithPosts();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("REAL ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
