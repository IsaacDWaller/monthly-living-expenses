import Button, { ButtonProps } from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ReactNode } from "react";

type CustomDialogProps = {
    isOpen: boolean,
    title: string,
    confirmButtonText: string,
    confirmButtonColour?: ButtonProps["color"],
    onConfirm?: () => void,
    formID?: string,
    onClose: () => void,
    children: ReactNode,
};

export default function CustomDialog({
    isOpen,
    title,
    confirmButtonText,
    confirmButtonColour = "primary",
    onConfirm,
    formID,
    onClose,
    children,
}: CustomDialogProps) {
    return <Dialog open={isOpen} onClose={onClose} disableRestoreFocus>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>

        <DialogActions>
            <Button
                type="submit"
                color={confirmButtonColour}
                onClick={onConfirm}
                form={formID}
                autoFocus
            >{confirmButtonText}</Button>

            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>;
}