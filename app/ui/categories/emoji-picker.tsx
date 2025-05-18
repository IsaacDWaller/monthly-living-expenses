"use client";

import { getEmojisData } from "@/app/lib/categories/requests";
import Picker from "@emoji-mart/react";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

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

type EmojiPickerProps = { emoji?: string };

export default function EmojiPicker({ emoji = "💵" }: EmojiPickerProps) {
    const [pickerIsOpen, setPickerIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(emoji);

    function handleEmojiSelect(event: EmojiSelectEvent) {
        setSelectedEmoji(event.native);
        setPickerIsOpen(false);
    }

    return (
        <>
            {!pickerIsOpen ?
                <>
                    <IconButton
                        sx={{ width: 64, height: 64 }}
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
                    onClickOutside={() => setPickerIsOpen(false)}
                />
            }
        </>
    );
}