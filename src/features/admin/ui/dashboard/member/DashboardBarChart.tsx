import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTheme } from 'styled-components';

interface Totals {
  visit: number;
  new: number;
  deactivated: number;
  banned: number;
}

interface DashboardBarChartProps {
  totals: Totals;
}

const DashboardBarChart = ({ totals }: DashboardBarChartProps) => {
  const theme = useTheme();

  const data = [
    {
      label: '신규',
      value: totals.new,
      color: theme.colors.DASHBOARD.CHART_2,
    },
    {
      label: '탈퇴',
      value: totals.deactivated,
      color: theme.colors.DASHBOARD.CHART_3,
    },
    {
      label: '정지',
      value: totals.banned,
      color: theme.colors.DASHBOARD.CHART_4,
    },
  ];

  return (
    <ResponsiveContainer width='100%' height={260}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray='3 3'
          stroke='#f0f0f0'
          vertical={false}
        />
        <XAxis
          dataKey='label'
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
        <Bar dataKey='value' name='수' radius={[4, 4, 0, 0]} maxBarSize={60}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
