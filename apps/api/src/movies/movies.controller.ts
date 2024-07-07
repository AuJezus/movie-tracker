import { Controller } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @TsRestHandler(contract.movies.getDiscover)
  async discover() {
    return tsRestHandler(contract.movies.getDiscover, async ({ query }) => {
      const page = query.page;
      delete query.page;
      const res = await this.moviesService.fetchDiscoverMovies(
        page ?? 1,
        query
      );

      return { status: 200, body: res };
    });
  }

  @TsRestHandler(contract.movies.getGenres)
  async genres() {
    return tsRestHandler(contract.movies.getGenres, async ({ query }) => {
      const res = await this.moviesService.fetchGenres(query.id);

      return { status: 200, body: res };
    });
  }

  @TsRestHandler(contract.movies.getMovieDetails)
  async movieDetails() {
    return tsRestHandler(
      contract.movies.getMovieDetails,
      async ({ params }) => {
        const res = await this.moviesService.fetchMovieDetails(params.id);

        return { status: 200, body: res };
      }
    );
  }
}
