"use client";
import { useQuery } from "@tanstack/react-query";
import Card from "./card";
import { useState } from "react";
import Spinner from "./spinner";

export default function AllMovies({
  genresMap,
}: {
  genresMap: { [key: number]: string };
}) {
  const [page, setPage] = useState<number>(1);
  const [sortby, setSortby] = useState("popularity.desc");

  const { data, isLoading, isLoadingError } = useQuery({
    queryKey: ["trending-movies", page, sortby],
    queryFn: async () => {
      const res = await fetch(`/api/allmovies?page=${page}&sort_by=${sortby}`);
      const data = res.json();
      return data;
    },
  });

  if (isLoadingError) {
    return <div>Error fetching data</div>;
  }
  console.log(data);

  return (
    <div className="trending lg:max-w-[1440px] md:max-w-[1024px] sm:max-w-[600px] mx-auto relative mt-10 md:mt-5 mb-20">
      <h1 className="text-amber-50 font-bold text-4xl px-5 text-center ">
        ALL MOVIES
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 align-center place-items-center gap-6 mt-14 mx-auto">
            {data &&
              data?.results?.map((movie: any, idx: number) => (
                <Card key={idx} movie={movie} genresMap={genresMap} />
              ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              className={
                page === 1
                  ? " text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed transition-normal ease-in-out "
                  : " text-amber-50 font-bold py-2 px-4 rounded"
              }
            >
              prev
            </button>
            <button>
              {data && (
                <span className="text-amber-50 font-bold py-2 px-4">
                  {page} / {data?.total_pages}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                if (data && page < data?.total_pages) {
                  setPage(page + 1);
                }
              }}
              className={
                page === data?.total_pages
                  ? "  text-gray-500 font-bold py-2 px-4 rounded cursor-not-allowed transition-normal ease-in-out "
                  : "  text-amber-50 font-bold py-2 px-4 rounded"
              }
            >
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
