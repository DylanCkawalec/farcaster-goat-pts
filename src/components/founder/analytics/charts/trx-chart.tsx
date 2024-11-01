'use client';

import { TRXTemplate } from '@/components/widgets/trx-template';
import { ChartProps, AnalyticsDataPoint, ChartConfigItem } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

const chartConfig: ChartConfigItem = {
    label: "Transactions",
    color: "hsl(var(--chart-3))",
};

export function TRXChart({ data }: ChartProps) {
    const trend = calculateTrend(data, 'trx');
    const formattedData: AnalyticsDataPoint[] = data.map(item => ({
        date: item.date,
        value: Number(item.trx),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return (
        <TRXTemplate 
            data={formattedData}
            trend={trend}
            formatValue={(value: number) => value.toLocaleString()}
            config={chartConfig}
        />
    );
}


// these are the charts that had to pull from widgets, which sources from analytics.ts. this 
// has to be reconstructed. 