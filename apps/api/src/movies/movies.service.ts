import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DiscoverFilters,
  DiscoverFilter,
  MovieDetails,
  Genre,
} from "api-contract";
import { MovieImageResponse, MovieResponse, MovieVideoResponse } from "./types";
import { FavouritesService } from "src/favourites/favourites.service";
import { ListsService } from "src/lists/lists.service";

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

export interface ErrorResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

@Injectable()
export class MoviesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly favouritesService: FavouritesService,
    private readonly listService: ListsService
  ) {}

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

    const body = await res.json();

    if (!res.ok) return null;

    const data = body as T;

    return data;
  }

  async fetchMovie(userId: number, movieId: number) {
    const response = await this.fetchMoviesApi<MovieDetails>(
      `/movie/${movieId}`
    );

    if (!response) return null;

    const list = await this.listService.getListMovieByMovieId(userId, movieId);
    const favourite = await this.favouritesService.getFavourite(
      userId,
      movieId
    );

    return { ...response, list, favourite };
  }

  async fetchMovieTrailer(movieId: number) {
    const response = await this.fetchMoviesApi<MovieVideoResponse>(
      `/movie/${movieId}/videos`,
      { params: { language: "en" } }
    );

    const ytVideo = response.results.filter(
      (video) =>
        video.site.toLowerCase() === "youtube" &&
        video.type.toLowerCase() === "trailer"
    )?.[0];

    if (!ytVideo) return null;

    return ytVideo.key;
  }

  async fetchMoviePictures(movieId: number) {
    const response = await this.fetchMoviesApi<MovieImageResponse>(
      `/movie/${movieId}/images`,
      {
        params: { language: "en" },
      }
    );

    if (!response.backdrops.length) return null;

    return response.backdrops;
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

    const response = filters.query
      ? await this.fetchMoviesApi<MovieResponse>("/search/movie", {
          params: { query: filters.query, page },
        })
      : await this.fetchMoviesApi<MovieResponse>("/discover/movie", {
          params,
        });

    const moviesWithDetails = await Promise.all(
      response.results.map((movie) => this.fetchMovie(userId, movie.id))
    );

    return { ...response, results: moviesWithDetails };
  }

  async fetchTrendingMovies(userId: number) {
    const response = await this.fetchMoviesApi<MovieResponse>(
      "/trending/movie/week"
    );

    const moviesWithDetails = await Promise.all(
      response.results.map((movie) => this.fetchMovie(userId, movie.id))
    );

    return moviesWithDetails;
  }

  async fetchGenres(filterId?: number[]) {
    const response = await this.fetchMoviesApi<{ genres: Genre[] }>(
      "/genre/movie/list"
    );

    if (!filterId?.length) return response.genres;

    return response.genres.filter((genre) => filterId.includes(genre.id));
  }
}
