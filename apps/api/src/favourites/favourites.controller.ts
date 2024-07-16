import { Controller, Req } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { AuthService } from "src/auth/auth.service";
import { contract } from "api-contract";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request } from "express";

@Controller("favourites")
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.favourites.addToFavourites)
  async addToFavourites(@Req() req: Request) {
    return tsRestHandler(
      contract.favourites.addToFavourites,
      async ({ params }) => {
        const userId = this.authService.getUserIdFromJwt(req.cookies);

        const result = await this.favouritesService.addToFavourites(
          userId,
          params.movieId
        );

        return { status: 200, body: result };
      }
    );
  }

  @TsRestHandler(contract.favourites.deleteFromFavourites)
  async deleteFromFavourites(@Req() req: Request) {
    return tsRestHandler(
      contract.favourites.deleteFromFavourites,
      async ({ params }) => {
        const userId = this.authService.getUserIdFromJwt(req.cookies);

        const deletedMovie = await this.favouritesService.deleteFromFavourites(
          userId,
          params.movieId
        );

        if (!deletedMovie)
          return {
            status: 404,
            body: {
              message: "Could not find favourite movie with given movie id",
            },
          };

        return { status: 200, body: deletedMovie };
      }
    );
  }

  @TsRestHandler(contract.favourites.getFavouriteMovies)
  async getFavouriteMovie(@Req() req: Request) {
    return tsRestHandler(contract.favourites.getFavouriteMovies, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const favouriteMovies =
        await this.favouritesService.getFavouriteMovies(userId);

      return { status: 200, body: favouriteMovies };
    });
  }
}
