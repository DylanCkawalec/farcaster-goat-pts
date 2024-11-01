"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

const metricConfig = {
  tvl: {
    label: "Total Value Locked",
    color: "hsl(var(--chart-1))",
  },
  trx: {
    label: "Transactions",
    color: "hsl(var(--chart-2))",
  },
  dau: {
    label: "Daily Active Users",
    color: "hsl(var(--chart-3))",
  },
}

export function PlatformMetricsTrend({ data }: { data: any[] }) {
  const [activeMetric, setActiveMetric] = 
    React.useState<keyof typeof metricConfig>("tvl")

  const total = React.useMemo(
    () => ({
      tvl: data.reduce((acc, curr) => acc + curr.tvl, 0),
      trx: data.reduce((acc, curr) => acc + curr.trx, 0),
      dau: data.reduce((acc, curr) => acc + curr.dau, 0),
    }),
    [data]
  )

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Platform Metrics Trend</CardTitle>
          <CardDescription>
            Key platform metrics over time
          </CardDescription>
        </div>
        <div className="flex">
          {Object.keys(metricConfig).map((key) => {
            const metric = key as keyof typeof metricConfig
            return (
              <button
                key={metric}
                data-active={activeMetric === metric}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveMetric(metric)}
              >
                <span className="text-xs text-muted-foreground">
                  {metricConfig[metric].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[metric].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="h-[300px] w-full">
          <BarChart
            data={data}
            width={800}
            height={300}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip />
            <Bar 
              dataKey={activeMetric}
              fill={metricConfig[activeMetric].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Platform metrics trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Analyzing platform performance metrics over time
        </div>
      </CardFooter>
    </Card>
  )
}
