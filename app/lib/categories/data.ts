import { Category } from "@/app/lib/categories/definitions";
import { getSQL } from "@/app/lib/data";

const sql = getSQL();

export async function getCategories(): Promise<Category[]> {
    const response = await sql`SELECT * FROM categories ORDER BY name`;
    return response as Category[];
}