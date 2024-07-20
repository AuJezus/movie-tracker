import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { and, db, eq, favouriteMovies } from "database";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class FavouritesService {
  constructor(
    @Inject(forwardRef(() => MoviesService))
    private moviesService: MoviesService
  ) {}

  async getFavourite(userId: number, movieId: number) {
    const favourite = await db.query.favouriteMovies.findFirst({
      where: (favourite, { eq, and }) =>
        and(eq(favourite.userId, userId), eq(favourite.movieId, movieId)),
    });

    return favourite;
  }

  async addToFavourites(userId: number, movieId: number) {
    const movie = await db
      .insert(favouriteMovies)
      .values({ movieId, userId: userId })
      .returning();

    return movie[0];
  }

  async deleteFromFavourites(userId: number, movieId: number) {
    const deletedListMovies = await db
      .delete(favouriteMovies)
      .where(
        and(
          eq(favouriteMovies.userId, userId),
          eq(favouriteMovies.movieId, movieId)
        )
      )
      .returning();

    return deletedListMovies?.[0];
  }

  async getFavouriteMovies(userId: number) {
    const favouriteMovies = await db.query.favouriteMovies.findMany({
      where: (movie, { eq }) => eq(movie.userId, userId),
    });

    const movies = await Promise.all(
      favouriteMovies.map(
        async (favouriteMovie) =>
          await this.moviesService.fetchMovie(userId, favouriteMovie.movieId)
      )
    );

    return movies;
  }
}
