"use client";

import { Category } from "@/app/lib/categories/definitions";
import { createExpense } from "@/app/lib/expenses/actions";
import CategorySelect from "@/app/ui/expenses/category-select";
import LocalisationProvider from "@/app/ui/LocalisationProvider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Form from "next/form";
import { useActionState } from "react";

type CreateExpenseProps = { categories: Category[] };

export default function CreateExpense({ categories }: CreateExpenseProps) {
    const [state, formAction] = useActionState(createExpense, []);

    return (
        <>
            <Typography variant="h2">Create Expense</Typography>

            <Form action={formAction}>
                <Stack direction="column" spacing={2}>
                    <TextField
                        label="Description"
                        required
                        name="description"
                        error={state.some(error => error.input === "description")}
                        helperText={state.find(error => error.input === "description")?.helperText}
                    />

                    <Stack direction="row" spacing={1}>
                        <LocalisationProvider>
                            <DatePicker
                                label="Date"
                                defaultValue={dayjs()}
                                name="date"
                                slotProps={{
                                    textField: {
                                        error: state.some(error => error.input === "date"),
                                        helperText: state.find(error => error.input === "date")?.helperText,
                                    }
                                }}
                            />
                        </LocalisationProvider>

                        <FormControl fullWidth>
                            <InputLabel htmlFor="price">Price</InputLabel>

                            <OutlinedInput
                                id="price"
                                label="Price"
                                startAdornment={
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                }
                                required
                                name="price"
                                error={state.some(error => error.input === "price")}
                            />

                            <FormHelperText error>{state.find(error => error.input === "price")?.helperText}</FormHelperText>
                        </FormControl>
                    </Stack>

                    <CategorySelect categories={categories} />
                    <Button type="submit">Create Expense</Button>
                </Stack>
            </Form >
        </>
    );
}