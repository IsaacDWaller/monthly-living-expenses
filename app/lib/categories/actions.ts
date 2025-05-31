"use server";

import { Error } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

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
        VALUES (DEFAULT, ${trimmedName}, ${emoji})
    `;

    revalidatePath("/categories/create");
    redirect("/categories/create");
}

export async function updateCategory(
    id: bigint,
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
        WHERE id = ${id}
    `;

    revalidatePath("/categories");
    redirect("/categories");
}

export async function deleteCategory(id: bigint) {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    revalidatePath("/categories");
    redirect("/categories");
}