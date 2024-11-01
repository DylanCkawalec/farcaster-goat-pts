"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Total Value Locked Analytics"

const chartConfig = {
  tvl: {
    label: "Total Value Locked",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface TVLTemplateProps {
  data: any[];
  trend: string;
  formatValue: (value: number) => string;
}

export function TVLTemplate({ data, trend, formatValue }: TVLTemplateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Value Locked (TVL)</CardTitle>
        <CardDescription>Historical TVL data over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              tickFormatter={formatValue}
            />
            <ChartTooltip 
              cursor={false} 
              content={<ChartTooltipContent indicator="dashed" />}
              formatter={formatValue}
            />
            <Area
              dataKey="tvl"
              type="monotone"
              fill="var(--color-tvl)"
              fillOpacity={0.4}
              stroke="var(--color-tvl)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend} this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total value locked across all contracts
        </div>
      </CardFooter>
    </Card>
  )
}