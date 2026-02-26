"use client";
import Hero from "./components/hero";
import Popular from "./components/popular";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type genre = {
  id: number;
  name: string;
};

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 2000);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: genres } = useQuery({
    queryKey: ["movie-genres"],
    queryFn: async () => {
      const res = await fetch("/api/genres");
      return res.json();
    },
  });

  const { data: movieResults } = useQuery({
    queryKey: ["search-movies", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.trim() === "") return [];
      const res = await fetch(`/api/search?query=${debouncedSearch}`);
      const data = await res.json();
      console.log(data);
      return data;
    },
    enabled: debouncedSearch.trim() !== "",
  });

  console.log(genres);
  const genresMap = useMemo(() => {
    if (!genres) return {};
    return Object.fromEntries(
      genres?.map((genre: genre) => [genre.id, genre.name]),
    );
  }, [genres]);

  return (
    <main className="min-h-screen min-w-screen bg-[#000011] overflow-hidden">
      <Hero
        search={search}
        handleSearch={handleSearch}
        movieresults={movieResults}
      />
      <Popular genresMap={genresMap} />
    </main>
  );
}
