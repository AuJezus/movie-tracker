import { initContract } from "@ts-rest/core";
import { helloContract } from "./contracts/hello";
import { authContract } from "./contracts/auth";
import { usersContract } from "./contracts/users";
import { moviesContract } from "./contracts/movies";
import { listsContract } from "./contracts/lists";
import { reviewsContract } from "./contracts/reviews";
import { favouritesContract } from "./contracts/favourites";

const c = initContract();

export const contract = c.router(
  {
    hello: helloContract,
    auth: authContract,
    users: usersContract,
    movies: moviesContract,
    lists: listsContract,
    reviews: reviewsContract,
    favourites: favouritesContract,
  },
  {
    commonResponses: {
      401: c.type<{
        message: "Unauthorized";
        statusCode: 401;
      }>(),
      404: c.type<{ message: string }>(),
      500: c.type<{ message: "Internal server error"; statusCode: 500 }>(),
    },
  }
);
