import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-au";

interface LocalisationProviderProps { children: React.ReactNode };

export default function LocalisationProvider(
    { children }: LocalisationProviderProps,
) {
    return <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="en-au"
    >
        {children}
    </LocalizationProvider>;
}