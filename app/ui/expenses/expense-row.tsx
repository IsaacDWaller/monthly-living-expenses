"use client";

import { Category } from "@/app/lib/categories/definitions";
import { deleteExpense, updateExpense } from "@/app/lib/expenses/actions";
import CustomDialog from "@/app/ui/CustomDialog";
import ExpenseForm from "@/app/ui/expenses/expense-form";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DialogContentText from "@mui/material/DialogContentText";
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
    categories: Category[],
}

export default function ExpenseRow({
    id,
    date,
    description,
    priceInCents,
    categoryName,
    categories,
}: ExpenseRowProps) {
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

    const editExpenseWithID = updateExpense.bind(null, id);
    const deleteExpenseWithID = deleteExpense.bind(null, id);

    function handleDelete() {
        deleteExpenseWithID();
        setDeleteDialogIsOpen(false);
    }

    return <>
        <CustomDialog
            isOpen={editDialogIsOpen}
            title="Edit expense"
            confirmButtonText="Save"
            formID="edit-expense-form"
            onClose={() => setEditDialogIsOpen(false)}
        >
            <ExpenseForm
                id="edit-expense-form"
                date={date}
                description={description}
                priceInCents={priceInCents}
                categoryName={categoryName}
                categories={categories}
                action={editExpenseWithID}
            />
        </CustomDialog>

        <CustomDialog
            isOpen={deleteDialogIsOpen}
            title="Delete expense"
            confirmButtonText="Delete"
            confirmButtonColour="error"
            onConfirm={handleDelete}
            onClose={() => setDeleteDialogIsOpen(false)}
        >
            <DialogContentText>
                Confirm you want to delete this expense
            </DialogContentText>
        </CustomDialog>

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
                <IconButton onClick={() => setEditDialogIsOpen(true)}>
                    <EditOutlined />
                </IconButton>
            </TableCell>

            <TableCell>
                <IconButton onClick={() => setDeleteDialogIsOpen(true)}>
                    <DeleteOutline />
                </IconButton>
            </TableCell>
        </TableRow>
    </>;
}