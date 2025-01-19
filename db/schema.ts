import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 128 }).notNull(),
});

export type User = typeof users.$inferSelect;

export const scoreBoards = pgTable("scoreboards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  userId: integer()
    .notNull()
    .references(() => users.id),
});
