"use client";

import { updateCategory } from "@/app/lib/actions";
import { State } from "@/app/lib/definitions";
import EmojiPicker from "@/app/ui/emoji-picker";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Form from "next/form";
import { useActionState, useState } from "react";

const initialState: State = { errorMessages: null };

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
    const [state, formAction] = useActionState(updateCategoryWithName, initialState);

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
            />

            {state.errorMessages && state.errorMessages.map(errorMessage => (
                <Alert
                    key={errorMessage}
                    severity="error"
                >
                    {errorMessage}
                </Alert>
            ))}
        </Form>
    </ListItem>;
}