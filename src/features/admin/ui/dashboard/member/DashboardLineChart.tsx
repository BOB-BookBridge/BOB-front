import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from 'styled-components';

interface MemberPointModel {
  time: string;
  visit: number;
  new: number;
  deactivated: number;
  banned: number;
}

interface DashboardLineChartProps {
  points: MemberPointModel[];
  isDaily: boolean;
}

const formatXAxis = (time: string, isDaily: boolean) => {
  if (isDaily) {
    return time.slice(11, 16);
  }
  return time.slice(5, 10).replace('-', '/');
};

const LINE_CONFIG = [{ key: 'visit', label: '방문' }] as const;

const DashboardLineChart = ({ points, isDaily }: DashboardLineChartProps) => {
  const theme = useTheme();
  const colors = [theme.colors.DASHBOARD.CHART_1];

  return (
    <ResponsiveContainer width='100%' height={260}>
      <LineChart
        data={points}
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
        <XAxis
          dataKey='time'
          tickFormatter={(val) => formatXAxis(val, isDaily)}
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
        <Tooltip
          labelFormatter={(val) => formatXAxis(val, isDaily)}
          contentStyle={{ borderRadius: 8, fontSize: 13 }}
        />
        <Legend
          iconType='circle'
          iconSize={8}
          wrapperStyle={{ fontSize: 13 }}
        />
        {LINE_CONFIG.map((line, idx) => (
          <Line
            key={line.key}
            type='monotone'
            dataKey={line.key}
            name={line.label}
            stroke={colors[idx]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardLineChart;
