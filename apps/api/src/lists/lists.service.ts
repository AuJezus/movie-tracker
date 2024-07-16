import { Injectable } from "@nestjs/common";
import { Movie } from "api-contract";
import {
  ListType,
  NewListMovie,
  UpdateListMovie,
  and,
  db,
  eq,
  listMovies,
  listTypes,
} from "database";
import { FavouritesService } from "src/favourites/favourites.service";
import { MoviesService } from "src/movies/movies.service";

@Injectable()
export class ListsService {
  constructor(
    private moviesService: MoviesService,
    private favouriteService: FavouritesService
  ) {}

  async getLists(userId: number) {
    const listTypes = await this.getTypes();

    const lists = await Promise.all(
      listTypes.map(async (type) => this.getList(userId, type.id, type))
    );

    return lists;
  }

  async getList(userId: number, listTypeId: number, typeObj?: ListType) {
    const type = typeObj || (await this.getType(listTypeId));

    if (!type) return null;

    const listMovies = await db.query.listMovies.findMany({
      where: (movie, { eq, and }) =>
        and(eq(movie.userId, userId), eq(movie.listTypeId, listTypeId)),
    });

    const movies: Movie[] = await Promise.all(
      listMovies.map(async (listMovie) =>
        this.moviesService.fetchMovie(userId, listMovie.movieId)
      )
    );

    return { typeId: type.id, name: type.name, movies: movies };
  }

  async addToList(userId: number, newListMovie: Omit<NewListMovie, "userId">) {
    const movie = await db
      .insert(listMovies)
      .values({ ...newListMovie, userId: userId })
      .returning();

    return movie[0];
  }

  async editMovie(
    userId: number,
    newListMovie: UpdateListMovie & { id: number }
  ) {
    const updatedMovies = await db
      .update(listMovies)
      .set({ ...newListMovie, userId: userId })
      .where(eq(listMovies.id, newListMovie.id))
      .returning();

    return updatedMovies?.[0];
  }

  async deleteMovie(userId: number, listMovieId: number) {
    const deletedMovies = await db
      .delete(listMovies)
      .where(and(eq(listMovies.userId, userId), eq(listMovies.id, listMovieId)))
      .returning();

    return deletedMovies?.[0];
  }

  async getTypes() {
    const types = await db.select().from(listTypes);

    return types;
  }

  async getType(listTypeId: number) {
    const listType = await db.query.listTypes.findFirst({
      where: (listType, { eq }) => eq(listType.id, listTypeId),
    });

    return listType;
  }

  async getListMovieByMovieId(userId: number, movieId: number) {
    const list = await db.query.listMovies.findFirst({
      where: (listMovie, { eq, and }) =>
        and(eq(listMovie.userId, userId), eq(listMovie.movieId, movieId)),
    });

    return list;
  }
}
