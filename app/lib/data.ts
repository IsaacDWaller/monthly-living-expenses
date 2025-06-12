import { GroupedSum } from "@/app/lib/definitions";
import { neon } from "@neondatabase/serverless";
import dayjs, { ManipulateType } from "dayjs";

const sql = neon(process.env.DATABASE_URL!);

function getUnit(time: string): ManipulateType {
    return time.split("-")[1] as ManipulateType;
}

export async function getSumInCents(time: string): Promise<number> {
    const fromDate = time !== "all-time" ?
        dayjs().subtract(1, getUnit(time)) :
        null;

    const data = await sql`
        SELECT SUM(price_in_cents)
        AS sum_in_cents
        FROM expenses
        WHERE (${fromDate ?? null}::DATE IS NULL OR date >= ${fromDate})
    `;

    return data[0]["sum_in_cents"];
}

export async function getGroupedSums(time: string): Promise<GroupedSum[]> {
    const fromDate = time !== "all-time" ?
        dayjs().subtract(1, getUnit(time)) :
        null;

    return await sql`
        SELECT categories.name, categories.emoji, SUM(price_in_cents)
        FROM expenses
        JOIN categories
        ON category_id = categories.id
        WHERE (${fromDate ?? null}::DATE IS NULL OR date >= ${fromDate})
        GROUP BY categories.id
        ORDER BY SUM(price_in_cents) DESC
    ` as GroupedSum[];
}