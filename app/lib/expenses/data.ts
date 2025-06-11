import { GroupedSum } from "@/app/lib/definitions";
import { Expense, ExpenseFilters } from "@/app/lib/expenses/definitions";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getExpenses(): Promise<Expense[]> {
    return (await sql`SELECT * FROM expenses ORDER BY date DESC`) as Expense[];
}

export async function getFilteredExpenses({
    fromDate,
    toDate,
    description,
    minimumPriceInCents,
    maximumPriceInCents,
    categoryID,
}: ExpenseFilters): Promise<Expense[]> {
    return (await sql`
        SELECT *
        FROM expenses
        WHERE
            (${fromDate ?? null}::DATE IS NULL OR date >= ${fromDate}) AND
            (${toDate ?? null}::DATE IS NULL OR date <= ${toDate}) AND
            (${description ?? null}::CHARACTER VARYING (64) IS NULL OR description ILIKE '%' || ${description} || '%') AND
            (${minimumPriceInCents ?? null}::INTEGER IS NULL OR price_in_cents >= ${minimumPriceInCents}) AND
            (${maximumPriceInCents ?? null}::INTEGER IS NULL OR price_in_cents <= ${maximumPriceInCents}) AND
            (${categoryID ?? null}::BIGINT IS NULL OR category_id = ${categoryID})
        ORDER BY date DESC
    `) as Expense[];
}

export async function getSumInCents(): Promise<number> {
    const data = await sql`SELECT SUM(price_in_cents) AS sum_in_cents FROM expenses`;
    return data[0]["sum_in_cents"];
}

export async function getGroupedSums(): Promise<GroupedSum[]> {
    return await sql`
        SELECT categories.name, categories.emoji, SUM(price_in_cents)
        FROM expenses
        JOIN categories
        ON category_id = categories.id
        GROUP BY categories.id
        ORDER BY SUM(price_in_cents) DESC
    ` as GroupedSum[];
}