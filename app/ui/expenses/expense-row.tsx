import { deleteExpense } from "@/app/lib/expenses/actions";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

    function handleDeleteButtonClick() {
        deleteExpenseWithID();
        setDialogIsOpen(false);
    }

    return <>
        <Dialog
            open={dialogIsOpen}
            onClose={() => setDialogIsOpen(false)}
            disableRestoreFocus
        >
            <DialogTitle>Delete expense</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Confirm you want to delete this expense
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    color="error"
                    onClick={handleDeleteButtonClick}
                    autoFocus
                >Delete</Button>

                <Button onClick={() => setDialogIsOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>

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