import { Category } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export async function getCategories() {
    await sql`
        CREATE TABLE IF NOT EXISTS categories (
            name VARCHAR(64) PRIMARY KEY,
            emoji VARCHAR(2)
        )
    `;

    const response = await sql`SELECT * FROM categories`;
    return response as Category[];
}