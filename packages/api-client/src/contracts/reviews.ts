import { initContract } from "@ts-rest/core";
import { ReviewResponse } from "../types";
import { z } from "zod";
import { NewReview, Review, UpdateReview } from "database";

const c = initContract();

export const reviewsContract = c.router(
  {
    getReviews: {
      method: "GET",
      path: "/",
      responses: {
        200: c.type<ReviewResponse[]>(),
        404: c.type<{ message: string }>(),
      },
    },
    addReview: {
      method: "POST",
      path: "/",
      body: c.type<Omit<NewReview, "userId">>(),
      responses: {
        200: c.type<Review>(),
      },
    },
    editReview: {
      method: "PATCH",
      path: "/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      body: c.type<Omit<UpdateReview, "userId">>(),
      responses: {
        200: c.type<Review>(),
      },
    },
    deleteReview: {
      method: "DELETE",
      path: "/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      body: z.object({}),
      responses: {
        200: c.type<Review>(),
      },
    },
    getReviewByMovieId: {
      method: "GET",
      path: "/movies/:id",
      pathParams: z.object({
        id: z.string().transform(Number),
      }),
      responses: {
        200: c.type<Review>(),
        404: c.type<{ message: string }>(),
      },
    },
  },
  { pathPrefix: "/reviews" }
);
