export interface AnalyticsDataPoint {
  date: string;
  value: number;
  formattedDate: string;
}

export interface ChartData {
  data: AnalyticsDataPoint[];
  trend: string;
  config: {
    label: string;
    color: string;
  };
}

export interface AnalyticsData {
  tvl: number;
  dau: number;
  trx: number;
  date: string;
}

export interface ChartProps {
  data: AnalyticsData[];
}

export interface ChartConfigItem {
  label: string;
  color: string;
  icon?: React.ComponentType;
  theme?: {
    light: string;
    dark: string;
  };
}

export interface ChartConfig {
  [key: string]: ChartConfigItem;
}

export interface TemplateProps {
  data: AnalyticsDataPoint[];
  trend: string;
  formatValue: (value: number) => string;
  config: ChartConfigItem;
}