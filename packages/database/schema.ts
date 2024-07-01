import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `mt_${name}`);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  providerId: text("provider_id"),
  username: text("username").notNull(),
  email: text("email").notNull(),
  picture: text("picture").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts),
// }));

// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull()
//     .defaultNow(),
//   userId: integer("user_id").notNull(),
// });

// export const postsRelations = relations(posts, ({ one }) => ({
//   takeout: one(users, {
//     fields: [posts.userId],
//     references: [users.id],
//   }),
// }));
