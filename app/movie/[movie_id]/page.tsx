"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const baseUrl = "https://api.themoviedb.org/3";

export default function MoviePage() {
  const { movie_id } = useParams();

  const {
    data: movie_details,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-details", movie_id],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${movie_id}`);
      const data = await res.json();
      console.log(data);
      return data;
    },
  });

  const { data: movie_videos, isLoading: isVideoLoading } = useQuery({
    queryKey: ["movie-videos", movie_id],
    queryFn: async () => {
      const res = await fetch(`/api/movie/${movie_id}/videos`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading movie details.</div>;
  }
  console.log(movie_details);
  console.log(movie_videos);
  return (
    <div className="min-h-screen min-w-screen bg-[#0F0D23] text-amber-50 p-5">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* movie title  */}
        <div className="flex justify-between w-full mt-10 items-center">
          <div>
            <h1 className="text-xl relative inline-block">
              {movie_details.title}
            </h1>
            <div className="flex flex-nowrap items-center mt-2 content">
              <span className="text-[#9CA4AB] px-1 text-sm">
                {movie_details?.release_date?.split("-")[0]} {}
                {"• "}
                {Math.floor(movie_details?.runtime / 60)} h{" "}
                {Math.round(
                  (movie_details?.runtime / 60 -
                    Math.floor(movie_details?.runtime / 60)) *
                    60,
                )}{" "}
                min
              </span>
            </div>
          </div>
          <div>
            <button className="bg-[#221F3D] p-3 rounded-xl hover:bg-[#3E3665] transition-colors ease-in-out flex items-center gap-2 flex-nowrap">
              <span>
                <Image
                  src={`/rating.svg`}
                  alt="star"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
              </span>
              {Math.round(movie_details?.vote_average * 10) / 10}/10 (
              {movie_details?.vote_count > 1000
                ? (movie_details?.vote_count / 1000).toFixed(1) + "K"
                : movie_details?.vote_count}
              )
            </button>
          </div>
        </div>
        {/* movie poster and trailer */}
        <div className="flex flex-col items-center mt-10 gap-5 md:flex-row">
          <div className="md:max-w-[302px] h-[450px] w-full overflow-hidden rounded-3xl">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie_details.backdrop_path}`}
              alt={movie_details.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              width={1280}
              height={720}
              className="h-full w-full rounded-3xl object-cover object-center"
            />
          </div>
          <div className="w-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${movie_videos?.results[0]?.key}`}
              title="YouTube video player"
              allowFullScreen
              className="w-full h-[450px] rounded-3xl"
            ></iframe>
          </div>
        </div>
        {/* movie details */}
        <div className="mt-10">
          <div>
            <button className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-[#121212] rounded px-3 py-2 hover:from-[#AB8BFF] hover:to-[#D6C7FF] transition-colors ease-in-out">
              <Link href="/">Visit Homepage</Link>
            </button>
            <div
              className="grid grid-cols-[minmax(0,100px)_1fr] grid-auto-rows: auto;
 gap-x-5 gap-y-3 mt-10"
            >
              <div>Generes</div>
              <div className="flex gap-4 flex-wrap">
                {movie_details?.genres.map((genre: any, idx: number) => (
                  <button key={idx} className="bg-[#221F3D] px-3 py-2">
                    {genre.name}{" "}
                  </button>
                ))}
              </div>
              <div>Overview</div>
              <div>{movie_details?.overview}</div>
              <div>status</div>
              <div>{movie_details?.status}</div>
              <div>Release date</div>
              <div>
                {new Date(movie_details?.release_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              </div>
              <div>Production companies</div>
              <div>
                {movie_details?.production_companies.map(
                  (company: any, idx: number) => {
                    const isFirst = idx === 0;
                    return (
                      <span key={idx} className="text-amber-50 mr-2">
                        <span className="mr-2"> {!isFirst && "• "}</span>
                        {company.name}
                      </span>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
