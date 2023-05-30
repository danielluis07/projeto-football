"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GoalsChartProps {
  stat: any;
}

const GoalsChart: React.FC<GoalsChartProps> = ({ stat }: any) => {
  return (
    <div>
      <ResponsiveContainer width={500} height={300}>
        <BarChart
          width={500}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
          <Bar dataKey="percentage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div>hello again</div>
    </div>
  );
};

export default GoalsChart;
