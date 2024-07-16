import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { AuthService } from "src/auth/auth.service";
import { FavouritesService } from "src/favourites/favourites.service";
import { ListsService } from "src/lists/lists.service";

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, AuthService, FavouritesService, ListsService],
})
export class MoviesModule {}
