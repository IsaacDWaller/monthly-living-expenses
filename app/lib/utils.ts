import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const maximumPriceInCents = 2_147_483_647;

export function getDate(date: FormDataEntryValue): string {
    return dayjs(date.toString(), "DD/MM/YYYY").format("YYYY-MM-DD");
}

export function getPriceInCents(price: FormDataEntryValue): number {
    return Math.round(parseFloat(price.toString()) * 100);
}

export function getFormattedPrice(priceInCents: number): string {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
    }).format(priceInCents / 100);
}