"use client";
import Image from "next/image";
import Link from "next/link";

function Hero({
  search,
  handleSearch,
  movieresults,
}: {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  movieresults: any;
}) {
  return (
    <div className="relative w-screen pt-10 flex flex-col items-center justify-center min-h-[80svh] gap-5 bg-[url('/BG.png')] bg-cover bg-center">
      <Image src="/logo.png" alt="logo" width={80} height={80} />
      <div
        className="w-64 h-64
  md:w-72 md:h-72
  lg:w-96 lg:h-96 relative"
      >
        <Image src="/hero-img.png" alt="logo" fill />
      </div>
      <h1 className="text-amber-50 font-bold text-4xl p-10 pt-0 pb-0 text-center">
        Find
        <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] text-transparent bg-clip-text">
          {" "}
          Movies{" "}
        </span>
        You’ll Love <br />
        Without the Hassle
      </h1>
      <form action="#" className="sm:w-1/2 max-w-[80%]  relative">
        <Image
          src="/search.png"
          alt="search icon"
          width={22}
          height={22}
          className="absolute top-4 left-2"
        />
        <input
          type="text"
          placeholder="Search Anything Online"
          className="w-full bg-[#0F0D23] text-amber-50 placeholder:text-[#A8B5DB] placeholder:opacity-40 p-3 pl-8"
          value={search}
          onChange={handleSearch}
        />
        {search && (
          <div>
            <div className="absolute top-13 left-0 w-full max-h-[300px] bg-gradient-to-r from-[#22124e] to-[#371688] z-10 rounded overflow-y-scroll">
              <ul className="flex flex-col gap-2 p-2">
                {movieresults && movieresults.length > 0 ? (
                  movieresults.map((movie: any, idx: number) => (
                    <li
                      key={idx}
                      className="text-amber-50 font-medium px-2 flex gap-5"
                    >
                      <Link href={`/movie/${movie.id}`} className="flex gap-3">
                        <div className="w-10 h-10 sm:h-20 sm:w-20 relative">
                          <Image
                            src={
                              `https://image.tmdb.org/t/p/w1280${movie.poster_path}` ||
                              "error"
                            }
                            alt="movie"
                            width={40}
                            height={40}
                            className="rounded object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <span className="self-center line-clamp-1">
                            {movie.title}
                          </span>
                          <span>
                            {" "}
                            ({new Date(movie.release_date).getFullYear()})
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No results found</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
export default Hero;
