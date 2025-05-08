import { deleteCategory } from "@/app/lib/actions";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
    const deleteCategoryWithName = deleteCategory.bind(null, name);

    return <ListItem
        secondaryAction={
            <>
                <IconButton onClick={() => setBeingEdited(true)}>
                    <EditOutlined />
                </IconButton >

                <IconButton onClick={deleteCategoryWithName}>
                    <DeleteOutline />
                </IconButton>
            </>
        }
    >
        <ListItemText
            primary={`${emoji} ${name}`}
            secondary={`${numberOfExpenses} expenses`}
        />
    </ListItem>;
}