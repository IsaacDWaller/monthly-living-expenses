"use client";

import { Error } from "@/app/lib/definitions";
import EmojiPicker from "@/app/ui/categories/emoji-picker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Form from "next/form";
import { useActionState } from "react";

interface CategoryFormProps {
    name?: string,
    emoji?: string,
    buttonText: string,
    action: (previousState: Error[], formData: FormData) => Promise<Error[]>,
};

export default function CategoryForm({
    name,
    emoji,
    buttonText,
    action,
}: CategoryFormProps) {
    const [state, formAction] = useActionState(action, []);

    return <Form action={formAction}>
        <Stack direction="column" spacing={2}>
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

            <Button type="submit">{buttonText}</Button>
        </Stack>
    </Form>;
}