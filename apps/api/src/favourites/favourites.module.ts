import { Module, forwardRef } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesController } from "./favourites.controller";
import { MoviesModule } from "src/movies/movies.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
  imports: [forwardRef(() => MoviesModule), AuthModule],
})
export class FavouritesModule {}
