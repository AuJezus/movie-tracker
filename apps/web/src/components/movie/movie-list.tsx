"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useRef } from "react";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import { format } from "date-fns";
import MovieCard from "./movie-card";
import { queryApiClient } from "~/lib/api";
import { cn } from "~/lib/utils";

function MovieList() {
  const { filters } = useFilterSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    queryApiClient.movies.getDiscover.useInfiniteQuery(
      ["movies", "discover", filters],
      ({ pageParam = 1, queryKey }) => ({
        query: { page: pageParam, ...queryKey[2]! },
      }),
      {
        getNextPageParam: (lastPage, _pages) =>
          lastPage.status == 200
            ? lastPage.body.total_pages !== lastPage.body.page
              ? lastPage.body.page + 1
              : undefined
            : undefined,
      },
    );

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLLIElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetching) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  return (
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.pages.map((page) => (
        <Fragment key={page.body.page}>
          {page.body.results.map((movie) => (
            <MovieCard key={movie.id} ref={lastElementRef} movie={movie} />
          ))}
        </Fragment>
      ))}

      <li
        className={cn(
          "col-span-full mt-8 text-center",
          hasNextPage || (isLoading && "animate-pulse"),
        )}
      >
        {hasNextPage || isLoading ? "Loading..." : "You reached the end 😝"}
      </li>
    </ul>
  );
}

export default MovieList;
