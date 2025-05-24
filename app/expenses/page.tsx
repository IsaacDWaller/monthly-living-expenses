import { getExpenses } from "@/app/lib/expenses/data";
import CreateExpense from "@/app/ui/expenses/create-expense";
import Expenses from "@/app/ui/expenses/expenses";
import { getCategories } from "@/app/lib/categories/data";

export default async function Page() {
    const expenses = await getExpenses();
    const categories = await getCategories();

    return <>
        <CreateExpense />
        <Expenses expenses={expenses} categories={categories} />
    </>;
}