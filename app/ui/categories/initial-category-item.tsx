"use client";

import { deleteCategory } from "@/app/lib/categories/actions";
import CustomDialog from "@/app/ui/CustomDialog";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

type InitialCategoryItemProps = {
    name: string,
    emoji: string,
    numberOfExpenses: number,
    setBeingEdited: (beingEdited: boolean) => void,
};

export default function InitialCategoryItem({
    name,
    emoji,
    numberOfExpenses,
    setBeingEdited,
}: InitialCategoryItemProps) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const deleteCategoryWithName = deleteCategory.bind(null, name);

    function handleDelete() {
        deleteCategoryWithName();
        setDialogIsOpen(false);
    }

    return <>
        <CustomDialog
            isOpen={dialogIsOpen}
            title="Delete category"
            confirmButtonText="Delete"
            confirmButtonColour="error"
            onConfirm={handleDelete}
            onClose={() => setDialogIsOpen(false)}
        >
            <DialogContentText>
                Confirm you want to delete this category
            </DialogContentText>
        </CustomDialog>

        <ListItem
            secondaryAction={
                <>
                    <IconButton onClick={() => setBeingEdited(true)}>
                        <EditOutlined />
                    </IconButton >

                    <IconButton onClick={() => setDialogIsOpen(true)}>
                        <DeleteOutline />
                    </IconButton>
                </>
            }
        >
            <ListItemText
                primary={`${emoji} ${name}`}
                secondary={`${numberOfExpenses} expenses`}
            />
        </ListItem>
    </>;
}