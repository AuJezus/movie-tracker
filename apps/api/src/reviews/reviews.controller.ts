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
}
