"use client";

import { Category } from "@/app/lib/categories/definitions";
import { Error } from "@/app/lib/definitions";
import CategorySelect from "@/app/ui/expenses/category-select";
import ClearButton from "@/app/ui/expenses/clear-button";
import DateInput from "@/app/ui/expenses/date-input";
import DescriptionInput from "@/app/ui/expenses/description-input";
import PriceInput from "@/app/ui/expenses/price-input";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import Form from "next/form";
import { useActionState, useState } from "react";

interface ExpenseFormProps {
    date?: Date,
    description?: string,
    priceInCents?: number,
    categoryID?: string,
    categories: Category[],
    buttonText: string,
    action: (previousState: Error[], formData: FormData) => Promise<Error[]>,
};

export default function ExpenseForm({
    date,
    description = "",
    priceInCents,
    categoryID = "",
    categories,
    buttonText,
    action,
}: ExpenseFormProps) {
    const [inputValues, setInputValues] = useState({
        "date": date ? dayjs(date) : dayjs(),
        "category-id": categoryID,
    });

    const [state, formAction] = useActionState(action, []);

    function handleInputChange(
        inputName: string,
        newValue: PickerValue | string,
    ) {
        return setInputValues(oldInputValues => (
            { ...oldInputValues, [inputName]: newValue }
        ));
    }

    return <Form action={formAction}>
        <Stack direction="column" spacing={2}>
            <DescriptionInput
                defaultValue={description}
                required
                state={state.find(error => error.input === "description")}
            />

            <Stack direction="row" spacing={2}>
                <DateInput
                    label="Date"
                    value={inputValues["date"]}
                    onChange={event => handleInputChange("date", event)}
                    state={state.find(error => error.input === "date")}
                    name="date"
                />

                <PriceInput
                    label="Price"
                    defaultValue={
                        priceInCents &&
                        (priceInCents / 100).toFixed(2)
                    }
                    required
                    name="price"
                    state={state.find(error => error.input === "price")}
                />
            </Stack>

            <Stack direction="row" spacing={2}>
                <CategorySelect
                    categories={categories}
                    value={inputValues["category-id"]}
                    onChange={event => {
                        handleInputChange("category-id", event.target.value);
                    }}
                />

                {inputValues["category-id"] && <ClearButton
                    text="Clear Category"
                    onClick={() => handleInputChange("category-id", "")}
                />}
            </Stack>

            <Button type="submit">{buttonText}</Button>
        </Stack>
    </Form>;
}