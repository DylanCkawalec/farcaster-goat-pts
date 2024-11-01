'use client';

import { TRXTemplate } from '@/components/widgets/trx-template';
import { ChartProps } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

export function TRXChart({ data }: { data: ChartProps['data'] }) {
    const trend = calculateTrend(data, 'trx');
    const formattedData = data.map(item => ({
        ...item,
        trx: Number(item.trx),
        formattedDate: new Date(item.date).toLocaleDateString()
    }));

    return <TRXTemplate 
        data={formattedData}
        trend={trend}
        formatValue={(value: number) => value.toLocaleString()}
    />;
}
