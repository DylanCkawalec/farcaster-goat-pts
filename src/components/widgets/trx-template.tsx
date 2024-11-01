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

export const description = "Transaction Analytics"

const chartConfig = {
  trx: {
    label: "Transactions",
    color: "hsl(var(--chart-3))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface TRXTemplateProps {
  data: any[];
  trend: string;
  formatValue: (value: number) => string;
}

export function TRXTemplate({ data, trend, formatValue }: TRXTemplateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analytics</CardTitle>
        <CardDescription>
          Transaction volume and count trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              left: -20,
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
              content={<ChartTooltipContent />}
              formatter={formatValue}
            />
            <Area
              dataKey="trx"
              type="monotone"
              fill="var(--color-trx)"
              fillOpacity={0.4}
              stroke="var(--color-trx)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trend} this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Transaction volume analysis
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
