import { getCategories } from "@/app/lib/categories/data";
import CreateExpense from "@/app/ui/expenses/create-expense";
import Expenses from "@/app/ui/expenses/expenses";
import { getExpenses } from "@/app/lib/expenses/data";

export default async function Page() {
    const expenses = await getExpenses();
    const categories = await getCategories();

    return <>
        <CreateExpense categories={categories} />
        <Expenses expenses={expenses} />
    </>;
}