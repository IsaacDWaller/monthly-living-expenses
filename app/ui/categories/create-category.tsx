"use client";

import { createCategory } from "@/app/lib/categories/actions";
import { State } from "@/app/lib/definitions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import { useActionState } from "react";
import Alert from "@mui/material/Alert";
import EmojiPicker from "@/app/ui/categories/emoji-picker";

const initialState: State = { errorMessages: null };

export default function CreateCategory() {
    const [state, formAction] = useActionState(createCategory, initialState);

    return (
        <>
            <Typography variant="h2">Create Category</Typography>

            <Form action={formAction}>
                <EmojiPicker />
                <TextField label="Name" required name="name" />

                {state.errorMessages && state.errorMessages.map(errorMessage => (
                    <Alert
                        key={errorMessage}
                        severity="error"
                    >
                        {errorMessage}
                    </Alert>
                ))}

                <Button type="submit">Create</Button>
            </Form>
        </>
    );
}