import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DiscoverFilters,
  DiscoverFilter,
  GenreResponse,
  MovieDetailsResponse,
} from "api-contract";
import { db } from "database";
import { MovieResponse } from "./types";

export const defaultFilters = {
  ratingFrom: "5",
  ratingTo: "10",
  runtimeFrom: "30",
  runtimeTo: "240",
  releasedFrom: new Date(2000, 0).toISOString().split("T")[0]!,
  releasedTo: new Date().toISOString().split("T")[0]!,
};

export const filterMap = {
  genre: "with_genres",
  ratingFrom: "vote_average.gte",
  ratingTo: "vote_average.lte",
  runtimeFrom: "with_runtime.gte",
  runtimeTo: "with_runtime.lte",
  releasedFrom: "primary_release_date.gte",
  releasedTo: "primary_release_date.lte",
  sortBy: "sort_by",
};

@Injectable()
export class MoviesService {
  constructor(private readonly configService: ConfigService) {}

  async fetchMoviesApi<T>(
    path: string,
    options: { params?: Record<string, string | number>; method?: "GET" } = {
      params: {},
      method: "GET",
    }
  ) {
    if (!path.startsWith("/")) throw new Error("Bad movie api path passed");

    const base = "https://api.themoviedb.org/3";
    const params = new URLSearchParams({
      api_key: this.configService.get("MOVIE_API_KEY"),
      ...options.params,
    });

    const res = await fetch(`${base}${path}?${params.toString()}`, {
      method: options.method,
    });

    const data = (await res.json()) as T;

    return data;
  }

  async fetchDiscoverMovies(
    userId: number,
    page: number,
    filters?: DiscoverFilters
  ) {
    const params: Record<string, string | number> = { page };

    const preparedFilters = { ...defaultFilters, ...filters };

    if (filters) {
      const nonEmptyFilters = Object.entries(preparedFilters).filter(
        ([, value]) =>
          value ? (typeof value === "string" ? true : !!value?.length) : false
      ) as [DiscoverFilter, string | string[]][];

      nonEmptyFilters.forEach(([filter, value]) => {
        if (filter === "order") return;

        if (typeof value !== "string")
          return (params[filterMap[filter]] = value.join(","));

        if (filter === "sortBy" && filters.order)
          return (params[filterMap[filter]] = `${value}.${filters.order}`);

        params[filterMap[filter]] = value;
      });
    }

    const response = await this.fetchMoviesApi<MovieResponse>(
      "/discover/movie",
      {
        params,
      }
    );

    const moviesWithDetails = await Promise.all(
      response.results.map((movie) => this.fetchMovieDetails(movie.id))
    );

    const moviesWithListData = await Promise.all(
      moviesWithDetails.map(async (movie) => {
        const listMovie = await db.query.listMovies.findFirst({
          where: (listMovie, { eq, and }) =>
            and(eq(listMovie.userId, userId), eq(listMovie.movieId, movie.id)),
        });

        if (!listMovie) return movie;

        return {
          ...movie,
          list: { listMovieId: listMovie.id, typeId: listMovie.listTypeId },
        };
      })
    );

    return { ...response, results: moviesWithListData };
  }

  async fetchGenres(filterId?: number[]) {
    const response =
      await this.fetchMoviesApi<GenreResponse>("/genre/movie/list");

    if (!filterId?.length) return response;

    response.genres = response.genres.filter((genre) =>
      filterId.includes(genre.id)
    );

    return response;
  }

  async fetchMovieDetails(id: number) {
    const response = await this.fetchMoviesApi<MovieDetailsResponse>(
      `/movie/${id}`
    );

    return response;
  }
}
