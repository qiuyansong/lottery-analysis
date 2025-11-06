import { NumberStats } from '../types';
import { Flame, Snowflake } from 'lucide-react';

interface StatisticsPanelProps {
  title: string;
  hotNumbers: NumberStats[];
  coldNumbers: NumberStats[];
  ballType: 'red' | 'blue';
}

export default function StatisticsPanel({
  title,
  hotNumbers,
  coldNumbers,
  ballType,
}: StatisticsPanelProps) {
  const ballClass = ballType === 'red' ? 'ball-red' : 'ball-blue';

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>
      
      {/* 热号区域 */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Flame className="text-orange-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            热号统计 TOP 10
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {hotNumbers.map((stat) => (
            <div key={stat.number} className="stat-box text-center">
              <div className={`${ballClass} mx-auto mb-2`}>{stat.number}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                出现 <span className="font-bold text-purple-600 dark:text-purple-400">{stat.count}</span> 次
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {stat.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 冷号区域 */}
      <div>
        <div className="flex items-center mb-4">
          <Snowflake className="text-blue-400 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            冷号统计 TOP 10
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {coldNumbers.map((stat) => (
            <div key={stat.number} className="stat-box text-center opacity-75">
              <div className={`${ballClass} mx-auto mb-2 opacity-70`}>{stat.number}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                出现 <span className="font-bold">{stat.count}</span> 次
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {stat.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

