import { Hydrate, dehydrate } from "@tanstack/react-query";
import MovieFilterBar from "./movie-filter-bar";
import MovieFilterSettings from "./movie-filter-settings";
import { queryApiClient } from "~/lib/api";
import getQueryClient from "~/lib/get-query-client";

async function MovieFilter() {
  const queryClient = getQueryClient();

  await queryApiClient.movies.getGenres.prefetchQuery(queryClient, ["genres"]);
  await queryApiClient.lists.getTypes.prefetchQuery(queryClient, [
    "lists",
    "types",
  ]);

  return (
    <div>
      <Hydrate state={dehydrate(queryClient)}>
        <MovieFilterBar />
        <MovieFilterSettings />
      </Hydrate>
    </div>
  );
}

export default MovieFilter;
