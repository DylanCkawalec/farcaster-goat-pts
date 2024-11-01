'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TVLChart } from './charts/tvl-chart';
import { DAUChart } from './charts/dau-chart';
import { TRXChart } from './charts/trx-chart';
import { AnalyticsData } from '@/types/analytics';
import { calculateTrend } from '@/lib/analytics';

interface AnalyticsChartsProps {
    data: AnalyticsData[];
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
    const latestData = data[data.length - 1];
    const previousData = data[data.length - 2];

    const getTrend = (key: keyof AnalyticsData) => {
        if (!previousData || !latestData) return '+0%';
        
        const currentValue = Number(latestData[key]);
        const previousValue = Number(previousData[key]);
        
        if (isNaN(currentValue) || isNaN(previousValue) || previousValue === 0) {
            return '+0%';
        }

        const percentChange = ((currentValue - previousValue) / previousValue) * 100;
        return `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`;
    };

    return (
        <Tabs defaultValue="tvl" className="mt-6">
            <TabsList>
                <TabsTrigger value="tvl">TVL</TabsTrigger>
                <TabsTrigger value="dau">DAU</TabsTrigger>
                <TabsTrigger value="trx">TRX</TabsTrigger>
            </TabsList>
            <TabsContent value="tvl">
                <TVLChart data={data} />
            </TabsContent>
            <TabsContent value="dau">
                <DAUChart data={data} />
            </TabsContent>
            <TabsContent value="trx">
                <TRXChart data={data} />
            </TabsContent>
        </Tabs>
    );
}
