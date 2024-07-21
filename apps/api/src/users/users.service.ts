import { Injectable } from "@nestjs/common";
import { db } from "database";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class UsersService {
  constructor(private moviesService: MoviesService) {}

  async getUser(userId: number) {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });

    return user;
  }

  async getStats(userId: number) {
    const { id: doneTypeId } = await db.query.listTypes.findFirst({
      columns: { id: true },
      where: (type, { eq }) => eq(type.name, "completed"),
    });

    const watchedListMovies = await db.query.listMovies.findMany({
      where: (listMovie, { eq, and }) =>
        and(eq(listMovie.userId, userId), eq(listMovie.listTypeId, doneTypeId)),
      orderBy: (listMovies, { desc }) => [desc(listMovies.updatedAt)],
    });

    const watchedMovies = await Promise.all(
      watchedListMovies.map(
        async (listMovie) =>
          await this.moviesService.fetchMovie(userId, listMovie.movieId)
      )
    );
    const watchTime = watchedMovies.reduce(
      (acc, movie) => acc + movie.runtime,
      0
    );

    return {
      watchTime,
      moviesWatched: watchedListMovies.length,
      lastMovie: watchedMovies[0],
    };
  }
}
