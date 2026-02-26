import { NextResponse } from "next/server";
const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const sort_by = searchParams.get("sort_by") || "popularity.desc";
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=${sort_by}`,
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
  return NextResponse.json(data);
}
