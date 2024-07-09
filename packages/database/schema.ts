import {
  boolean,
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `mt_${name}`);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  providerId: text("provider_id").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  picture: text("picture").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const listTypes = pgTable("list_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shouldReview: boolean("should_review").default(false).notNull(),
});

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    movieId: integer("movie_id"),
    review: text("review").notNull(),
  },
  (review) => ({ unique: unique().on(review.userId, review.movieId) })
);

export const listMovies = pgTable(
  "list_movies",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    movieId: integer("movie_id").notNull(),
    listTypeId: integer("list_type_id")
      .references(() => listTypes.id)
      .notNull(),
    reviewId: integer("review_id").references(() => reviews.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (listMovie) => ({
    unique: unique().on(
      listMovie.userId,
      listMovie.movieId,
      listMovie.listTypeId
    ),
  })
);
