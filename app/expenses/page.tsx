import CreateExpense from "@/app/ui/expenses/create-expense";
import Expenses from "@/app/ui/expenses/expenses";

export default async function Page() {
    return <>
        <CreateExpense />
        <Expenses />
    </>;
}