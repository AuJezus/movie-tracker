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
        const res = await this.moviesService.fetchMovieDetails(params.id);

        return { status: 200, body: res };
      }
    );
  }
}
