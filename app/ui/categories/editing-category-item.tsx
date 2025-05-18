"use client";

import { updateCategory } from "@/app/lib/categories/actions";
import EmojiPicker from "@/app/ui/categories/emoji-picker";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Form from "next/form";
import { useActionState, useState } from "react";

type EditingCategoryItemProps = {
    name: string,
    emoji: string,
    setBeingEdited: (beingEdited: boolean) => void,
};

export default function EditingCategoryItem({
    name,
    emoji,
    setBeingEdited,
}: EditingCategoryItemProps) {
    const [nameInputValue, setNameInputValue] = useState(name);

    const updateCategoryWithName = updateCategory.bind(null, { oldName: name });
    const [state, formAction] = useActionState(updateCategoryWithName, []);

    return <ListItem
        secondaryAction={
            <>
                <IconButton type="submit" form="form">
                    <CheckCircleOutlined />
                </IconButton >

                <IconButton onClick={() => setBeingEdited(false)}>
                    <CancelOutlined />
                </IconButton >
            </>
        }
    >
        <Form id="form" action={formAction}>
            <EmojiPicker emoji={emoji} />

            <TextField
                label="Name"
                value={nameInputValue}
                onChange={(event) => setNameInputValue(event.target.value)}
                required
                name="name"
                error={state.some(error => error.input === "name")}
                helperText={state.find(error => error.input === "name")?.helperText}
            />
        </Form>
    </ListItem>;
}