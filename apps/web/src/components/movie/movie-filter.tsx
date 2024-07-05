import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MovieFilterContent from "./movie-filter-content";
import { fetchMovieGenres } from "~/lib/movie-api/client";

async function MovieFilter() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: async () => await fetchMovieGenres(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieFilterContent />
    </HydrationBoundary>
  );
}

export default MovieFilter;
