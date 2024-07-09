import { initContract } from "@ts-rest/core";
import {
  DiscoverFilters,
  DiscoverMovieResponse,
  GenreResponse,
  MovieDetailsResponse,
} from "../types";
import { z } from "zod";

const c = initContract();

export const moviesContract = c.router(
  {
    getDiscover: {
      method: "GET",
      path: "/discover",
      responses: {
        200: c.type<DiscoverMovieResponse>(),
      },
      query: c.type<DiscoverFilters & { page: number }>(),
    },
    getGenres: {
      method: "GET",
      path: "/genres",
      responses: {
        200: c.type<GenreResponse>(),
      },
      query: z.object({
        id: z
          .array(z.string())
          .transform((strings) => strings.map((str) => Number(str)))
          .optional(),
      }),
    },
    getMovieDetails: {
      method: "GET",
      path: "/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: c.type<MovieDetailsResponse>(),
      },
    },
  },
  { pathPrefix: "/movies" }
);
