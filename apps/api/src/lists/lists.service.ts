import { Injectable } from "@nestjs/common";
import {
  MovieListType,
  NewListMovie,
  UpdateListMovie,
  and,
  db,
  eq,
  listMovies,
  listTypes,
} from "database";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class ListsService {
  constructor(private moviesService: MoviesService) {}

  async getTypes() {
    const types = await db.select().from(listTypes);

    return types;
  }

  async getType(id: number) {
    const listType = await db.query.listTypes.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    return listType;
  }

  async getUserLists(userId: number) {
    const listTypes = await this.getTypes();

    const lists = await Promise.all(
      listTypes.map(async (type) => this.getUserList(userId, type.id, type))
    );

    return lists;
  }

  async getUserList(
    userId: number,
    listTypeId: number,
    typeObj?: MovieListType
  ) {
    const type = typeObj || (await this.getType(listTypeId));

    if (!type) return null;

    const listMovies = await db.query.listMovies.findMany({
      where: (movie, { eq, and }) =>
        and(eq(movie.userId, userId), eq(movie.listTypeId, listTypeId)),
    });

    const movies = await Promise.all(
      listMovies.map(async (listMovie) => ({
        ...(await this.moviesService.fetchMovieDetails(listMovie.movieId)),
        list: { listMovieId: listMovie.id, typeId: type.id },
      }))
    );

    return { typeId: type.id, name: type.name, movies: movies };
  }

  async addNewMovie(
    userId: number,
    newListMovie: Omit<NewListMovie, "userId">
  ) {
    // TODO: Check if added, because if it's already added we can have an error
    const movie = await db
      .insert(listMovies)
      .values({ ...newListMovie, userId: userId })
      .returning();

    return movie[0];
  }

  async editListMovie(
    userId: number,
    newListMovie: UpdateListMovie & { id: number }
  ) {
    const movie = await db
      .update(listMovies)
      .set({ ...newListMovie, userId: userId })
      .where(eq(listMovies.id, newListMovie.id))
      .returning();

    return movie[0];
  }

  async deleteListMovie(userId, listMovieId) {
    const deletedListMovies = await db
      .delete(listMovies)
      .where(and(eq(listMovies.userId, userId), eq(listMovies.id, listMovieId)))
      .returning();

    return deletedListMovies?.[0];
  }
}
