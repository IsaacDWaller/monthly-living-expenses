"use server";

import { State } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

const CategorySchema = z.object({
    name: z.string().trim()
        .min(1, { message: "The name field doesn't contain any characters." })
        .max(64, { message: "The name field contains more than 64 characters." }),
    emoji: z.string().emoji(),
});

export async function createCategory(previousState: State, formData: FormData) {
    const parseResult = CategorySchema.safeParse({
        name: formData.get("name"),
        emoji: formData.get("emoji"),
    });

    if (!parseResult.success) {
        const errorMessages = parseResult.error.errors.map(error => (
            error.message
        ));

        return { isError: true, messages: errorMessages };
    }

    const category = {
        name: parseResult.data.name.trim(),
        emoji: parseResult.data.emoji,
    };

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${category.name}
    `;

    if (existingCategories.length) {
        return {
            isError: true,
            messages: ["A category with this name already exists."]
        }
    }

    await sql`
        CREATE TABLE IF NOT EXISTS categories (
            name VARCHAR(64) PRIMARY KEY,
            emoji VARCHAR(2)
        )
    `;

    await sql`
        INSERT INTO categories
        VALUES (${category.name}, ${category.emoji})
    `;

    revalidatePath("/");
    redirect("/");
}

export async function deleteCategory(name: string) {
    await sql`DELETE FROM categories WHERE name = ${name}`;
    const existingCategories = await sql`SELECT 1 FROM categories`;

    if (!existingCategories.length) {
        await sql`DROP TABLE categories`;
    }

    revalidatePath("/");
    redirect("/");
}