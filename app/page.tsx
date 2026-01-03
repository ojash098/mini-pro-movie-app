"use client";
import Hero from "./components/hero";
import Popular from "./components/popular";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type genre = {
  id: number;
  name: string;
};
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const baseUrl = "https://api.themoviedb.org/3";
const genre_url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`;

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data: genres } = useQuery({
    queryKey: ["movie-genres"],
    queryFn: async () => {
      const res = await fetch(genre_url);
      const genres = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch genres");
      }
      return genres.genres;
    },
  });

  const { data: movieResults } = useQuery({
    queryKey: ["search-movies", search],
    queryFn: async () => {
      if (search.trim() === "") return [];
      const res = await fetch(
        `${baseUrl}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          search
        )}&language=en-US&page=1&include_adult=false`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch search results");
      }
      return data.results;
    },
    enabled: search.trim() !== "",
  });

  console.log(genres);
  const genresMap = useMemo(() => {
    if (!genres) return [];
    return Object.fromEntries(
      genres?.map((genre: genre) => [genre.id, genre.name])
    );
  }, [genres]);

  return (
    <main className="min-h-screen min-w-screen bg-[#000011] overflow-hidden">
      <Hero
        search={search}
        handleSearch={handleSearch}
        movieresults={movieResults}
      />
      <Popular baseUrl={baseUrl} genresMap={genresMap} API_KEY={API_KEY} />
    </main>
  );
}
