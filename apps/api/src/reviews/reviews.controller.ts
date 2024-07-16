import { Controller, Req } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.reviews.getReviews)
  async getReviews(@Req() req: Request) {
    return tsRestHandler(contract.reviews.getReviews, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const reviews = await this.reviewsService.getReviews(userId);

      return { status: 200, body: reviews };
    });
  }

  @TsRestHandler(contract.reviews.addReview)
  async addReview(@Req() req: Request) {
    return tsRestHandler(contract.reviews.addReview, async ({ body }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const newReview = await this.reviewsService.addReview(userId, body);

      return { status: 200, body: newReview };
    });
  }

  @TsRestHandler(contract.reviews.editReview)
  async editReview(@Req() req: Request) {
    return tsRestHandler(
      contract.reviews.editReview,
      async ({ params, body }) => {
        const userId = this.authService.getUserIdFromJwt(req.cookies);

        const updatedReview = await this.reviewsService.editReview(userId, {
          ...body,
          id: params.reviewId,
        });

        if (!updatedReview)
          return {
            status: 404,
            body: { message: "Could not find review with given id" },
          };

        return { status: 200, body: updatedReview };
      }
    );
  }

  @TsRestHandler(contract.reviews.deleteReview)
  async deleteReview(@Req() req: Request) {
    return tsRestHandler(contract.reviews.deleteReview, async ({ params }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const deletedReview = await this.reviewsService.deleteReview(
        userId,
        params.reviewId
      );

      if (!deletedReview)
        return {
          status: 404,
          body: { message: "Could not find review with given id" },
        };

      return { status: 200, body: deletedReview };
    });
  }

  @TsRestHandler(contract.reviews.getReviewByMovieId)
  async getReviewByMovieId(@Req() req: Request) {
    return tsRestHandler(
      contract.reviews.getReviewByMovieId,
      async ({ params }) => {
        const userId = this.authService.getUserIdFromJwt(req.cookies);

        const review = await this.reviewsService.getReviewByMovieId(
          userId,
          params.movieId
        );

        if (!review)
          return {
            status: 404,
            body: { message: "Could not find review with given movieId" },
          };

        return { status: 200, body: review };
      }
    );
  }

  @TsRestHandler(contract.reviews.getReviewedMovies)
  async getReviewedMovies(@Req() req: Request) {
    return tsRestHandler(contract.reviews.getReviewedMovies, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const reviewedMovies =
        await this.reviewsService.getReviewedMovies(userId);

      return { status: 200, body: reviewedMovies };
    });
  }
}
