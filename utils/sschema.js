// src/db/schema.ts
import { pgTable, serial, text, varchar, pgEnum, integer } from "drizzle-orm/pg-core";

// Create ENUM type first
export const difficultyEnum = pgEnum('difficulty', ['Easy', 'Medium', 'Hard']);

// Users Table
export const users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    email: varchar('email').unique().notNull(),
    name: varchar('name'),
    // Add other user fields as needed
});

// Quiz Table
export const quiz = pgTable('quiz', {
    quiz_id: serial('quiz_id').primaryKey(),
    question: text('question').notNull(),
    answer: varchar('answer').notNull(),
    difficulty: difficultyEnum('difficulty').notNull(),
    user_id: integer('user_id').references(() => users.user_id),
});