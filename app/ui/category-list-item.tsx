import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { deleteCategory } from "@/app/lib/actions";

type CategoryListItemProps = {
    name: string,
    emoji: string,
    numberOfExpenses: number,
};

export default function CategoryListItem({
    name,
    emoji,
    numberOfExpenses,
}: CategoryListItemProps) {
    const deleteCategoryWithName = deleteCategory.bind(null, name);

    return (
        <ListItem
            key={name}
            secondaryAction={
                <>
                    <IconButton>
                        <EditOutlined />
                    </IconButton>

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
        </ListItem>
    );
}