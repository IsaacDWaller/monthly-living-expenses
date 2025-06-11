import { Category } from "@/app/lib/categories/definitions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getCategories(): Promise<Category[]> {
    return await sql`SELECT * FROM categories ORDER BY name` as Category[];
}