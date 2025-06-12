import { getGroupedSums, getSumInCents } from "@/app/lib/data";
import { getPriceAsCurrency } from "@/app/lib/utils";
import BarGraph from "@/app/ui/bar-graph";
import TimeToggle from "@/app/ui/time-toggle";
import Typography from "@mui/material/Typography";

interface PageProps { searchParams: Promise<{ time: string }> };

export default async function Page({ searchParams }: PageProps) {
  const { time } = await searchParams;
  const sumInCents = await getSumInCents(time || "all-time");
  const groupedSums = await getGroupedSums(time || "all-time");

  return <>
    <Typography variant="h6">Home</Typography>
    <TimeToggle />
    <Typography>Total: {getPriceAsCurrency(sumInCents)}</Typography>
    <BarGraph groupedSums={groupedSums} />
  </>;
}