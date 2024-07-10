import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MoviesService } from "src/movies/movies.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, MoviesService],
})
export class UsersModule {}
