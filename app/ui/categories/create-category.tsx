import { createCategory } from "@/app/lib/categories/actions";
import CategoryForm from "@/app/ui/categories/category-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function CreateCategory() {
    return <>
        <Typography variant="h2">Create Category</Typography>

        <Stack direction="column" spacing={2}>
            <CategoryForm id="create-category-form" action={createCategory} />
            <Button type="submit" form="create-category-form">Create</Button>
        </Stack>
    </>;
}