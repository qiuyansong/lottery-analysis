import { DaletouRecord, ShuangseqiuRecord } from '../types';
import { Calendar } from 'lucide-react';

interface LatestDrawsProps {
  type: 'daletou' | 'shuangseqiu';
  records: (DaletouRecord | ShuangseqiuRecord)[];
}

export default function LatestDraws({ type, records }: LatestDrawsProps) {
  const latestRecords = records.slice(0, 10);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        最新开奖结果
      </h2>
      <div className="space-y-4">
        {latestRecords.map((record) => (
          <div
            key={record.period}
            className="border-l-4 border-purple-500 pl-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                第 {record.period} 期
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Calendar size={14} className="mr-1" />
                {record.date}
              </span>
            </div>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              {type === 'daletou' ? (
                <>
                  {(record as DaletouRecord).redBalls.map((num, idx) => (
                    <div key={idx} className="ball-red">
                      {num}
                    </div>
                  ))}
                  <span className="text-gray-400 mx-2">+</span>
                  {(record as DaletouRecord).blueBalls.map((num, idx) => (
                    <div key={idx} className="ball-blue">
                      {num}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {(record as ShuangseqiuRecord).redBalls.map((num, idx) => (
                    <div key={idx} className="ball-red">
                      {num}
                    </div>
                  ))}
                  <span className="text-gray-400 mx-2">+</span>
                  <div className="ball-blue">
                    {(record as ShuangseqiuRecord).blueBall}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

