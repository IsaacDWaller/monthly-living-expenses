"use client";

import { Category } from "@/app/lib/categories/definitions";
import { Expense } from "@/app/lib/expenses/definitions";
import ExpenseRow from "@/app/ui/expenses/expense-row";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type ExpensesProps = { expenses: Expense[], categories: Category[] };

export default function Expenses({ expenses, categories }: ExpensesProps) {
    return <>
        <Typography variant="h6">Expenses</Typography>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {expenses.map(expense => <ExpenseRow
                        key={expense.id}
                        id={expense.id}
                        date={expense.date}
                        description={expense.description}
                        priceInCents={expense["price_in_cents"]}
                        categoryID={expense["category_id"]}
                        categories={categories}
                    />)}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
}