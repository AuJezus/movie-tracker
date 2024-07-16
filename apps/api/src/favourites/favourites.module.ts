import { Module } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesController } from "./favourites.controller";
import { AuthService } from "src/auth/auth.service";
import { MoviesService } from "src/movies/movies.service";

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, AuthService, MoviesService],
})
export class FavouritesModule {}
