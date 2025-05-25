import { createCategory } from "@/app/lib/categories/actions";
import CategoryForm from "@/app/ui/categories/category-form";
import Typography from "@mui/material/Typography";

export default function CreateCategory() {
    return <>
        <Typography variant="h6">Create Category</Typography>
        <CategoryForm buttonText="Create" action={createCategory} />
    </>;
}