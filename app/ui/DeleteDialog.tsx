import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteDialogProps = {
    isOpen: boolean,
    title: string,
    text: string,
    onDelete: () => void,
    onClose: () => void,
};

export default function DeleteDialog({
    isOpen,
    title,
    text,
    onDelete,
    onClose,
}: DeleteDialogProps) {
    return <Dialog open={isOpen} onClose={onClose} disableRestoreFocus>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
            <DialogContentText>{text}</DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button color="error" onClick={onDelete} autoFocus>Delete</Button>
            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>;
}