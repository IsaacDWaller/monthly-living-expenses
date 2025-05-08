"use server";

import { State } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z, ZodIssue } from "zod";

const sql = neon(process.env.DATABASE_URL!);

const CategorySchema = z.object({
    name: z.string().trim()
        .min(1, { message: "The name field doesn't contain any characters." })
        .max(64, { message: "The name field contains more than 64 characters." }),
    emoji: z.string().emoji(),
});

type Category = {
    name: string,
    emoji: string,
}

function parseCategory(formData: FormData) {
    return CategorySchema.safeParse({
        name: formData.get("name"),
        emoji: formData.get("emoji"),
    });
}

function getErrorMessages(errors: ZodIssue[]) {
    return errors.map(error => error.message);
}

function getCategory(categoryData: Category) {
    return {
        name: categoryData.name.trim(),
        emoji: categoryData.emoji,
    };
}

export async function createCategory(previousState: State, formData: FormData) {
    const parseResult = parseCategory(formData);

    if (!parseResult.success) {
        return { errorMessages: getErrorMessages(parseResult.error.errors) };
    }

    const category = getCategory(parseResult.data);

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${category.name}
    `;

    if (existingCategories.length) {
        return { errorMessages: ["A category with this name already exists."] };
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

export async function updateCategory(
    extras: { oldName: string },
    previousState: State,
    formData: FormData,
) {
    const parseResult = parseCategory(formData);

    if (!parseResult.success) {
        return { errorMessages: getErrorMessages(parseResult.error.errors) };
    }

    const category = getCategory(parseResult.data);

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${category.name}
    `;

    if (existingCategories.length) {
        return { errorMessages: ["A category with this name already exists."] };
    }

    await sql`
        UPDATE categories
        SET name = ${category.name}, emoji = ${category.emoji}
        WHERE name = ${extras.oldName}
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