import Expenses from "@/app/ui/expenses/expenses";
import CreateExpense from "@/app/ui/expenses/create-expense";
import { getCategories } from "@/app/lib/categories/data";

export default async function Page() {
    const categories = await getCategories();

    return <>
        <CreateExpense categories={categories} />
        <Expenses />
    </>;
}