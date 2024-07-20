import { initContract } from "@ts-rest/core";
import { NewFavouriteMovie, FavouriteMovie } from "database";
import { Movie } from "../types";
import { z } from "zod";

const c = initContract();

export const favouritesContract = c.router(
  {
    getFavouriteMovies: {
      method: "GET",
      path: "/movies",
      responses: {
        200: c.type<Movie[]>(),
      },
    },
    addToFavourites: {
      method: "POST",
      path: "/",
      body: c.type<Omit<NewFavouriteMovie, "userId">>(),
      responses: {
        200: c.type<FavouriteMovie>(),
      },
    },
    deleteFromFavourites: {
      method: "DELETE",
      path: "/:movieId",
      pathParams: z.object({
        movieId: z.string().transform(Number),
      }),
      body: z.object({}),
      responses: {
        200: c.type<FavouriteMovie>(),
      },
    },
  },
  { pathPrefix: "/favourites" }
);
