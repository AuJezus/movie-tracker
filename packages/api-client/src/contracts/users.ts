import { initContract } from "@ts-rest/core";
import { User } from "database";

const c = initContract();

export const usersContract = c.router(
  {
    getCurrent: {
      method: "GET",
      path: "/current",
      responses: {
        200: c.type<{ user: User }>(),
      },
    },

    getStats: {
      method: "GET",
      path: "/stats",
      responses: {
        200: c.type<{
          watchTime: number;
          moviesWatched: number;
          lastMovieTitle?: string;
        }>(),
      },
    },
  },
  { pathPrefix: "/users" }
);
