import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { MoviesService } from "src/movies/movies.service";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, MoviesService],
})
export class ReviewsModule {}
