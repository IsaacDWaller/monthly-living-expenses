"use client";

import { deleteCategory } from "@/app/lib/categories/actions";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

    function handleDeleteButtonClick() {
        deleteCategoryWithName();
        setDialogIsOpen(false);
    }

    return <>
        <Dialog
            open={dialogIsOpen}
            onClose={() => setDialogIsOpen(false)}
            disableRestoreFocus
        >
            <DialogTitle>Delete category?</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Confirm you want to delete {emoji} {name}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleDeleteButtonClick}
                    autoFocus
                >
                    Delete
                </Button>

                <Button onClick={() => setDialogIsOpen(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>

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