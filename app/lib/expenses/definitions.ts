export type Expense = {
    id: bigint,
    date: Date,
    description: string,
    price_in_cents: number,
    category_id: bigint,
};

export type ExpenseAndCategory = {
    id: bigint,
    date: Date,
    description: string,
    price_in_cents: number,
    category_id: bigint,
    name: string,
    emoji: string,
}