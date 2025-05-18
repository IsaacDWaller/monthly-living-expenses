import { getSQL } from "@/app/lib/data";
import { Expense } from "@/app/lib/expenses/definitions";

const sql = getSQL();

export async function getExpenses(): Promise<Expense[]> {
    await sql`
        CREATE TABLE IF NOT EXISTS expenses (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            date DATE,
            description VARCHAR(64),
            price_in_cents INTEGER,
            category_name VARCHAR(64) REFERENCES categories(name)
        )
    `;

    const response = await sql`SELECT * FROM expenses ORDER BY date DESC`;
    return response as Expense[];
}