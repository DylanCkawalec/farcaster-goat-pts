"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, YAxis, LineChart, Line } from "recharts"
import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GOATMetricsChartProps {
  data: any[]
  activeTab: string
  setActiveTab: (value: string) => void
}

export function GOATMetricsChart({ data, activeTab, setActiveTab }: GOATMetricsChartProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{getChartTitle(activeTab)}</CardTitle>
        <CardDescription>{getChartDescription(activeTab)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="tvl">TVL</TabsTrigger>
            <TabsTrigger value="dau">DAU</TabsTrigger>
            <TabsTrigger value="trx">TRX</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="h-[270px]">
          {activeTab === 'dau' ? (
            <BarChart data={data} width={800} height={270}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="dau" fill="var(--color-dau)" />
            </BarChart>
          ) : (
            <LineChart data={data} width={800} height={270}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey={activeTab} 
                stroke={`var(--color-${activeTab})`} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Metrics trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {getChartDescription(activeTab)}
        </div>
      </CardFooter>
    </Card>
  )
}

function getChartTitle(tab: string): string {
  switch (tab) {
    case 'tvl': return 'Total Value Locked'
    case 'dau': return 'Daily Active Users'
    case 'trx': return 'Transaction Volume'
    default: return 'Platform Metrics'
  }
}

function getChartDescription(tab: string): string {
  switch (tab) {
    case 'tvl': return 'Total value locked in platform'
    case 'dau': return 'Daily active users over time'
    case 'trx': return 'Transaction volume analysis'
    default: return 'Platform performance metrics'
  }
}
