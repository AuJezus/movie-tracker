import { initContract } from "@ts-rest/core";
import { NewReview, Review, UpdateReview } from "database";
import { Movie } from "../types";
import { z } from "zod";

const c = initContract();

export const reviewsContract = c.router(
  {
    getReviews: {
      method: "GET",
      path: "/",
      responses: {
        200: c.type<Review[]>(),
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
      path: "/:reviewId",
      pathParams: z.object({
        reviewId: z.string().transform(Number),
      }),
      body: c.type<Omit<UpdateReview, "userId">>(),
      responses: {
        200: c.type<Review>(),
      },
    },
    deleteReview: {
      method: "DELETE",
      path: "/:reviewId",
      pathParams: z.object({
        reviewId: z.string().transform(Number),
      }),
      body: z.object({}),
      responses: {
        200: c.type<Review>(),
      },
    },

    getReviewByMovieId: {
      method: "GET",
      path: "/movies/:movieId",
      pathParams: z.object({
        movieId: z.string().transform(Number),
      }),
      responses: {
        200: c.type<Review>(),
      },
    },
    getReviewedMovies: {
      method: "GET",
      path: "/movies",
      responses: {
        200: c.type<(Movie & { review: Review })[]>(),
      },
    },
  },
  { pathPrefix: "/reviews" }
);
