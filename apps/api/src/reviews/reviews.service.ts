import { Injectable } from "@nestjs/common";
import { db } from "database";
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
}
