import { getSQL } from "@/app/lib/data";

const sql = getSQL();

export async function getExpenses() {
    await sql`
        CREATE TABLE IF NOT EXISTS expenses (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            price_in_cents INTEGER,
            description VARCHAR(64),
            date DATE,
            category_name VARCHAR(64) REFERENCES categories(name)
        )
    `;

    const response = await sql`SELECT * FROM expenses ORDER BY date DESC`;
    return response;
}