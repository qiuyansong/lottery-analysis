import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DaletouRecord, ShuangseqiuRecord } from '../types';
import { calculateOddEvenRatio, calculateSizeRatio } from '../utils/analysis';

interface TrendAnalysisProps {
  type: 'daletou' | 'shuangseqiu';
  records: (DaletouRecord | ShuangseqiuRecord)[];
}

export default function TrendAnalysis({ type, records }: TrendAnalysisProps) {
  // 分析最近20期的奇偶比趋势
  const recentRecords = records.slice(0, 20).reverse();
  const maxNumber = type === 'daletou' ? 35 : 33;
  
  const trendData = recentRecords.map((record) => {
    const redBalls = type === 'daletou' 
      ? (record as DaletouRecord).redBalls 
      : (record as ShuangseqiuRecord).redBalls;
    
    const oddEven = calculateOddEvenRatio(redBalls);
    const sizeRatio = calculateSizeRatio(redBalls, maxNumber);
    
    return {
      period: record.period,
      odd: oddEven.odd,
      even: oddEven.even,
      small: sizeRatio.small,
      large: sizeRatio.large,
    };
  });

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        号码趋势分析（最近20期）
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          奇偶比例趋势
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="odd" stroke="#8b5cf6" name="奇数" strokeWidth={2} />
            <Line type="monotone" dataKey="even" stroke="#ec4899" name="偶数" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
          大小号比例趋势
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #ccc',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="small" stroke="#10b981" name="小号" strokeWidth={2} />
            <Line type="monotone" dataKey="large" stroke="#f59e0b" name="大号" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

