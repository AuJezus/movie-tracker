import { initContract } from "@ts-rest/core";
import { NewListMovie, ListMovie, UpdateListMovie, ListType } from "database";
import { MovieList } from "../types";
import { z } from "zod";

const c = initContract();

export const listsContract = c.router(
  {
    getLists: {
      method: "GET",
      path: "/",
      responses: {
        200: c.type<MovieList[]>(),
      },
    },
    getList: {
      method: "GET",
      path: "/:listTypeId",
      pathParams: z.object({
        listTypeId: z.string().transform(Number),
      }),
      responses: {
        200: c.type<MovieList>(),
      },
    },

    getListTypes: {
      method: "GET",
      path: "/types",
      responses: {
        200: c.type<ListType[]>(),
      },
    },
    getListType: {
      method: "GET",
      path: "/types/:listTypeId",
      pathParams: z.object({
        listTypeId: z.string().transform(Number),
      }),
      responses: {
        200: c.type<ListType>(),
      },
    },

    addToList: {
      method: "POST",
      path: "/movie",
      body: c.type<Omit<NewListMovie, "userId">>(),
      responses: {
        200: c.type<ListMovie>(),
      },
    },
    editMovie: {
      method: "PATCH",
      path: "/movie/:listMovieId",
      pathParams: z.object({
        listMovieId: z.string().transform(Number),
      }),
      body: c.type<Omit<UpdateListMovie, "userId">>(),
      responses: {
        200: c.type<ListMovie>(),
      },
    },
    deleteMovie: {
      method: "DELETE",
      path: "/movie/:listMovieId",
      pathParams: z.object({
        listMovieId: z.string().transform(Number),
      }),
      body: z.object({}),
      responses: {
        200: c.type<ListMovie>(),
      },
    },
  },
  { pathPrefix: "/lists" }
);
