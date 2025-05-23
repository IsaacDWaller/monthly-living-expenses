"use server";

import { getSQL } from "@/app/lib/data";
import { Error } from "@/app/lib/definitions";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = getSQL();
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore);

const ExpenseSchema = z.object({
    date: z.string().date(),
    description: z.string().trim()
        .min(1, { message: "Please enter at least 1 character" })
        .max(64, { message: "Please enter at most 64 characters" }),
    price: z.coerce.number({ message: "Please enter a number" })
        .positive({ message: "Please enter a positive number" })
        .lte(21_474_836.47, {
            message: `Please enter at most ${new Intl.NumberFormat("en-AU", {
                style: "currency",
                currency: "AUD",
            }).format(21_474_836.47)}`
        }),
});

export async function createExpense(
    previousState: Error[],
    formData: FormData,
): Promise<Error[]> {
    const date = dayjs(
        formData.get("date")!.toString(),
        "DD/MM/YYYY",
    ).format("YYYY-MM-DD");

    const parseResult = ExpenseSchema.safeParse({
        date,
        description: formData.get("description"),
        price: formData.get("price"),
    });

    const errors = [];

    if (!dayjs(date).isSameOrBefore(dayjs())) {
        errors.push({ input: "date", helperText: "Please enter up to today" });
    }

    if (!parseResult.success) {
        errors.push(...parseResult.error.errors.map(error => ({
            input: error.path[0],
            helperText: error.message,
        } as Error)));
    }

    if (errors.length) return errors;

    const expense = {
        date,
        description: parseResult.data!.description.trim(),
        priceInCents: Math.round(parseResult.data!.price * 100),
        categoryID: formData.get("category-id"),
    };

    await sql`
        INSERT INTO expenses
        VALUES (DEFAULT, ${expense.date}, ${expense.description}, ${expense.priceInCents}, ${expense.categoryID || null})
    `;

    revalidatePath("/expenses");
    redirect("/expenses");
}

export async function updateExpense(
    id: bigint,
    previousState: Error[],
    formData: FormData,
): Promise<Error[]> {
    const date = dayjs(
        formData.get("date")!.toString(),
        "DD/MM/YYYY",
    ).format("YYYY-MM-DD");

    const parseResult = ExpenseSchema.safeParse({
        date,
        description: formData.get("description"),
        price: formData.get("price"),
    });

    const errors = [];

    if (!dayjs(date).isSameOrBefore(dayjs())) {
        errors.push({ input: "date", helperText: "Please enter up to today" });
    }

    if (!parseResult.success) {
        errors.push(...parseResult.error.errors.map(error => ({
            input: error.path[0],
            helperText: error.message,
        } as Error)));
    }

    if (errors.length) return errors;

    const expense = {
        date,
        description: parseResult.data!.description.trim(),
        priceInCents: Math.round(parseResult.data!.price * 100),
        categoryID: formData.get("category-id"),
    };

    await sql`
        UPDATE expenses
        SET date = ${expense.date}, description = ${expense.description}, price_in_cents = ${expense.priceInCents}, category_id = ${expense.categoryID || null}
        WHERE id = ${id}
    `;

    revalidatePath("/expenses");
    redirect("/expenses");
}

export async function deleteExpense(id: bigint) {
    await sql`DELETE FROM expenses WHERE id = ${id}`;
    revalidatePath("/expenses");
    redirect("/expenses");
}