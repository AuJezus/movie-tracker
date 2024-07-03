"use server";

import { env } from "~/env";
import type { MovieResponse } from "./types";

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

export async function fetchDiscoverMovies(page: number) {
  const response = await fetchMoviesApi<MovieResponse>("/discover/movie", {
    params: { page },
  });

  return response;
}
