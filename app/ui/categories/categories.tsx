import { getCategories } from "@/app/lib/categories/data";
import CategoryRow from "@/app/ui/categories/category-row";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export default async function Categories() {
    const categories = await getCategories();

    return <>
        <Typography variant="h6">Categories</Typography>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Emoji</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {categories.map(category => <CategoryRow
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        emoji={category.emoji}
                    />)}
                </TableBody>
            </Table>
        </TableContainer>
    </>;
}