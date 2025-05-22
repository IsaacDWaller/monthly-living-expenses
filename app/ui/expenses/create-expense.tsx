import { Category } from "@/app/lib/categories/definitions";
import { createExpense } from "@/app/lib/expenses/actions";
import ExpenseForm from "@/app/ui/expenses/expense-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CreateExpenseProps = { categories: Category[] };

export default function CreateExpense({ categories }: CreateExpenseProps) {
    return (
        <>
            <Typography variant="h2">Create Expense</Typography>

            <Stack direction="column" spacing={2}>
                <ExpenseForm
                    id="create-expense-form"
                    categories={categories}
                    action={createExpense}
                />

                <Button type="submit" form="create-expense-form">Create</Button>
            </Stack>
        </>
    );
}