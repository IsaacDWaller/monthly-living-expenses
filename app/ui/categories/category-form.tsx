"use client";

import { Error } from "@/app/lib/definitions";
import EmojiPicker from "@/app/ui/categories/emoji-picker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Form from "next/form";
import { useActionState } from "react";

type CategoryFormProps = {
    id: string,
    name?: string,
    emoji?: string,
    action: (previousState: Error[], formData: FormData) => Promise<Error[]>,
};

export default function CategoryForm({
    id,
    name,
    emoji,
    action,
}: CategoryFormProps) {
    const [state, formAction] = useActionState(action, []);

    return <Form id={id} action={formAction}>
        <Stack direction="row" spacing={2}>
            <EmojiPicker initialEmoji={emoji} />

            <TextField
                fullWidth
                label="Name"
                defaultValue={name}
                required
                name="name"
                error={state.some(error => error.input === "name")}
                helperText={state.find(error => error.input === "name")?.helperText}
            />
        </Stack>
    </Form>;
}