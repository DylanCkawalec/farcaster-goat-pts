'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TVLChart } from './charts/tvl-chart';
import { DAUChart } from './charts/dau-chart';
import { TRXChart } from './charts/trx-chart';
import { AnalyticsData } from '@/types/analytics';

interface AnalyticsChartsProps {
    data: AnalyticsData[];
}

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
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
