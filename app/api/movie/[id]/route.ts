import { NextResponse } from "next/server";
const TMDB_TOKEN = process.env.TMDB_BEARER_TOKEN;

export async function GET(
  req: Request,
  context: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const id = (await context.params).id;
  console.log(id);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&include_video=true&include_trailers=true`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    },
  );
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 },
    );
  }
  return NextResponse.json(data);
}
