import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    title: text("title").notNull(),
    coverImage: text("cover_image").notNull(),
    coverImagePublicId: text("cover_image_public_id").notNull(),
    projectUrl: text("project_url").notNull(),
    tags: text("tags").notNull(),
    category: text("category").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});

export const enquiries = sqliteTable("enquiries", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
        () => new Date()
    ),
});
