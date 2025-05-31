import LocalisationProvider from "@/app/ui/localisation-provider";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals/models";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers/models";

interface CustomDatePickerProps {
    label: string,
    value?: PickerValue | null,
    onChange: (
        value: PickerValue,
        context: PickerChangeHandlerContext<DateValidationError>,
    ) => void,
    name: string,
};

export default function CustomDatePicker({
    label,
    value = null,
    onChange,
    name,
}: CustomDatePickerProps) {
    return <FormControl fullWidth>
        <LocalisationProvider>
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                name={name}
            // slotProps={{
            //     textField: {
            //         error: state.some(error => error.input === "date"),
            //         helperText: state.find(error => error.input === "date")?.helperText,
            //     }
            // }}
            />
        </LocalisationProvider>
    </FormControl>;
}