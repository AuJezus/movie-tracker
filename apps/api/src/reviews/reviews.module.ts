import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { MoviesService } from "src/movies/movies.service";
import { AuthService } from "src/auth/auth.service";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, MoviesService, AuthService],
})
export class ReviewsModule {}
