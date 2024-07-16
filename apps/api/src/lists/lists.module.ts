import { Module } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { MoviesService } from "src/movies/movies.service";
import { AuthService } from "src/auth/auth.service";
import { FavouritesService } from "src/favourites/favourites.service";

@Module({
  controllers: [ListsController],
  providers: [ListsService, MoviesService, AuthService, FavouritesService],
})
export class ListsModule {}
