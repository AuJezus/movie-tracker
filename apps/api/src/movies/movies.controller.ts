import { Controller, Req } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/strategies/jwt.strategy";
import { Request } from "express";

@Controller()
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private jwtService: JwtService
  ) {}

  @TsRestHandler(contract.movies.getDiscover)
  async getDiscover(@Req() req: Request) {
    return tsRestHandler(contract.movies.getDiscover, async ({ query }) => {
      const page = query.page;
      delete query.page;

      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const res = await this.moviesService.fetchDiscoverMovies(
        id,
        page ?? 1,
        query
      );

      return { status: 200, body: res };
    });
  }

  @TsRestHandler(contract.movies.getGenres)
  async getGenres() {
    return tsRestHandler(contract.movies.getGenres, async ({ query }) => {
      const res = await this.moviesService.fetchGenres(query.id);

      return { status: 200, body: res };
    });
  }

  @TsRestHandler(contract.movies.getMovieDetails)
  async getMovieDetails() {
    return tsRestHandler(
      contract.movies.getMovieDetails,
      async ({ params }) => {
        const movie = await this.moviesService.fetchMovieDetails(params.id);

        if (!movie)
          return {
            status: 404,
            body: { message: "Could not find requested movie" },
          };

        return { status: 200, body: movie };
      }
    );
  }

  @TsRestHandler(contract.movies.getMovieMedia)
  async getMovieTrailer() {
    return tsRestHandler(contract.movies.getMovieMedia, async ({ params }) => {
      const ytKey = await this.moviesService.fetchMovieTrailer(params.id);
      const pictures = await this.moviesService.fetchMoviePictures(params.id);

      if (!ytKey && !pictures)
        return {
          status: 404,
          body: { message: "Could not find requested media" },
        };

      return { status: 200, body: { ytKey, pictures } };
    });
  }
}
