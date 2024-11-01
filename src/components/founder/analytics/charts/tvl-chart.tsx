'use client';

import { TVLTemplate } from '@/components/widgets/tvl-template';
import { ChartProps, AnalyticsDataPoint, ChartConfigItem } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

const chartConfig: ChartConfigItem = {
    label: "Total Value Locked",
    color: "hsl(var(--chart-1))",
};

export function TVLChart({ data }: ChartProps) {
    const trend = calculateTrend(data, 'tvl');
    const formattedData: AnalyticsDataPoint[] = data.map(item => ({
        date: item.date,
        value: Number(item.tvl),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return (
        <TVLTemplate 
            data={formattedData}
            trend={trend}
            formatValue={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
            config={chartConfig}
        />
    );
}
