"use client";

import { Category } from "@/app/lib/categories/definitions";
import { Error } from "@/app/lib/definitions";
import CategorySelect from "@/app/ui/expenses/category-select";
import LocalisationProvider from "@/app/ui/localisation-provider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Form from "next/form";
import { useActionState } from "react";

interface ExpenseFormProps {
    date?: Date,
    description?: string,
    priceInCents?: number,
    categoryID?: bigint,
    categories: Category[],
    buttonText: string,
    action: (previousState: Error[], formData: FormData) => Promise<Error[]>,
};

export default function ExpenseForm({
    date,
    description,
    priceInCents,
    categoryID,
    categories,
    buttonText,
    action,
}: ExpenseFormProps) {
    const [state, formAction] = useActionState(action, []);

    return <Form action={formAction}>
        <Stack direction="column" spacing={2}>
            <TextField
                label="Description"
                defaultValue={description}
                required
                name="description"
                error={state.some(error => error.input === "description")}
                helperText={state.find(error => error.input === "description")?.helperText}
            />

            <Stack direction="row" spacing={2}>
                <LocalisationProvider>
                    <DatePicker
                        label="Date"
                        defaultValue={date ? dayjs(date) : dayjs()}
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
                        defaultValue={
                            priceInCents && (priceInCents / 100).toFixed(2)
                        }
                        required
                        name="price"
                        error={state.some(error => error.input === "price")}
                    />

                    <FormHelperText error>
                        {state.find(error => error.input === "price")?.helperText}
                    </FormHelperText>
                </FormControl>
            </Stack>

            <CategorySelect
                categories={categories}
                initialCategoryID={categoryID}
            />

            <Button type="submit">{buttonText}</Button>
        </Stack>
    </Form>;
}