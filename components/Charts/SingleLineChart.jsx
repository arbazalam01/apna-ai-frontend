import { Grid, Typography } from "@mui/material";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@src/components/ui/chart";
import useDataInsight from "@hooks/useDataInsight";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const chartConfig = {
  compositeScore: {
    label: "Composite Score",
    // color: "hsl(var(--chart-1))",
  },
  awarenessScore: {
    label: "Awareness Score",
    // color: "hsl(var(--chart-2))",
  },
  engagementScore: {
    label: "Engagement Score",
    // color: "hsl(var(--chart-3))",
  },
};

const SingleLineChart = ({ chartData, color, xAxis }) => {
  // Get all keys from the first object in the chartData array, except 'name'
  const dataKeys = chartData.length > 0 ? Object.keys(chartData[0]).filter(key => key !== 'name') : [];

  return (
    <ChartContainer config={chartConfig} style={{ width: "100%", height: "120px" }} >
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="name" tickLine={false} axisLine={false}  

          />
     
          <ChartTooltip  cursor={false} content={<ChartTooltipContent />} />

          {/* Dynamically render lines for all available data keys */}
          {dataKeys?.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SingleLineChart;
