export interface Expense {
    id: bigint,
    date: Date,
    description: string,
    price_in_cents: number,
    category_id: bigint,
};

export interface ExpenseFilters {
    fromDate?: string,
    toDate?: string,
    description?: string,
    minimumPriceInCents?: number,
    maximumPriceInCents?: number,
    categoryID?: bigint,
}