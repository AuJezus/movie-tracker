import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { MoviesModule } from "src/movies/movies.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
  imports: [MoviesModule, AuthModule],
})
export class ReviewsModule {}
