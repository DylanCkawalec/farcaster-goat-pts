'use client';

import { DAUTemplate } from '@/components/widgets/dau-template';
import { ChartProps } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

export function DAUChart({ data }: { data: ChartProps['data'] }) {
    const trend = calculateTrend(data, 'dau');
    const formattedData = data.map(item => ({
        ...item,
        dau: Number(item.dau),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return <DAUTemplate 
        data={formattedData}
        trend={trend}
        formatValue={(value: number) => value.toLocaleString()}
    />;
}
