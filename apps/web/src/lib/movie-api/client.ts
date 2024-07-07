"use server";

import { env } from "~/env";
import type { GenreResponse, MovieResponse } from "./types";
import { type Filter, type Filters } from "../hooks/filter/types";
import { defaultFilters, filterMap } from "../hooks/filter/config";

export async function fetchMoviesApi<T>(
  path: string,
  options: { params?: Record<string, string | number>; method?: "GET" } = {
    params: {},
    method: "GET",
  },
) {
  if (!path.startsWith("/")) throw new Error("Bad movie api path passed");

  const base = "https://api.themoviedb.org/3";
  const params = new URLSearchParams({
    api_key: env.MOVIE_API_KEY,
    ...options.params,
  });

  const res = await fetch(`${base}${path}?${params.toString()}`, {
    method: options.method,
  });

  const data = (await res.json()) as T;

  return data;
}

export async function fetchDiscoverMovies(page: number, filters?: Filters) {
  const params: Record<string, string | number> = { page };

  const preparedFilters = { ...defaultFilters, ...filters };

  if (filters) {
    const nonEmptyFilters = Object.entries(preparedFilters).filter(
      ([_, value]) =>
        value ? (typeof value === "string" ? true : !!value?.length) : false,
    ) as [Filter, string | string[]][];

    nonEmptyFilters.forEach(([filter, value]) => {
      if (filter === "order") return;

      if (typeof value !== "string")
        return (params[filterMap[filter]] = value.join(","));

      if (filter === "sortBy" && filters.order)
        return (params[filterMap[filter]] = `${value}.${filters.order}`);

      params[filterMap[filter]] = value;
    });
  }

  const response = await fetchMoviesApi<MovieResponse>("/discover/movie", {
    params,
  });

  return response;
}

export async function fetchMovieGenres(filterId?: number[]) {
  const response = await fetchMoviesApi<GenreResponse>("/genre/movie/list");

  if (!filterId?.length) return response;

  const filteredGenres = response.genres.filter((genre) =>
    filterId.includes(genre.id),
  );
  return { genres: filteredGenres };
}
