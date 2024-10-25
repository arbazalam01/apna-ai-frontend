"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@src/components/ui/chart";
import { Typography } from "@mui/material";
import useCompositeScore from "@hooks/useCompositeScore";
import { Empty, Skeleton } from "antd";

const LineChartGraph = ({ monthlyData, chartConfig }) => {
  // Check if monthlyData is available and has the required properties
  if (!monthlyData || !monthlyData.Instagram || !monthlyData.Twitter || !monthlyData.Linkedin) {
    return <Skeleton active />;
  }

  const monthMap = {
    "2024-1": "January",
    "2024-2": "February",
    "2024-3": "March",
    "2024-4": "April",
    "2024-5": "May",
    "2024-6": "June",
    "2024-7": "July",
    "2024-8": "August",
    "2024-9": "September",
    "2024-10": "October",
    "2024-11": "November",
    "2024-12": "December",
  };

  // Create chart data by iterating over the months with null checks
  const chartData = Object.keys(monthlyData?.Instagram || {}).map((monthKey) => ({
    month: monthMap[monthKey] || monthKey, // Convert monthKey to full month name
    Twitter: monthlyData?.Twitter[monthKey] || 0,
    Instagram: monthlyData?.Instagram[monthKey] || 0,
    Linkedin: monthlyData?.Linkedin[monthKey] || 0,
  }));

  return (
    <Card>
      
      <CardContent>
        <ChartContainer
          config={chartConfig}
          style={{ height: "250px", width: "100%" }}
        >
          {/* Render LineChart if chartData is available */}
          {chartData && chartData.length > 0 ? (
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                bottom: 5,
                left: 12,
                right: 12,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="Linkedin" type="monotone" stroke="#f98b3e" strokeWidth={2.5} dot={false} />
              <Line dataKey="Twitter" type="monotone" stroke="#9fd9fd" strokeWidth={2.5} dot={false} />
              <Line dataKey="Instagram" type="monotone" stroke="#f9b3e3" strokeWidth={2.5} dot={false} />
            </LineChart>
          ) : (
            <Empty style={{marginTop:"3rem"}} description="No Social Media Posts" />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartGraph;
