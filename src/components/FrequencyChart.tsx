import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NumberStats } from '../types';

interface FrequencyChartProps {
  title: string;
  data: NumberStats[];
  ballType: 'red' | 'blue';
}

export default function FrequencyChart({ title, data, ballType }: FrequencyChartProps) {
  const chartData = data.map((stat) => ({
    number: stat.number.toString(),
    count: stat.count,
    percentage: parseFloat(stat.percentage.toFixed(1)),
  }));

  const barColor = ballType === 'red' ? '#ef4444' : '#3b82f6';

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="number" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="count" fill={barColor} name="出现次数" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

