'use client';

import { TVLTemplate } from '@/components/widgets/tvl-template';
import { ChartProps } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

export function TVLChart({ data }: { data: ChartProps['data'] }) {
    const trend = calculateTrend(data, 'tvl');
    const formattedData = data.map(item => ({
        ...item,
        tvl: Number(item.tvl),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return <TVLTemplate 
        data={formattedData} 
        trend={trend}
        formatValue={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
    />;
}
