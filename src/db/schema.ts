import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectUserModel = InferSelectModel<typeof users>;
export type InsertUserModel = InferInsertModel<typeof users>;
