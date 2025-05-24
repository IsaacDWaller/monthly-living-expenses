import { getCategories } from "@/app/lib/categories/data";
import { createExpense } from "@/app/lib/expenses/actions";
import ExpenseForm from "@/app/ui/expenses/expense-form";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default async function CreateExpense() {
    const categories = await getCategories();

    return <>
        <Typography variant="h2">Create Expense</Typography>

        <Stack direction="column" spacing={2}>
            <ExpenseForm
                categories={categories}
                buttonText="Create"
                action={createExpense}
            />
        </Stack>
    </>;
}