"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TemplateProps } from "@/types/analytics"

const chartConfig = {
  trx: {
    label: "Transactions",
    color: "hsl(var(--chart-3))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  }
}

export function TRXTemplate({ data, trend, formatValue }: TemplateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Analytics</CardTitle>
        <CardDescription>Transaction volume and count trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={formatValue}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={formatValue}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-trx)"
              fill="var(--color-trx)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>{trend} this month</span>
        </div>
      </CardFooter>
    </Card>
  )
}
