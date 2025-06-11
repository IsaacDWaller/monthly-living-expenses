"use client";

import { Category } from "@/app/lib/categories/definitions";
import { Error } from "@/app/lib/definitions";
import { getDate, getPriceAsCurrency, getPriceInCents, maximumPriceInCents } from "@/app/lib/utils";
import CategorySelect from "@/app/ui/expenses/category-select";
import ClearButton from "@/app/ui/expenses/clear-button";
import DateInput from "@/app/ui/expenses/date-input";
import DescriptionInput from "@/app/ui/expenses/description-input";
import PriceInput from "@/app/ui/expenses/price-input";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Form from "next/form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

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
            message: `Please enter at most ${getPriceAsCurrency(maximumPriceInCents)}`,
        })
        .optional(),
    maximumPriceInCents: z.coerce.number({ message: "Please enter a number" })
        .positive({ message: "Please enter a positive number" })
        .lte(maximumPriceInCents, {
            message: `Please enter at most ${getPriceAsCurrency(maximumPriceInCents)}`,
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
            searchParams.get("categoryID") : "",
    });

    const formRef = useRef<HTMLFormElement>(null);
    const [state, setState] = useState([] as Error[]);

    const pathname = usePathname();
    const { replace } = useRouter();

    const submitForm = useDebouncedCallback(
        () => formRef.current!.requestSubmit(),
        300,
    );

    function handleControlledInputChange(
        inputName: string,
        newValue: PickerValue | null | string,
    ) {
        setInputValues(oldInputValues => (
            { ...oldInputValues, [inputName]: newValue }
        ));

        submitForm();
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

        const errors = [];

        if (!dayjs(parseResult.data?.fromDate).isSameOrBefore(dayjs())) {
            errors.push({ input: "fromDate", helperText: "Please enter up to today" });
        }

        if (!dayjs(parseResult.data?.toDate).isSameOrBefore(dayjs())) {
            errors.push({ input: "toDate", helperText: "Please enter up to today" });
        }

        if (!parseResult.success) {
            errors.push(...parseResult.error.errors.map(error => ({
                input: error.path[0],
                helperText: error.message,
            } as Error)));
        }

        if (errors.length) {
            setState(errors);
            return;
        }

        const newSearchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(parseResult.data!)) {
            if (!value) continue;

            newSearchParams.set(key, value.toString());
        }

        setState([]);
        replace(`${pathname}?${newSearchParams}`);
    }

    function handleClearFilters() {
        setInputValues({
            "from-date": null,
            "to-date": null,
            "category-id": "",
        });

        setState([]);
        replace(pathname);
    }

    return <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">Filter</Typography>
        </AccordionSummary>

        <AccordionDetails>
            <Form ref={formRef} action={handleFormSubmit}>
                <Stack direction="column" spacing={2}>
                    <DescriptionInput
                        defaultValue={searchParams.get("description") || ""}
                        onChange={submitForm}
                        state={state.find(error => error.input === "description")}
                    />

                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <Stack direction="row" spacing={2}>
                                <DateInput
                                    label="From Date"
                                    value={inputValues["from-date"]}
                                    onChange={event => handleControlledInputChange("from-date", event)}
                                    state={state.find(error => error.input === "fromDate")}
                                    name="from-date"
                                />

                                {inputValues["from-date"] && <ClearButton
                                    text="Clear From Date"
                                    onClick={() => handleControlledInputChange("from-date", null)}
                                />}
                            </Stack>
                        </FormControl>

                        <FormControl fullWidth>
                            <Stack direction="row" spacing={2}>
                                <DateInput
                                    label="To Date"
                                    value={inputValues["to-date"]}
                                    onChange={event => handleControlledInputChange("to-date", event)}
                                    state={state.find(error => error.input === "toDate")}
                                    name="to-date"
                                />

                                {inputValues["to-date"] && <ClearButton
                                    text="Clear To Date"
                                    onClick={() => handleControlledInputChange("to-date", null)}
                                />}
                            </Stack>
                        </FormControl>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <PriceInput
                            label="Minimum Price"
                            defaultValue={parseInt(
                                searchParams.get("minimumPriceInCents")!,
                            ) / 100 || ""}
                            onChange={submitForm}
                            name="minimum-price"
                            state={state.find(error => (
                                error.input === "minimumPriceInCents")
                            )}
                        />

                        <PriceInput
                            label="Maximum Price"
                            defaultValue={parseInt(
                                searchParams.get("maximumPriceInCents")!,
                            ) / 100 || ""}
                            onChange={submitForm}
                            name="maximum-price"
                            state={state.find(error => (
                                error.input === "maximumPriceInCents")
                            )}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <CategorySelect
                            categories={categories}
                            value={inputValues["category-id"]!}
                            onChange={event => handleControlledInputChange(
                                "category-id",
                                event.target.value,
                            )}
                        />

                        {inputValues["category-id"] && <ClearButton
                            text="Clear Category"
                            onClick={() => handleControlledInputChange("category-id", "")}
                        />}
                    </Stack>

                    <Stack direction="column">
                        <Button color="error" onClick={handleClearFilters}>Clear Filters</Button>
                    </Stack>
                </Stack>
            </Form>
        </AccordionDetails>
    </Accordion>;
}