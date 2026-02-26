import { NextResponse } from "next/server";
const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function GET(req: Request) {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "force-cache",
    }
  );

  const genres = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
  return NextResponse.json(genres.genres);
}
