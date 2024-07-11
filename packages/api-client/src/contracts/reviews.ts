import { initContract } from "@ts-rest/core";
import { ReviewResponse } from "../types";

const c = initContract();

export const reviewsContract = c.router(
  {
    getReviews: {
      method: "GET",
      path: "/",
      responses: {
        200: c.type<ReviewResponse[]>(),
      },
    },
  },
  { pathPrefix: "/reviews" }
);
