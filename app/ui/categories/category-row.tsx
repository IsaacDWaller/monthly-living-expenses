"use client";

import { deleteCategory, updateCategory } from "@/app/lib/categories/actions";
import CustomDialog from "@/app/ui/CustomDialog";
import CategoryForm from "@/app/ui/categories/category-form";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

type CategoryRowProps = {
    id: bigint,
    name: string,
    emoji: string,
}

export default function CategoryRow({
    id,
    name,
    emoji,
}: CategoryRowProps) {
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

    const editCategoryWithID = updateCategory.bind(null, id);
    const deleteCategoryWithID = deleteCategory.bind(null, id);

    function handleDelete() {
        deleteCategoryWithID();
        setDeleteDialogIsOpen(false);
    }

    return <>
        <CustomDialog
            isOpen={editDialogIsOpen}
            title="Edit category"
            confirmButtonText="Save"
            formID="edit-category-form"
            onClose={() => setEditDialogIsOpen(false)}
        >
            <CategoryForm
                id="edit-category-form"
                name={name}
                emoji={emoji}
                action={editCategoryWithID}
            />
        </CustomDialog>

        <CustomDialog
            isOpen={deleteDialogIsOpen}
            title="Delete category"
            confirmButtonText="Delete"
            confirmButtonColour="error"
            onConfirm={handleDelete}
            onClose={() => setDeleteDialogIsOpen(false)}
        >
            <DialogContentText>
                Confirm you want to delete this category
            </DialogContentText>
        </CustomDialog>

        <TableRow>
            <TableCell>{emoji}</TableCell>
            <TableCell>{name}</TableCell>

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