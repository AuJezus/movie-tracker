"use client";

import { queryApiClient } from "~/lib/api";
import MovieCard from "./movie-card";

function ListMovieCards({ typeId }: { typeId: number }) {
  const { data, isLoading } = queryApiClient.lists.getList.useQuery(
    ["lists", typeId],
    { params: { listTypeId: typeId.toString() } },
  );

  return (
    <>
      {!isLoading &&
        data?.body.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

      {!isLoading && !data?.body.movies.length && (
        <li className="col-span-full mt-8 text-center">No movies yet 😖</li>
      )}

      {isLoading && (
        <li className="col-span-full mt-8 animate-pulse text-center">
          Loading...
        </li>
      )}
    </>
  );
}

export default ListMovieCards;
