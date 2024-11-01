"use client"

import { TemplateProps, ChartConfigItem } from '@/types/analytics';
import { TrendingUp as TrendingUpIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "Daily Active Users Analytics"

const chartConfig: Record<string, ChartConfigItem> = {
  dau: {
    label: "Daily Active Users",
    color: "hsl(var(--chart-2))",
  }
}

export function DAUTemplate({ data, trend, formatValue }: TemplateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Active Users (DAU)</CardTitle>
        <CardDescription>Historical user activity trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              right: 16,
              left: 16,
              top: 16,
              bottom: 16
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatValue}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
              formatter={formatValue}
            />
            <Bar
              dataKey="value"
              fill="var(--color-dau)"
              radius={4}
            >
              <LabelList
                dataKey="formattedDate"
                position="left"
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                formatter={formatValue}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend} this month <TrendingUpIcon className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily active users over time
        </div>
      </CardFooter>
    </Card>
  )
}
