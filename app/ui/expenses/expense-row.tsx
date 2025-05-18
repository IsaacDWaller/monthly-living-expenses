import { deleteExpense } from "@/app/lib/expenses/actions";
import DeleteDialog from "@/app/ui/DeleteDialog";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

type ExpenseRowProps = {
    id: bigint,
    date: Date,
    description: string,
    priceInCents: number,
    categoryName: string,
}

export default function ExpenseRow({
    id,
    date,
    description,
    priceInCents,
    categoryName,
}: ExpenseRowProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const deleteExpenseWithID = deleteExpense.bind(null, id);

    function handleDelete() {
        deleteExpenseWithID();
        setDialogIsOpen(false);
    }

    return <>
        <DeleteDialog
            isOpen={dialogIsOpen}
            title="Delete expense"
            text="Confirm you want to delete this expense"
            onDelete={handleDelete}
            onClose={() => setDialogIsOpen(false)}
        />

        <TableRow>
            <TableCell>
                {new Intl.DateTimeFormat("en-AU")
                    .format(date)}
            </TableCell>

            <TableCell>{description}</TableCell>

            <TableCell>
                {new Intl.NumberFormat("en-AU", {
                    style: "currency",
                    currency: "AUD",
                }).format(priceInCents / 100)}
            </TableCell>

            <TableCell>{categoryName}</TableCell>

            <TableCell>
                <IconButton onClick={() => setDialogIsOpen(true)}>
                    <DeleteOutline />
                </IconButton>
            </TableCell>
        </TableRow>
    </>;
}