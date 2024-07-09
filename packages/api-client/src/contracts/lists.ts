import { initContract } from "@ts-rest/core";
import {
  MovieListType,
  NewListMovie,
  ListMovie,
  UpdateListMovie,
} from "database";
import { z } from "zod";
import { MovieList } from "../types";

const c = initContract();

export const listsContract = c.router(
  {
    getTypes: {
      method: "GET",
      path: "/types",
      responses: {
        200: c.type<MovieListType[]>(),
      },
    },
    getType: {
      method: "GET",
      path: "/types/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: c.type<MovieListType>(),
        404: z.object({
          message: z.string(),
        }),
      },
    },
    getLists: {
      method: "GET",
      path: "/",
      responses: {
        200: c.type<MovieList[]>(),
      },
    },
    getList: {
      method: "GET",
      path: "/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: c.type<MovieList>(),
      },
    },
    addToList: {
      method: "POST",
      path: "/listMovie",
      body: c.type<Omit<NewListMovie, "userId">>(),
      responses: {
        200: c.type<ListMovie>(),
      },
    },
    editListMovie: {
      method: "PATCH",
      path: "/listMovie/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      body: c.type<Omit<UpdateListMovie, "userId">>(),
      responses: {
        200: c.type<ListMovie>(),
      },
    },
  },
  { pathPrefix: "/lists" }
);
