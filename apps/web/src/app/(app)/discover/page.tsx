import Heading from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import MovieList from "~/components/movie/movie-list";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchDiscoverMovies } from "~/lib/movie-api/client";
import MovieFilter from "~/components/movie/movie-filter";
import type { Filters } from "~/lib/hooks/filter/types";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | null>;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies"],
    queryFn: async ({ pageParam }) =>
      fetchDiscoverMovies(pageParam, searchParams as Filters),
    initialPageParam: 1,
  });

  return (
    <PageContainer>
      <Heading level="h1">Discover New Movies</Heading>

      <p className="mb-8 max-w-4xl">
        Explore a vast collection of movies from all genres and eras. Find
        hidden gems, trending blockbusters, and timeless classics. Dive in and
        start your cinematic adventure! 🍿🎥✨
      </p>

      <MovieFilter />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieList queryFn={fetchDiscoverMovies} />
      </HydrationBoundary>
    </PageContainer>
  );
}
