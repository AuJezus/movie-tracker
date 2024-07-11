import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

export type MovieListType = InferSelectModel<typeof schema.listTypes>;

export type ListMovie = InferSelectModel<typeof schema.listMovies>;
export type NewListMovie = InferInsertModel<typeof schema.listMovies>;
export type UpdateListMovie = Partial<ListMovie>;

export type Review = InferSelectModel<typeof schema.reviews>;
