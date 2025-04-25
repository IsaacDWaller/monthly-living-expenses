"use client";

import { createCategory } from "@/app/lib/actions";
import { getEmojisData } from "@/app/lib/requests";
import Picker from "@emoji-mart/react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Form from "next/form";
import { useState } from "react";

export default function CreateCategory() {
    const [pickerIsOpen, setPickerIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("💵");

    function handleEmojiSelect(event) {
        setSelectedEmoji(event.native);
        setPickerIsOpen(false);
    }

    function handleClickOutside() {
        setPickerIsOpen(false);
    }

    return (
        <>
            <Typography variant="h2">Create Category</Typography>

            <Form action={createCategory}>
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

                <Button type="submit">Create</Button>
            </Form>
        </>
    );
}