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
  },
  { pathPrefix: "/users" }
);
