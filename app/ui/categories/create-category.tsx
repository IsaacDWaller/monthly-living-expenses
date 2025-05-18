"use client";

import { createCategory } from "@/app/lib/categories/actions";
import EmojiPicker from "@/app/ui/categories/emoji-picker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import { useActionState } from "react";

export default function CreateCategory() {
    const [state, formAction] = useActionState(createCategory, []);

    return (
        <>
            <Typography variant="h2">Create Category</Typography>

            <Form action={formAction}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <EmojiPicker />

                        <TextField
                            fullWidth
                            label="Name"
                            required
                            name="name"
                            error={state.some(error => error.input === "name")}
                            helperText={state.find(error => error.input === "name")?.helperText}
                        />
                    </Stack>

                    <Button type="submit">Create</Button>
                </Stack>
            </Form>
        </>
    );
}