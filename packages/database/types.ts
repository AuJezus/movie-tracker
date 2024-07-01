import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { usersTable } from "./schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;
