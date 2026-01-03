import Image from "next/image";
import Link from "next/link";

interface MOVIE {
  poster_path: string;
  title: string;
  genre_ids: number[];
  id: number;
}

export default function Card({
  movie,
  genresMap,
}: {
  movie: MOVIE;
  genresMap: object;
}) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="min-w-0 bg-[#0F0D23] w-full max-w-[300px] sm:max-w-[300px] lg:max-w-[600px] p-4 rounded-3xl flex flex-col justify-between hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
    >
      <div className="poster mb-4 max-w-60 max-h-42.5 overflow-hidden rounded-2xl">
        <Image
          src={
            `https://image.tmdb.org/t/p/w1280${movie.poster_path}` || "error"
          }
          alt="movie placeholder"
          width={500}
          height={750}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>
      <div className="details flex flex-col gap-2">
        <h3 className="text-amber-50 font-bold text-lg line-clamp-1 wrap-break-word">
          {movie.title}
        </h3>
        <div className="flex flex-nowrap items-center">
          <span>
            <Image
              src={`/rating.svg`}
              alt="star"
              width={20}
              height={20}
              className="w-4 h-4"
            />
          </span>
          <span className="line-clamp-1 wrap-break-words">
            {(movie.genre_ids || []).map((id: number, idx: number) => (
              <span className="text-[#9CA4AB] px-1 text-sm" key={idx}>
                {"• "}
                {genresMap[id]}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  );
}
