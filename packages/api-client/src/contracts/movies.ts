import { initContract } from "@ts-rest/core";
import { DiscoverFilters, Genre, ImageInfo, Movie } from "../types";
import { z } from "zod";

const c = initContract();

export const moviesContract = c.router(
  {
    getMovie: {
      method: "GET",
      path: "/:movieId",
      pathParams: z.object({
        movieId: z.string().transform(Number),
      }),
      responses: {
        200: c.type<Movie>(),
      },
    },
    getMovieMedia: {
      method: "GET",
      path: "/:movieId/media",
      pathParams: z.object({
        movieId: z.string().transform(Number),
      }),
      responses: {
        200: c.type<{ trailer: string; pictures?: ImageInfo[] }>(),
      },
    },

    getDiscover: {
      method: "GET",
      path: "/discover",
      responses: {
        200: c.type<{
          page: number;
          results: Movie[];
          total_pages: number;
          total_results: number;
        }>(),
      },
      query: c.type<DiscoverFilters & { page: number }>(),
    },
    getTrending: {
      method: "GET",
      path: "/trending",
      responses: { 200: c.type<Movie[]>() },
    },

    getGenres: {
      method: "GET",
      path: "/genres",
      responses: {
        200: c.type<Genre[]>(),
      },
      query: z.object({
        id: z
          .array(z.string())
          .transform((strings) => strings.map((str) => Number(str)))
          .optional(),
      }),
    },
  },
  { pathPrefix: "/movies" }
);
