import { getSQL } from "@/app/lib/data";

const sql = getSQL();

export async function getCategories() {
    await sql`
        CREATE TABLE IF NOT EXISTS categories (
            name VARCHAR(64) PRIMARY KEY,
            emoji VARCHAR(2)
        )
    `;

    const response = await sql`SELECT * FROM categories`;
    return response;
}