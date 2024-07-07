"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { MdMovieEdit } from "react-icons/md";
import { BiCalendarStar, BiStar, BiTime } from "react-icons/bi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useRef } from "react";
import { type MovieResponse } from "~/lib/movie-api/types";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import type { Filters } from "~/lib/hooks/filter/types";

function MovieList({
  queryFn,
}: {
  queryFn: (page: number, filters?: Filters) => Promise<MovieResponse>;
}) {
  const { filters } = useFilterSearchParams();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: async ({ pageParam }) => queryFn(pageParam, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _pages) =>
        lastPage.total_results ? lastPage.page + 1 : undefined,
    });

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
        <Fragment key={page.page}>
          {page.results.map((movie) => (
            <li
              key={movie.id}
              ref={lastElementRef}
              className="dark group relative flex aspect-[6/8] flex-col justify-between overflow-hidden rounded-md border-2 transition-all hover:scale-105 hover:border-primary has-[[data-state=open]]:scale-105 has-[[data-state=open]]:border-primary"
            >
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  fill
                  alt="a"
                  className="-z-20 object-cover"
                />
              )}

              {/* Darken effect */}
              <div className="absolute -z-10 h-full w-full bg-gradient-to-t from-background to-transparent to-30%"></div>
              <div className="absolute -z-10 h-full w-full translate-y-full bg-gradient-to-t from-background from-70% to-transparent opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-30 group-has-[[data-state=open]]:translate-y-0 group-has-[[data-state=open]]:opacity-30"></div>

              <div className="mt-2 flex flex-col gap-2">
                <div className="flex w-fit items-center gap-2 rounded-r-md bg-primary px-3 py-1.5 text-primary-foreground transition-transform">
                  <BiStar className="text-lg" /> {movie.vote_average}/10
                </div>

                <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0">
                  <BiTime className="text-lg" /> 1h 35mins
                </div>

                <Select>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "w-fit -translate-x-full gap-2 rounded-l-none border-0 transition-transform focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0",
                    )}
                    icon={<MdMovieEdit />}
                  >
                    <SelectValue placeholder="Add to list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Completed</SelectItem>
                    <SelectItem value="dark">Plan to watch</SelectItem>
                    <SelectItem value="system">Dropped</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0">
                  <BiCalendarStar className="text-lg" />
                  {new Date(movie.release_date).toDateString()}
                </div>
              </div>

              <p className="p-2 font-semibold  text-primary-foreground">
                {movie.title}
              </p>
            </li>
          ))}
        </Fragment>
      ))}

      <li className="col-span-full mt-8 animate-pulse text-center">
        Loading...
      </li>
    </ul>
  );
}

export default MovieList;