import { queryForMovieAction } from "@/app/actions/searchMovies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");

  if (q) {
    const { results } = await queryForMovieAction(q);
    return NextResponse.json(results.slice(0, 5), { status: 200 });
  }

  return NextResponse.json(
    {
      error: "Invalid request",
    },
    { status: 400 }
  );
}
