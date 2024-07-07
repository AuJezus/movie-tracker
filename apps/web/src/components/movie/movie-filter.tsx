import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MovieFilterContent from "./movie-filter-bar";
import { fetchMovieGenres } from "~/lib/movie-api/client";
import MovieFilterSettings from "./movie-filter-settings";

async function MovieFilter() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: async () => await fetchMovieGenres(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieFilterContent />
      <MovieFilterSettings />
    </HydrationBoundary>
  );
}

export default MovieFilter;
