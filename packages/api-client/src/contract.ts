import { initContract } from "@ts-rest/core";
import { helloContract } from "./contracts/hello";
import { authContract } from "./contracts/auth";
import { usersContract } from "./contracts/users";
import { moviesContract } from "./contracts/movies";
import { listsContract } from "./contracts/lists";
import { reviewsContract } from "./contracts/reviews";

const c = initContract();

export const unauthorizedResponse = {
  401: c.otherResponse({
    contentType: "application/json",
    body: c.type<{
      message: "Unauthorized";
      statusCode: 401;
    }>(),
  }),
};

export const contract = c.router(
  {
    hello: helloContract,
    auth: authContract,
    users: usersContract,
    movies: moviesContract,
    lists: listsContract,
    reviews: reviewsContract,
  },
  { commonResponses: { ...unauthorizedResponse } }
);
