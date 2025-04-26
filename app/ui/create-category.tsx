"use client";

import { createCategory } from "@/app/lib/actions";
import { State } from "@/app/lib/definitions";
import { getEmojisData } from "@/app/lib/requests";
import Picker from "@emoji-mart/react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import { useActionState, useState } from "react";
import Alert from "@mui/material/Alert";

type EmojiSelectEvent = {
    aliases: string[],
    id: string,
    keywords: string[],
    name: string,
    native: string,
    shortcodes: string,
    skin: number,
    unified: string,
};

const initialState: State = {
    errorMessages: null,
};

export default function CreateCategory() {
    const [pickerIsOpen, setPickerIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("💵");

    const [state, formAction] = useActionState(createCategory, initialState);

    function handleEmojiSelect(event: EmojiSelectEvent) {
        setSelectedEmoji(event.native);
        setPickerIsOpen(false);
    }

    function handleClickOutside() {
        setPickerIsOpen(false);
    }

    return (
        <>
            <Typography variant="h2">Create Category</Typography>

            <Form action={formAction}>
                <TextField label="Name" required name="name" />

                {!pickerIsOpen ?
                    <>
                        <IconButton
                            color={"inherit"}
                            onClick={() => setPickerIsOpen(true)}
                        >{selectedEmoji}</IconButton>

                        <input
                            type="hidden"
                            value={selectedEmoji}
                            required
                            name="emoji"
                        />
                    </>
                    :
                    <Picker
                        data={getEmojisData}
                        skinTonePosition={"none"}
                        previewPosition={"none"}
                        onEmojiSelect={handleEmojiSelect}
                        onClickOutside={handleClickOutside}
                    />
                }

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