import { getGroupedSums, getSumInCents } from "@/app/lib/expenses/data";
import BarGraph from "@/app/ui/bar-graph";
import Typography from "@mui/material/Typography";

function getPriceAsCurrency(priceInCents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(priceInCents / 100);
}

export default async function Page() {
  const sumInCents = await getSumInCents();
  const groupedSums = await getGroupedSums();

  return <>
    <Typography variant="h6">Home</Typography>
    <Typography>Total: {getPriceAsCurrency(sumInCents)}</Typography>
    <BarGraph groupedSums={groupedSums} />
  </>;
}