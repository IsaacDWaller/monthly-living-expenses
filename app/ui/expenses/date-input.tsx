import { Error } from "@/app/lib/definitions";
import LocalisationProvider from "@/app/ui/localisation-provider";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals/models";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers/models";

interface DateInputProps {
    label: string,
    value?: PickerValue | null,
    onChange: (
        value: PickerValue,
        context: PickerChangeHandlerContext<DateValidationError>,
    ) => void,
    state: Error | undefined,
    name: string,
};

export default function DateInput({
    label,
    value = null,
    onChange,
    state,
    name,
}: DateInputProps) {
    return <FormControl fullWidth>
        <LocalisationProvider>
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                name={name}
                slotProps={{
                    textField: {
                        error: state !== undefined,
                        helperText: state && state.helperText,
                    }
                }}
            />
        </LocalisationProvider>
    </FormControl>;
}