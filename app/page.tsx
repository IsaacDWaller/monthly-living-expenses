import { getGroupedSums, getSumInCents } from "@/app/lib/expenses/data";
import { getPriceAsCurrency } from "@/app/lib/utils";
import BarGraph from "@/app/ui/bar-graph";
import Typography from "@mui/material/Typography";

export default async function Page() {
  const sumInCents = await getSumInCents();
  const groupedSums = await getGroupedSums();

  return <>
    <Typography variant="h6">Home</Typography>
    <Typography>Total: {getPriceAsCurrency(sumInCents)}</Typography>
    <BarGraph groupedSums={groupedSums} />
  </>;
}