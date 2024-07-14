import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;
export type UpdateUser = Partial<User> & { id: number };

export type ListType = InferSelectModel<typeof schema.listTypes>;
export type NewListType = InferInsertModel<typeof schema.listTypes>;
export type UpdateListType = Partial<ListType> & { id: number };

export type ListMovie = InferSelectModel<typeof schema.listMovies>;
export type NewListMovie = InferInsertModel<typeof schema.listMovies>;
export type UpdateListMovie = Partial<ListMovie> & { id: number };

export type Review = InferSelectModel<typeof schema.reviews>;
export type NewReview = InferInsertModel<typeof schema.reviews>;
export type UpdateReview = Partial<Review> & { id: number };

export type FavouriteMovie = InferSelectModel<typeof schema.favouriteMovies>;
export type NewFavouriteMovie = InferInsertModel<typeof schema.favouriteMovies>;
export type UpdateFavouriteMovie = Partial<FavouriteMovie> & { id: number };
