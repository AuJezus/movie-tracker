import { Module, forwardRef } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { AuthModule } from "src/auth/auth.module";
import { FavouritesModule } from "src/favourites/favourites.module";
import { ListsModule } from "src/lists/lists.module";

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
  imports: [
    AuthModule,
    forwardRef(() => FavouritesModule),
    forwardRef(() => ListsModule),
  ],
})
export class MoviesModule {}
