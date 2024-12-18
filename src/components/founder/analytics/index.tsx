'use client'
import { useState } from 'react'
import { MetricCards } from './metric-cards'
import { AnalyticsCharts } from './analytics-chart'
import { generateMockData } from '@/lib/analytics'
import { AnalyticsData } from '@/types/analytics'
// Removing RealTimeChart import since module not foun

import React from 'react';
import { PubSubService, PubSubContext } from '@/services/pubsub.service';
import RealTimeChart from './charts/RealTimeChart';


const mockData = generateMockData(365)

type Range = {
  from: Date
  to: Date
} | undefined

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<Range>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })

  const filteredData = mockData.filter(item => {
    const itemDate = new Date(item.date)
    return dateRange?.from && dateRange?.to && 
           itemDate >= dateRange.from && 
           itemDate <= dateRange.to
  })

  const latestData = filteredData[filteredData.length - 1] || { tvl: 0, dau: 0, trx: 0 }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="mb-6">
      

      <h1>Real-Time Data Dashboard</h1>
      <RealTimeChart />


      </div>
      <MetricCards latestData={latestData} />
      <AnalyticsCharts data={filteredData} />
    </div>
  )
}