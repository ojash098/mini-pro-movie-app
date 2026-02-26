import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const id = (await context.params).id;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&include_video=true&include_trailers=true`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    },
  );
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movie videos" },
      { status: 500 },
    );
  }
  return NextResponse.json(data);
}
