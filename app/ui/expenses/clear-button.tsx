import Button from "@mui/material/Button";

interface ClearButtonProps {
    text: string,
    onClick: () => void,
};

export default function ClearButton({ text, onClick }: ClearButtonProps) {
    return <Button sx={{ minWidth: 160 }} color="error" onClick={onClick}>
        {text}
    </Button>;
}