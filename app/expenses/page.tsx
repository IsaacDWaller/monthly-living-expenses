import { getCategories } from "@/app/lib/categories/data";
import { getFilteredExpenses } from "@/app/lib/expenses/data";
import ExpenseRow from "@/app/ui/expenses/expense-row";
import FilterExpenses from "@/app/ui/expenses/filter-expenses";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface PageProps {
    searchParams: Promise<{
        fromDate: string,
        toDate: string,
        description: string,
        minimumPriceInCents: string,
        maximumPriceInCents: string,
        categoryID: string,
    }>
};

export default async function Page({ searchParams }: PageProps) {
    const {
        fromDate,
        toDate,
        description,
        minimumPriceInCents,
        maximumPriceInCents,
        categoryID,
    } = (await searchParams);

    const expenseFilters = {
        fromDate,
        toDate,
        description,
        minimumPriceInCents: minimumPriceInCents ?
            parseInt(minimumPriceInCents) : undefined,
        maximumPriceInCents: maximumPriceInCents ?
            parseInt(maximumPriceInCents) : undefined,
        categoryID: categoryID ? BigInt(categoryID) : undefined,
    }

    const expenses = await getFilteredExpenses(expenseFilters);
    const categories = await getCategories();

    return <>
        <Typography variant="h6">Expenses</Typography>
        <FilterExpenses categories={categories} />

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