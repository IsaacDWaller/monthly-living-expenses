import { Category } from "@/app/lib/categories/definitions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ChangeEvent, ReactNode } from "react";

interface CategorySelectProps {
    categories: Category[],
    value?: string,
    onChange: (
        event: ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }> | (Event & { target: { value: string, name: string } }),
        child: ReactNode,
    ) => void,
};

export default function CategorySelect({
    categories,
    value = "",
    onChange,
}: CategorySelectProps) {
    return <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>

        <Select
            labelId="category-label"
            label="Category"
            value={value}
            onChange={onChange}
            name="category-id"
        >
            {categories.map(category => (
                <MenuItem key={category.name} value={category.id.toString()}>
                    {category.emoji} {category.name}
                </MenuItem>
            ))}
        </Select>
    </FormControl>;
}