import { AnalyticsData } from "@/types/analytics";

export const generateMockData = (days: number): AnalyticsData[] => {
    const data = [];
    const now = new Date();
    for (let i = days; i > 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        data.push({
            date: date.toISOString().split('T')[0],
            tvl: Math.floor(1000000 + Math.random() * 1000000),
            dau: Math.floor(5000 + Math.random() * 3000),
            trx: Math.floor(50000 + Math.random() * 30000),
        });
    }
    return data;
};

export function calculateTrend(data: any[], key: string): string {
    if (data.length < 2) return '+0%';
    
    const current = data[data.length - 1][key];
    const previous = data[data.length - 2][key];
    const percentageChange = ((current - previous) / previous) * 100;
    
    return `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(1)}%`;
}
