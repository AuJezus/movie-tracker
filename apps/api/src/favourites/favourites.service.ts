import { Injectable } from "@nestjs/common";
import { and, db, eq, favouriteMovies } from "database";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class FavouritesService {
  constructor(private readonly moviesService: MoviesService) {}

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

    const listMovies = await Promise.all(
      favouriteMovies.map(
        async (favouriteMovie) =>
          await db.query.listMovies.findFirst({
            where: (listMovie, { eq, and }) =>
              and(
                eq(listMovie.userId, userId),
                eq(listMovie.movieId, favouriteMovie.movieId)
              ),
          })
      )
    );

    const movies = await Promise.all(
      favouriteMovies.map(async (favouriteMovie) => {
        const movieWithDetails = await this.moviesService.fetchMovieDetails(
          favouriteMovie.movieId
        );

        const listMovie = listMovies.find(
          (lm) => lm?.movieId === favouriteMovie.movieId
        );

        if (listMovie) movieWithDetails.list = listMovie;

        return { ...movieWithDetails, favourite: { ...favouriteMovie } };
      })
    );

    return movies;
  }
}
