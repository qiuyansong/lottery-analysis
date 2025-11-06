import { DaletouRecord, ShuangseqiuRecord } from '../types';
import { calculateOddEvenRatio, calculateSizeRatio, calculateZoneDistribution } from '../utils/analysis';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ComprehensiveStatsProps {
  type: 'daletou' | 'shuangseqiu';
  records: (DaletouRecord | ShuangseqiuRecord)[];
}

const COLORS = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

export default function ComprehensiveStats({ type, records }: ComprehensiveStatsProps) {
  const maxNumber = type === 'daletou' ? 35 : 33;
  
  // 统计所有红球
  const allRedBalls: number[] = [];
  records.forEach((record) => {
    const redBalls = type === 'daletou' 
      ? (record as DaletouRecord).redBalls 
      : (record as ShuangseqiuRecord).redBalls;
    allRedBalls.push(...redBalls);
  });

  const oddEven = calculateOddEvenRatio(allRedBalls);
  const sizeRatio = calculateSizeRatio(allRedBalls, maxNumber);
  const zoneDistribution = calculateZoneDistribution(allRedBalls, maxNumber, 5);

  const oddEvenData = [
    { name: '奇数', value: oddEven.odd },
    { name: '偶数', value: oddEven.even },
  ];

  const sizeData = [
    { name: '小号', value: sizeRatio.small },
    { name: '大号', value: sizeRatio.large },
  ];

  const zoneData = zoneDistribution.map((count, index) => ({
    name: `区间${index + 1}`,
    value: count,
  }));

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        综合统计分析（基于全部 {records.length} 期数据）
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 奇偶分布 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            奇偶数分布
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={oddEvenData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {oddEvenData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              奇数: {oddEven.odd} | 偶数: {oddEven.even}
            </p>
          </div>
        </div>

        {/* 大小号分布 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            大小号分布
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sizeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              小号: {sizeRatio.small} | 大号: {sizeRatio.large}
            </p>
          </div>
        </div>

        {/* 区间分布 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center text-gray-700 dark:text-gray-300">
            5区间分布
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={zoneData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {zoneData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 统计说明 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📊 统计说明</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• <strong>奇偶分布</strong>：统计所有红球中奇数和偶数的比例</li>
          <li>• <strong>大小号分布</strong>：以中位数为界，统计大号和小号的比例</li>
          <li>• <strong>区间分布</strong>：将号码范围平均分为5个区间，统计每个区间的出现频率</li>
        </ul>
      </div>
    </div>
  );
}

