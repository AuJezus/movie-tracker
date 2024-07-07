import Heading from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import MovieList from "~/components/movie/movie-list";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import MovieFilter from "~/components/movie/movie-filter";
import getQueryClient from "~/lib/get-query-client";
import { queryApiClient } from "~/lib/api";

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | null>;
}) {
  const queryClient = getQueryClient();

  await queryApiClient.movies.getDiscover.prefetchInfiniteQuery(
    queryClient,
    ["movies", "discover", {}],
    ({ pageParam = 1, queryKey }) => ({
      query: { page: pageParam, ...queryKey[2]! },
    }),
  );

  return (
    <PageContainer>
      <Heading level="h1">Discover New Movies</Heading>

      <p className="mb-8 max-w-4xl">
        Explore a vast collection of movies from all genres and eras. Find
        hidden gems, trending blockbusters, and timeless classics. Dive in and
        start your cinematic adventure! 🍿🎥✨
      </p>

      <MovieFilter />

      <Hydrate state={dehydrate(queryClient)}>
        <MovieList />
      </Hydrate>
    </PageContainer>
  );
}
