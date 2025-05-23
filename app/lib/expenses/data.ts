import { getSQL } from "@/app/lib/data";
import { Expense } from "@/app/lib/expenses/definitions";

const sql = getSQL();

export async function getExpenses(): Promise<Expense[]> {
    const response = await sql`SELECT * FROM expenses ORDER BY date DESC`;
    return response as Expense[];
}