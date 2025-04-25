import { getCategories } from "@/app/lib/data";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default async function Categories() {
    const categories = await getCategories();

    return (
        <>
            <Typography variant="h2">Categories</Typography>

            <List>
                {categories.map((category) => (
                    <ListItem
                        key={category.name}
                        secondaryAction={
                            <>
                                <IconButton>
                                    <EditOutlined />
                                </IconButton>

                                <IconButton>
                                    <DeleteOutline />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={`${category.emoji} ${category.name}`}
                            secondary={"0 expenses"}
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );
}