import { Module, forwardRef } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { ListsController } from "./lists.controller";
import { MoviesModule } from "src/movies/movies.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [ListsController],
  providers: [ListsService],
  exports: [ListsService],
  imports: [forwardRef(() => MoviesModule), AuthModule],
})
export class ListsModule {}
