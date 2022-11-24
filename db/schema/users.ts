// Users - Table
import { pgTable, text, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull(),
  clerkId: text().notNull(),
  signInType: text().notNull(),
  createdAt: timestamp({ mode: 'string' }).defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).defaultNow(),
  isVerified: boolean().default(false).notNull(),
});
