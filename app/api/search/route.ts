import { NextResponse } from "next/server";
const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json([]);
  }
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&language=en-US&page=1&include_adult=true`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    },
  );
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
  return NextResponse.json(data.results);
}
