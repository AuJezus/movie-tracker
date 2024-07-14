import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  listMovies: many(listMovies),
  favouriteMovies: many(favouriteMovies),
}));

export const listTypes = pgTable("list_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const listTypesRelations = relations(listTypes, ({ many }) => ({
  listMovies: many(listMovies),
}));

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    movieId: integer("movie_id").notNull(),
    rating: integer("rating").notNull(),
    review: text("review").notNull(),
  },
  (review) => ({ unique: unique().on(review.userId, review.movieId) })
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const listMovies = pgTable(
  "list_movies",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    movieId: integer("movie_id").notNull(),
    listTypeId: integer("list_type_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (listMovie) => ({
    uniqueListMovie: unique().on(
      listMovie.userId,
      listMovie.movieId,
      listMovie.listTypeId
    ),
    uniqueMovies: unique().on(listMovie.userId, listMovie.movieId),
  })
);

export const listMoviesRelations = relations(listMovies, ({ one }) => ({
  user: one(users, {
    fields: [listMovies.userId],
    references: [users.id],
  }),
  listType: one(listTypes, {
    fields: [listMovies.listTypeId],
    references: [listTypes.id],
  }),
}));

export const favouriteMovies = pgTable(
  "favourite_movies",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    movieId: integer("movie_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (favouriteMovie) => ({
    uniqueMovies: unique().on(favouriteMovie.userId, favouriteMovie.movieId),
  })
);

export const favouriteMoviesRelations = relations(
  favouriteMovies,
  ({ one }) => ({
    user: one(users, {
      fields: [favouriteMovies.userId],
      references: [users.id],
    }),
  })
);
