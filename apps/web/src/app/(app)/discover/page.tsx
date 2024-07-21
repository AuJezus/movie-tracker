import Heading from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "~/lib/get-query-client";
import { initApiClient } from "~/lib/api";
import DiscoverMovieCards from "~/components/movie/discover-movie-cards";
import MovieList from "~/components/movie/movie-list";
import MovieFilter from "~/components/movie/filter/movie-filter";
import { cookies } from "next/headers";
import { getFiltersFromParams } from "~/lib/hooks/filter/utils";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover new movies",
  description: "Discover new movies or find what you are looking for.",
};

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const queryClient = getQueryClient();

  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) =>
    Array.isArray(value)
      ? value.forEach((v) => params.append(key, v))
      : params.append(key, value),
  );
  const filters = getFiltersFromParams(params);

  const discoverMovies = await initApiClient(cookies()).movies.getDiscover({
    query: { page: 1, ...filters },
  });

  queryClient.setQueryData(["movies", "discover", filters], {
    pages: [discoverMovies],
    pageParams: [1],
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

      <Hydrate state={dehydrate(queryClient)}>
        <MovieList>
          <DiscoverMovieCards />
        </MovieList>
      </Hydrate>
    </PageContainer>
  );
}
