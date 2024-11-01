"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "Daily Active Users Analytics"

const chartConfig = {
  dau: {
    label: "Daily Active Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface DAUTemplateProps {
  data: any[];
  trend: string;
  formatValue: (value: number) => string;
}

export function DAUTemplate({ data, trend, formatValue }: DAUTemplateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Active Users (DAU)</CardTitle>
        <CardDescription>Historical user activity trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="date"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              hide
            />
            <XAxis dataKey="dau" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              formatter={formatValue}
            />
            <Bar
              dataKey="dau"
              fill="var(--color-dau)"
              radius={4}
            >
              <LabelList
                dataKey="date"
                position="insideLeft"
                offset={8}
                formatter={(value: string) => new Date(value).toLocaleDateString()}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="dau"
                position="right"
                offset={8}
                formatter={formatValue}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend} this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily active users over time
        </div>
      </CardFooter>
    </Card>
  )
}
