"use client";

import { Category } from "@/app/lib/categories/definitions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useState } from "react";

type CategorySelectProps = { categories: Category[] };

export default function CategorySelect({ categories }: CategorySelectProps) {
    const [selectedCategory, setSelectedCategory] = useState("");

    return <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>

            <Select
                labelId="category-label"
                label="Category"
                value={selectedCategory}
                onChange={event => setSelectedCategory(event.target.value)}
                name="category-name"
            >
                {categories.map(category => (
                    <MenuItem key={category.name} value={category.name}>
                        {category.emoji} {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        {selectedCategory && <Button
            sx={{ minWidth: 192 }}
            color="error"
            onClick={() => setSelectedCategory("")}
        >Clear Category</Button>}
    </Stack>;
}