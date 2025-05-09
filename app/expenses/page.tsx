import { getExpenses } from "@/app/lib/expenses/data";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export default async function Page() {
    const expenses = await getExpenses();

    return <>
        <Typography variant="h2">Expenses</Typography>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {expenses.map(expense => (
                        <TableRow key={expense.id}>
                            <TableCell>
                                {new Intl.DateTimeFormat("en-AU")
                                    .format(expense.date)}
                            </TableCell>

                            <TableCell>{expense.description}</TableCell>

                            <TableCell>
                                {new Intl.NumberFormat("en-AU", {
                                    style: "currency",
                                    currency: "AUD",
                                }).format(expense["price_in_cents"] / 100)}
                            </TableCell>

                            <TableCell>{expense["category_name"]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
}