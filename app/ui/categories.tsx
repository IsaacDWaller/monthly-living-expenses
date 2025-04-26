import { getCategories } from "@/app/lib/data";
import CategoryListItem from "@/app/ui/category-list-item";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

export default async function Categories() {
    const categories = await getCategories();

    return (
        <>
            <Typography variant="h2">Categories</Typography>

            <List>
                {categories.map((category) => (
                    <CategoryListItem
                        key={category.name}
                        name={category.name}
                        emoji={category.emoji}
                        numberOfExpenses={0}
                    />
                ))}
            </List>
        </>
    );
}