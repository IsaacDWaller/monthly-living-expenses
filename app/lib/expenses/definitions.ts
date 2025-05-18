export type Expense = {
    id: bigint,
    date: Date,
    description: string,
    price_in_cents: number,
    category_name: string,
};