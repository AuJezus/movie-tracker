import { Module } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { MoviesService } from "src/movies/movies.service";

@Module({
  controllers: [ListsController],
  providers: [ListsService, MoviesService],
})
export class ListsModule {}
