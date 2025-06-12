"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TimeToggle() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleTimeChange(value: string) {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("time", value);
        replace(`${pathname}?${newSearchParams}`);
    }

    return <ToggleButtonGroup
        exclusive
        value={searchParams.get("time") || "all-time"}
        onChange={event => {
            handleTimeChange((event.target as HTMLInputElement).value)
        }}
    >
        <ToggleButton value="past-day">Past Day</ToggleButton>
        <ToggleButton value="past-week">Past Week</ToggleButton>
        <ToggleButton value="past-month">Past Month</ToggleButton>
        <ToggleButton value="past-year">Past Year</ToggleButton>
        <ToggleButton value="all-time">All Time</ToggleButton>
    </ToggleButtonGroup>;
}