"use client";

import { GroupedSum } from "@/app/lib/definitions";

import {
    BarElement,
    CategoryScale,
    Chart,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    TooltipItem,
} from 'chart.js';

import { Bar } from "react-chartjs-2";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

function getPriceAsCurrency(price: number): string {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
    }).format(price);
}

const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (context: TooltipItem<"bar">) => {
                    getPriceAsCurrency(context.raw as number);
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return getPriceAsCurrency(value as number);
                }
            }
        }
    }
};

interface BarGraphProps { groupedSums: GroupedSum[] };

export default function BarGraph({ groupedSums }: BarGraphProps) {
    return <Bar options={options} data={{
        labels: groupedSums.map(sum => `${sum.emoji} ${sum.name}`),
        datasets: [{ data: groupedSums.map(sum => sum.sum / 100) }]
    }}
    />;
}