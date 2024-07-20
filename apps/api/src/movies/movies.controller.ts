import { Controller, Req } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.movies.getGenres)
  async getGenres() {
    return tsRestHandler(contract.movies.getGenres, async ({ query }) => {
      const genres = await this.moviesService.fetchGenres(query.id);

      return { status: 200, body: genres };
    });
  }

  @TsRestHandler(contract.movies.getDiscover)
  async getDiscover(@Req() req: Request) {
    return tsRestHandler(contract.movies.getDiscover, async ({ query }) => {
      const { page, ...filters } = query;

      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const discoverResult = await this.moviesService.fetchDiscoverMovies(
        userId,
        page ?? 1,
        filters
      );

      return { status: 200, body: discoverResult };
    });
  }

  @TsRestHandler(contract.movies.getTrending)
  async getTrendingMovies(@Req() req: Request) {
    return tsRestHandler(contract.movies.getTrending, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const trendingResult =
        await this.moviesService.fetchTrendingMovies(userId);

      return { status: 200, body: trendingResult };
    });
  }

  @TsRestHandler(contract.movies.getMovie)
  async getMovie(@Req() req: Request) {
    return tsRestHandler(contract.movies.getMovie, async ({ params }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const movie = await this.moviesService.fetchMovie(userId, params.movieId);

      if (!movie)
        return {
          status: 404,
          body: { message: "Could not find movie with given id" },
        };

      return { status: 200, body: movie };
    });
  }

  @TsRestHandler(contract.movies.getMovieMedia)
  async getMovieMedia() {
    return tsRestHandler(contract.movies.getMovieMedia, async ({ params }) => {
      const trailer = await this.moviesService.fetchMovieTrailer(
        params.movieId
      );
      const pictures = await this.moviesService.fetchMoviePictures(
        params.movieId
      );

      if (!trailer && !pictures.length)
        return {
          status: 404,
          body: { message: "Could not find requested media" },
        };

      return { status: 200, body: { trailer, pictures } };
    });
  }
}
