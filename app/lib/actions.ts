"use server";

import { Category } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";
import GraphemeSplitter from "grapheme-splitter";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

const CategorySchema = z.object({
    name: z.string().trim()
        .min(1, { message: "The name must be at least 1 character." })
        .max(64, { message: "The name must be at most 64 characters." }),
    emoji: z.string().emoji({ message: "The emoji must be an emoji." }),
});

const splitter = new GraphemeSplitter();

export async function createCategory(formData: FormData) {
    const parseResult = CategorySchema.safeParse({
        name: formData.get("name"),
        emoji: formData.get("emoji"),
    });

    if (!parseResult.success) {
        const errors = parseResult.error.flatten().fieldErrors;
        console.error(errors);
        return errors;
    }

    const category = {
        name: parseResult.data.name.trim(),
        emoji: parseResult.data.emoji,
    };

    const existingCategories = await sql`
        SELECT 1
        FROM categories
        WHERE name = ${category.name}
    ` as Category[];

    if (existingCategories.length) {
        const errors = { name: "A category with this name already exists." };
        console.error(errors);
        return errors;
    }

    if (splitter.countGraphemes(category.emoji) < 1) {
        const errors = { name: "The emoji contains less than 1 emoji." };
        console.error(errors);
        return errors;
    }

    if (splitter.countGraphemes(category.emoji) > 1) {
        const errors = { name: "The emoji contains more than 1 emoji." };
        console.error(errors);
        return errors;
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