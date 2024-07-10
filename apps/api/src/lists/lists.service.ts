import { Injectable } from "@nestjs/common";
import {
  NewListMovie,
  UpdateListMovie,
  db,
  eq,
  listMovies,
  listTypes,
} from "database";

@Injectable()
export class ListsService {
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
      listTypes.map(async (type) => {
        const movies = await db.query.listMovies.findMany({
          where: (movie, { eq, and }) =>
            and(eq(movie.listTypeId, type.id), eq(movie.userId, userId)),
        });

        return { typeId: type.id, name: type.name, movies };
      })
    );

    return lists;
  }

  async getUserList(userId: number, listTypeId: number) {
    const type = await this.getType(listTypeId);

    if (!type) return null;

    const movies = await db.query.listMovies.findMany({
      where: (movie, { eq, and }) =>
        and(eq(movie.userId, userId), eq(movie.listTypeId, listTypeId)),
    });

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
}
