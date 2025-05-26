"use client";

import { getEmojisData } from "@/app/lib/categories/requests";
import Picker from "@emoji-mart/react";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

interface EmojiSelectEvent {
    aliases: string[],
    id: string,
    keywords: string[],
    name: string,
    native: string,
    shortcodes: string,
    skin: number,
    unified: string,
};

interface EmojiPickerProps { initialEmoji?: string };

export default function EmojiPicker({ initialEmoji = "💵" }: EmojiPickerProps) {
    const [pickerIsOpen, setPickerIsOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji);

    function handleEmojiSelect(event: EmojiSelectEvent) {
        setSelectedEmoji(event.native);
        setPickerIsOpen(false);
    }

    return <>
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
    </>;
}