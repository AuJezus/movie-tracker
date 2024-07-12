import { Injectable } from "@nestjs/common";
import { NewReview, UpdateReview, and, db, eq, reviews } from "database";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class ReviewsService {
  constructor(private moviesService: MoviesService) {}

  async getReviews(userId: number) {
    const reviews = await db.query.reviews.findMany({
      where: (review, { eq }) => eq(review.userId, userId),
    });

    const reviewsWithMovieData = await Promise.all(
      reviews.map(async (review) => {
        const movie = await this.moviesService.fetchMovieDetails(
          review.movieId
        );

        return { ...review, movie };
      })
    );

    return reviewsWithMovieData;
  }

  async addReview(userId: number, newReview: Omit<NewReview, "userId">) {
    const review = await db
      .insert(reviews)
      .values({ ...newReview, userId })
      .returning();

    return review[0];
  }

  async editReview(userId: number, newReview: UpdateReview & { id: number }) {
    const review = await db
      .update(reviews)
      .set({ ...newReview, userId: userId })
      .where(and(eq(reviews.id, newReview.id), eq(reviews.userId, userId)))
      .returning();

    return review[0];
  }

  async deleteReview(userId: number, reviewId: number) {
    const delReview = await db
      .delete(reviews)
      .where(and(eq(reviews.userId, userId), eq(reviews.id, reviewId)))
      .returning();

    return delReview[0];
  }

  async getReviewByMovieId(userId, movieId) {
    const review = await db.query.reviews.findFirst({
      where: (review, { eq, and }) =>
        and(eq(review.userId, userId), eq(review.movieId, movieId)),
    });

    return review;
  }
}
