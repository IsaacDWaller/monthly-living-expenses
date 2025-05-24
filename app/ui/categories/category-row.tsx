"use client";

import { deleteCategory, updateCategory } from "@/app/lib/categories/actions";
import { RowState } from "@/app/lib/definitions";
import CategoryForm from "@/app/ui/categories/category-form";
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

type CategoryRowProps = {
    id: bigint,
    name: string,
    emoji: string,
}

export default function CategoryRow({
    id,
    name,
    emoji,
}: CategoryRowProps) {
    const [state, setState] = useState<RowState>(RowState.Initial)

    const updateCategoryWithID = updateCategory.bind(null, id);
    const deleteCategoryWithID = deleteCategory.bind(null, id);

    return <>
        <TableRow>
            <TableCell>{emoji}</TableCell>
            <TableCell>{name}</TableCell>

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
        </TableRow>

        <TableRow sx={{ "& > *": { borderTop: "unset", borderBottom: "unset" } }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={state === RowState.Editing} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Stack direction="column">
                            <CategoryForm
                                name={name}
                                emoji={emoji}
                                buttonText="Save"
                                action={updateCategoryWithID}
                            />

                            <Button onClick={() => setState(RowState.Initial)}>Cancel</Button>
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>

        <TableRow sx={{ "& > *": { borderTop: "unset", borderBottom: "unset" } }}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={state === RowState.Deleting} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Stack direction="column">
                            <Button color="error" onClick={deleteCategoryWithID}>Delete</Button>
                            <Button onClick={() => setState(RowState.Initial)}>Cancel</Button>
                        </Stack>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>;
}