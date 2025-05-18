"use server";

import { getSQL } from "@/app/lib/data";
import { Error } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = getSQL();

const CategorySchema = z.object({
    name: z.string().trim()
        .min(1, { message: "Please enter at least 1 character" })
        .max(64, { message: "Please enter at most 64 characters" }),
    emoji: z.string().emoji(),
});

export async function createCategory(previousState: Error[], formData: FormData): Promise<Error[]> {
    const parseResult = CategorySchema.safeParse({
        name: formData.get("name"),
        emoji: formData.get("emoji"),
    });

    if (!parseResult.success) {
        return parseResult.error.errors.map(error => ({
            input: error.path[0],
            helperText: error.message,
        } as Error));
    }

    await sql`
        CREATE TABLE IF NOT EXISTS categories (
            name VARCHAR(64) PRIMARY KEY,
            emoji VARCHAR(2)
        )
    `;

    const { name, emoji } = parseResult.data;
    const trimmedName = name.trim();

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${trimmedName}
    `;

    if (existingCategories.length) {
        return [{ input: "name", helperText: "Please enter a unique name" }]
    }

    await sql`
        INSERT INTO categories
        VALUES (${trimmedName}, ${emoji})
    `;

    revalidatePath("/categories");
    redirect("/categories");
}

export async function updateCategory(
    extras: { oldName: string },
    previousState: Error[],
    formData: FormData,
): Promise<Error[]> {
    const parseResult = CategorySchema.safeParse({
        name: formData.get("name"),
        emoji: formData.get("emoji"),
    });

    if (!parseResult.success) {
        return parseResult.error.errors.map(error => ({
            input: error.path[0],
            helperText: error.message,
        } as Error));
    }

    const { name, emoji } = parseResult.data;
    const trimmedName = name.trim();

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${trimmedName}
    `;

    if (existingCategories.length) {
        return [{ input: "name", helperText: "Please enter a unique name" }]
    }

    await sql`
        UPDATE categories
        SET name = ${trimmedName}, emoji = ${emoji}
        WHERE name = ${extras.oldName}
    `;

    revalidatePath("/categories");
    redirect("/categories");
}

export async function deleteCategory(name: string) {
    await sql`DELETE FROM categories WHERE name = ${name}`;
    const existingCategories = await sql`SELECT 1 FROM categories`;

    if (!existingCategories.length) {
        await sql`DROP TABLE categories`;
    }

    revalidatePath("/categories");
    redirect("/categories");
}