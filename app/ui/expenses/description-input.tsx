import { Error } from "@/app/lib/definitions";
import TextField from "@mui/material/TextField";

interface DescriptionInputProps {
    defaultValue?: string,
    required?: boolean,
    state: Error | undefined,
};

export default function DescriptionInput({
    defaultValue = "",
    required = false,
    state,
}: DescriptionInputProps) {
    return <TextField
        label="Description"
        defaultValue={defaultValue}
        required={required}
        name="description"
        error={state !== undefined}
        helperText={state && state.helperText}
    />;
}