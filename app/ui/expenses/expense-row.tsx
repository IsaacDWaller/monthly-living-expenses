"use client";

import { Category } from "@/app/lib/categories/definitions";
import { RowState } from "@/app/lib/definitions";
import { deleteExpense, updateExpense } from "@/app/lib/expenses/actions";
import { getPriceAsCurrency } from "@/app/lib/utils";
import ExpenseForm from "@/app/ui/expenses/expense-form";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

interface ExpenseRowProps {
    id: bigint,
    date: Date,
    description: string,
    priceInCents: number,
    categoryID: bigint,
    categories: Category[],
}

export default function ExpenseRow({
    id,
    date,
    description,
    priceInCents,
    categoryID,
    categories,
}: ExpenseRowProps) {
    const category = categories.find(category => category.id === categoryID);

    const [state, setState] = useState<RowState>(RowState.Initial);

    const updateExpenseWithID = updateExpense.bind(null, id);
    const deleteExpenseWithID = deleteExpense.bind(null, id);

    return <>
        <TableRow sx={{ '& > *': { border: "unset" } }}>
            <TableCell>
                {new Intl.DateTimeFormat("en-AU").format(date)}
            </TableCell>

            <TableCell>{description}</TableCell>
            <TableCell>{getPriceAsCurrency(priceInCents)}</TableCell>

            <TableCell>
                {category ? `${category.emoji} ${category.name}` : ""}
            </TableCell>

            <TableCell>
                <IconButton onClick={() => setState(RowState.Editing)}>
                    <EditOutlined />
                </IconButton>
            </TableCell>

            <TableCell>
                <IconButton onClick={() => setState(RowState.Deleting)}>
                    <DeleteOutline />
                </IconButton>
            </TableCell>
        </TableRow >

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={state === RowState.Editing} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Stack direction="column">
                            <ExpenseForm
                                date={date}
                                description={description}
                                priceInCents={priceInCents}
                                categoryID={categoryID.toString()}
                                categories={categories}
                                buttonText="Save"
                                action={updateExpenseWithID}
                            />

                            <Button onClick={() => setState(RowState.Initial)}>Cancel</Button>
                        </Stack>
                    </Box>
                </Collapse>

                <Collapse in={state === RowState.Deleting} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Stack direction="column">
                            <Button color="error" onClick={deleteExpenseWithID}>Delete</Button>
                            <Button onClick={() => setState(RowState.Initial)}>Cancel</Button>
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow >
    </>;
}