import { Controller, Req } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayload } from "src/auth/strategies/jwt.strategy";

@Controller()
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private jwtService: JwtService
  ) {}

  @TsRestHandler(contract.reviews.getReviews)
  async getReviews(@Req() req: Request) {
    return tsRestHandler(contract.reviews.getReviews, async () => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const reviews = await this.reviewsService.getReviews(id);

      return { status: 200, body: reviews };
    });
  }

  @TsRestHandler(contract.reviews.addReview)
  async addReview(@Req() req: Request) {
    return tsRestHandler(contract.reviews.addReview, async ({ body }) => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const review = await this.reviewsService.addReview(id, body);

      return { status: 200, body: review };
    });
  }

  @TsRestHandler(contract.reviews.editReview)
  async editReview(@Req() req: Request) {
    return tsRestHandler(
      contract.reviews.editReview,
      async ({ params, body }) => {
        const { sub: id }: JwtPayload = this.jwtService.decode(
          req.cookies["access_token"]
        );

        const updatedReview = await this.reviewsService.editReview(id, {
          ...body,
          id: params.id,
        });

        return { status: 200, body: updatedReview };
      }
    );
  }

  @TsRestHandler(contract.reviews.deleteReview)
  async deleteReview(@Req() req: Request) {
    return tsRestHandler(contract.reviews.deleteReview, async ({ params }) => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const deletedReview = await this.reviewsService.deleteReview(
        id,
        params.id
      );

      return { status: 200, body: deletedReview };
    });
  }

  @TsRestHandler(contract.reviews.getReviewByMovieId)
  async getReviewByMovieId(@Req() req: Request) {
    return tsRestHandler(
      contract.reviews.getReviewByMovieId,
      async ({ params }) => {
        const { sub: id }: JwtPayload = this.jwtService.decode(
          req.cookies["access_token"]
        );

        const review = await this.reviewsService.getReviewByMovieId(
          id,
          params.id
        );

        if (!review)
          return {
            status: 404,
            body: { message: "Could not find requested review" },
          };

        return { status: 200, body: review };
      }
    );
  }
}
