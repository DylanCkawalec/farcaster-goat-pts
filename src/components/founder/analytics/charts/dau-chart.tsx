'use client';

import { DAUTemplate } from '@/components/widgets/dau-template';
import { ChartProps, AnalyticsDataPoint, ChartConfigItem } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

const chartConfig: ChartConfigItem = {
    label: "Daily Active Users",
    color: "hsl(var(--chart-2))",
};

export function DAUChart({ data }: ChartProps) {
    const trend = calculateTrend(data, 'dau');
    const formattedData: AnalyticsDataPoint[] = data.map(item => ({
        date: item.date,
        value: Number(item.dau),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return (
        <DAUTemplate 
            data={formattedData}
            trend={trend}
            formatValue={(value: number) => value.toLocaleString()}
            config={chartConfig}
        />
    );
}
