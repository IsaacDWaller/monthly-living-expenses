import { Error } from "@/app/lib/definitions";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

interface PriceInputProps {
    label: string,
    defaultValue?: number | string | undefined,
    required?: boolean,
    name: string,
    state: Error | undefined,
};

export default function PriceInput({
    label,
    defaultValue,
    required = false,
    name,
    state,
}: PriceInputProps) {
    return <FormControl fullWidth>
        <InputLabel htmlFor={name}>{label}</InputLabel>

        <OutlinedInput
            id={name}
            label={label}
            startAdornment={
                <InputAdornment position="start">
                    $
                </InputAdornment>
            }
            defaultValue={defaultValue || ""}
            required={required}
            name={name}
            error={state !== undefined}
        />

        <FormHelperText error>{state && state.helperText}</FormHelperText>
    </FormControl>;
}