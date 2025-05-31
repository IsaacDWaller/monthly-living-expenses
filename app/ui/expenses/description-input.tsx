import { Error } from "@/app/lib/definitions";
import TextField from "@mui/material/TextField";

interface DescriptionInputProps {
    defaultValue?: string,
    onChange?: () => void,
    required?: boolean,
    state: Error | undefined,
};

export default function DescriptionInput({
    defaultValue = "",
    onChange,
    required = false,
    state,
}: DescriptionInputProps) {
    return <TextField
        label="Description"
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        name="description"
        error={state !== undefined}
        helperText={state && state.helperText}
    />;
}