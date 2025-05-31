"use client";

import { Category } from "@/app/lib/categories/definitions";
import { getDate, getFormattedPrice, getPriceInCents, maximumPriceInCents } from "@/app/lib/utils";
import CategorySelect from "@/app/ui/expenses/category-select";
import ClearButton from "@/app/ui/expenses/clear-button";
import CustomDatePicker from "@/app/ui/expenses/custom-date-picker";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

dayjs.extend(customParseFormat);

const FilterSchema = z.object({
    fromDate: z.string().date().optional(),
    toDate: z.string().date().optional(),
    description: z.string().trim()
        .min(1, { message: "Please enter at least 1 character" })
        .max(64, { message: "Please enter at most 64 characters" })
        .optional(),
    minimumPriceInCents: z.coerce.number({ message: "Please enter a number" })
        .positive({ message: "Please enter a positive number" })
        .lte(maximumPriceInCents, {
            message: `Please enter at most ${getFormattedPrice(maximumPriceInCents)}`,
        })
        .optional(),
    maximumPriceInCents: z.coerce.number({ message: "Please enter a number" })
        .positive({ message: "Please enter a positive number" })
        .lte(maximumPriceInCents, {
            message: `Please enter at most ${getFormattedPrice(maximumPriceInCents)}`,
        })
        .optional(),
    categoryID: z.coerce.bigint().optional(),
});

interface FilterExpensesProps { categories: Category[] };

export default function FilterExpenses({ categories }: FilterExpensesProps) {
    const searchParams = useSearchParams();

    const [inputValues, setInputValues] = useState({
        "from-date": searchParams.get("fromDate") ?
            dayjs(searchParams.get("fromDate"), "YYYY-MM-DD") : null,
        "to-date": searchParams.get("toDate") ?
            dayjs(searchParams.get("toDate"), "YYYY-MM-DD") : null,
        "category-id": searchParams.get("categoryID") ?
            searchParams.get("categoryID") : undefined,
    });

    const pathname = usePathname();
    const { replace } = useRouter();

    function handleInputChange(name: string, newValue: any) {
        return setInputValues(oldInputValues => (
            { ...oldInputValues, [name]: newValue }
        ));
    }

    function handleFormSubmit(formData: FormData) {
        const filters = {
            fromDate: formData.get("from-date") ?
                getDate(formData.get("from-date")!) : undefined,
            toDate: formData.get("to-date") ?
                getDate(formData.get("to-date")!) : undefined,
            description: formData.get("description") || undefined,
            minimumPriceInCents: formData.get("minimum-price") ?
                getPriceInCents(formData.get("minimum-price")!) : undefined,
            maximumPriceInCents: formData.get("maximum-price") ?
                getPriceInCents(formData.get("maximum-price")!) : undefined,
            categoryID: formData.get("category-id") || undefined,
        };

        const parseResult = FilterSchema.safeParse(filters);
        const newSearchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(parseResult.data!)) {
            if (!value) continue;

            newSearchParams.set(key, value.toString());
        }

        replace(`${pathname}?${newSearchParams}`);
    }

    function handleClearFilters() {
        setInputValues({
            "from-date": null,
            "to-date": null,
            "category-id": "",
        });

        replace(pathname);
    }

    return <>
        <Typography variant="h6">Filter</Typography>

        <Form action={handleFormSubmit}>
            <Stack direction="column" spacing={2}>
                <TextField
                    label="Description"
                    defaultValue={searchParams.get("description") || ""}
                    name="description"
                // error={state.some(error => error.input === "description")}
                // helperText={state.find(error => error.input === "description")?.helperText}
                />

                <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                        <Stack direction="row" spacing={2}>
                            <CustomDatePicker
                                label="From Date"
                                value={inputValues["from-date"]}
                                onChange={event => handleInputChange("from-date", event)}
                                name="from-date"
                            />

                            {inputValues["from-date"] && <ClearButton
                                text="Clear From Date"
                                onClick={() => handleInputChange("from-date", null)}
                            />}
                        </Stack>
                    </FormControl>

                    <FormControl fullWidth>
                        <Stack direction="row" spacing={2}>
                            <CustomDatePicker
                                label="To Date"
                                value={inputValues["to-date"]}
                                onChange={event => handleInputChange("to-date", event)}
                                name="to-date"
                            />

                            {inputValues["to-date"] && <ClearButton
                                text="Clear To Date"
                                onClick={() => handleInputChange("to-date", null)}
                            />}
                        </Stack>
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="minimum-price">Minimum Price</InputLabel>

                        <OutlinedInput
                            id="minimum-price"
                            label="Minimum Price"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            defaultValue={parseInt(searchParams.get("minimumPriceInCents")!) / 100 || ""}
                            name="minimum-price"
                        // error={state.some(error => error.input === "price")}
                        />

                        {/* <FormHelperText error>
                            {state.find(error => error.input === "price")?.helperText}
                        </FormHelperText> */}
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel htmlFor="maximum-price">Maximum Price</InputLabel>

                        <OutlinedInput
                            id="maximum-price"
                            label="Maximum Price"
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }
                            defaultValue={parseInt(searchParams.get("maximumPriceInCents")!) / 100 || ""}
                            name="maximum-price"
                        // error={state.some(error => error.input === "price")}
                        />

                        {/* <FormHelperText error>
                            {state.find(error => error.input === "price")?.helperText}
                        </FormHelperText> */}
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <CategorySelect
                        categories={categories}
                        value={inputValues["category-id"]!}
                        onChange={event => handleInputChange(
                            "category-id",
                            event.target.value,
                        )}
                    />

                    {inputValues["category-id"] && <ClearButton
                        text="Clear Category"
                        onClick={() => handleInputChange("category-id", "")}
                    />}
                </Stack>

                <Stack direction="column">
                    <Button type="submit">Filter</Button>
                    <Button color="error" onClick={handleClearFilters}>Clear Filters</Button>
                </Stack>
            </Stack>
        </Form>
    </>;
}